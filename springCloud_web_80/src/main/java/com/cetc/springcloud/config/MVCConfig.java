package com.cetc.springcloud.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * MVC配置类
 * @ClassName: MVCConfig
 * @Description: MVC配置类
 * @Author	吴明涛
 * @Phone   17346519691
 * @Email   wmtxg@126.com
 * @Date 2020年2月24日 下午10:24:26 
 *
 * Copyright (c) All Rights Reserved, 2020.
 */
@Configuration
public class MVCConfig extends WebMvcConfigurerAdapter {

	/**
	 * 配置默认首页
	 * @param registry
	 * @Author	吴明涛
	 * @Phone   17346519691
	 * @Email   wmtxg@126.com
	 * @Data 2020年2月24日 下午10:24:54
	 * Copyright (c) All Rights Reserved, 2020.
	 */
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/html/login.html");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
		super.addViewControllers(registry);
	}
}
