$(function  () {
    $(".loading").fadeOut();

    var overall_situation_index = 0;
    // 安卓，ios 兼容问题
    var oHeight = $(document).height(); //浏览器当前的高度
    $(window).resize(function(){
        var difference_value = 0;
        var difference_values = 0;
        // 键盘弹出后，滑到另一页，会重复计算
        if(overall_situation_index == 0){
            if($(document).height() < oHeight){
                var marTop = $("#sure").offset().top;
                var parMarTop = $("#sure").parents().offset().top;
                difference_value = marTop - parMarTop;
                $("#sure").css({"position":"static","margin-top":difference_value});
            }else{
                $("#sure").css("position","absolute");
            }
        } else if(overall_situation_index == 1){
            /*if($(document).height() < oHeight){
                var marTops = $("#trainSure").offset().top;
                var parMarTops = $("#trainSure").parents().offset().top;
                difference_values = marTops - parMarTops;
                $("#trainSure").css({"position":"static","margin-top":difference_values});
            }else{
                $("#trainSure").css("position","absolute");
            }*/
        }
    });

    // tab切换
    $('.all_content')[0].style.left = "0%";
    var startX = '',disX ='';
    $('.nav_ul').on('click','li',function(){
        var index = $(this).index();
        overall_situation_index = index;

        $('.all_content .content_ul').css({
            'height': 'auto',
            'overflow': 'auto'
        });

        $('.all_content .content_ul').eq(overall_situation_index).siblings('div').css({
            'height': 0,
            'overflow': 'hidden'
        });


        /*all_content
        if(index == 0){
            $('.all_content').css('height','0px');
        }else if(index == 1){
            $('.all_content').css({'height':'auto','overflow':'auto'});

        }*/

        $('.all_content').css('left','-' + index * 100 + '%');
        $('.nav_ul li').eq(index).addClass('active').siblings().removeClass('active');
        $('.nav_ul').children().children().attr('class','');
        $(this).children().attr('class','underline');
    });

    // 滑动切换
    /*$('.all_content').on('touchstart',function(e){
        startX = e.originalEvent.changedTouches[0].clientX;
    });
    $('.all_content').on('touchmove',function(e){
        e.stopPropagation()
    });
    $('.all_content').on('touchend',function(e){
        disX = e.originalEvent.changedTouches[0].clientX - startX;
        var leftNum = parseInt($('.all_content')[0].style.left);
        if(disX > 0 && disX > 100) { // 向左滑
            if(leftNum <= -100) {
                $('.all_content')[0].style.left = leftNum + 100 + "%";
                var order = -parseInt($('.all_content')[0].style.left)/100;
                $('.nav_ul li').eq(order).addClass('active').siblings().removeClass('active');
                $('.nav_ul li').children().attr('class','');
                $('.nav_ul li').eq(order).children().attr('class','underline');
                overall_situation_index = parseFloat(order)
                // 滑动虚拟键盘无法收起
                // $('.nav_ul li').eq(parseFloat(order)).click();
            }
        } else if(disX < 0 && disX < -100) { // 向右滑
            if(leftNum >= -100) {
                $('.all_content')[0].style.left = leftNum - 100 + "%";
                var order = (-parseInt($('.all_content')[0].style.left))/100;
                // console.log(parseFloat(order))
                overall_situation_index = parseFloat(order)
                $('.nav_ul li').eq(order).addClass('active').siblings().removeClass('active');
                $('.nav_ul li').children().attr('class','');
                $('.nav_ul li').eq(order).children().attr('class','underline');

                // $('.nav_ul li').eq(parseFloat(order)).click()
            }
        }
    });*/

    // 增值税  新建
    $("#sure").click(function(){
        var invoice_code = $("#invoice_code").val();
        var invoice_number = $("#invoice_number").val();
        var free_price = $("#free_price").val();
        var date_invoice = $("#date_invoice").val();
        var pay = $("input[name='pay']:checked").val();

        if(invoice_code == ""){
            $("#promptContent").html("请输入发票代码!");
            $(".Reminder").fadeToggle();
            return;
        }
        if(invoice_number == ""){
            $("#promptContent").html("请输入发票号码!");
            $(".Reminder").fadeToggle();
            return;
        }
        if(date_invoice == ""){
            $("#promptContent").html("请选择发票日期!");
            $(".Reminder").fadeToggle();
            return;
        }
        if(free_price == ""){
            if(invoiceCode == 1){
                $("#promptContent").html("请输入校验码!");
                $(".Reminder").fadeToggle();
                return;
            } else if(invoiceCode == 2){
                $("#promptContent").html("请输入不含税价!");
                $(".Reminder").fadeToggle();
                return;
            }
        }

        if(invoiceCode == 1){
            $(".loading").fadeIn();
            var queryData = {
                "invoiceDataCode": invoice_code,
                "invoiceNumber": invoice_number,
                "billingTime": date_invoice,
                "checkCode": free_price// 校验码
            };
        } else if(invoiceCode == 2) {
            $(".loading").fadeIn();
            var queryData = {
                "invoiceDataCode": invoice_code,
                "invoiceNumber": invoice_number,
                "billingTime": date_invoice,
                "totalAmount": free_price// 不含税价
            };
        } else if(invoiceCode == -1){
            $("#promptContent").html("发票代码查询失败!");
            $(".Reminder").fadeToggle();
            return;
        }

        $.ajax({
            url: sy() +'/feeInvoiceForThirdApiByInvoiceCodeOrInvoiceNumber',
            type : 'POST',
            dataType: 'json',
            data: JSON.stringify(queryData),
            contentType : 'application/json;charset=UTF-8',
            xhrFields: {
                withCredentials: true    // 前端设置是否带cookie
            },
            success: function (data) {
                $(".loading").fadeOut();
                if(data.resultCode == -1){ // -1:失败   1数据库成功 ， 2 乐税成功
                    $("#promptContent").html(data.message);
                    $(".Reminder").fadeToggle();
                    $(".Reminder,.cancel").click(function(){
                        $(".Reminder").hide();
                    });
                } else {
                    var dataUrl = jQuery.param(queryData);
                    window.location.href="invoice_details.html?"+dataUrl+"&&invoiceCode="+invoiceCode+"&&from=2&&returnUseStatus=0";
                }
            }
        });
    });
    // 点击取消隐藏弹框
    $('.cancel').click(function(e){
        $('.Reminder').fadeToggle();
        e.stopPropagation()
    });
    // 点击任意位置弹框消失
    $('.Reminder').click(function(e){
        $('.Reminder').fadeToggle();
        e.stopPropagation()
    });
    // 返回
    $(".return").click(function(){
        window.history.back();
    });
    // 点击填写-出现input
    $(".line_con").click(function(){
        $(this).hide().next(".line_val").show().focus();
    });

    /*火车票 -- 新建*/
    // $("#trainSure").click(function(){
    //     
    //     var invoiceDataCode = $("#invoiceDataCode").val();
    //     var invoiceNumber = $("#invoiceNumber").val();
    //     var billingTime = $("#billingTime").val();
    //     var totalAmount = $("#totalAmount").val();
    //     var departure = $("#departure").val();
    //     var destination = $("#destination").val();
    //     var invoiceRemarks = $("#invoiceRemarks").val();
    //     if(invoiceDataCode !== "" && invoiceNumber !== "" && billingTime !== "" && totalAmount !== "" && departure !== "" && destination !== ""){
    //         $(".loading").fadeIn();
    //         var queryData = {
    //             "feeInvoicePO":{
    //                 "invoiceDataCode": invoiceDataCode,
    //                 "invoiceNumber": invoiceNumber,
    //                 "invoiceTypeName": "火车票",
    //                 "invoiceTypeCode": "99",
    //                 "billingTime": billingTime,
    //                 "totalAmount": totalAmount,
    //                 "invoiceRemarks": invoiceRemarks,
    //                 "paymentType": 1,
    //                 "departure": departure,
    //                 "destination": destination
    //             },
    //             "feeInvoiceItemPOList":null
    //         };
    //         console.log(queryData)
    //         
    //         alert(12345678)
    //         $.ajax({
    //             url:sy()+'/feeInvoice/saveFeeInvoiceAndFeeInvoiceItemAndNoteTaker',
    //             type : 'POST',
    //             dataType: 'json',
    //             data: JSON.stringify(queryData),
    //             contentType : 'application/json;charset=UTF-8',
    //             xhrFields: {
    //                 withCredentials: true    // 前端设置是否带cookie
    //             },
    //             success: function (data) {
    //                 $(".loading").fadeOut();
    //                 if(data.resultCode == -1){
    //                     $("#promptContent").html(data.message);
    //                     $(".Reminder").fadeToggle();
    //                     $(".Reminder,.cancel").click(function(){
    //                         $(".Reminder").hide();
    //                     });
    //                 } else if(data.resultCode == 0){
    //                     // 成功   杨婉君  报销申请逻辑页面跳转过来的  满足条件跳回
    //                     var SecondUrl = localStorage.getItem("SecondUrl");
    //                     if(SecondUrl !== undefined && SecondUrl !== null){
    //                     	var invoiceId = data.result
    //                     	var InvoiceId_code = new Object();
    //                         InvoiceId_code[invoiceId] = "99";
    //                         localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
    //                         localStorage.removeItem("SecondUrl");
    //                         window.location.href = SecondUrl;
    //                     }else{
    //                         window.location.href="my_invoice.html";
    //                     }
    //                 }
    //             }
    //         });
    //     } else {
    //         $("#promptContent").html("项目未填写完整！");
    //         $(".Reminder").fadeToggle();
    //         $(".Reminder,.cancel").click(function(){
    //             $(".Reminder").hide();
    //         });
    //     }
    // });
});
