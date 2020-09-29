$(function(){
    // 保存附件源文件
    var source_fileNameUr_file = [];

    /*附件上传  start*/
    function addTheme(){
        if(window.WebViewJavascriptBridge){
            window.WebViewJavascriptBridge.callHandler(
                'MaxrockySelectFile',
                {'Url': 'http://testmpf.tahoecndemo.com:8080/1.0/testUpload'},
                function (responseData) {
                    console.log('来自Java的回传数据： ' + responseData);
                }
            );
        }
    }

    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(WebViewJavascriptBridge);
            }, false);
        }
    }

    connectWebViewJavascriptBridge(function (bridge) {
        bridge.init(function (message, responseCallback) {
            console.log('默认接收收到来自Java数据： ' + message);
            var responseData = '默认接收收到来自Java的数据，回传数据给你';
            responseCallback(responseData);
        });

        bridge.registerHandler("MaxrockySelectFileHandler", function (data, responseCallback) {
            console.log('指定接收收到来自Java数据： ' + data);
            log(data);
            var responseData = '指定接收收到来自Java的数据，回传数据给你';
            responseCallback(responseData);
        });
    });

    // 添加附件
    // 根据文件后缀加class  变换图片
    var changeSuffix = "png";
    function file_extension(changeFileName){
        var filename = changeFileName;
        var suffixIndex =  filename.lastIndexOf(".");
        var suffixName = filename.substring(suffixIndex);
        if(suffixName == ".png" || suffixName == ".jgp"){ // 图片
            changeSuffix = "png"
        }else if(suffixName == ".doc" ||suffixName == ".docx"){ // word
            changeSuffix = "doc"
        }else if(suffixName == ".xls" || suffixName == ".xlsx"){ // excel
            changeSuffix = "excel"
        }else if(suffixName == ".txt"){ // text
            changeSuffix = "txt"
        }else if(suffixName == ".ppt" || suffixName == ".pps" || suffixName == ".pptx"){ // PPT
            changeSuffix = "ppt"
        }
        return changeSuffix;
    }

    // 添加到附件列表   每次只能选一个文件
    var attachment_data;
    function log(data) {
        var result = JSON.parse(data);
        var enclosureList = '';
        if(result.msg == "ok"){
            // 暂无附件提示
            $("#noAttachment").hide();
            attachment_data = {"filename":result.filename , "url": result.url};
            // 动态添加class名
            changeSuffix = file_extension(result.filename);
            enclosureList = '<li class="show_lists"><span class="list_left  '+ changeSuffix +'"></span><p>'+ result.filename +'</p><input type="hidden" value="'+ result.url +'"><span  class="list_right"></span></li>';
        }
        $(".enclosure_list").append(enclosureList);
        source_fileNameUr_file.push(attachment_data);
        deleteAttachment();
    }

    /*附件上传  end*/
    $(".return").click(function(){
        // window.history.back();
        window.location.href="my_invoice.html?type=back&returnUseStatus=" + $.getUrlParam('returnUseStatus');
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

    // 点击删除图标 -- 删除附件
    function  deleteAttachment(){
        $("span.list_right").click(function(){
            // 数据index  !=  li的index ;  提示暂无附件占0
            var enclosure_Index = parseInt($(this).parents("li").index()) - 1;
            // 删除数据
            source_fileNameUr_file.splice(enclosure_Index , 1);
            // 页面li删除
            $(this).parents("li").remove();
            // 附件list删除完了  "暂无数据"提示显示
            if($(".enclosure_list .show_lists").length == 0){
                $("#noAttachment").show();
            } else {
                $("#noAttachment").hide();
            }
        });
    }

    // 火车票详情
    var idData = {
        id: $.getUrlParam('id')
    };
    $.ajax({
        url:sy()+'/feeInvoice/getFeeInvoiceInfoByIdAndNoteTaker',
        type : 'POST',
        dataType: 'json',
        contentType : 'application/json;charset=UTF-8',
        data: JSON.stringify(idData),
        success: function (data) {
            $(".loading").fadeOut();
            if(data.resultCode == 0){
                var dataList = data.result;
                dataList.invoiceDataCode =(dataList.invoiceDataCode).substring(0,(dataList.invoiceDataCode).length-12);
                var detailStr = "";
                detailStr = '<div class="content">' +
                    '<div class="theme Enclosure">'+ dataList.invoiceTypeName +'<span id="delectInvoice"  style="display: none">删除</span></div>' +
                    '<ul class="details clearfix">' +
                    '<li>车次 <p><input type="text" class="sameStyle invoiceDataCode" placeholder="请输入" value="'+ dataList.invoiceDataCode +'"></p></li>' +
                    '<li>乘车人 <p><input type="text" class="sameStyle invoiceNumber" placeholder="请输入" value="'+ dataList.invoiceNumber +'"></p></li>' +
                    '<li>出发地 <p><input type="text" class="sameStyle departure" placeholder="请输入" value="'+ dataList.departure +'"></p></li>' +
                    '<li>目的地 <p><input type="text" class="sameStyle destination" placeholder="请输入" value="'+ dataList.destination +'"></p></li>' +
                    '<li>发车日期 <p><input type="text" id="departure_date" class="sameStyle billingTime" placeholder="请输入" value="'+ dataList.billingTime +'"></p></li>' +
                    '<li>票价 <p><input type="text" class="sameStyle totalAmount" placeholder="请输入" value="'+ dataList.totalAmount +'"></p></li>' +
                    '<li>备忘录<p><input type="text" class="sameStyle memorandum" placeholder="请输入要记录的内容" value="'+dataList.invoiceRemarks+'"></p></li>' +
                    '<li>支付类型' +
                    '<div class="male">' +
                    '<input type="radio" id="male" name="pay"  value="2" disabled/><label for="male">公司支付</label>' +
                    '</div>' +
                    '<div class="female">' +
                    '<input type="radio" id="female" name="pay"  checked="checked" value="1" disabled/><label for="female">个人支付</label>' +
                    '</div>' +
                    '</li>' +
                    '</ul>' +
                    '<div class="content"><div class="Enclosure"  id="addEnclosure"  style="font-size: .5rem;">附件<span class="add_theme"></span></div>' +
                    '<ul class="enclosure_list">' +
                    '<li  id="noAttachment" style="display: none">暂无附件</li>' +
                   /* '<li><span class="list_left"></span><p>client2018-07-26.doc</p><span  class="list_right"></span></li>' +
                    '<li><span class="list_left"></span><p>760B2170-C024-48C8-AA760B2170-C024.doc</p><span  class="list_right"></span></li>' +*/
                    '</ul>' +
                    '</div>' +
                    '<div class="btn_wrap"><div class="commit">保 存</div></div>';
                $("#container").append(detailStr);

                $("#addEnclosure").click(function(){
                    addTheme();
                });

                // 附件
                if(dataList.fileNameUrl == "" || dataList.fileNameUrl == null){
                    dataList.fileNameUrl = "[]"
                }

                var fileNameUrlData = JSON.parse(dataList.fileNameUrl);

                if(fileNameUrlData.length == 0){
                    $("#noAttachment").show();
                } else {
                    $("#noAttachment").hide();
                    var enclosureStr = "";
                    for(var files in fileNameUrlData){
                        if (fileNameUrlData.hasOwnProperty(files)){
                            changeSuffix = file_extension(fileNameUrlData[files].filename);
                            enclosureStr +=  '<li class="show_lists"><span class="list_left  '+ changeSuffix +'"></span><p>'+ fileNameUrlData[files].filename +'</p><input type="hidden" value="'+ fileNameUrlData[files].url +'"><span  class="list_right"></span></li>';
                        }
                    }
                    $(".enclosure_list").append(enclosureStr);

                    // 添加附件 1.不变动附件 ； 2.手动添加 push attachment_data ；3.手动删除 ； 4.既添加，有删除
                    source_fileNameUr_file = source_fileNameUr_file.concat(fileNameUrlData);
                    deleteAttachment();
                }

                // 使用中，未使用都不能修改  没有删除添加附件附件，
                if(dataList.useStatus == 0){
                    $("#delectInvoice").show();
                    $(".sameStyle").attr("disabled",false);
                    $(".btn_wrap").show();
                    $("#addEnclosure").click(function(){
                        addTheme();
                    });
                } else if(dataList.useStatus == 1 || dataList.useStatus == 2){
                    $(".sameStyle").attr("disabled",true);
                    $(".btn_wrap").hide();
                    $(".add_theme").hide();
                    $(".list_right").hide();
                }

                // 开票日期
                var theme = "ios";
                var mode = "scroller";
                var display = "bottom";
                var lang="zh";
                var currYear = (new Date()).getFullYear();
                //开始时间

                $('#departure_date').mobiscroll().date({
                    theme: theme,
                    mode: mode,
                    display: display,
                    lang: lang,
                    dateFormat:"yy-mm-dd"
                });

                // 删除火车票
                $("#delectInvoice").click(function() {
                    $(".delete_warn").fadeToggle();
                    $(".delete_warn,.cancel_delete").click(function () {
                        $(".delete_warn").hide();
                    });
                    $(".confirm_deletion").click(function(){
                        $.ajax({
                            url:sy()+'/feeInvoice/deleteInvoiceNoteTakerByInvoiceId',
                            type : 'POST',
                            dataType: 'json',
                            data: JSON.stringify(idData),
                            contentType : 'application/json;charset=UTF-8',
                            success: function (data) {
                                if(data.resultCode == 0){// 成功
                                    window.location.href="my_invoice.html";
                                } else if(data.resultCode == -1){
                                    $("#promptContent").html(data.message);
                                    $(".Reminder").fadeToggle();
                                    $(".Reminder,.cancel").click(function(e){
                                        $(".Reminder").hide();
                                    })
                                }
                            }
                        })
                    });
                });

                // 修改发票
                $(".commit").click(function(){
                    $(".loading").fadeIn();
                    var invoiceDataCode = $(".invoiceDataCode").val();
                    var invoiceNumber = $(".invoiceNumber").val();
                    var departure = $(".departure").val();
                    var destination = $(".destination").val();
                    var billingTime = $(".billingTime").val();
                    var totalAmount = $(".totalAmount").val();

                    if(invoiceDataCode !== "" && invoiceNumber !== "" && departure !== "" && destination !== "" && billingTime !== "" && totalAmount !== ""){
                        var modifyData = {
                            "invoiceDataCode": invoiceDataCode,
                            "invoiceNumber": invoiceNumber,
                            "departure": departure,
                            "destination": destination,
                            "billingTime": billingTime,
                            "totalAmount": totalAmount,
                            "invoiceRemarks": $(".memorandum").val(),
                            "paymentType":  parseInt($("input[name='pay']:checked").val()),
                            "fileNameUrl": JSON.stringify(source_fileNameUr_file), // 附件
                            "id": $.getUrlParam('id'),
                            "invoiceTypeCode": "99"
                        };
                        $.ajax({
                            url:sy()+'/feeInvoice/updateFeeInvoiceAndNoteTaker',
                            type : 'POST',
                            dataType: 'json',
                            data: JSON.stringify(modifyData),
                            contentType : 'application/json;charset=UTF-8',
                            success: function (data) {
                                $(".loading").fadeOut();
                                if(data.resultCode == 0){
                                    // 成功
                                    window.location.href="my_invoice.html";
                                } else  if(data.resultCode == -1){
                                    // 失败
                                    $("#promptContent").html(data.message);
                                    $(".Reminder").fadeToggle();
                                    $(".Reminder,.cancel").click(function(e){
                                        $(".Reminder").hide();
                                    })
                                }
                            }
                        })
                    } else {
                        $("#promptContent").html("项目未填写完整！");
                        $(".Reminder").fadeToggle();
                        $(".Reminder,.cancel").click(function(){
                            $(".Reminder").hide();
                        });
                    }
                });
            } else if(data.resultCode == -1){
                $("#promptContent").html(data.message);
                $(".Reminder").fadeToggle();
                $(".Reminder,.cancel").click(function(e){
                    $(".Reminder").hide();
                })
            }
        }
    });
});
