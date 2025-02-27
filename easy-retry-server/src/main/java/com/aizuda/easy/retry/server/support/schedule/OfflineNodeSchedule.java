package com.aizuda.easy.retry.server.support.schedule;

import com.aizuda.easy.retry.common.core.log.LogUtils;
import com.aizuda.easy.retry.server.dto.RegisterNodeInfo;
import com.aizuda.easy.retry.server.persistence.mybatis.mapper.ServerNodeMapper;
import com.aizuda.easy.retry.server.support.Lifecycle;
import com.aizuda.easy.retry.server.support.cache.CacheRegisterTable;
import com.aizuda.easy.retry.server.support.register.ServerRegister;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 删除过期下线机器
 *
 * @author: www.byteblogs.com
 * @date : 2023-07-21 14:59
 * @since 2.1.0
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class OfflineNodeSchedule extends AbstractSchedule implements Lifecycle {
    private final ServerNodeMapper serverNodeMapper;

    @Override
    protected void doExecute() {

        try {
            // 删除内存缓存的待下线的机器
            LocalDateTime endTime = LocalDateTime.now().minusSeconds(
                ServerRegister.DELAY_TIME + (ServerRegister.DELAY_TIME / 3));

            // 先删除DB中需要下线的机器
            serverNodeMapper.deleteByExpireAt(endTime);

            Set<RegisterNodeInfo> allPods = CacheRegisterTable.getAllPods();
            Set<RegisterNodeInfo> waitOffline = allPods.stream().filter(registerNodeInfo -> registerNodeInfo.getExpireAt().isBefore(endTime)).collect(
                Collectors.toSet());
            Set<String> podIds = waitOffline.stream().map(RegisterNodeInfo::getHostId).collect(Collectors.toSet());
            if (CollectionUtils.isEmpty(podIds)) {
                return;
            }

            for (final RegisterNodeInfo registerNodeInfo : waitOffline) {
                CacheRegisterTable.remove(registerNodeInfo.getGroupName(), registerNodeInfo.getHostId());
            }

        } catch (Exception e) {
            LogUtils.error(log, "clearOfflineNode 失败", e);
        }
    }

    @Override
    String lockName() {
        return "clearOfflineNode";
    }

    @Override
    String lockAtMost() {
        return "PT10S";
    }

    @Override
    String lockAtLeast() {
        return "PT5S";
    }

    @Override
    public void start() {
        taskScheduler.scheduleWithFixedDelay(this::execute, Instant.now(), Duration.parse("PT5S"));
    }

    @Override
    public void close() {

    }
}
