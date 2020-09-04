$(function () {

    let layer = layui.layer

    infoList()


    //获取文章列表
    function infoList() {
        //设置个数据列表
        let data = {
            pagenum: 1,
            pagesize: 2,
            cate_id: "",
            state: ""
        }
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: data,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg("获取列表失败")
                layer.msg("获取列表成功")

                // 使用模板引擎
                let strHtml = template('tpl-table', res)
                $("tbody").html(strHtml)
            }
        });
    }
})