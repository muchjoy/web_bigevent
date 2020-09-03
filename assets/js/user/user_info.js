$(function () {
    let form = layui.form;

    //进行昵称验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });


    //封装函数  获取用户信息
    userInfo();
    function userInfo() {
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
                //调用form.val()  快速为表单赋值  
                form.val('formUserInfo', res.data)
            }
        });
    };

    //重置表单
    $("#btnReset").on("click", function () {
        //调用userInfo
        userInfo();
    })


    //提交修改  
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        // console.log($(this).serialize());
        $.ajax({
            type: 'POST',
            url: "http://ajax.frontend.itheima.net/my/userinfo",
            data: $(this).serialize(),

            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                // console.log(res);
                layer.msg(res.message)
            }
        })
    })



})