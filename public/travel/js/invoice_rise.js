$(function  () {
    $("#content_invoice").click(function(){
        window.location.href="my_invoice.html";
    });

    // 发票抬头列表
    $.ajax({
        url:sy()+'/feeInvoiceHeadingController/selectFeePersonnelInvoiceHeadingInformationList',
        type : 'POST',
        dataType: 'json',
        contentType : 'application/json;charset=UTF-8',
        // data: JSON.stringify(queryData),
        success: function (data) {
            $(".loading").fadeOut();
            if(data.resultCode == 0){
                if(data.result.total !== 0){
                    $(".background_remind").hide();
                    var listString = "";
                    var resData = data.result.res;
                    var defaultAry = [];
                    for (var i in resData) {
                        // 发票抬头 纳税识别号、开户行、银行账号 为null转为""
                        if(resData[i].taxIdentificationNumber == null){
                            resData[i].taxIdentificationNumber = ""
                        }
                        if(resData[i].openingBank == null){
                            resData[i].openingBank = ""
                        }
                        if(resData[i].bankAccount == null){
                            resData[i].bankAccount = ""
                        }

                        listString += '<li class="wrap">' +
                            '<p class="title"><i>'+ resData[i].name +'</i><span class="default" style="display: none">默认</span></p>' +
                            '<input type="hidden" value="'+ resData[i].id +'">' +
                            '<p class="seller Invoice_detail"><span>纳税识别号：</span>'+ resData[i].taxIdentificationNumber +'</p>' +
                            '<p class="seller Invoice_detail"><span>开户行：</span>'+ resData[i].openingBank +'</p>' +
                            '<p class="seller Invoice_detail"><span>银行账号：</span>'+ resData[i].bankAccount +'</p>' +
                            '</li>';

                        // console.log(i)
                        // 默认下标
                        if(resData[i].checkFlag == 1){
                            defaultAry.push(i)
                        }

                    }
                    $('#invoice_head').html(listString);
                    for(var d=0;d<defaultAry.length; d++){
                        $('#invoice_head li').eq(parseFloat(defaultAry[d])).children(".title").children(".default").show();
                    }

                    // 点击  -- 详情页面
                    $('#invoice_head li').click(function(){
                        var id = $(this).find("input").val();
                        window.location.href="personnel_invoice.html?id="+id+"&&from=1";
                    });
                } else {
                    $(".background_remind").show();
                }
            } else if(data.resultCode == -1){
                // 失败
                $("#promptContent").html(data.message);
                $(".Reminder").fadeToggle();
                $(".Reminder,.cancel").click(function(){
                    $(".Reminder").hide();
                });
            }
        }
    });

    // 发票抬头新建
    $(".shut").click(function(){
        window.location.href="personnel_invoice.html?from=2";
    });
    // $.ajax({
    //     url:sy()+'/feeInvoice/judgeUserPermission',
    //     type : 'GET',
    //     dataType: 'json',
    //     contentType : 'application/json;charset=UTF-8',
    //     // data: JSON.stringify(queryData),
    //     success: function (data) {
    //         // true  invoice.html  false 权限页面
    //         if(data){
    //             $(".content").show();
    //             // 我的发票
    //             $("#content_invoice").click(function(){
    //                 window.location.href="my_invoice.html";
    //             });

    //             // 发票抬头列表
    //             $.ajax({
    //                 url:sy()+'/feeInvoiceHeadingController/selectFeePersonnelInvoiceHeadingInformationList',
    //                 type : 'POST',
    //                 dataType: 'json',
    //                 contentType : 'application/json;charset=UTF-8',
    //                 // data: JSON.stringify(queryData),
    //                 success: function (data) {
    //                     $(".loading").fadeOut();
    //                     if(data.resultCode == 0){
    //                         if(data.result.total !== 0){
    //                             $(".background_remind").hide();
    //                             var listString = "";
    //                             var resData = data.result.res;
    //                             var defaultAry = [];
    //                             for (var i in resData) {
    //                                 // 发票抬头 纳税识别号、开户行、银行账号 为null转为""
    //                                 if(resData[i].taxIdentificationNumber == null){
    //                                     resData[i].taxIdentificationNumber = ""
    //                                 }
    //                                 if(resData[i].openingBank == null){
    //                                     resData[i].openingBank = ""
    //                                 }
    //                                 if(resData[i].bankAccount == null){
    //                                     resData[i].bankAccount = ""
    //                                 }

    //                                 listString += '<li class="wrap">' +
    //                                     '<p class="title"><i>'+ resData[i].name +'</i><span class="default" style="display: none">默认</span></p>' +
    //                                     '<input type="hidden" value="'+ resData[i].id +'">' +
    //                                     '<p class="seller Invoice_detail"><span>纳税识别号：</span>'+ resData[i].taxIdentificationNumber +'</p>' +
    //                                     '<p class="seller Invoice_detail"><span>开户行：</span>'+ resData[i].openingBank +'</p>' +
    //                                     '<p class="seller Invoice_detail"><span>银行账号：</span>'+ resData[i].bankAccount +'</p>' +
    //                                     '</li>';

    //                                 // console.log(i)
    //                                 // 默认下标
    //                                 if(resData[i].checkFlag == 1){
    //                                     defaultAry.push(i)
    //                                 }

    //                             }
    //                             $('#invoice_head').html(listString);
    //                             for(var d=0;d<defaultAry.length; d++){
    //                                 $('#invoice_head li').eq(parseFloat(defaultAry[d])).children(".title").children(".default").show();
    //                             }

    //                             // 点击  -- 详情页面
    //                             $('#invoice_head li').click(function(){
    //                                 var id = $(this).find("input").val();
    //                                 window.location.href="personnel_invoice.html?id="+id+"&&from=1";
    //                             });
    //                         } else {
    //                             $(".background_remind").show();
    //                         }
    //                     } else if(data.resultCode == -1){
    //                         // 失败
    //                         $("#promptContent").html(data.message);
    //                         $(".Reminder").fadeToggle();
    //                         $(".Reminder,.cancel").click(function(){
    //                             $(".Reminder").hide();
    //                         });
    //                     }
    //                 }
    //             });

    //             // 发票抬头新建
    //             $(".shut").click(function(){
    //                 window.location.href="personnel_invoice.html?from=2";
    //             });

    //         }else{
    //             window.location.href="travel_error.html";
    //         }
    //     }
    // });

    // 返回
    $(".return").click(function(){
        window.history.back();
    });
});
