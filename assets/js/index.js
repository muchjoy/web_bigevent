
    // 调用 layer.msg() 提示消息
    let layer = layui.layer


    //封装函数  获取用户信息

    function getData() {
        //发起GET请求
        $.ajax({
            type: "GET",
            url: "http://ajax.frontend.itheima.net/my/userinfo",
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);

                renderAvatar(res.data)
            },
            complete: function (res) {
                // console.log(res);
                if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                    //清空token
                    localStorage.removeItem("token")
                    //跳转页面
                    location.href = '/login.html'
                }
            }
        });
    }
    getData();


    //封装函数  用来渲染页面
    function renderAvatar(res) {
        //获取用户名称
        let name = res.nickname || res.username;
        // console.log(name);
        $('#welcome').html(`欢迎${name}`);

        //获取用户头像
        if (res.user_pic !== null) {
            $('.layui-nav-img').attr('src', res.user_pic).show();
            $(".text-avatar").hide()
        } else {
            $('.layui-nav-img').hide()

            //如果没有图片  则 使用名称开头的第一个字母大写
            let first = name[0].toUpperCase()
            $(".text-avatar").html(first).show();

        }

    }



    //点击退出
    $("#btnLogout").on("click", function () {

        //提示用户是否确认退出
        layer.confirm('是否确认退出登陆', { icon: 3, title: "提示" }, function (index) {
            //清除本地浏览器的token数据
            localStorage.removeItem('token');
            //跳转到登陆页面
            location.href = '/login.html';

            layer.close(index);
        })
    });




