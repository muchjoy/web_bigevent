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
                //使用form.render()方法 
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


    //点击选择封面按钮触发文件域
    $("#btnChooseImage").on('click', function () {
        $("#coverFile").click()
    })

    //文件域变化事件
    $("#coverFile").on('change', function (e) {
        let files = e.target.files;
        //判断是否有文件
        if (files.length == 0) {
            return "请上传文件"
        };

        //将文件创建为URL地址
        let imgURL = URL.createObjectURL(files[0])
        //销毁画布 重新设置src  重新配置
        $image.cropper('destroy').attr('src', imgURL).cropper(options)


    })


    //设置art_state 
    let art_state = "已发布"

    //点击存为草稿按钮  将art_state 改为草稿
    $("#btnSave2").on("click", function () {
        art_state = "草稿"
    })

    //表单发送
    $("#form-pub").on('submit', function (e) {

        e.preventDefault();

        let fd = new FormData($(this)[0]);

        //将发布状态存入fd中
        fd.append('state', art_state)

        console.log(art_state);

        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                art_fd(fd)
            })


    })


    //发送请求
    function art_fd(fd) {
        $.ajax({
            type: 'POST',
            url: "/my/article/add",
            data: fd,
            processData: false,
            contentType: false,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg("发布失败")

                layer.msg("发布文章成功")
            }
        })
    }
})