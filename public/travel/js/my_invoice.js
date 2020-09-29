//分页页码
var startNum = 1;
// var off_on = false;
var timers = null;
// 判断数据是否到底部了
var not_use_bottom;
// 获取发票list
var useStatus = 0, invoiceType, truthStatus, paymentType;
// 左滑删除位移
var animateLeft;
// 回缩删除
var recoveryFlag;
$(function  () {
    /*扫码  start*/
    
    function scanQRCodeResponse(){
        Bridge.scanQRCode(1).then(function(result){//result为返回到扫描结果
           window.location.href="invoice_details.html?quickResponseCode="+result+"&from="+2;
        });
    }
    var callbackButton_scanQRCode1 = document.getElementById('button_scanQRCode1');
    callbackButton_scanQRCode1.onclick = function() {
        scanQRCodeResponse()
    };

    // window.onerror = function(err) {
    //     log('window.onerror: ' + err)
    // };

    // function connectWebViewJavascriptBridge(callback) {
    //     if (window.WebViewJavascriptBridge) {
    //         callback(WebViewJavascriptBridge)
    //     } else {
    //         document.addEventListener('WebViewJavascriptBridgeReady', function() {
    //             callback(WebViewJavascriptBridge)
    //         }, false)
    //     }
    // }

    // connectWebViewJavascriptBridge(function(bridge) {
    //     var uniqueId = 1
    //     function log(message, data) {
    //         var log = document.getElementById('log')
    //         var el = document.createElement('div')
    //         el.className = 'logLine'
    //         el.innerHTML = uniqueId++ + '. ' + message + (data ? ':<br/>' + JSON.stringify(data) : '')
    //         if (log.children.length) { log.insertBefore(el, log.children[0]) }
    //         else { log.appendChild(el) }
    //     }

    //     bridge.init(function(message, responseCallback) {
    //         log('JS got a message', message)
    //         var data = { 'Javascript Responds':'Wee!' }
    //         log('JS responding with', data)
    //         responseCallback(data)
    //     })

    //     // 直接打开扫描结果
    //     var callbackButton_scanQRCode1 = document.getElementById('button_scanQRCode1');
    //     callbackButton_scanQRCode1 .onclick = function(e) {
    //         e.preventDefault();
    //         bridge.callHandler('scanQRCode', {'scan_type': 0}, function(response) {
    //         });
    //     };
    // });
    /*扫码  end*/

    //////////////////////////////////////////////////////////

    // 返回
    $(".return").click(function(){
        window.location.href="invoice.html";
    });

    // 获取参数
    (function($){
        $.getUrlParam = function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return unescape(r[2]);
            return null;
        }
    })(jQuery);

    //判断是不是点击返回操作跳转这个页面的
    var type = $.getUrlParam('type');
    //当type=back的时候代表是从返回操作过来的那么第一遍screenData不调用
    // 初始化执行一遍
    if("back"!=type){
        screenData();
    }

    // 下拉加载
    $('.content').scroll(function() { 
        // alert("当时滚动条离底部60px时开始加载下一页的内容")
        //当时滚动条离底部60px时开始加载下一页的内容
        if (($(this)[0].scrollTop + $(this).height() + 61) >= $(this)[0].scrollHeight) {
            console.log(($(this)[0].scrollTop + $(this).height() + 0),'00000000');
            console.log($(this)[0].scrollHeight,'11111111111')
            clearTimeout(timers);
            timers = setTimeout(function() {
                if(not_use_bottom){
                    startNum = startNum + 1;
                    // console.log("共"+startNum+"条");
                    screenData();
                }
            }, 200);
        }
    });

    // 点击取消隐藏弹框
    $('.cancel').click(function(e){
        $('.bounced').fadeToggle();
        e.stopPropagation()
    });

    // 点击任意位置弹框消失
    $('.bounced').click(function(){
        $('.bounced').fadeToggle();
    });

    // 筛选确定
    $("#sure").click(function(){
        $(".overBag").toggle();
        paymentType = $(".paymentType span.active").attr("paymentType_code");
        truthStatus =  $(".truthStatus span.active").attr("truthStatus_code");
        invoiceType =   $(".invoiceType span.active").attr("invoiceType_code");

        // 筛选后，防止滚动条已经滑到多页后，导致重复请求发生，使滚动条回到顶部
        // if(useStatus == 0){
        //     $('#not_use').html("");
        //     $("#not_use").animate({scrollTop:0},0)
        // } else if(useStatus == 2){
        //     $('#in_use').html("");
        //     $("#in_use").animate({scrollTop:0},0)
        // }
        if(useStatus == 0){
            $('#not_use').html("");
            $("#not_use").animate({scrollTop:0},0)
        } else if(useStatus == 2){
            $('#in_use').html("");
            $("#in_use").animate({scrollTop:0},0)
        } else  if(useStatus == 1){
            $('#already_used').html("");
            $("#already_used").animate({scrollTop:0},0)
        }
        startNum = 1;
        screenData();
    });

    // 新建发票
    $(".shut").click(function(){
        $(".bounced").fadeToggle();
    });

    // 手动添加
    $(".to_lead li").eq(0).click(function(){
        window.location.href="manual_addition.html";
    });

    // 切换 调取ajax parseFloat(order) 最左最右 NaN
    var flagIndex;
    function switchPage(switchNum){
        if(switchNum != NaN){
            flagIndex = useStatus;
            // switchNum = 点击页$(this).index() 或者 滑动页order
            useStatus = switchNum;
            if(flagIndex !== useStatus){
                $(".nav_down").removeClass("nav_up");
                $(".overBag").hide();
                startNum = 1;
            }
            screenData();
        }
    }

    // 滚动超一屏  点击切换、滑动切换  高度还原 (0为false,if(pageIndex)  pageIndex=0,不走方法)
    function overScreen(pageIndex) {
        // if(pageIndex != NaN){}
        setTimeout(hideSiblings(pageIndex), 500);
        function hideSiblings(pageIndex) {
            $('.all_content ul').eq(pageIndex).siblings('ul').css({
                'height': 0,
                'overflow': 'hidden'
            });
            $('.all_content ul').eq(pageIndex).siblings('ul').html("");
        }
    }

    // 点击 切换状态
    $('.all_content')[0].style.left = "0%";
    var startX = '',disX ='';
    $('.nav_ul').on('click','li',function(){
        $('.all_content ul').css({
            'height': 'auto',
            'overflow': 'auto'
        });
        var index = $(this).index();
        // 使用状态修改--20/07/08
        if(index == 0){
            switchPage(index);
        }else{
            switchPage(2);
        }
        
        $('.all_content').css('left','-' + index * 100 + '%');
        $('.nav_ul li').eq(index).addClass('active').siblings().removeClass('active');
        $('.nav_ul').children().children().attr('class','');
        $(this).children().attr('class','underline');
        overScreen(index);
    });

    // 滑动  切换状态
    /*$('.all_content').on('touchstart',function(e){
        $('.all_content ul').css({
            'height': 'auto',
            'overflow': 'auto'
        });
        startX = e.originalEvent.changedTouches[0].clientX;
    });
    $('.all_content').on('touchmove',function(e){
        e.stopPropagation()
    });
    $('.all_content').on('touchend',function(e){
        disX = e.originalEvent.changedTouches[0].clientX - startX;
        var leftNum = parseInt($('.all_content')[0].style.left);
        var order;
        if(disX > 0 && disX > 100) { // 向左滑
            if(leftNum <= -100) {
                $('.all_content')[0].style.left = leftNum + 100 + "%";
                order = -parseInt($('.all_content')[0].style.left)/100;
                $('.nav_ul li').eq(order).addClass('active').siblings().removeClass('active');
                $('.nav_ul li').children().attr('class','');
                $('.nav_ul li').eq(order).children().attr('class','underline');
                overScreen(parseFloat(order));
                switchPage(parseFloat(order));
            }
        } else if(disX < 0 && disX < -100) { // 向右滑
            if(leftNum >= -100) {
                $('.all_content')[0].style.left = leftNum - 100 + "%";
                order = (-parseInt($('.all_content')[0].style.left))/100;
                $('.nav_ul li').eq(order).addClass('active').siblings().removeClass('active');
                $('.nav_ul li').children().attr('class','');
                $('.nav_ul li').eq(order).children().attr('class','underline');
                overScreen(parseFloat(order));
                switchPage(parseFloat(order));
            }
        }
    });*/

    // 返回对应使用状态页
    var returnPage = $.getUrlParam('returnUseStatus');
    if(returnPage){
        $('.all_content').css('left','-' + returnPage * 100 + '%');
        $('.nav_ul li').eq(returnPage).addClass('active').siblings().removeClass('active');
        $('.nav_ul').children().children().attr('class','');
        $('.nav_ul li').eq(returnPage).children().attr('class','underline');
        useStatus = parseFloat(returnPage);
        screenData()
    }

});

// 未使用状态下  左滑删除
function left_slide_deletion() {
    // 获取所有行，对每一行设置监听
    var lines = $(".wrap_new");
    var len = lines.length;
    var lastX,lastXForMobile;

    // 用于记录被按下的对象
    var pressedObj;
    //定义一个用于存储滑动过的对象的数组
    var pressedObj1=[];

    // 用于记录按下的点
    var start;
    var delta;

    // 网页在移动端运行时的监听
    for (var i = 0; i < len; ++i) {
        lines[i].addEventListener('touchstart', function(e) {
            lastXForMobile = e.changedTouches[0].pageX;
            //记录手指触摸点的横坐标
            pressedObj = this;
            // 记录被按下的对象

            // 记录开始按下时的点
            var touches = event.touches[0];
            start = {
                x : touches.pageX, // 横坐标
                y : touches.pageY // 纵坐标
            };
        });

        lines[i].addEventListener('touchmove', function(e) {
            // 防止点击和滑动同时发生
            e.stopPropagation();
            // 计算划动过程中x和y的变化量
            var touches = event.touches[0];
            delta = {
                x : touches.pageX - start.x,
                y : touches.pageY - start.y
            };

            // 横向位移大于纵向位移，阻止纵向滚动
            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                event.preventDefault();
            }
        });

        lines[i].addEventListener('touchend', function(e) {
            var diffX = e.changedTouches[0].pageX - lastXForMobile;
            if (diffX < -100) {
                for(var i = 0; i < pressedObj1.length; ++i){
                    $(pressedObj1[i]).animate({"margin-left":"0"}, 500);
                    //清空数组
                    if(i==(pressedObj1.length-1)){
                        pressedObj1=[];
                    }
                }
                $(pressedObj).animate({"margin-left" : "-" + animateLeft + "px"}, 500);// 左滑
                pressedObj1.push(this);
                //记录被滑的这个对象，已被下一次滑动删除这个对象的左移效果
            } else if (diffX > 100) {
                $(pressedObj).animate({"margin-left" : "0"}, 500);// 右滑
            }
        });
    }

    // 网页在PC浏览器中运行时的监听
    for (var i = 0; i < len; ++i) {
        $(lines[i]).on('mousedown', function(e) {
            // 防止点击和滑动同时发生
            e.stopPropagation();

            lastX = e.clientX;
            pressedObj = this;
            // 记录被按下的对象
        });

        $(lines[i]).on('mouseup', function(e) {
            var diffX = e.clientX - lastX;
            if (diffX < -150) {
                for (var i = 0; i < len; ++i) {
                    var pressedObj111 = lines[i];
                    $(pressedObj111).animate({
                        "margin-left" : "0"
                    }, 100);
                    if(i==(pressedObj1.length-1)){
                        pressedObj1=[];
                    }
                }
                $(pressedObj).animate({
                    "margin-left" : "-" + animateLeft + "px"
                }, 500);
                // 左滑
            } else if (diffX > 150) {
                $(pressedObj).animate({
                    "margin-left" : "0"
                }, 500);
                // 右滑
            }
        });
    }
}

// 实时滑动

function left_slide() {
    animateLeft = parseInt($(".hide_con").width());
    var initX; //触摸位置
    var moveX; //滑动时的位置
    var X = 0; //移动距离
    var objX = 0; //目标对象位置
    var obj;

    function move_obj(change_obj){
        if(change_obj.className == "wrap_new"){
            obj = event.target
        }else if(change_obj.className == "wrap"){
            obj = event.target.firstChild
        }else if(change_obj.className == "show_con"){
            obj = event.target.parentNode
        }else if(change_obj.className == "seller Invoice_detail" || change_obj.className == "title" || change_obj.className == "Invoice_detail"){
            obj = event.target.parentNode.parentNode
        }else if(change_obj.className == "billing_time" || change_obj.className == "amount_invoice"){
            obj = event.target.parentNode.parentNode.parentNode
        }
    }

    function commonClassName(obj){
        return obj.className == "wrap_new" || obj.className == "wrap" || obj.className == "show_con" || obj.className == "seller Invoice_detail"  || obj.className == "title" || obj.className == "Invoice_detail" || obj.className == "billing_time" || obj.className == "amount_invoice";
    }

    window.addEventListener('touchstart', function(event) {
        obj = event.target;
        if (commonClassName(obj)) {
            initX = event.targetTouches[0].pageX;
            move_obj(obj);
            objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        }
        if (objX == 0) {
            window.addEventListener('touchmove', function(event) {
                obj = event.target;
                if (commonClassName(obj)) {
                    move_obj(obj);
                    moveX = event.targetTouches[0].pageX;
                    X = moveX - initX;
                    if (X >= 0) { // 右滑
                        obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                    } else if (X < 0) { // 左滑
                        function index(obj){
                            var tags = obj.parentNode.children,
                                len = tags.length;
                            for(var i=0;i<len;i++){
                                if(tags[i] == obj){
                                    return i;
                                }
                            }
                        }
                        var left_index = index(obj.parentNode);
                        $("#not_use li").eq(left_index).siblings("li").children(".wrap_new").css({"-webkit-transform":"translateX(" + 0 + "px)", "-webkit-transition": "0.05s"});

                        /*setTimeout(function(){
                            $("#not_use li").eq(left_index).siblings("li").children(".wrap_new").css("-webkit-transition", "");
                        },300);*/
                        // 左滑  end

                        var l = Math.abs(X);
                        obj.style.WebkitTransform = "translateX(" + -l + "px)";
                        if (l > animateLeft) {
                            l = animateLeft;
                            obj.style.WebkitTransform = "translateX(" + -l + "px)";
                        }
                    }
                }
            });
        } else if (objX < 0) {
            window.addEventListener('touchmove', function(event) {
                obj = event.target;
                if (commonClassName(obj)) {
                    move_obj(obj);
                    moveX = event.targetTouches[0].pageX;
                    X = moveX - initX;
                    if (X >= 0) {
                        var r = parseInt("-"+animateLeft) + Math.abs(X);
                        obj.style.WebkitTransform = "translateX(" + r + "px)";
                        if (r > 0) {
                            r = 0;
                            obj.style.WebkitTransform = "translateX(" + r + "px)";
                        }
                    } else { //向左滑动
                        obj.style.WebkitTransform = "translateX(" + parseInt("-" + animateLeft) + "px)";
                    }
                }
            });
        }
    });

    window.addEventListener('touchend', function(event) {
        obj = event.target;
        if (commonClassName(obj)) {
            move_obj(obj);
            objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
            if (objX > parseInt("-" + animateLeft/2)) {
                obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                objX = 0;
            } else {
                obj.style.WebkitTransform = "translateX(" + parseInt("-" + animateLeft) + "px)";
                objX = parseInt("-" + animateLeft);
            }
        }
    })

}

// ajax请求
var useSting = '<li class="bottom_title">我是有底线的喔!</li>';
function screenData(){
    // 每页第一次发起请求  loading  显示
    if(startNum == 1){
        $(".special_loading").fadeIn();
    }
    var queryData = {
        // 使用状态
        "useStatus": useStatus,
        // 发票类型
        "invoiceTypeCode": invoiceType,
        // 发票验真状态
        "truthStatus": truthStatus,
        // 支付类型
        "businessSystem": paymentType,
        // 分页
        "pageSize": 10, // 10 , 10 , 10 每页固定10条
        "startNum": startNum // 0 , 10 , 20 页码
    };
    $.ajax({
        url:sy()+'/feeInvoice/selectFeeInvoiceList',
        type : 'post',
        xhrFields: {
            withCredentials: true    // 前端设置是否带cookie
        },
        data: JSON.stringify(queryData),
        contentType : 'application/json;charset=UTF-8',
        success: function (data) {
            // loading 消失
            console.log(data)
            $(".special_loading").fadeOut();
            if(data.resultCode === 0){
                if(data.result.res.length != 0){
                    // 滚动加载  全局变量控制是否调用 ajax (获取数据不足十条，false)
                    if(data.result.res.length == 10){
                        not_use_bottom = true;
                    } else if(data.result.res.length < 10 && data.result.res.length > 0){
                        not_use_bottom = false;
                    }

                    // "无数据" 提示隐藏
                    $(".background_remind").hide();
                    var useString = "";
                    var resData = data.result.res;
                    for (var i in resData) {
                        if(resData[i].salesName == null){
                            resData[i].salesName = "";
                        }
                        if(resData[i].invoiceTypeCode == "99"){
                            useString += '<li class="wrap"><div class="wrap_new"><div  class="show_con">' +
                                '<p class="title">'+ resData[i].invoiceTypeName +'</p>' +
                                '<input type="hidden" name="id" value="'+ resData[i].id +'">' +
                                '<input type="hidden" name="invoiceTypeCode" value="'+ resData[i].invoiceTypeCode +'">' +
                                '<p class="seller Invoice_detail">行程：'+ resData[i].departure +' - '+ resData[i].destination +'</p>' +
                                '<p class="Invoice_detail">' +
                                '<span class="billing_time">乘车日期：'+ resData[i].billingTime +'</span>' +
                                '<span class="amount_invoice">¥'+ resData[i].totalTaxSum +'</span>' +
                                '</p>' +
                                '</div><div class="hide_con">删除</div></div></li>';
                        } else {
                            useString += '<li class="wrap"><div class="wrap_new"><div class="show_con">' +
                                '<p class="title">'+ resData[i].invoiceTypeName +'</p>' +
                                '<input type="hidden" name="id" value="'+ resData[i].id +'">' +
                                '<input type="hidden" name="invoiceTypeCode" value="'+ resData[i].invoiceTypeCode +'">' +
                                '<p class="seller Invoice_detail">销售方：'+ resData[i].salesName +'</p>' +
                                '<p class="Invoice_detail">' +
                                '<span class="billing_time">开票时间：'+ resData[i].billingTime +'</span>' +
                                '<span class="amount_invoice">¥'+ resData[i].totalTaxSum +'</span>' +
                                '</p>' +
                                '</div><div class="hide_con">删除</div></div></li>';
                        }
                    }

                    if(useStatus == 0 && startNum == 1){
                        $('#not_use').html(useString);
                    } else if(useStatus == 2 && startNum == 1){
                        $('#in_use').html(useString);
                    }else if(useStatus == 0 && startNum > 1){ // 滚动
                        $('#not_use').append(useString);
                    } else if(useStatus == 2 && startNum > 1){
                        $('#in_use').append(useString);
                    }

                    // 进入详情页
                    $(".show_con").click(function(){
                        var id = parseInt($(this).find("input[name='id']").val());
                        var invoiceTypeCode = $(this).find("input[name='invoiceTypeCode']").val();
                        // invoiceTypeCode 区分 增值税、火车票（99）
                        if(invoiceTypeCode == "99"){
                            window.location.href="train_tickets_details.html?id="+ id + '&&returnUseStatus=' + useStatus;
                        } else {
                            window.location.href="invoice_details.html?id="+ id +"&&from=1&&returnUseStatus=" + useStatus;
                        }
                    });

                    // 未使用状态 -- 左滑删除
                    /*if(useStatus == 0){
                        animateLeft = $(".hide_con").width();
                        $(document).ready(function(e) {
                            // left_slide_deletion();
                        });
                    }*/
                    animateLeft = $(".hide_con").width();
                    // window.addEventListener('load', function() {
                        if(useStatus == 0){
                            left_slide();

                            // 点击删除按钮
                            $(".hide_con").click(function(){
                                $(".delete_warn").fadeToggle();
                                $(".delete_warn,.cancel_delete").click(function(){
                                    $(".delete_warn").hide();
                                });
                                var invoice_id = parseInt($(this).parents(".wrap_new").find("input[name='id']").val());
                                var idData = {
                                    id: invoice_id
                                };
                                /*保存DOM*/
                                var that = $(this);
                                $(".confirm_deletion").click(function(){
                                    $.ajax({
                                        url:sy()+'/feeInvoice/deleteInvoiceNoteTakerByInvoiceId',
                                        type : 'POST',
                                        dataType: 'json',
                                        xhrFields: {
                                            withCredentials: true    // 前端设置是否带cookie
                                         },
                                        data: JSON.stringify(idData),
                                        contentType : 'application/json;charset=UTF-8',
                                        success: function (data) {
                                            if(data.resultCode == 0){// 成功 移除这项发票
                                                var delect_index = that.parents(".wrap_new").parents(".wrap").index();
                                                $("#not_use li").eq(delect_index).remove();
                                            } else if(data.resultCode == -1){// 失败
                                                // alert("失败！")
                                            }
                                        }
                                    })
                                });
                            });

                        }
                    // });

                } else if(data.result.res.length == 0) {
                    if(useStatus == 0 && startNum == 1 && $('#not_use li').length != data.result.total){
                        $('#not_use').html("");
                        $(".background_remind").show();
                        $("#not_use").css("height","calc(100vh - 3.75rem)");
                    } else if(useStatus == 2 && startNum == 1 && $('#not_use li').length != data.result.total){
                        $('#in_use').html("");
                        $(".background_remind").show();
                        $("#in_use").css("height","calc(100vh - 3.75rem)");
                    } if(useStatus == 0 && startNum > 1 && $('#not_use li').length == data.result.total){
                        // 数据请求完了 提示 "到底部了"
                        $('#not_use').append(useSting);
                    } else if(useStatus == 2 && startNum > 1 && $('#in_use li').length == data.result.total){
                        $('#in_use').append(useSting);
                    } else {
                        $(".background_remind").show();
                    }
                }
            } else {
                // alert(data.message);
            }
        }
    });
}