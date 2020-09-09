$(function () {

    let layer = layui.layer
    let form = layui.form;
    let laypage = layui.laypage

    //设置个数据列表
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }

    //获取文章列表
    function infoList() {

        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg("获取列表失败")
                // layer.msg("获取列表成功")

                // 使用模板引擎
                let strHtml = template('tpl-table', res)
                $("tbody").html(strHtml);

                //向分页传入文章数量s
                renderPage(res.total)
            }
        });
    }

    infoList()

    //定义过滤器
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data);

        let y = dt.getFullYear();
        let m = addZero(dt.getMonth() + 1);
        let r = addZero(dt.getDate());

        let h = addZero(dt.getHours());
        let f = addZero(dt.getMinutes());
        let s = addZero(dt.getSeconds());

        return `${y}-${m}-${r} ${h}:${f}:${s}`
    };

    //时间补零
    function addZero(n) {
        return n < 10 ? "0" + n : n
    };


    // 点击删除
    $("tbody").on("click", '.btn-delete', function () {
        //获取id值
        let id = $(this).attr('data-id')
        //获取删除的长度
        let len = $(".btn-delete").length;
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {

            $.ajax({
                type: 'GET',
                url: "/my/article/delete/" + id,
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg("删除文章失败")
                    layer.msg(res.message);

                    //判断
                    if (len === 1) [
                        pagenum = pagenum === 1 ? 1 : pagenum - 1
                    ]
                    infoList()

                }

            })
            layer.close(index)
        })
    });




    //初始化下拉分类
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg("获取下拉列表失败")

                let str = template('tpl-cate', res)

                $("[name=cate_id]").html(str)

                //必须添加 
                form.render()


            }
        })
    }

    initCate();

    //实现筛选功能
    $("#form-search").on("submit", function (e) {
        e.preventDefault();

        //获取cate_id
        let cate_id = $("[name=cate_id]").val()
        let state = $("[name=state]").val()

        // console.log(state);  //输出草稿


        q.cate_id = cate_id;
        q.state = state;
        // console.log(q.state);  //草稿

        //重新渲染
        infoList()

    });

    //分页
    function renderPage(total) {
        // console.log('-------');
        laypage.render({
            elem: "pageBox",   //分页器的容器的ID
            count: total,       // 总数
            limit: q.pagesize,  // 每页显示的条数
            curr: q.pagenum,    // 设置默认选中的分页
            layout: ['count', 'limit', 'perv', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 8],
            //jump回调, 
            // 1. 点击页码时触发
            // 2. 只要调用laypage.render()时候
            jump: function (obj, first) {
                // console.log(obj.curr);
                //将最新的页码给q参数对象
                q.pagenum = obj.curr
                q.pagesize = obj.limit

                //当first为 true时  是调用laypage.render()触发的
                //当first为false时, 是点击页码触发的
                if (!first) {
                    infoList()
                }
            }
        })

    };





})