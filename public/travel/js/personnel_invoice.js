$(function () {
    $(".loading").fadeOut();

    $(".return").click(function(){
        history.back();
    });
    var marTop = $("#sure").offset().top;
    // console.log(marTop)
    var parMarTop = $("#sure").parents().offset().top;
    // console.log(parMarTop)

    // 安卓，ios 兼容问题
    var oHeight = $(document).height(); //浏览器当前的高度
    $(window).resize(function(){
        if($(document).height() < oHeight){
            var marTop = $("#sure").offset().top;
            var parMarTop = $("#sure").parents().offset().top;
            var difference_value = marTop - parMarTop;
            $("#sure").css({"position":"static","margin-top":difference_value});

        }else{
            $("#sure").css("position","absolute");
        }
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

    // 去掉字符串所有空格   新增保存时验证
    function Trim(str,is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g"){
            result = result.replace(/\s/g,"");
        }
        return result;
    }
    // Trim(shipSpaceString,"g");

    var checkFlag;
    if($.getUrlParam('from') == 1){// 1列表页进入
        // 按钮取消
        $("#deleteInvoiceHead").toggle();
        $("#sure").toggle();
        $("#searchInput").attr("disabled","disabled");
        $("#searchInput").css({"border":"none","background-color":"#FFF"});
        var queryData = {
            "id": parseInt($.getUrlParam('id'))
        };
        $.ajax({
                url:sy()+'/feeInvoiceHeadingController/getFeePersonnelInvoiceHeadingById',
                type : 'POST',
                dataType: 'json',
                contentType : 'application/json;charset=UTF-8',
                data: JSON.stringify(queryData),
                success: function (data) {
                    if(data.resultCode == 0){
                        $("#searchInput").val(data.result.name);
                        $("#tax").html(data.result.taxIdentificationNumber);
                        $("#openBank").html(data.result.openingBank);
                        $("#bankAccount").html(data.result.bankAccount);
                        $("#licenseAddress").html(data.result.businessLicenseAddress);
                        $("#officeTelephone").html(data.result.headOfficeTelephone);

                        // 回显是否默认  原始数据为null,以新数据为准
                        checkFlag = data.result.checkFlag;
                        var flag = true;
                        if(checkFlag == 1){
                            $(".checkButton").animate({left:"23px"});
                            $("#checkFlag").addClass("checkBoxChange");
                            flag = true
                        }else if(checkFlag == 2){
                            $(".checkButton").animate({left:"5px"});
                            $("#checkFlag").removeClass("checkBoxChange");
                            flag = false
                        }

                        // 点击默认状态   先确认状态再开始
                        $("#checkFlag").click(function(){
                            if(flag){
                                $(".checkButton").animate({left:"5px"});
                                $(this).removeClass("checkBoxChange");
                                checkFlag = 2;
                                flag = false
                            } else {
                                $(".checkButton").animate({left:"23px"});
                                $(this).addClass("checkBoxChange");
                                checkFlag = 1;
                                flag = true
                            }

                            // 调抬头默认显示接口
                            checkFlagChange(checkFlag)
                        });

                        //  删除
                        $("#deleteInvoiceHead").click(function () {
                            $(".delete_warn").fadeToggle();
                            $(".delete_warn,.cancel_delete").click(function(){
                                $(".delete_warn").hide();
                            });
                            $(".confirm_deletion").click(function(){
                                var deleteData =  {
                                    "id" : parseInt(data.result.id)
                                };
                                $.ajax({
                                    url:sy()+'/feeInvoiceHeadingController/deleteFeePersonnelInvoiceHeadingById',
                                    type : 'POST',
                                    dataType: 'json',
                                    //contentType : 'application/json;charset=UTF-8',
                                    data: deleteData,
                                    success: function (data) {
                                        if(data.resultCode == 0){
                                            window.location.href="invoice.html";
                                        } else  if(data.resultCode == -1){
                                            $("#promptContent").html(data.message);
                                            $(".Reminder").fadeToggle();
                                            $(".Reminder,.cancel").click(function(e){
                                                $(".Reminder").hide();
                                            })
                                        }
                                    }
                                });
                            });
                        });
                    } else  if(data.resultCode == -1){
                        $("#promptContent").html(data.message);
                        $(".Reminder").fadeToggle();
                        $(".Reminder,.cancel").click(function(e){
                            $(".Reminder").hide();
                        })
                    }
                }
        });
    } else if($.getUrlParam('from') == 2){ // 新建进入
        $("#searchInput").removeAttr("disabled");
        // 联想数据/associationRow
        var resData;
        var associationRow;

        // 获取联想数据
        $.ajax({
            url:sy()+'/feeInvoiceHeadingController/selectFeeInvoiceHeadingInformationList',
            type : 'GET',
            dataType: 'json',
            contentType : 'application/json;charset=UTF-8',
            // data: JSON.stringify(queryData),
            success: function (data) {
                if(data.resultCode == 0){
                    if(data.result.total !== 0){
                        resData = data.result.res;
                        $("#searchInput").autocomplete(resData, {
                            max: 9999,    //列表里的条目数
                            minChars: 0,    //自动完成激活之前填入的最小字符
                            width: $("#searchInput").width()+1,     //提示的宽度，溢出隐藏
                            scrollHeight: 220,   //提示的高度，溢出显示滚动条
                            matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
                            autoFill: false,    //自动填充
                            formatItem: function(row, i, max) {
                                return row.name;
                            },
                            formatMatch: function(row, i, max) {
                                return row.name;
                            },
                            formatResult: function(row) {
                                return row.name;
                            }
                        }).result(function(event, row, formatted) {
                            associationRow = row;
                            console.log(associationRow)
                            $("#tax").html(row.taxIdentificationNumber);
                            $("#openBank").html(row.openingBank);
                            $("#bankAccount").html(row.bankAccount);
                            $("#licenseAddress").html(row.businessLicenseAddress);
                            $("#officeTelephone").html(row.headOfficeTelephone);

                            // return associationRow;
                        });
                    } else {
                        $("#promptContent").html("联想数据为空，无法新增数据！");
                        $(".Reminder").fadeToggle();
                        $(".Reminder,.cancel").click(function(e){
                            $(".Reminder").hide();
                        })
                    }
                } else if(data.resultCode == -1){
                    // 失败
                    $("#promptContent").html("联想数据异常，无法新增数据！");
                    $(".Reminder").fadeToggle();
                    $(".Reminder,.cancel").click(function(e){
                        $(".Reminder").hide();
                    })
                }
            }
        });

        // 新增   是否默认
        var newlyFlag = true;
        checkFlag = 2;
        $("#checkFlag").click(function(){
            if(newlyFlag){
                $(".checkButton").animate({left:"23px"});
                $(this).addClass("checkBoxChange");
                checkFlag = 1;
                newlyFlag = false
            } else {
                $(".checkButton").animate({left:"5px"});
                $(this).removeClass("checkBoxChange");
                checkFlag = 2;
                newlyFlag = true
            }
        });

        // 保存
        var companyFlag;
        $("#sure").click(function(){
            $(".loading").fadeIn();
            companyFlag = false;
            // 验选择的公司是否存在    input 输入框去除空格
            var comNameVal = Trim($("#searchInput").val(),"g");
            for(var item in resData){
                var companyName = Trim(resData[item].name,"g");
                if(companyName == comNameVal){
                    companyFlag = true
                }
            }

            if(companyFlag){
                associationRow.checkFlag = checkFlag;
                $.ajax({
                    url:sy()+'/feeInvoiceHeadingController/saveFeePersonnelInvoiceHeading',
                    type : 'POST',
                    dataType: 'json',
                    contentType : 'application/json;charset=UTF-8',
                    data: JSON.stringify(associationRow),
                    success: function (data) {
                        $(".loading").fadeOut();
                        if(data.resultCode == 0){
                            window.location.href="invoice.html";
                        } else if(data.resultCode == -1){
                            $("#promptContent").html(data.message);
                            $(".Reminder").fadeToggle();
                            $(".Reminder,.cancel").click(function(e){
                                $(".Reminder").hide();
                            })
                        } else if(data.resultCode == 9){
                            $("#promptContent").html("该发票抬头已存在，请重新选择！");
                            $(".Reminder").fadeToggle();
                            $(".Reminder,.cancel").click(function(e){
                                $(".Reminder").hide();
                            })
                        }
                    }
                });
            } else {
                $("#promptContent").html("请搜索并选择列表中的公司！");
                $(".Reminder").fadeToggle();
                $(".Reminder,.cancel").click(function(e){
                    $(".Reminder").hide();
                    $(".loading").fadeOut();
                })
            }
        });

    }

    /*是否默认   默认传2 灰色，选中为红色是1*/
    function checkFlagChange(checkFlag){
        var checkFlagData = {
            "id": parseInt($.getUrlParam('id')),
            "checkFlag": checkFlag // int
        };
        $.ajax({
            url:sy()+'/feeInvoiceHeadingController/updatePersonnelInvoiceHeadingCheck',
            type : 'POST',
            dataType: 'json',
            contentType : 'application/json;charset=UTF-8',
            data: JSON.stringify(checkFlagData),
            success: function (data) {
                if(data.resultCode == 0){ // 0:成功;-1:失败;
                    $("#promptContent").html(data.message);
                    $(".Reminder").fadeToggle();
                    $(".Reminder,.cancel").click(function(e){
                        $(".Reminder").hide();
                    });
                    window.location.href="invoice.html";
                } else  if(data.resultCode == -1){}
            }
        });
    }

});
