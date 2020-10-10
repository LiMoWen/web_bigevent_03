$(function () {
    //1.点击去注册账号，隐藏登录区域，显示注册区域
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    //2.点击去登录，隐藏注册区域，显示登录区域
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    //3.自定义验证规则
    var form = layui.form;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    var layer =layui.layer
    // 4.注册功能
    $("#form_reg").on("submit", function (e) {
        //阻止表单默认提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password:$(".reg-box [name=password]").val(),
            },
            success: function (res) {
                //返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg('注册成功请登录');
                //手动切换到登录表单
                $("#link_login").click();
                //重置form表单
                $("#form_reg")[0].reset()
            }
        })
    })
    $("#form_loin").on("submit", function (e) {
         //阻止表单默认提交
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg("登陆成功")
                location.href = 'index.html'
                localStorage.setItem("token",res.token)
                
            }
            
        })
    })
})