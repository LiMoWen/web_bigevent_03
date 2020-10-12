$(function () {
    // 1.获取用户信息
    getUserInfo();
    // 2.退出
    var layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //1.清空本地token
            localStorage.removeItem("token")
            // 2.页面跳转
            location.href = "/login.html";
            // 关闭询问款
            layer.close(index);
        });
    })
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 请求成功，渲染用户头像
            renderAvatar(res.data)
        }
    })
};


// 封装头像函数
function renderAvatar(user) {
    //1. 用户名（昵称有先，没有用username)
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp&nbsp" + name);
    // 2.用户头像
    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user_avatar").hide();
    } else {
        // 没有头像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".user_avatar").show().html(first);
    }
}

