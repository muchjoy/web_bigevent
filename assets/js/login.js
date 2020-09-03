$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    });
    // 调用 layer.msg() 提示消息
    let layer = layui.layer

    //自定义校验规则
    let form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],

        //校验两次密码是否相同
        repwd: function (value) {
            let password = $("#form_reg [name = password]").val()

            if (password !== value) {
                return '两次密码不一样'
            }
        }

    })

    //发起注册用户的Ajax请求
    $("#form_reg").on('submit', function (e) {
        //阻止表单的默认行为
        e.preventDefault();

        let username = $("#form_reg [name = username]").val().trim()
        let password = $("#form_reg [name = password]").val().trim()

        $.ajax({
            type: "POST",
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username,
                password
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)

                layer.msg("注册成功")
                //当注册成功的时候跳转登陆页面
                $("#link_login").click();
            }
        })


    });


    //登陆 发送请求
    $("#form_login").on("submit", function (e) {
        //阻止表单默认行为
        e.preventDefault();

        // console.log($(this).serialize());
        //发起POST的请求
        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg("登陆的成功");

                //将toke存入本地储存
                localStorage.setItem('token', res.token)

                //跳转页面
                location.href = '/index.html'
            },

        })
    })

})