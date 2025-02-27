package com.aizuda.easy.retry.server.support.dispatch.actor.scan;

import akka.actor.AbstractActor;
import akka.actor.ActorRef;
import com.aizuda.easy.retry.common.core.log.LogUtils;
import com.aizuda.easy.retry.server.config.SystemProperties;
import com.aizuda.easy.retry.server.persistence.mybatis.po.RetryTask;
import com.aizuda.easy.retry.server.persistence.support.ConfigAccess;
import com.aizuda.easy.retry.server.persistence.support.RetryTaskAccess;
import com.aizuda.easy.retry.server.support.IdempotentStrategy;
import com.aizuda.easy.retry.server.support.RetryContext;
import com.aizuda.easy.retry.server.support.dispatch.DispatchService;
import com.aizuda.easy.retry.server.support.dispatch.ScanTaskDTO;
import com.aizuda.easy.retry.server.support.handler.ClientNodeAllocateHandler;
import com.aizuda.easy.retry.server.support.retry.RetryExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * 数据扫描模板类
 *
 * @author: www.byteblogs.com
 * @date : 2023-06-05 15:44
 * @since 1.5.0
 */
@Slf4j
public abstract class AbstractScanGroup extends AbstractActor {
    @Autowired
    @Qualifier("retryTaskAccessProcessor")
    protected RetryTaskAccess<RetryTask> retryTaskAccessProcessor;
    @Autowired
    @Qualifier("bitSetIdempotentStrategyHandler")
    protected IdempotentStrategy<String, Integer> idempotentStrategy;
    @Autowired
    protected SystemProperties systemProperties;
    @Autowired
    @Qualifier("configAccessProcessor")
    protected ConfigAccess configAccess;
    @Autowired
    protected ClientNodeAllocateHandler clientNodeAllocateHandler;

    @Override
    public Receive createReceive() {
        return receiveBuilder().match(ScanTaskDTO.class, config -> {

            try {
                doScan(config);
            } catch (Exception e) {
                LogUtils.error(log, "Data scanner processing exception. [{}]", config, e);
            }

        }).build();

    }

    protected void doScan(final ScanTaskDTO scanTaskDTO) {

        LocalDateTime lastAt = LocalDateTime.now().minusDays(systemProperties.getLastDays());
        int retryPullPageSize = systemProperties.getRetryPullPageSize();
        String groupName = scanTaskDTO.getGroupName();
        Long lastId = Optional.ofNullable(getLastId(groupName)).orElse(0L);

        // 扫描当前Group 待处理的任务
        List<RetryTask> list = retryTaskAccessProcessor.listAvailableTasks(groupName, lastAt, lastId, retryPullPageSize,
            getTaskType());

        if (!CollectionUtils.isEmpty(list)) {

            // 更新拉取的最大的id
            putLastId(scanTaskDTO.getGroupName(), list.get(list.size() - 1).getId());

            for (RetryTask retryTask : list) {

                // 重试次数累加
                retryCountIncrement(retryTask);

                RetryContext retryContext = builderRetryContext(groupName, retryTask);
                RetryExecutor executor = builderResultRetryExecutor(retryContext);

                if (!executor.filter()) {
                    continue;
                }

                productExecUnitActor(executor);
            }
        } else {
            // 数据为空则休眠5s
            try {
                Thread.sleep((DispatchService.PERIOD / 2) * 1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

            putLastId(groupName, 0L);
        }

    }

    protected abstract RetryContext builderRetryContext(String groupName, RetryTask retryTask);

    protected abstract RetryExecutor builderResultRetryExecutor(RetryContext retryContext);

    protected abstract Integer getTaskType();

    protected abstract Long getLastId(String groupName);

    protected abstract void putLastId(String groupName, Long lastId);

    private void retryCountIncrement(RetryTask retryTask) {
        Integer retryCount = retryTask.getRetryCount();
        retryTask.setRetryCount(++retryCount);
    }

    private void productExecUnitActor(RetryExecutor retryExecutor) {
        String groupIdHash = retryExecutor.getRetryContext().getRetryTask().getGroupName();
        Long retryId = retryExecutor.getRetryContext().getRetryTask().getId();
        idempotentStrategy.set(groupIdHash, retryId.intValue());

        // 重试成功回调客户端
        ActorRef actorRef = getActorRef();
        actorRef.tell(retryExecutor, actorRef);
    }

    protected abstract ActorRef getActorRef();

}
