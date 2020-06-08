package com.cetc.springcloud.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cetc.springcloud.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Override
	public String login(String username, String password) {
		// 参数合法性校验
		if (StringUtils.isEmpty(username))
			return "用户名不能为空，请重新输入后再次提交！";
		if (StringUtils.isEmpty(password))
			return "密码不能为空，请重新输入后再次提交！";
		if (!"test".equals(username))
			return "用户名不存在，请重新输入后再次提交！";
		if (!"test".equals(password))
			return "密码错误，请重新输入后再次提交！";
		return "登陆成功！";
	}

}
