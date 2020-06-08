package com.cetc.springcloud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cetc.springcloud.feign.UserClient;

@RestController
public class LoginController {

	@Autowired
	private UserClient userService;

	/**
	 * 登陆
	 * 
	 * @param name 用户名
	 * @param pwd  密码
	 * @return 登陆结果
	 * @author 吴明涛
	 * @phone 17346519691
	 * @email wmtxg@126.com
	 * @time 2019年7月7日 下午12:32:39
	 */
	@RequestMapping("login")
	@ResponseBody
	public String login(String username, String password) {
		return userService.login(username, password);
	}

}
