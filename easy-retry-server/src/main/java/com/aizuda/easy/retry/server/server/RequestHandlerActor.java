package com.aizuda.easy.retry.server.server;

import akka.actor.AbstractActor;
import cn.hutool.core.net.url.UrlBuilder;
import com.aizuda.easy.retry.common.core.context.SpringContext;
import com.aizuda.easy.retry.common.core.enums.HeadersEnum;
import com.aizuda.easy.retry.common.core.log.LogUtils;
import com.aizuda.easy.retry.common.core.model.Result;
import com.aizuda.easy.retry.common.core.util.JsonUtil;
import com.aizuda.easy.retry.server.dto.NettyHttpRequest;
import com.aizuda.easy.retry.server.server.handler.HttpRequestHandler;
import com.aizuda.easy.retry.server.support.Register;
import com.aizuda.easy.retry.server.support.handler.ConfigVersionSyncHandler;
import com.aizuda.easy.retry.server.support.register.ClientRegister;
import com.aizuda.easy.retry.server.support.register.RegisterContext;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpHeaderNames;
import io.netty.handler.codec.http.HttpHeaderValues;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpMethod;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.util.CharsetUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Collection;

/**
 * 处理netty客户端请求
 *
 * @author: www.byteblogs.com
 * @date : 2023-07-24 09:20
 * @since 2.1.0
 */
@Component(RequestHandlerActor.BEAN_NAME)
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Slf4j
public class RequestHandlerActor extends AbstractActor {

    public static final String BEAN_NAME = "requestHandlerActor";

    @Override
    public Receive createReceive() {
        return receiveBuilder().match(NettyHttpRequest.class, nettyHttpRequest -> {

            final String uri = nettyHttpRequest.getUri();
            if (StringUtils.isBlank(uri)) {
                LogUtils.error(log, "uri can not be null");
                return;
            }

            ChannelHandlerContext channelHandlerContext = nettyHttpRequest.getChannelHandlerContext();

            final boolean keepAlive = nettyHttpRequest.isKeepAlive();
            final HttpMethod method = nettyHttpRequest.getMethod();
            final String content = nettyHttpRequest.getContent();
            final HttpHeaders headers = nettyHttpRequest.getHeaders();

            String result = "";
            try {
                result = doProcess(uri, content, method, headers);
            } catch (Exception e) {
                LogUtils.error(log, "http request error. [{}]", nettyHttpRequest.getContent(), e);
                result = JsonUtil.toJsonString(new Result<>(0, e.getMessage()));
                throw e;
            } finally {
                writeResponse(channelHandlerContext, keepAlive, result);
                getContext().stop(getSelf());
            }


        }).build();
    }

    private String doProcess(String uri, String content, HttpMethod method,
        HttpHeaders headers) {

        Register register = SpringContext.getBean(ClientRegister.BEAN_NAME, Register.class);

        String hostId = headers.get(HeadersEnum.HOST_ID.getKey());
        String hostIp = headers.get(HeadersEnum.HOST_IP.getKey());
        Integer hostPort = headers.getInt(HeadersEnum.HOST_PORT.getKey());
        String groupName = headers.get(HeadersEnum.GROUP_NAME.getKey());
        String contextPath = headers.get(HeadersEnum.CONTEXT_PATH.getKey());

        // 注册版本
        RegisterContext registerContext = new RegisterContext();
        registerContext.setContextPath(contextPath);
        registerContext.setGroupName(groupName);
        registerContext.setHostPort(hostPort);
        registerContext.setHostIp(hostIp);
        registerContext.setHostId(hostId);
        boolean result = register.register(registerContext);
        if (!result) {
            LogUtils.warn(log, "client register error. groupName:[{}]", groupName);
        }

        // 同步版本
        ConfigVersionSyncHandler syncHandler = SpringContext.getBeanByType(ConfigVersionSyncHandler.class);
        Integer clientVersion = headers.getInt(HeadersEnum.VERSION.getKey());
        syncHandler.addSyncTask(groupName, clientVersion);

        UrlBuilder builder = UrlBuilder.ofHttp(uri);
        Collection<HttpRequestHandler> httpRequestHandlers = SpringContext.CONTEXT
            .getBeansOfType(HttpRequestHandler.class).values();
        for (HttpRequestHandler httpRequestHandler : httpRequestHandlers) {
            if (httpRequestHandler.supports(builder.getPathStr()) && method.name()
                .equals(httpRequestHandler.method().name())) {
                return httpRequestHandler.doHandler(content, builder, headers);
            }
        }

        return JsonUtil.toJsonString(new Result<>());
    }

    /**
     * write response
     */
    private void writeResponse(ChannelHandlerContext ctx, boolean keepAlive, String responseJson) {
        // write response
        FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK,
            Unpooled.copiedBuffer(responseJson, CharsetUtil.UTF_8));   //  Unpooled.wrappedBuffer(responseJson)
        response.headers().set(HttpHeaderNames.CONTENT_TYPE,
            HttpHeaderValues.APPLICATION_JSON);       // HttpHeaderValues.TEXT_PLAIN.toString()
        response.headers().set(HttpHeaderNames.CONTENT_LENGTH, response.content().readableBytes());
        if (keepAlive) {
            response.headers().set(HttpHeaderNames.CONNECTION, HttpHeaderValues.KEEP_ALIVE);
        }
        ctx.writeAndFlush(response);
    }

}
