$(function () {
    //点击上传按钮  触发文件域
    $("#btnChooseImage").on('click', function () {
        //文件域点击事件
        $("#file").click()
    });

    //配置选项
    const options = {
        //设置剪裁容器的比例。
        aspectRatio: 1,
        //指定预览区域 类型：String(jQuery选择器)
        preview: 'img-preview'
    }

    //预设
    $("#image").cropper(options);


    //文件域添加 监听事件
    $("#file").on('change', function (e) {
        //获取文件列表
        let files = e.target.files

        //判断是否有文件
        if (files.length === 0) {
            return '请选择文件'
        };

        //获取具体文件
        let file = e.target.files[0];

        //将文件转为地址  URL.createObjectURL()
        let imgUrl = URL.createObjectURL(file)
        // console.log(imgUrl);

        $("#image").cropper('destroy').attr('src', imgUrl).cropper(options)

    });


})