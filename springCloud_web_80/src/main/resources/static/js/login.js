$(function() {

	// 显示登陆页面
	showLoginPage();

	// 给登陆按钮绑定单击事件
	$("#login").click(login)

	// 给跳入注册页面添加单击事件
	$("#regist-page").click(showRegistPage)

});

/**
 * 登陆操作
 * 
 * @function login
 * @returns
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @date 2019年7月6日 下午11:51:11
 */
function login() {

	// 获取用户输入的用户名和密码，并去除空格
	var name = $("#login_name").val().trim();
	var pwd = $("#login_pwd").val().trim();
	if (name == undefined || name == null || name == "") {
		$("#login_msg").html("用户名不能为空！");
		return;
	}
	if (pwd == undefined || pwd == null || pwd == "") {
		$("#login_msg").html("密码不能为空！");
		return;
	}
	// 封装请求参数
	var params = {
		"username" : name,
		"password" : pwd
	}
	// // 发送请求
	var result = doHttpRequestWithReturn("/login", params, "POST");
	// 返回结果中status为0时表示登录成功，跳入登录页面
	if (result == "登陆成功！") {
		// 跳转主页
		window.location.href = "/html/starter.html";

	} else {
		// 显示错误信息
		$("#login_msg").html(result);
	}

}

/**
 * 通过点击回车键执行登陆操作
 * 
 * @function ___anonymous
 * @param event
 * @returns
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @date 2019年7月8日 上午10:29:49
 */
$(document).keydown(function(event) { // 键盘事件
	// 获取event对象
	var e = event || window.event;
	// 获取用户点击键盘按键值
	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode; // 兼容IE和FF
	// 如果用户点击回车键，判断当前页面中登陆form表单是否显示，如果显示则进行登陆操作
	if (e && keyCode == 13) { // Enter的keyCode为13
		// 判断当前页面中登陆form表单是否显示
		if ("block" == $("#login-form").css("display")) {
			// 进行登陆操作
			login();
		}
	}
});

/**
 * 显示登陆页面
 * 
 * @function showLoginPage
 * @returns
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @date 2019年7月6日 下午11:50:49
 */
function showLoginPage() {
	// 显示注册界面，隐藏登陆界面
	$("#login-form").show();
	// 将注册界面用户名、密码提示框内容清空
	$("#login_msg").html("");
	$("#login_name").html("");
	$("#login_pwd").html("");
}

/**
 * 显示注册页面
 * 
 * @function showRegistPage
 * @returns
 * @author 吴明涛
 * @phone 17346519691
 * @email wmtxg@126.com
 * @date 2019年7月6日 下午11:51:00
 */
function showRegistPage() {
	alert("暂未开放注册功能...");
}

function doHttpRequestWithReturn(url, params, type) {
	// 给data赋初始值
	var data = {};
	// 发送ajax请求
	$.ajax({
		url : url,// 请求路径
		data : params,// 请求参数
		type : type,// 请求类型
		async : false,// 同步请求
		// dataType: 'json',
		// contentType: 'application/json',//这个必须是这个格式
		success : function(result) {
			// 给data赋值
			data = result;
		},
		error : function(result) {
			// 给data赋值
			data = result.responseJSON;
		}
	})
	// 返回数据
	return data;
}
