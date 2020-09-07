$(function () {
    let layer = layui.layer
    let form = layui.form;
    infoArticle()

    //获取文章列表
    function infoArticle() {

        //发起请求
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                let str = template("tpl-table", res);
                $("tbody").html(str)

            }
        })
    };

    //为添加按钮绑定单击事件
    //通过 layer.open() 展示弹出层
    let indexAdd = null;
    $("#btnAddCate").on("click", function () {

        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $("#dialog-add").html()
        })

    });

    //新增文章分类
    $("body").on("submit", '#form-add', function (e) {
        //阻止表单默认行为
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: '/my/article/addcates',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('新增文章分类失败');

                layer.msg(res.message);
                //重新渲染页面
                infoArticle();

                //关闭弹层
                layer.close(indexAdd)

            }
        });

    })


    //点击弹出编辑弹层
    let indexEdit = null;
    $("tbody").on("click", '.btn-edit', function () {

        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章类别',
            content: $("#dialog-edit").html()
        });

        // console.log($(this).attr('data-id'));

        //填充表格内原有的文章分类
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + $(this).attr('data-id'),
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                // console.log(res);
                //调用form.val()  快速为表单赋值  
                form.val('form-edit', res.data)

            }
        })
    });



    //点击确认修改
    $("body").on("submit", '#form-edit', function (e) {
        e.preventDefault();
        // 发送请求
        $.ajax({
            type: 'POST',
            url: "/my/article/updatecate",
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg("更新失败")
                layer.msg(res.message);

                // 重新渲染
                infoArticle();

                //关闭弹层  根据 indexEdit
                layer.close(indexEdit)
            }
        })

    })


    //根据id点击删除文章分类
    $("body").on("click", '.btn-delete', function () {
        // console.log(this);
        $.ajax({
            type: 'get',
            url: "/my/article/deletecate/" + $(this).attr("data-id"),
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg("删除失败");
                layer.msg(res.message)
                // 重新渲染页面
                infoArticle();
                // console.log($("#dele"));
            }
        })


    })


    /*
        id:传入id或者class
        time: 定时器的时间
    */
    // function getDel(id, time) {
    //     let timer = setInterval(function () {
    //         let index = 0
    //         let del = document.querySelectorAll(id)

    //         for (let i = 0; i < del.length; i++) {
    //             index++
    //             del[i].click()
    //         }
    //         if (index === 2) {
    //             clearInterval(timer)
    //         }
    //     }, time)
    // }
    // getDel("#dele", 100)



    function addList() {
        setInterval(function () {
            $("#btnAddCate").click()
            // $(".layui-input").val('11111')
            $('#form-add').submit()
        }, 1000)
    }
    // addList()

    // $("body").click(function () {
    //     getDel()
    //     console.log(1);
    // })
    // var timer = setInterval(() => {
    //     let del = document.querySelectorAll('#dele')
    //     let ii = 0
    //     for (let i = 0; i <= del.length; i++) {
    //         ii++
    //         del[i].click()

    //     }
    //     if (ii == del.length - 2) {
    //         clearInterval(timer)
    //     }
    // }, 10);
})