var baseURL = "http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function (params) {
  // 拼接URL接口
  params.url = baseURL + params.url


  // 对需要权限的接口配置头信息
  // 必须以my开头才行
  if (params.url.indexOf('/my/') !== -1) {
    params.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }


  // 3.拦截所有响应，判断身份认证信息
  params.complete = function (res) {
    // var obj = res.responseJSON;
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 清空本地token
      localStorage.removeItem("token");
      // 页面跳转
      location.href = "/login.html";
    }
  }
})
