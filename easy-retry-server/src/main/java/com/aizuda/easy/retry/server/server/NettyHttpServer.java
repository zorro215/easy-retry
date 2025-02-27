package com.aizuda.easy.retry.server.server;

import com.aizuda.easy.retry.server.config.SystemProperties;
import com.aizuda.easy.retry.server.exception.EasyRetryServerException;
import com.aizuda.easy.retry.server.support.Lifecycle;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * netty server
 *
 * @author: www.byteblogs.com
 * @date : 2022-03-07 15:54
 * @since 1.0.0
 */
@Component
@Slf4j
public class NettyHttpServer implements Runnable, Lifecycle {

    @Autowired
    private SystemProperties systemProperties;
    private Thread thread = null;
    private volatile boolean started = false;

    @Override
    public void run()  {
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            // start server
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup)
                .channel(NioServerSocketChannel.class)
                .option(ChannelOption.SO_BACKLOG, 128)
                .childOption(ChannelOption.SO_KEEPALIVE, true)
                .childHandler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    public void initChannel(SocketChannel channel) throws Exception {
                        channel.pipeline()
                            .addLast(new HttpServerCodec())
                            .addLast(new HttpObjectAggregator(5 * 1024 * 1024))
                            .addLast(new NettyHttpServerHandler());
                    }
                });

            // 在特定端口绑定并启动服务器 默认是1788
            ChannelFuture future = bootstrap.bind(systemProperties.getNettyPort()).sync();

            log.info("------> easy-retry remoting server start success, nettype = {}, port = {}",
                NettyHttpServer.class.getName(), systemProperties.getNettyPort());

            started = true;
            future.channel().closeFuture().sync();

        } catch (InterruptedException e) {
            log.info("--------> easy-retry remoting server stop.");
        } catch (Exception e) {
            log.error("--------> easy-retry remoting server error.", e);
            started = false;
            throw new EasyRetryServerException("easy-retry server start error");
        } finally {
            // 当服务器正常关闭时，关闭EventLoopGroups以释放资源。
            workerGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }

    @Override
    public void start()  {
        thread = new Thread(this);
        thread.setDaemon(true);
        thread.start();
    }

    @Override
    public void close() {
        if (thread != null && thread.isAlive()) {
            thread.interrupt();
        }
    }

    public boolean isStarted() {
        return started;
    }
}
