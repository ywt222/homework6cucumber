var CONTENT;
var CURRENT_PAGE = 0;

$(document).ready(function ($) {
    loadData(CURRENT_PAGE);

    //输入事件响应,匹配关键字
    $("#input").bind("input propertychange",function() {
        var keywords = $(this).val();
            CURRENT_PAGE = 0;
            search(keywords);
            highlight(keywords, CURRENT_PAGE);
        });

    //为添加按钮弹出的对话框中的信息绑定事件
    $("#add_confirm").on('click', function () {
        var title = $("#add_title").val();
        var date = Date.parse(new Date()) / 1000;
       //  console.log(date);
        var url = $("#add_url").val();
        if ($("#add_title").val() == "" || $("#add_url").val() == "") {
            $("#add_warn").text("您输入的信息有误，请重新输入！");
        }
        else {
            $.post("./add", {title: title, created: date, url: url}, function (val) {
                loadData(CURRENT_PAGE);
            });
            $("#add_title").val("");
            $("#add_url").val("");
            $("#add_warn").val("");
        }
    });

});

function loadData(currentPage) {
    $.getJSON("./show", function (content) {
        CONTENT = content;
        if(currentPage == content.length / 10){
            currentPage--;
            CURRENT_PAGE = currentPage;
        }
        showPage(content, currentPage);
        seperatePage(content);
    });
}

//显示列表
function showPage(content, currentPage) {
    $(".list").empty();
    var i = currentPage * 10;
    for (; i < currentPage * 10 + 10 && i < content.length; i++) {
        $(".list").append("<li><div class='list_content'><a href=' "+ content[i]["url"] + "'>"
            + content[i]["title"]
            + "</a></div>" + "<div class='list_time'>created @ "
            + convertDate(content[i]["created"])
            + "<button class='delete_button btn btn-default'type='button'"
            + "data-toggle='modal' data-target='#delete_Modal'>删除</button>"+ "</div></li>");
    }
    $("#list_number").text("搜索到" + content.length + "个结果");
    bind_delete();
}


//绑定删除按钮
function bind_delete() {
    $(".delete_button").on('click', function () {
        var title = $(this).parent("li").children(".list_content").text();
        $("#delete_confirm").on('click', function () {
            $.post("./delete", {title: title}, function (val) {
                loadData(CURRENT_PAGE);
            });
        });
    });
}

//分页
function seperatePage(content) {
    $(".page").empty();
    var num_page = Math.ceil(content.length / 10);
    for (var i = num_page; i > 0; i--) {
        $(".page").append("<button class='page_num'>" + i + "</button>");
    }

    $(".page_num").on('click', function () {
        CURRENT_PAGE = $(this).text() - 1;
        showPage(CONTENT, CURRENT_PAGE);
        $(".page_num").css({
            color: '#000',
        });
        $(this).css({
            color: '#f00',
        });
        var keywords = $(".search").val();
        highlight(keywords);
    });
}


function search(keywords) {
    $.getJSON("./search", {keywords: keywords}, function (content, status) {
        CONTENT = content;
       // console.log(CONTENT.length);
      //  console.log(content.length);
        showPage(content, CURRENT_PAGE);
        highlight(keywords, CURRENT_PAGE);
        seperatePage(content);
    });
}


function highlight(keywords) {
    if (keywords != "") {
        var reg = new RegExp("(" + keywords + ")", "ig");
        $(".list_content").each(function () {
            var text = this.innerHTML.toLocaleString();
            if (text.match(reg)) {
                var highlightKeyword = text.replace(reg, "<span class='highlight'>$&</span>");
                this.innerHTML = highlightKeyword;
            }
        });
    }
}


//日期转换
function convertDate(seconds) {
    var day = new Date();
    day.setTime(seconds*1000);
    return day.getFullYear() + "-"
        + ((day.getMonth()+1)<10?("0"+(day.getMonth()+1)):(day.getMonth()+1)) + "-"
        + ((day.getDate())<10?("0"+(day.getDate())):(day.getDate()));
}
