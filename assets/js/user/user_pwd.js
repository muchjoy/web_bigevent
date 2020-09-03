$(function () {

    let form = layui.form
    // 调用 layer.msg() 提示消息
    let layer = layui.layer
    //先检验密码长度
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],

        //检验新旧密码是否相同
        samePwd: function (value) {
            if ($('[name = oldPwd]').val() === value) {
                return '新旧密码不要一样'
            }
        },

        //检验两次密码是否相同
        rePwd: function (value) {
            if ($("[name = newPwd]").val() !== value) {
                return '两次密码不一样'
            }
        }
    })


    //提交修改  发送请求
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/my/updatepwd",
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res);
                layer.msg(res.message)
            }
        })
    })

})