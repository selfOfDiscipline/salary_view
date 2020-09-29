$(function  () {
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

    // 返回
    $(".return").click(function(){
        // window.history.back();
        window.location.href="my_invoice.html?returnUseStatus=" + $.getUrlParam('returnUseStatus');
    });

    var feedBackData;
    // 获取url参数
    (function($){
        $.getUrlParam = function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return unescape(r[2]);
            return null;
        }
    })(jQuery);

    // 公用Dom
    var detailStr = "";
    function publiced(dataList) {
        detailStr = '<div class="content">' +
            '<div class="theme Enclosure">'+ dataList.invoiceTypeName +'<span id="delectInvoice"  style="display: none">删除</span></div>' +
            '<ul class="details clearfix">' +
            '<li>开票方 <span class="slide_out_details"></span>' +
            '<input type="hidden" id="newlyAdded" value="'+ dataList.id +'">' +
            '<p>'+ dataList.salesName +'</p>' +
            '<ul class="toggleBox">' +
            '<li><span>纳税人识别号</span><p>'+ dataList.salesTaxpayerNum +'</p></li>' +
            '<li><span>地址电话</span><p  class="address_telephone">'+ dataList.salesTaxpayerAddress  +'</p></li>' +
            '<li><span>开户行账户</span><p  class="bank_account">'+ dataList.salesTaxpayerBankAccount +'</p></li>' +
            '</ul>' +
            '</li>' +
            '<li>收票方 <span class="slide_out_details"></span><p>'+ dataList.purchaserName +'</p>' +
            '<ul class="toggleBox">' +
            '<li><span>纳税人识别号</span><p>'+ dataList.taxpayerNumber +'</p></li>' +
            '<li><span>地址电话</span><p class="tax_telephone">'+ dataList.taxpayerAddressOrId +'</p></li>' +
            '<li><span>开户行账户</span><p class="tax_account">'+ dataList.taxpayerBankAccount +'</p></li>' +
            '</ul>' +
            '</li>' +
            '<li>开票日期 <p>'+ dataList.billingTime +'</p></li>' +
              // 1:invoiceDetailData、2:feeInvoiceItemVOList
            '<li>开票内容 <span class="slide_out_details"></span>' +
             '<ul class="toggleBox toggleBoxList"  id="invoice_contents">' +
             // '<li>金额<p>'+ sum +'</p></li>' +
             // '<li>税率<p>'+ taxRate +'</p></li>' +
             // '<li>税额<p>'+ tax +'</p></li>' +
             // '<li>货劳务名称<p>'+ goodserviceName +'</p></li>' +
             '</ul>' +
             '</li>' +
            '<li>发票代码 <p>'+ dataList.invoiceDataCode +'</p></li>' +
            '<li>发票号码 <p>'+ dataList.invoiceNumber +'</p></li><li>校验码 <p>'+ dataList.checkCode +'</p></li>' +
            '</ul>' +
            '<ul class="details clearfix">' +
            '<li>查验状态 <p class="Inspection" id="truthStatus"></p></li>' +
            '<li>备忘录<p><input type="text" class="disabledClass memorandum" placeholder="请输入要记录的内容" value="'+ dataList.invoiceRemarks +'"></p></li>' +
            '<li>所属系统' +
            /*'<p>' +
            '<input type="radio" name="pay" value="1" checked="checked"> 个人支付&nbsp;&nbsp;' +
            '<input type="radio" name="pay"  value="2"> 公司支付' +*/
            '<div class="male">' +
            '<input type="radio" id="male" name="pay" class="disabledClass" value="1"/><label for="male">费控系统</label>' +
            '</div>' +
            '<div class="female">' +
            '<input type="radio" id="female" name="pay" class="disabledClass" value="2"/><label for="female">成本系统</label>' +
            '</div>' +
           /* '</p>' +*/
            '</li>' +
        //    ' <li class="businessSystemClick">'+
        //         '所属业务'+
        //         '<span class="detailsLeft">'+
        //             '<span class="deta_val grade businessSystem">费控系统</span>'+
        //             '<img class="corners_right" src="../../img/corners_right.png">'+
        //         '</span>'+
        //     '</li>'+
        //     '<li>'+
        //         '所属业务'+
        //         '<div class="male">' +
        //         '<input type="radio"  name="pay" class="disabledClass"  value="2"/><label>费控系统</label>' +
        //         '</div>' +
        //         '<div class="female">' +
        //         '<input type="radio"  name="pay" class="disabledClass"   checked="checked" value="1"/><label>成本系统</label>' +
        //         '</div>' +
        //    ' </li>'+
            '<li>使用状态 <p id="useStatus"></p></li>' +
            '</ul>' +
            '</div>' +
            '<div class="content"><div class="Enclosure"  id="addEnclosure" style="font-size: .5rem;">附件<span class="add_theme"></span></div>' +
            '<ul class="enclosure_list">' +
            '<li id="noAttachment" style="display: none">暂无附件</li>' +
           /* '<li><span class="list_left"></span><p>client2018-07-26.doc</p><span  class="list_right"></span></li>' +
            '<li><span class="list_left"></span><p>760B2170-C024-48C8-AA760B2170-C024.doc</p><span  class="list_right"></span></li>' +*/
            '</ul>' +
            '</div>'+
            '<div class="btn_wrap"><div class="commit">保 存</div></div>';

        $("#container").append(detailStr);

        // 保存使用状态
        returnUseStatus = dataList.useStatus;

        // 隐藏，显示
        $(".slide_out_details").click(function(){
            $(this).siblings(".toggleBox").slideToggle();
            $(this).toggleClass("slide_in_details");
        });

        // 附件 添加附件有两种情况，1.从未添加过为"" ； 2.已存在  是字符串数组对象
        // 老数据存在为 null 的情况
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

        // 使用中，已使用都不能修改 ，没有附件添加和附件删除  状态0,1,2
        $(".disabledClass").attr("disabled",false);
        $(".btn_wrap").show();
        if(dataList.useStatus == 1 || dataList.useStatus == 2){
            $(".disabledClass").attr("disabled",true);
            $(".btn_wrap").hide();
            $(".add_theme").hide();
            $(".list_right").hide();

        } else {
            $("#addEnclosure").click(function(){
                addTheme();
            });
        }

    }

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

    // code切换字段
    function statusCode(dataList){
        if(dataList.truthStatus == 1){
            $("#truthStatus").html("成功");
        } else if(dataList.truthStatus == 2){
            $("#truthStatus").html("失败");
        } else if(dataList.truthStatus == 3){
            $("#truthStatus").html("已作废");
        }

        if(dataList.useStatus == 0){
            $("#useStatus").html("未使用");
        } else if(dataList.useStatus == 1){
            $("#useStatus").html("使用中");
        } else if(dataList.useStatus == 2){
            $("#useStatus").html("已使用");
        }
        
    }

    // 公用开票内容对象
    var contentString = "";
    var valList;
    function puplicList(valList, comeFrom){
        for (var val in valList) {
            // 百分率显示税率  本地数据库  税率需要处理（0.06） ； 2乐税直接赋值 （6%）
            var patt1 = new RegExp(/\s+/g);
            if (patt1.test(valList[val].taxRate)) {
                valList[val].taxRate = valList[val].taxRate.replace(/\s+/g,"");
            }else {
                valList[val].taxRate = valList[val].taxRate;
            }
            //    税率
            if(comeFrom == 2){
                if(valList[val].taxRate == ""){
                    valList[val].taxRate = '0.00'
                }else {
                    valList[val].taxRate = valList[val].taxRate;
                }
            } else {
                if(valList[val].taxRate ==  ""){
                    valList[val].taxRate = '0%'
                }else{
                    valList[val].taxRate = Number(valList[val].taxRate * 100) + "%";
                }
            }

            // 税额
            var patt1 = new RegExp(/\s+/g);
            if (patt1.test(valList[val].tax)) {
                valList[val].tax = valList[val].tax.replace(/\s+/g,"");
            }else {
                valList[val].tax = valList[val].tax;
            }
            if(valList[val].tax == "" || valList[val].tax == " "){
                valList[val].tax = "0";
            }else if(valList[val].tax == null){
                valList[val].tax = "0";
            }
            console.log(valList[val].goodserviceName);
            
            contentString += '<li class="Independent_Style">' +
                '<div>货劳务名称<p>'+ valList[val].goodserviceName +'</p></div>' +
                '<div>金额<p>'+ valList[val].sum +'</p></div>' +
                '<div>税率<p>'+ valList[val].taxRate +'</p></div>' +
                '<div>税额<p>'+ valList[val].tax +'</p></div>' +
                '</li>'
        }
        $("#invoice_contents").html(contentString);
    }

    if($.getUrlParam('from') == 1){ // 1列表页进入
        var idData = {
            id: $.getUrlParam('id')
        };

        $.ajax({
            url:sy()+'/feeInvoice/getFeeInvoiceInfoByIdAndNoteTaker',
            type : 'post',
            dataType: 'json',
            contentType : 'application/json;charset=UTF-8',
            data: JSON.stringify(idData),
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
                    })
                } else {
                    var dataList = data.result;
                    var invoiceRemarks =  dataList.invoiceRemarks == null ? "" : dataList.invoiceRemarks; 
                    dataList.invoiceRemarks = invoiceRemarks;
                    publiced(dataList);
                    statusCode(dataList);
                    valList = dataList.invoiceDetailData;
                    puplicList(valList);

                    // 支付类型
                    if(dataList.paymentType == 1){
                        $("input:radio[name='pay']").prop('checked', false);
                        $("input:radio[name='pay'][value='1']").prop('checked', 'checked');
                    } else if(dataList.paymentType == 2){
                        $("input:radio[name='pay']").prop('checked', false);
                        $("input:radio[name='pay'][value='2']").prop('checked', 'checked');
                    }
                     // 支付类型
                    if(dataList.businessSystem == 1){
                        $("input:radio[name='pay']").prop('checked', false);
                        $("input:radio[name='pay'][value='1']").prop('checked', 'checked');
                    } else if(dataList.businessSystem == 2){
                        $("input:radio[name='pay']").prop('checked', false);
                        $("input:radio[name='pay'][value='2']").prop('checked', 'checked');
                    }
                    
                    // var typeSrcO = '<div class="rank_type">'+
                    //     '<h2>请选择所属业务</h2>'+
                    //     '<ul class="ranktype_ul">'+
                    //         '<li class="pitch">'+
                    //             '<div class="rankleft">'+
                    //                 '<h3 class="rankType">费控系统</h3>'+
                    //             '</div>'+
                    //             '<div class="rankright">'+
                    //                 '<img class="no_selected" src="../../img/selected.png">'+
                    //             '</div>'+
                    //         ' </li>'+
                    //         '<li>'+
                    //             '<div class="rankleft">'+
                    //                 '<h3>成本系统</h3>'+
                    //         ' </div>'+
                    //             '<div class="rankright">'+
                    //                 '<img class="no_selected" src="../../img/no_selected.png">'+
                    //             '</div>'+
                    //         '</li>'+
                    //     '</ul>'+
                    // '</div>'
                    // var typeSrcT = '<div class="rank_type">'+
                    //     '<h2>请选择所属业务</h2>'+
                    //     '<ul class="ranktype_ul">'+
                    //         '<li>'+
                    //             '<div class="rankleft">'+
                    //                 '<h3>费控系统</h3>'+
                    //         ' </div>'+
                    //             '<div class="rankright">'+
                    //                 '<img class="no_selected" src="../../img/no_selected.png">'+
                    //             '</div>'+
                    //         '</li>'+
                    //         '<li class="pitch">'+
                    //             '<div class="rankleft">'+
                    //                 '<h3 class="rankType"> 成本系统 </h3>'+
                    //             '</div>'+
                    //             '<div class="rankright">'+
                    //                 '<img class="no_selected" src="../../img/selected.png">'+
                    //             '</div>'+
                    //         ' </li>'+
                            
                    //     '</ul>'+
                    // '</div>'
                    // if(dataList.businessSystem == 1){
                    //     businessSystemText = '费控系统'
                    //     $(".rank_rgba").html(typeSrcO);
                    // }else{
                    //     businessSystemText = '成本系统';
                    //     $(".rank_rgba").html(typeSrcT);
                    // }
                    
                    // $('.businessSystem').html(businessSystemText);
                    // 删除发票
                    if(dataList.useStatus == 0){
                        $("#delectInvoice").show();
                        $("#delectInvoice").click(function(){
                            $(".delete_warn").fadeToggle();
                            $(".delete_warn,.cancel_delete").click(function(){
                                $(".delete_warn").hide();
                            });
                            $(".confirm_deletion").click(function(){
                                $.ajax({
                                    url:sy()+'/feeInvoice/deleteInvoiceNoteTakerByInvoiceId',
                                    type : 'POST',
                                    dataType: 'json',
                                    data: JSON.stringify(idData),
                                    xhrFields: {
                                        withCredentials: true    // 前端设置是否带cookie
                                    },
                                    contentType : 'application/json;charset=UTF-8',
                                    success: function (data) {
                                        if(data.resultCode == 0){// 成功
                                            // cueFrame(data.message);
                                            window.location.href="my_invoice.html";
                                        } else if(data.resultCode == -1){
                                            $("#promptContent").html(data.message);
                                            $(".Reminder").fadeToggle();
                                            $(".Reminder,.cancel").click(function(){
                                                $(".Reminder").hide();
                                            })
                                        }
                                    }
                                })
                            });
                        });
                    }

                    // 修改发票
                    $(".commit").click(function(){
                        var businessSystem = parseInt($("input[name='pay']:checked").val());
                        if( businessSystem !=1 && businessSystem !=2){
                            $("#promptContent").html('请选择所属系统！');
                            $(".Reminder").fadeToggle();
                        }else{
                            $(".loading").fadeIn();
                            // var businessSystemText = $('.businessSystem').html();
                            // var businessSystem = '';
                            // if(businessSystemText == '费控系统'){
                            //     businessSystem = 1
                            // }else{
                            //     businessSystem = 2
                            // }
                            // if( parseInt($("input[name='pay']:checked").val())){
                            // }
                            var modifyData = {
                                // "businessSystem":businessSystem,
                                "invoiceRemarks": $(".memorandum").val(),
                                "businessSystem":  parseInt($("input[name='pay']:checked").val()),
                                "fileNameUrl": JSON.stringify(source_fileNameUr_file), // 附件  添加单个附件 attachment_data 对象
                                "id": $.getUrlParam('id')
                            };
                            $.ajax({
                                url:sy()+'/feeInvoice/updateFeeInvoiceAndNoteTaker',
                                type : 'POST',
                                dataType: 'json',
                                xhrFields: {
                                    withCredentials: true    // 前端设置是否带cookie
                                },
                                data: JSON.stringify(modifyData),
                                contentType : 'application/json;charset=UTF-8',
                                success: function (data) {
                                    $(".loading").fadeOut();
                                    if(data.resultCode == 0){
                                        // 成功   杨婉君  报销申请逻辑页面跳转过来的  满足条件跳回
                                        var SecondUrl = localStorage.getItem("SecondUrl");
                                        if(SecondUrl == undefined && SecondUrl == null){
                                            window.location.href="my_invoice.html";
                                        }else{
                                            var invoiceId = data.result;
                                            var InvoiceId_code = new Object();
                                            InvoiceId_code[invoiceId] = dataList.invoiceTypeCode;
                                            localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
                                            localStorage.removeItem("SecondUrl");
                                            window.location.href = SecondUrl;
                                        }
                                    } else  if(data.resultCode == -1){
                                        // 失败
                                        $("#promptContent").html(data.message);
                                        $(".Reminder").fadeToggle();
                                        $(".Reminder,.cancel").click(function(){
                                            $(".Reminder").hide();
                                        })
                                    }
                                }
                            })
                        }
                        
                    });
                }
            }
        })
    } else if($.getUrlParam('from') == 2){// 2增值税进入
        if($.getUrlParam('invoiceCode') == 1){
            var queryData = {
                "invoiceDataCode": $.getUrlParam('invoiceDataCode'),
                "invoiceNumber": $.getUrlParam('invoiceNumber'),
                "billingTime": $.getUrlParam('billingTime'),
                "checkCode": $.getUrlParam('checkCode')// 校验码
            };
        } else if($.getUrlParam('invoiceCode') == 2) {
            var queryData = {
                "invoiceDataCode": $.getUrlParam('invoiceDataCode'),
                "invoiceNumber": $.getUrlParam('invoiceNumber'),
                "billingTime": $.getUrlParam('billingTime'),
                "totalAmount": $.getUrlParam('totalAmount')// 税价
            };
        }
        //add by lxf 20190124 sta
        var query_Url;
        var query_Data;
        //var quickResponse_Code = $.getUrlParam('quickResponseCode');
        var query_ContentType;
        if($.getUrlParam('quickResponseCode')){
            var quickResponse_Code = $.getUrlParam('quickResponseCode');
            query_Url =sy()+'/feeInvoiceForThirdApiByInvoiceQRCode';
            query_Data = {quickResponseCode:quickResponse_Code};
            query_ContentType = 'application/x-www-form-urlencoded';
        }else{
            query_Url = sy()+'/feeInvoiceForThirdApiByInvoiceCodeOrInvoiceNumber';
            query_Data = JSON.stringify(queryData);
            query_ContentType = 'application/json;charset=UTF-8';
        }
        //add by lxf 20190124 end

        // 增值税 -- 获取发票数据
        $.ajax({
            url:query_Url,
            type : 'POST',
            dataType: 'json',
            data: query_Data,
            xhrFields: {
                withCredentials: true    // 前端设置是否带cookie
            },
            contentType : query_ContentType,
            success: function (data) {// 次判断是判断查出来的数据是从数据库还是从乐税网
                $(".loading").fadeOut();
                if(data.resultCode == -1){ // -1:失败   1数据库成功invoiceDetailData ， 2 乐税成功feeInvoiceItemVOList
                    $("#promptContent").html(data.message);
                    $(".Reminder").fadeToggle();
                    $(".Reminder,.cancel").click(function(){
                        $(".Reminder").hide();
                    })
                } else {
                    // 新增乐税转JSON.parse     数据库调的不用转
                    var dataList;
                    if(data.resultCode == 2){
                        dataList = JSON.parse(data.result);
                    } else if(data.resultCode == 1){
                        dataList = data.result;
                    }
                    // console.log(data.result);
                    feedBackData = dataList;
                    publiced(dataList);
                    $(".memorandum").val(""); // 拼接字符串，为空格字符串，无法显示出placeholdle
                    if(data.resultCode == 1){// 为1表示从数据库查出来，用feeInvoiceItemVOList
                        valList = dataList.feeInvoiceItemVOList;
                        puplicList(valList, 1);
                        statusCode(dataList);
                    }else if(data.resultCode == 2){// 为2表示从乐税网查出来，用invoiceDetailData
                        valList = dataList.invoiceDetailData;
                        puplicList(valList, 2);
                        if(dataList.voidMark == 1){
                            $("#truthStatus").html("已作废");
                        } else {
                            $("#truthStatus").html("成功");
                        }
                        $("#useStatus").html("未使用");

                    }

                    // 新增发票
                    $(".commit").click(function(){
                        
                        var businessSystem = parseInt($("input[name='pay']:checked").val());
                        
                        if( businessSystem !=1 && businessSystem !=2){
                            
                            $("#promptContent").html('请选择所属系统！');
                            $(".Reminder").fadeToggle();
                        }else{
                            $(".loading").fadeIn();
                            if(data.resultCode == 1){// 为1表示从数据库查出来，那么新增只需要增4个属性
                                var newlyAdded = {
                                    "invoiceRemarks": $(".memorandum").val(),
                                    "businessSystem":  parseInt($("input[name='pay']:checked").val()),
                                    "fileNameUrl": JSON.stringify(source_fileNameUr_file), // 附件
                                    "id": parseInt($("input#newlyAdded").val())
                                };
                                console.log(newlyAdded);
                                
                                $.ajax({
                                    url:sy()+'/feeInvoice/updateFeeInvoiceAndNoteTaker',
                                    type : 'POST',
                                    dataType: 'json',
                                    data: JSON.stringify(newlyAdded),
                                    xhrFields: {
                                        withCredentials: true    // 前端设置是否带cookie
                                    },
                                    contentType : 'application/json;charset=UTF-8',
                                    success: function (data) {
                                        $(".loading").fadeOut();
                                        if(data.resultCode == 0){ 
                                            window.location.href="my_invoice.html";
                                            
                                            // 成功   杨婉君  报销申请逻辑页面跳转过来的  满足条件跳回
                                            // var SecondUrl = localStorage.getItem("SecondUrl");
                                            // if(SecondUrl == undefined && SecondUrl == null){
                                            //     
                                               
                                            // }else{
                                            //     var invoiceId = data.result;
                                            //     var InvoiceId_code = new Object();
                                            //     InvoiceId_code[invoiceId] = dataList.invoiceTypeCode;
                                            //     localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
                                            //     localStorage.removeItem("SecondUrl");
                                            //     window.location.href = SecondUrl;
                                            // }
                                        } else  if(data.resultCode == -1){
                                            // 失败
                                            $("#promptContent").html(data.message);
                                            $(".Reminder").fadeToggle();
                                            $(".Reminder,.cancel").click(function(){
                                                $(".Reminder").hide();
                                            })
                                        }
                                    }
                                })

                            }else if(data.resultCode == 2){// 为2表示从乐税网查出来，那么新增增全部内容
                                var newAry = feedBackData.invoiceDetailData;
                                delete feedBackData.invoiceDetailData;
                                // feedBackData.invoiceRemarks = $(".memorandum").val();
                                feedBackData.fileNameUrl = JSON.stringify(source_fileNameUr_file); // 附件
                                // feedBackData.businessSystem = parseInt($("input[name='pay']:checked").val());
                                feedBackData.voidMark =  parseFloat(feedBackData.voidMark);

                                for (var item in newAry) {
                                    
                                    if( newAry[item].taxRate.indexOf('%') ==-1){
                                        newAry[item].taxRate = newAry[item].taxRate+'%';
                                    }
                                    newAry[item].number = parseFloat(newAry[item].number);
                                    newAry[item].lineNum = parseFloat(newAry[item].lineNum);
                                    // newAry[item].taxRate = (parseFloat(newAry[item].taxRate)).toString();
                                }
                                var newlyAdded = {
                                    "feeInvoiceSaveVO": feedBackData,
                                    "feeInvoiceItemSaveVOList": newAry,
                                    "invoiceRemarks": $(".memorandum").val(),
                                    "businessSystem":  parseInt($("input[name='pay']:checked").val()),
                                };
                                var newly = JSON.stringify(newlyAdded);
                                $.ajax({
                                    url:sy()+'/feeInvoice/saveFeeInvoiceAndFeeInvoiceItemAndNoteTaker',
                                    type : 'POST',
                                    dataType: 'json',
                                    data: JSON.stringify(newlyAdded),
                                    xhrFields: {
                                        withCredentials: true    // 前端设置是否带cookie
                                    },
                                    contentType : 'application/json;charset=UTF-8',
                                    success: function (data) {
                                        $(".loading").fadeOut();
                                        if(data.resultCode == 0){ 
                                            window.location.href="my_invoice.html";
                                            // 成功   杨婉君  报销申请逻辑页面跳转过来的  满足条件跳回
                                            // var SecondUrl = localStorage.getItem("SecondUrl");
                                            // if(SecondUrl == undefined && SecondUrl == null){
                                            //     window.location.href="my_invoice.html";
                                            // }else{
                                            //     var invoiceId = data.result;
                                            //     var InvoiceId_code = new Object();
                                            //     InvoiceId_code[invoiceId] = dataList.invoiceTypeCode;
                                            //     localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
                                            //     localStorage.removeItem("SecondUrl");
                                            //     window.location.href = SecondUrl;
                                            // }
                                        } else if(data.resultCode == -1){
                                            $("#promptContent").html(data.message);
                                            $(".Reminder").fadeToggle();
                                            $(".Reminder,.cancel").click(function(e){
                                                $(".Reminder").hide();
                                            })
                                        }
                                    }
                                })
                            }
                        }
                        
                        
                    });
                }
            },
            error:function(data){
                /*$("#promptContent").html();
                $(".Reminder").fadeToggle();
                $(".Reminder,.cancel").click(function(){
                    $(".Reminder").hide();
                })*/
            }
        });
    };

    //点击预算主体
	$('body').on('click', '.businessSystemClick',function(){
		$('.rank_rgba').show();
	});
	$('body').on('click','.ranktype_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankType'); 
		$(this).children('.rankleft').children('h3').addClass('rankType');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var businessSystem =$(this).children('.rankleft').children('.rankType').html();
		console.log(businessSystem,'!!!!!!!!!!!!!!~~~~')
		$('.businessSystem').html(businessSystem);
	})
	$('.rank_rgba').click(function(){
		$('.rank_rgba').hide();
    });
    $(".Reminder,.cancel").click(function(){
        $(".Reminder").hide();
    })
    // $(document).on('click','.businessSystemClick',function(){
    //     $('.rank_rgba').show();
    // })
});
