$(function () {
    let layer = layui.layer
    let form = layui.form;
    getList()
    function getList() {
        //获取文章的类别
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                let str = template('tpl-cate', res);

                $("[name=cate_id]").html(str);
                //一定得调用
                form.render()
            }
        });
    }

    // 初始化富文本编辑器
    initEditor()

    //初始化图片编辑器
    let $image = $("#image")

    //裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: ".img-preview"
    }

    $image.cropper(options)
})