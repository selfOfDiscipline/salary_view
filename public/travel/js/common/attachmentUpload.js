	//	构造一个含有目标参数的正则表达式对象uuId
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r!=null) return unescape(r[2]);
		return null; //返回参数值
	} 
	// 提示弹框
    function cueFrame(message){
        $("#promptContent").html(message);
        $(".Reminder").fadeToggle();
    }
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
	//	时间初始化
	function TimeInit(el){
   		var theme = "ios";
	    var mode = "scroller";
	    var display = "bottom";
	    var lang="zh";
		var currYear = (new Date()).getFullYear();
	    el.mobiscroll().datetime({
	    	theme: theme,
	        mode: mode,
	        display: display,
	        lang: lang,
	        dateFormat:"yy-mm-dd"
	    });
   	};
	//	var date = new Date();
	//	var year = date.getFullYear();
	//	var month = date.getMonth() + 1;
	//	var day = date.getDate();
	//	var hours = date.getHours();
	//	var minutes = date.getMinutes(); 
	//	var seconds = date.getSeconds(); 
	//	var Datenew = year +'-'+ Appendzero(month) +'-'+ Appendzero(day)
	//	var onlyDate = year +'-'+ Appendzero(month) +'-'+ Appendzero(day) +' '+ Appendzero(hours) +':'+ Appendzero(minutes) ;

	// 保存附件源文件
	var source_fileNameUr_file = [];
	// 扫码添加
	/*扫码 start*/
	function callbackFun(){
		 window.onerror = function(err) {
	        log('window.onerror: ' + err)
	    };
	    
	    function connectWebViewJavascriptBridge(callback) {
	        if (window.WebViewJavascriptBridge) {
	            callback(WebViewJavascriptBridge)
	        } else {
	            document.addEventListener('WebViewJavascriptBridgeReady', function() {
	                callback(WebViewJavascriptBridge)
	            }, false)
	        }
	    }

	    connectWebViewJavascriptBridge(function(bridge) {
	        var uniqueId = 1
	        function log(message, data) {
	            var log = document.getElementById('log')
	            var el = document.createElement('div')
	            el.className = 'logLine'
	            el.innerHTML = uniqueId++ + '. ' + message + (data ? ':<br/>' + JSON.stringify(data) : '')
	            if (log.children.length) { log.insertBefore(el, log.children[0]) }
	            else { log.appendChild(el) }
	        }

	        bridge.init(function(message, responseCallback) {
	            log('JS got a message', message)
	            var data = { 'Javascript Responds':'Wee!' }
	            log('JS responding with', data)
	            responseCallback(data)
	        })

	        // 直接打开扫描结果
	        var callbackButton_scanQRCode1 = document.getElementById('button_scanQRCode1');
	        callbackButton_scanQRCode1 .onclick = function(e) {
	            e.preventDefault();
	            bridge.callHandler('scanQRCode', {'scan_type': 0}, function(response) {
	            });
	        };
	    });
	}
	/*扫码  end*/
   
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
	}
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
//		alert(data)
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
	};
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
    };
    var off = false;
    //	出行  用车 飞机初始化请求
    var flag = true;
    var PlaneData 
    inItPlane()
	function inItPlane(){
    	var settingType = '0,1,2,3,4';
		$.ajax({
			url: sy + 'travelapplication/getUserTravelStandard/'+ settingType ,
			type : 'GET',
			dataType: 'json',
	        success: function (data) {
	        	console.log(data);
	        	if(data.resultCode == 0){
	        		PlaneData= data.result;
	        	}
	        }
	    })
	};
    function PlaneSttDom(){
    	 if (flag) {
	    	var stt=""
			if( PlaneData ){
				for (var y in PlaneData){
					stt+='<a href="javascript:;" class="genre genre_text genre_'+ [y] +'" id="genre_'+ [y] +'" uuid="'+ [y] +'">'+PlaneData[y] +'</a>';
				}
				$('.typeForm .detailsLeft').html(stt);
				$('.genre_0').show(); 
				$('.genre_0').siblings().css('display','none');
				$('.location').val($('.genre_0').html());
			}
	    	flag = false;
         }else {
             return;
         }
    }
//	function inItPlane(){
//		var settingType = '0,1,2,3,4';
//		$.ajax({
//			url: sy + 'travelapplication/getUserTravelStandard/'+ settingType ,
//			type : 'GET',
//			dataType: 'json',
//	        success: function (data) {
//	        	console.log(data);
//	        	if(data.resultCode == 0){
//	        		var result = data.result;
//	        		var stt=""
//	        		if(result){
//	        			for (var y in result){
//	        				stt+='<a href="javascript:;" class="genre genre_text genre_'+ [y] +'" id="genre_'+ [y] +'" uuid="'+ [y] +'">'+result[y] +'</a>';
//	        			}
//	        			for (var y=0;y<result.length;y++){
//	        				console.log(result[y])
//	        			}
//	        			$('.typeForm .detailsLeft').html(stt);
//	        			$('.genre_0').show(); 
//	        			$('.genre_0').siblings().css('display','none');
//	        			$('.location').val($('.genre_0').html());
//	        		}
//	        	}
//	        	off = true;
//	        	$(".loading").fadeOut();
//	        }
//	    })
//	}
	//	拼接明细字符 
	function DomstrFun(result,Id){
		var str="";
		var num = 1;
		for(var obj in result){
			var itemMoney = result[obj].itemMoney == null ? "" : result[obj].itemMoney;  
			var datailnum = parseInt(obj) +  num;
			var busTripDay = result[obj].businessTripDay == null ? "0" : result[obj].businessTripDay; 
//			var businessTripDay = Math.floor(busTripDay);
			var businessTripDay = busTripDay;
			str+='<div class="wrap" uuid="">'
				+'<p class="detail">出差明细 '+ datailnum +'</p>'
				+'<div class="content_bottom">'
					+'<div class="fewer clearfix">'
						+'<div class="few_left">'
							+'<div class="destination">'
								+'<span class="elapsedCity">'+ result[obj].startAddress+'</span> - <span class="finishCity">'+ result[obj].endAddress+'</span>'
							+'</div>'
							+'<div class="time_bom">'
								+'<span class="elapsedTime">'+ result[obj].startDate+'</span>至<span class="finishTime">'+ result[obj].endDate+'</span>'
							+'</div>'
						+'</div>'
						+'<div class="few_right">展开</div>'
					+'</div>'
					+'<ul class="details clearfix">'
						+'<li class="transportType_li">'
							+'<input type="hidden" name="" class="businessTripId" value="'+ Id + '">'
							+'<input type="hidden" name="itemList[0].id" class="selected_idVal" id="id" value="'+ result[obj].id +'">'
							+'<input type="hidden" name="itemList[0].transportType" class="selected_clickVal" value="'+ result[obj].transportType +'">'
							+'<span class="detailsLeft im_list selected_click">'
								if(result[obj].transportType == '1'){
									str+='<div class="payment payment_important" style="margin-left: 0;">'
        									+'<div class="pay_btn" id="pay_active"></div>'
    										+'<i>飞机</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>火车</i>'
    									+'</div>' 
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>酒店</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>打车</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>差补</i>'
    									+'</div>'
								};
								if(result[obj].transportType == '2'){
									str+='<div class="payment payment_important" style="margin-left: 0;">'
        								+'<div class="pay_btn"></div>'
    										+'<i>飞机</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn" id="pay_active"></div>'
    										+'<i>火车</i>'
    									+'</div>' 
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>酒店</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>打车</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>差补</i>'
    									+'</div>'
								};
								if(result[obj].transportType == '3'){
									str+='<div class="payment payment_important" style="margin-left: 0;">'
        								+'<div class="pay_btn"></div>'
    										+'<i>飞机</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>火车</i>'
    									+'</div>' 
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn" id="pay_active"></div>'
    										+'<i>酒店</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>打车</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>差补</i>'
    									+'</div>'
								};
								if(result[obj].transportType == '4'){
									$('.tripRoute').hide()
									str+='<div class="payment payment_important" style="margin-left: 0;">'
        								+'<div class="pay_btn"></div>'
    										+'<i>飞机</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>火车</i>'
    									+'</div>' 
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>酒店</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn" id="pay_active"></div>'
    										+'<i>打车</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>差补</i>'
    									+'</div>'
								}
								if(result[obj].transportType == '5'){
									$('.tripRoute').hide()
									str+='<div class="payment payment_important" style="margin-left: 0;">'
        								+'<div class="pay_btn"></div>'
    										+'<i>飞机</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>火车</i>'
    									+'</div>' 
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>酒店</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn"></div>'
    										+'<i>打车</i>'
    									+'</div>'
    									+'<div class="payment payment_important">'
    										+'<div class="pay_btn" id="pay_active"></div>'
    										+'<i>差补</i>'
    									+'</div>'
								}
							str+='</span>'
						+'</li>'
						if(result[obj].transportType == '4' || result[obj].transportType == '3'|| result[obj].transportType == '5'){
							str+='<li class="tripRoute" style="display:none">'
								+'<a href="javascript:;" class="trip_text">行程类型</a>'
								+'<input type="hidden" name="itemList[0].tripType" class="selected_clickTypeVal" value="'+ result[obj].tripType +'">'
								+'<span class="detailsLeft selected_clickType">'
									if(result[obj].tripType == 0 ){
										str+='<div class="payment">'
    										+'<div class="pay_btn" id="pay_activeType"></div>'
    										+'<i>单程</i>'
    									+'</div>'
    									+'<div class="payment">'
    										+'<div class="pay_btn"></div>'
    										+'<i>往返</i>'
    									+'</div>'
									}
    								if( result[obj].tripType == 1 ){
										str+='<div class="payment">'
    										+'<div class="pay_btn"></div>'
    										+'<i>单程</i>'
    									+'</div>'
    									+'<div class="payment">'
    										+'<div class="pay_btn" id="pay_activeType"></div>'
    										+'<i>往返</i>'
    									+'</div>'
									}
								str+='</span>'
							+'</li>'
						}else if(result[obj].transportType == '1'||result[obj].transportType == '2'||result[obj].transportType == '5'){
							str+='<li class="tripRoute">'
								+'<a href="javascript:;" class="trip_text">行程类型</a>'
								+'<input type="hidden" name="itemList[0].tripType" class="selected_clickTypeVal" value="'+ result[obj].tripType +'">'
								+'<span class="detailsLeft selected_clickType">'
									if(result[obj].tripType == 0 ){
										str+='<div class="payment">'
    										+'<div class="pay_btn" id="pay_activeType"></div>'
    										+'<i>单程</i>'
    									+'</div>'
    									+'<div class="payment">'
    										+'<div class="pay_btn"></div>'
    										+'<i>往返</i>'
    									+'</div>'
									}
    								if( result[obj].tripType == 1 ){
										str+='<div class="payment">'
    										+'<div class="pay_btn"></div>'
    										+'<i>单程</i>'
    									+'</div>'
    									+'<div class="payment">'
    										+'<div class="pay_btn" id="pay_activeType"></div>'
    										+'<i>往返</i>'
    									+'</div>'
									}
								str+='</span>'
							+'</li>'
						}
						if(result[obj].transportType == '5'){
							str+='<li class="typeForm clearfix" style="height: initial;display:none;">'
								if(result[obj].transportType == '1'){
									str+='<a href="javascript:;" class="type_text">飞机舱位</a>'
								}else if(result[obj].transportType == '2'){
									str+='<a href="javascript:;" class="type_text">车次坐席</a>'
								}else if(result[obj].transportType == '3'){
									str+='<a href="javascript:;" class="type_text">住宿类型</a>'
								}else if(result[obj].transportType == '4'){
									str+='<a href="javascript:;" class="type_text">用车类型</a>'
								}else if(result[obj].transportType == '5'){
									str+='<a href="javascript:;" class="type_text"></a>'
								}
								str+='<input type="hidden" name="itemList[0].businessTripLevel" class="location" value="'+ result[obj].businessTripLevel +'">'
								+'<span class="detailsLeft" style="width: 70%;text-align: right;line-height: .9rem;">'
								if(result[obj].transportType == '1'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0">'+ result[obj].businessTripLevel +'</a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_1"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_2"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_3"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_4"></a>'
								}else if(result[obj].transportType == '2'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_1">'+ result[obj].businessTripLevel +'</a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_2"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_3"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_4"></a>'
								}else if(result[obj].transportType == '3'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_1"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_2">'+ result[obj].businessTripLevel +'</a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_3"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_4"></a>'
								}else if(result[obj].transportType == '4'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_1"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_2"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_3">'+ result[obj].businessTripLevel +'</a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_4 "></a>'
								}else if(result[obj].transportType == '5'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_0">'+ result[obj].businessTripLevel +'</a>'
								}
								str+='</span>'
							+'</li>'
						}else{
							str+='<li class="typeForm clearfix" style="height: initial;">'
								if(result[obj].transportType == '1'){
									str+='<a href="javascript:;" class="type_text">飞机舱位</a>'
								}else if(result[obj].transportType == '2'){
									str+='<a href="javascript:;" class="type_text">车次坐席</a>'
								}else if(result[obj].transportType == '3'){
									str+='<a href="javascript:;" class="type_text">住宿类型</a>'
								}else if(result[obj].transportType == '4'){
									str+='<a href="javascript:;" class="type_text">用车类型</a>'
								}else if(result[obj].transportType == '5'){
									str+='<a href="javascript:;" class="type_text"></a>'
								}
								str+='<input type="hidden" name="itemList[0].businessTripLevel" class="location" value="'+ result[obj].businessTripLevel +'">'
								+'<span class="detailsLeft" style="width: 70%;text-align: right;line-height: .9rem;">'
								if(result[obj].transportType == '1'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0">'+ result[obj].businessTripLevel +'</a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_1"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_2"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_3"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_4"></a>'
								}else if(result[obj].transportType == '2'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_1">'+ result[obj].businessTripLevel +'</a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_2"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_3"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_4"></a>'
								}else if(result[obj].transportType == '3'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_1"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_2">'+ result[obj].businessTripLevel +'</a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_3"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_4"></a>'
								}else if(result[obj].transportType == '4'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_1"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_2"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_3">'+ result[obj].businessTripLevel +'</a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_4 "></a>'
								}else if(result[obj].transportType == '5'){
									str+='<a href="javascript:;" class="genre genre_text genre_0" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_1" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_2" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_3" id="genre_0"></a>'
										+'<a href="javascript:;" class="genre genre_text genre_4" id="genre_0">'+ result[obj].businessTripLevel +'</a>'
								}
								str+='</span>'
							+'</li>'
						}
						str+='<li class="housingCityShow">'
							if(result[obj].transportType == '3'){
								str+='<p class="housing"style="float: left;">住宿城市</p>'
							}else if(result[obj].transportType == '5'){
								str+='<p class="housing"style="float: left;">出差城市</p>'
							}else {
								str+='<p class="housing"style="float: left;">出发城市</p>'
							}
							if(result[obj].transportType == '2'){
								str+='<span class="detailsLeft departure_city">'
										+'<input type="text" name="itemList[0].startAddress" class="departmentName" value="'+ result[obj].startAddress +'" uuid="0">'
									+'</span>'
									+'<input type="hidden" name="itemList[0].startAddressid" class="departmentNameid" value="'+ result[obj].startAddressId +'">'
									+'<input type="hidden" name="" class="flightType departureCityFlightType"  value="'+ result[obj].departureCityFlightType +'">'
							}else if(result[obj].transportType == '3'||result[obj].transportType == '5'){
								str+='<span class="detailsLeft departure_city">'
										+'<input type="text" name="itemList[0].startAddress" class="departmentName" value="'+ result[obj].startAddress +'" uuid="'+ itemMoney/businessTripDay +'">'
									+'</span>'
									+'<input type="hidden" name="itemList[0].startAddressid" class="departmentNameid" value="'+ result[obj].startAddressId +'">'
									+'<input type="hidden" name="" class="flightType departureCityFlightType"  value="'+ result[obj].departureCityFlightType +'">'
							}else{
								str+='<span class="detailsLeft departure_city">'
										+'<input type="text" name="itemList[0].startAddress" class="departmentName" value="'+ result[obj].startAddress +'" readonly="readonly" uuid="0">'
									+'</span>'
									+'<input type="hidden" name="itemList[0].startAddressid" class="departmentNameid" value="'+ result[obj].startAddressId +'">'
									+'<input type="hidden" name="" class="flightType departureCityFlightType"  value="'+ result[obj].departureCityFlightType +'">'
							}
						str+='</li>'
						if(result[obj].transportType == '3'||result[obj].transportType == '5'){
							str+='<li class="housingCityHide" style="display:none;">'
								+'到达城市'
								+'<span class="detailsLeft departure_city">'
									+'<input type="text" name="itemList[0].endAddress" class="arriveName" value="'+ result[obj].endAddress+'" readonly="readonly">'
								+'</span>'
								+'<input type="hidden" name="itemList[0].startAddressid" class="departmentNameid" value="'+ result[obj].endAddressId+'">'
								+'<input type="hidden" name="" class="flightType arrivalCityFlightType"  value="'+ result[obj].arrivalCityFlightType +'">'
							+'</li>'
						} if(result[obj].transportType == '1'||result[obj].transportType == '4'){
							str+='<li class="housingCityHide">'
								+'到达城市'
								+'<span class="detailsLeft departure_city">'
									+'<input type="text" name="itemList[0].endAddress" class="arriveName" value="'+ result[obj].endAddress+'" readonly="readonly">'
								+'</span>'
								+'<input type="hidden" name="itemList[0].startAddressid" class="departmentNameid" value="'+ result[obj].endAddressId+'">'
								+'<input type="hidden" name="" class="flightType arrivalCityFlightType"  value="'+ result[obj].arrivalCityFlightType +'">'
							+'</li>'
						}else if(result[obj].transportType == '2'){
							str+='<li class="housingCityHide">'
								+'到达城市'
								+'<span class="detailsLeft departure_city">'
									+'<input type="text" name="itemList[0].endAddress" class="arriveName" value="'+ result[obj].endAddress+'">'
								+'</span>'
								+'<input type="hidden" name="itemList[0].startAddressid" class="departmentNameid" value="'+ result[obj].endAddressId+'">'
								+'<input type="hidden" name="" class="flightType arrivalCityFlightType"  value="'+ result[obj].arrivalCityFlightType +'">'
							+'</li>'
							
						}
						if(result[obj].transportType == '3'){
							str+='<li class="traveldays">'
								+'<p class="housing" style="float: left;">住宿天数</p>'
								+'<span style="width: 75%;"  class="detailsLeft">'
									+'<input type="number" name="itemList[0].traveldays" class="traveldaysVal" value="'+ result[obj].businessTripDay +'" placeholder="'+ result[obj].businessTripDay +'" onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"/>'
								+'</span>'
							+'</li>'
						}else if(result[obj].transportType == '5'){
							str+='<li class="traveldays">'
								+'<p class="housing" style="float: left;">差补天数</p>'
								+'<span style="width: 75%;"  class="detailsLeft">'
									+'<input type="number" name="itemList[0].traveldays" class="traveldaysVal" value="'+ result[obj].businessTripDay +'" placeholder="'+ result[obj].businessTripDay +'" onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"/>'
								+'</span>'
							+'</li>'
						}else{
							str+='<li class="traveldays" style="display:none;">'
								+'<p class="housing" style="float: left;">住宿天数</p>'
								+'<span style="width: 75%;"  class="detailsLeft">'
									+'<input type="number" name="itemList[0].traveldays" class="traveldaysVal" value="'+ result[obj].businessTripDay +'" placeholder="'+ result[obj].businessTripDay +'" onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"/>'
								+'</span>'
							+'</li>'
						}
						if(result[obj].transportType == '1'||result[obj].transportType == '2'){
							str+='<li class="timetog">'
								+'去程日期'
								+'<span class="detailsLeft">'
									+'<input type="text" class="timestartClass" name="itemList[0].startDate" class="detail_input datetimestart" readonly="readonly" value="'+ result[obj].startDate +'" style="border: none;text-align: right;"/>'
//									+'<img class="corners_right" src="../../img/corners_right.png">'
								+'</span>'
							+'</li>'
							if(result[obj].tripType == 0 ){
								str+='<li class="timetog timetogEnd" style="display:none">'
									+'返程日期'
									+'<span class="detailsLeft">'
									+	'<input type="text" class="timestartClass" class="detail_input1 datetimeend" name="itemList[0].endDate" readonly="readonly" value="'+ result[obj].endDate +'" style="border: none;text-align: right;"/>'
//										+'<img class="corners_right" src="../../img/corners_right.png">'
									+'</span>'
								+'</li>'
							}else if(result[obj].tripType == 1 ){
								str+='<li class="timetog timetogEnd" >'
									+'返程日期'
									+'<span class="detailsLeft">'
									+	'<input type="text" class="timestartClass" class="detail_input1 datetimeend" name="itemList[0].endDate" readonly="readonly" value="'+ result[obj].endDate +'" style="border: none;text-align: right;"/>'
//										+'<img class="corners_right" src="../../img/corners_right.png">'
									+'</span>'
								+'</li>'
							}
						}else if(result[obj].transportType == '4'||result[obj].transportType == '3'){
							str+='<li class="timetog" style="display:none">'
								+'去程日期'
								+'<span class="detailsLeft">'
									+'<input type="text" class="timestartClass" name="itemList[0].startDate" class="detail_input datetimestart" readonly="readonly" value="'+ result[obj].startDate +'" style="border: none;text-align: right;"/>'
//									+'<img class="corners_right" src="../../img/corners_right.png">'
								+'</span>'
							+'</li>'
							+'<li class="timetog timetogEnd" style="display:none">'
								+'返程日期'
								+'<span class="detailsLeft">'
								+	'<input type="text" class="timestartClass" class="detail_input1 datetimeend" name="itemList[0].endDate" readonly="readonly" value="'+ result[obj].endDate +'" style="border: none;text-align: right;"/>'
//									+'<img class="corners_right" src="../../img/corners_right.png">'
								+'</span>'
							+'</li>'
						}else if(result[obj].transportType == '5'){
							str+='<li class="timetog">'
								+'去程日期'
								+'<span class="detailsLeft">'
									+'<input type="text" class="timestartClass" name="itemList[0].startDate" class="detail_input datetimestart" readonly="readonly" value="'+ result[obj].startDate +'" style="border: none;text-align: right;"/>'
//									+'<img class="corners_right" src="../../img/corners_right.png">'
								+'</span>'
							+'</li>'
							+'<li class="timetog timetogEnd">'
								+'返程日期'
								+'<span class="detailsLeft">'
								    +'<input type="text" class="timestartClass" class="detail_input1 datetimeend" name="itemList[0].endDate" readonly="readonly" value="'+ result[obj].endDate +'" style="border: none;text-align: right;"/>'
//									+'<img class="corners_right" src="../../img/corners_right.png">'
								+'</span>'
							+'</li>'
						}
						if(result[obj].transportType == '4'){
							str+='<li class="particularMoney" style="display:none">'
								+'<p class="housing" style="float: left;">预估金额</p>'
								+'<span class="detailsLeft" style="width: 50%;">'
									+'<input type="text" onkeyup="onlyNumber(this)"  readonly="readonly" class="particularMoneyVal" value="'+ itemMoney +'" placeholder="0.00" style="width: 100%;border: none;text-align: right;color: #9B9B9B !important;font-size: .4rem;background: transparent;" >'
								+'</span>'
							+'</li>'
						}else if( result[obj].transportType == '2' ){
							str+='<li class="particularMoney">'
								+'<p class="housing" style="float: left;">车票预估金额</p>'
								+'<span class="detailsLeft" style="width: 50%;">'
									+'<input type="text" onkeyup="onlyNumber(this)" class="particularMoneyVal" value="'+ itemMoney +'" placeholder="0.00" style="width: 100%;border: none;text-align: right;color: #9B9B9B !important;font-size: .4rem;background: transparent;" >'
								+'</span>'
							+'</li>'
						}else{
							str+='<li class="particularMoney">'
							if(result[obj].transportType == '1'){
								str+='<p class="housing" style="float: left;">机票预估金额</p>'
							}else if(result[obj].transportType == '3'){
								str+='<p class="housing" style="float: left;">住宿预估金额</p>'
							}else if(result[obj].transportType == '5'){
								str+='<p class="housing" style="float: left;">差补金额</p>'
							}
							if(result[obj].departureCityFlightType == 2 || result[obj].arrivalCityFlightType == 2){
								str+='<span class="detailsLeft" style="width: 50%;">'
									+'<input type="text" onkeyup="onlyNumber(this)" class="particularMoneyVal" value="'+ itemMoney +'" placeholder="0.00" style="width: 100%;border: none;text-align: right;color: #9B9B9B !important;font-size: .4rem;background: transparent;" >'
								+'</span>'
							}else{
								str+='<span class="detailsLeft" style="width: 50%;">'
									+'<input type="text" onkeyup="onlyNumber(this)" readonly="readonly" unselectable="on" onfocus="this.blur()" class="particularMoneyVal" value="'+ itemMoney +'" placeholder="0.00" style="width: 100%;border: none;text-align: right;color: #9B9B9B !important;font-size: .4rem;background: transparent;"/>'
								+'</span>'
							}
							str+='</li>'
						}
						str+='<li class="pay">'
							+'支付方式'
							+'<input type="hidden" name="itemList[0].paymientType" class="selected_clickPayVal" value="'+ result[obj].paymentType +'">'
							+'<span class="detailsLeft selected_clickPay">'
								if(result[obj].paymentType == 0){
									str+='<div class="payment paypersonal">'
    										+'<div class="pay_btn " id="pay_activePay"></div>'
    										+'<i>个人垫付</i>'
    									+' </div>'
    									+'<div class="payment paycompany">'
    										+'<div class="pay_btn"></div>'
    										+'<i>公司支付</i>'
    								+'</div>'
								}else if(result[obj].paymentType == 1 ){
									str+='<div class="payment paypersonal">'
    										+'<div class="pay_btn"></div>'
    										+'<i>个人垫付</i>'
    									+' </div>'
    									+'<div class="payment paycompany">'
    										+'<div class="pay_btn" id="pay_activePay"></div>'
    										+'<i>公司支付</i>'
    								+'</div>'
								}
							str+='</span>'
						+'</li>'
						if(result[obj].departureCityFlightType == 2 || result[obj].arrivalCityFlightType == 2 && result[obj].transportType == 1){
							str+='<li class="protection">'
						       	+' 护照名'
						        +'<span class="detailsLeft" style="width:70%">'
						            +'<input type="text"  value="'+ result[obj].passportName +'" placeholder="例如:HAN/XUEFENG  (必填)" style="border:none;text-align:right;font-size:.4rem;width: 100%;"/>'
						        +'</span>'
						    +'</li>'
						}else{
							str+='<li class="protection" style="display:none">'
						       	+' 护照名'
						        +'<span class="detailsLeft" style="width:70%">'
						            +'<input type="text"  value="'+ result[obj].passportName +'" placeholder="例如:HAN/XUEFENG  (必填)" style="border:none;text-align:right;font-size:.4rem;width: 100%;"/>'
						        +'</span>'
						    +'</li>'
						}
						str+='<li class="remark">'
							+'备注'
							+'<span class="detailsLeft">'
								+'<input type="text" onfocus="inputFocus()" value="'+ result[obj].remarks +'"  placeholder="请填写备注"  style="border: none;text-align: right;font-size:.4rem;"/>'
							+'</span>'
						+'</li>'
						+'<div class="pack_up">收起明细</div>'
						+'<div class="cencal">删除明细</div>'
					+'</ul>'
				+'</div>'
			+'</div>'
			$('.content_wrap').html(str);
			transportType = result[obj].transportType
		}
	}
		
	//	点击选择飞机 火车 酒店 住宿 差补 traveldays
	function SelectiveType(){
		$('.content_wrap').on('click','.selected_click .payment_important',function(){
			PlaneSttDom();
			// 隐藏护照名
			$(this).parents('.transportType_li').siblings('.protection').hide();
			var that= $(this).parents('.transportType_li').siblings('.typeForm')
			var than= $(this).parents('.transportType_li').siblings('.tripRoute')
			var cityinit = $(this).parents('.transportType_li').siblings();
			$(this).children('.pay_btn').attr('id','pay_active');
			$(this).siblings().children('.pay_btn').removeAttr('id');
			var selected_clickVal = $(this).children('#pay_active').siblings('i').html();
			var tirptype = $(this).parents('.transportType_li').siblings('.tripRoute').find('input').val();
			console.log(selected_clickVal)
			if(selected_clickVal == '飞机'){
				$(this).parents('.transportType_li').siblings('.remark').val('');
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paypersonal').children('.pay_btn').removeAttr('id');
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paycompany').children('.pay_btn').attr('id','pay_activePay');
				$(this).parents('.transportType_li').siblings('.pay').children('.selected_clickPayVal').val('1');
				selected_clickVal = 1;
				that.children('.type_text').html('飞机舱位');
				that.children('.type_text').html('飞机舱位')
				than.show();
				$(this).parents('.transportType_li').siblings('.housingCityShow').children('.housing').html('出发城市');
				$(this).parents('.transportType_li').siblings('.particularMoney').show();
				$(this).parents('.transportType_li').siblings('.particularMoney').children('.housing').html('机票预估金额');
				that.find('#genre_0').show();
				that.find('#genre_0').siblings().hide();
				that.children('.location').val(that.find('#genre_0').html());
				$(this).parents('.transportType_li').siblings('.timetog').show();
//				$(this).parents('.transportType_li').siblings('.timetog').css("pointer-events","auto");
				if(tirptype == 0){
					$(this).parents('.transportType_li').siblings('.timetogEnd').hide();
				}else{	
					$(this).parents('.transportType_li').siblings('.timetogEnd').show();
				}
				$(this).parents('.transportType_li').siblings('.typeForm').show();
				cityinit.children().children('.arriveName').attr("readonly","readonly");
				
				cityinit.children().children('.arriveName').val('');
				cityinit.children().children('.arriveName').attr('placeholder',"请选择");
				cityinit.children().children('.departmentName').attr("readonly","readonly")
				
				cityinit.children().children('.departmentName').val('');
				cityinit.children().children('.departmentName').attr('placeholder',"请选择");	
				$(this).parents('.transportType_li').siblings('.housingCityHide').show();
//				$(this).parents('.transportType_li').siblings('.protection').hide();
				// 金额
				cityinit.children().children('.particularMoneyVal').attr("readonly","readonly");
				cityinit.children().children('.particularMoneyVal').attr('unselectable','no')
	    		cityinit.children().children('.particularMoneyVal').attr('onfocus','this.blur()')
				cityinit.children().children('.particularMoneyVal').val('');
				// 住宿天数
				$(this).parents('.transportType_li').siblings('.traveldays').hide();
				
			};
			if(selected_clickVal == '火车'){
				$(this).parents('.transportType_li').siblings('.protection').find('input').val('');
				$(this).parents('.transportType_li').siblings('.remark').find('input').val('');
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paypersonal').children('.pay_btn').attr('id','pay_activePay')
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paycompany').children('.pay_btn').removeAttr('id')
				$(this).parents('.transportType_li').siblings('.pay').children('.selected_clickPayVal').val('0');
				$(this).parents('.transportType_li').siblings('.housingCityShow').children('.housing').html('出发城市');
				$(this).parents('.transportType_li').siblings('.particularMoney').show();
				$(this).parents('.transportType_li').siblings('.particularMoney').children('.housing').html('车票预估金额');
				that.find('#genre_1').show();
				that.find('#genre_1').siblings().hide();
				that.children('.location').val(that.find('#genre_1').html());
				cityinit.children().children('.arriveName').removeAttr("readonly")
				
				cityinit.children().children('.arriveName').val('');
				cityinit.children().children('.arriveName').attr('placeholder',"请填写");
				cityinit.children().children('.departmentName').removeAttr("readonly");
			
				cityinit.children().children('.departmentName').val('');
				cityinit.children().children('.departmentName').attr('placeholder',"请填写");
				$(this).parents('.transportType_li').siblings('.timetog').show();
//				$(this).parents('.transportType_li').siblings('.timetog').css("pointer-events","auto");
				if(tirptype == 0){
					$(this).parents('.transportType_li').siblings('.timetogEnd').hide();
				}else{
					$(this).parents('.transportType_li').siblings('.timetogEnd').show();
				}
				$(this).parents('.transportType_li').siblings('.typeForm').show();
				$(this).parents('.transportType_li').siblings('.housingCityHide').show();
				//金额
				cityinit.children().children('.particularMoneyVal').removeAttr("readonly");
				cityinit.children().children('.particularMoneyVal').removeAttr('unselectable')
	    		cityinit.children().children('.particularMoneyVal').removeAttr('onfocus')
				cityinit.children().children('.particularMoneyVal').val('')
				selected_clickVal = 2;
				that.children('.type_text').html('车次坐席');
				than.show();
				// 住宿天数
				$(this).parents('.transportType_li').siblings('.traveldays').hide();
			};
			if(selected_clickVal == '酒店'){
				$(this).parents('.transportType_li').siblings('.remark').find('input').val('');
				$(this).parents('.transportType_li').siblings('.protection').find('input').val('');
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paypersonal').children('.pay_btn').attr('id','pay_activePay')
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paycompany').children('.pay_btn').removeAttr('id');
				$(this).parents('.transportType_li').siblings('.pay').children('.selected_clickPayVal').val('0');
				selected_clickVal = 3;
				that.find('#genre_2').show();
				that.find('#genre_2').siblings().hide();
				that.children('.type_text').html('住宿类型')
				than.hide();
				that.children('.location').val(that.find('#genre_2').html());
				$(this).parents('.transportType_li').siblings('.housingCityShow').children('.housing').html('住宿城市')
				$(this).parents('.transportType_li').siblings('.particularMoney').show();
				$(this).parents('.transportType_li').siblings('.particularMoney').children('.housing').html('住宿预估金额');
				cityinit.children().children('.arriveName').removeAttr("readonly");
				cityinit.children().children('.arriveName').val('');
//				cityinit.children().children('.arriveName').attr('placeholder',"请选择");
				cityinit.children().children('.departmentName').removeAttr("readonly");
				cityinit.children().children('.departmentName').val('请选择');
				cityinit.children().children('.departmentName').attr('placeholder',"请选择");
				$(this).parents('.transportType_li').siblings('.timetog').hide();
				$(this).parents('.transportType_li').siblings('.typeForm').show();
				$(this).parents('.transportType_li').siblings('.housingCityHide').hide();
				//金额
				cityinit.children().children('.particularMoneyVal').attr("readonly","readonly");
				cityinit.children().children('.particularMoneyVal').attr('unselectable','no')
	    		cityinit.children().children('.particularMoneyVal').attr('onfocus','this.blur()')
				cityinit.children().children('.particularMoneyVal').val('');
				// 住宿天数
				$(this).parents('.transportType_li').siblings('.traveldays').show();
				$(this).parents('.transportType_li').siblings('.traveldays').find('p').html('住宿天数');
//				$(this).parents('.transportType_li').siblings('.traveldays').find('input').val('');
			};
			if(selected_clickVal == '打车'){
				$(this).parents('.transportType_li').siblings('.remark').find('input').val('');
				$(this).parents('.transportType_li').siblings('.protection').find('input').val('');
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paypersonal').children('.pay_btn').removeAttr('id');
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paycompany').children('.pay_btn').attr('id','pay_activePay')
				$(this).parents('.transportType_li').siblings('.pay').children('.selected_clickPayVal').val('1');
				$(this).parents('.transportType_li').siblings('.housingCityShow').children('.housing').html('出发城市')
				selected_clickVal = 4;
				that.children('.type_text').html('用车类型')
				than.hide();
				that.find('#genre_3').show();
				that.find('#genre_3').siblings().hide();
				console.log(that.find('#genre_3').html())
				that.children('.location').val(that.find('#genre_4').html());
				$(this).parents('.transportType_li').siblings('.timetog').hide();
				cityinit.children().children('.arriveName').attr("readonly","readonly")
				cityinit.children().children('.arriveName').val('');
				cityinit.children().children('.arriveName').attr('placeholder',"请选择");
				cityinit.children().children('.departmentName').attr("readonly","readonly")
				cityinit.children().children('.departmentName').val('');
				cityinit.children().children('.departmentName').attr('placeholder',"请选择");	
				$(this).parents('.transportType_li').siblings('.housingCityHide').show();
				$(this).parents('.transportType_li').siblings('.typeForm').show();
				$(this).parents('.transportType_li').siblings('.timetog').hide();
				//金额
				cityinit.children().children('.particularMoneyVal').attr("readonly","readonly");
				cityinit.children().children('.particularMoneyVal').attr('unselectable','no')
	    		cityinit.children().children('.particularMoneyVal').attr('onfocus','this.blur()')
				$(this).parents('.transportType_li').siblings('.particularMoney').hide();
				cityinit.children().children('.particularMoneyVal').val('');
				// 住宿天数
				$(this).parents('.transportType_li').siblings('.traveldays').hide();
			}
			if(selected_clickVal == '差补'){
				$(this).parents('.transportType_li').siblings('.remark').find('input').val('');
				$(this).parents('.transportType_li').siblings('.protection').find('input').val('');
				that.find('#genre_4').show();
				that.find('#genre_4').siblings().hide();
				that.children('.location').val(that.find('#genre_4').html());
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paypersonal').children('.pay_btn').removeAttr('id')
				$(this).parents('.transportType_li').siblings('.pay').children().children('.paycompany').children('.pay_btn').attr('id','pay_activePay')
				$(this).parents('.transportType_li').siblings('.pay').children('.selected_clickPayVal').val('1');
				$(this).parents('.transportType_li').siblings('.housingCityShow').children('.housing').html('出差城市');
				$(this).parents('.transportType_li').siblings('.particularMoney').show();
				$(this).parents('.transportType_li').siblings('.particularMoney').children('.housing').html('差补金额');
				than.hide();
				
				$('.datetimestart').val(dataobj.businessTripBeginDate); // 默认上一页开始时间
				$('.datetimeend').val(dataobj.businessTripEndDate); // 默认上一页开始时间
				
				// 出差城市
				cityinit.children().children('.arriveName').attr("readonly")
				cityinit.children().children('.arriveName').val('');
				cityinit.children().children('.arriveName').attr('placeholder',"请选择");
				// 到达城市
				cityinit.children().children('.departmentName').removeAttr("readonly");
				
				cityinit.children().children('.departmentName').val('');
				cityinit.children().children('.departmentName').attr('placeholder',"请选择");
				selected_clickVal = 5;
				that.children('.type_text').html('出行类型');
				$(this).parents('.transportType_li').siblings('.typeForm').hide();
				$(this).parents('.transportType_li').siblings('.timetog').show();
				
				$(this).parents('.transportType_li').siblings('.timetog').siblings('.datetimestart').val(dataobj.businessTripBeginDate); // 默认上一页开始时间
				$(this).parents('.transportType_li').siblings('.timetog').siblings('.datetimeend').val(dataobj.businessTripEndDate); // 默认上一页开始时间
				
//				$(this).parents('.transportType_li').siblings('.timetog').css("pointer-events","none");
				$(this).parents('.transportType_li').siblings('.housingCityHide').hide();
				//金额
				cityinit.children().children('.particularMoneyVal').attr("readonly","readonly");
				cityinit.children().children('.particularMoneyVal').attr('unselectable','no')
	    		cityinit.children().children('.particularMoneyVal').attr('onfocus','this.blur()')
				cityinit.children().children('.particularMoneyVal').val('');
				// 差补天数
				$(this).parents('.transportType_li').siblings('.traveldays').show();
				$(this).parents('.transportType_li').siblings('.traveldays').find('.housing').html('差补天数');
//				$(this).parents('.transportType_li').siblings('.traveldays').find('.traveldaysVal').val('');
				
			};
			console.log(selected_clickVal)
			$(this).parent().siblings('.selected_clickVal').val(selected_clickVal);
		});
	}
	
	//	点击删除明细
	function DeleteDetail(){
		$('.content_wrap').on('click','.cencal',function(){
	        $(".delete_warn").fadeToggle();
	        $(".delete_warn,.cancel_delete").click(function(){
	            $(".delete_warn").hide();
	        });
	        var that = $(this);
	        $(".confirm_deletion").click(function(){
	        	var wrapLen = $(".content_wrap").children().length;
	        	that.parents('.wrap').remove();
	    		$('.article').text(wrapLen - 1);
	    		DetailNum();
	        });
		});
	}
	// 出差明细数	
	function DetailNum(){
		$('.content_wrap .wrap').find('.detail').each( function( index , val){
			var detailnum = index + 1;
			$(this).html('出差明细' + detailnum)
		 })
	}

//	点击收起Pack up
	function ClickPackUp(){
		$('.content_wrap').on('click','.pack_up',function(){
			$(this).parent('.details').hide();
			$(this).parent().siblings('.fewer').show();
			var than = $(this).parents('.details').siblings('.fewer').children()
			var cityNum = $(this).siblings('.transportType_li').children('.selected_clickVal').val();
		    if(cityNum == '3' ){
		    	var cityVals = $(this).siblings().children().children('.departmentName').val();
		    	if(cityVals == ""){
		    		cityVals = '请填写'
		    	}
		    	than.children('.destination').children('.elapsedCity').html(cityVals);
		    	than.children('.destination').children('.finishCity').html(cityVals);
		    	than.children('.destination').css('margin-top','.3rem')
		    	than.children('.time_bom').hide();
		    }else{
		    	than.children('.destination').css('margin-top','.1rem')
		    	than.children('.time_bom').show();
		    	var timeVals = $(this).siblings().children().children('.datetimestart').val();
				var timeVale = $(this).siblings().children().children('.datetimeend').val()
				than.children('.time_bom').children('.elapsedTime').html(timeVals)
				than.children('.time_bom').children('.finishTime').html(timeVale);
				var cityVals = $(this).siblings().children().children('.departmentName').val();
				var cityVale = $(this).siblings().children().children('.arriveName').val();
				if(cityVals == ""){
		    		cityVals = '请选择'
		    	}
				if(cityVale == ""){
		    		cityVale = '请选择'
		    	}
				than.children('.destination').children('.elapsedCity').html(cityVals);
				than.children('.destination').children('.finishCity').html(cityVale);
		    }
		});
	}
	//	点击往返 
	function BackAndForth() {
		$('.content_wrap').on('click','.selected_clickType .payment',function(){
			$(this).children('.pay_btn').attr('id','pay_activeType');
			$(this).siblings().children('.pay_btn').removeAttr('id');
			var timeEnd = $(this).parents('.tripRoute').siblings('.timetogEnd');
			var selected_clickTypeVal = $(this).children('#pay_activeType').siblings('i').html();
			console.log(selected_clickTypeVal);
			var particularMoneyId = 0 ;	
			var particularMoney = $(this).parents('.tripRoute').siblings('.particularMoney').find('input').val();
			if(selected_clickTypeVal == '单程'){
				particularMoneyId = 1
				selected_clickTypeVal = 0;
				timeEnd.hide();
//				$(this).parents('.tripRoute').siblings('.particularMoney').find('input').val( particularMoney * 1);
				
			};
			if(selected_clickTypeVal == '往返'){
				particularMoneyId = 2
				selected_clickTypeVal = 1;
				timeEnd.show();
//				$(this).parents('.tripRoute').siblings('.particularMoney').find('input').val( particularMoney * 2);
			};
			if(particularMoneyId == 0 && selected_clickTypeVal == 0){
				$(this).parents('.tripRoute').siblings('.particularMoney').find('input').val( particularMoney * 1);
			}else if(particularMoneyId == 0 && selected_clickTypeVal == 1){
				$(this).parents('.tripRoute').siblings('.particularMoney').find('input').val( particularMoney * 2);
			}else if(particularMoneyId == 1 && selected_clickTypeVal == 0){
				$(this).parents('.tripRoute').siblings('.particularMoney').find('input').val( particularMoney / 2);
			}else if(particularMoneyId == 2 && selected_clickTypeVal == 1){
				$(this).parents('.tripRoute').siblings('.particularMoney').find('input').val( particularMoney * 2);
			}
			console.log(selected_clickTypeVal)
			$(this).parent().siblings('.selected_clickTypeVal').val(selected_clickTypeVal);
		});
	};
	
	// 提交身份ajax
	function IdentityAjax(){
		$.ajax({ 
        	url: sy + 'travelReimburse/getUserStandardInfoByUserId',
			type : 'GET',
			dataType: 'json',	
			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data);
            	var budgetDeparval = data.result;
            	var src = ""
            	if (data.resultCode == 0) {
            		for (var val in budgetDeparval) {
            			if( canshuming == budgetDeparval[val].fdSid && canshuming == budgetDeparval[val].fdOrgSid){
            				src+='<li class="pitch clearfix ">'
             					 +'<div class="rankleft">'
             						 +'<h3 class="rankType" fdSid="'+ budgetDeparval[val].fdSid+'" fdOrgSid="'+ budgetDeparval[val].fdOrgSid+'">'+ budgetDeparval[val].fdName + '>' + budgetDeparval[val].fdOrgNameTree +'</h3>'
             					 +'</div>'
             					 +'<div class="rankright">'
             						 +'<img class="no_selected" src="../../img/no_selected.png">'
             					 +'</div>'
             				  +'</li>'
            			}else {
            				src+='<li class="pitch clearfix ">'
            					 +'<div class="rankleft">'
            						 +'<h3 fdSid="'+ budgetDeparval[val].fdSid+'" fdOrgSid="'+ budgetDeparval[val].fdOrgSid+'">'+ budgetDeparval[val].fdName + '>' + budgetDeparval[val].fdOrgNameTree +'</h3>'
            					 +'</div>'
            					 +'<div class="rankright">'
            						 +'<img class="no_selected" src="../../img/no_selected.png">'
            					 +'</div>'
            				  +'</li>'
            			}
          			}
					$('.identity_wrap span').html($('.ranktype_ul li .rankType').html());
					$('.identity_wrap span').attr('fdSid',$('.ranktype_ul li .rankType').attr('fdSid'));
					$('.identity_wrap span').attr('fdOrgSid',$('.ranktype_ul li .rankType').attr('fdOrgSid'));
            	}
            }
	    })
	}
	// 点击选择支付方式
//	$('.content_wrap').on('click','.selected_clickPay .payment',function(){
//		$(this).children('.pay_btn').attr('id','pay_activePay');
//		$(this).siblings().children('.pay_btn').removeAttr('id');
//		var selected_clickPayVal = $(this).children('#pay_activePay').siblings('i').html();
//		if(selected_clickPayVal == '个人支付'){
//			selected_clickPayVal = 0;
//		};
//		if(selected_clickPayVal == '公司支付'){
//			selected_clickPayVal = 1;
//		}
//		$(this).parent().siblings('.selected_clickPayVal').val(selected_clickPayVal);
//	}); 
	
	
	
    // 报销发票金额的 money相加
	function calculateMoney(){
		var d=0;
        $(".resmoney").each(function(){
            var MoneyVal = $(this).val();
            if(MoneyVal == ""){
                MoneyVal = 0;
            }
            d+=parseFloat(MoneyVal);//加最后结果
            $('.article i').html(d.toFixed(2));//把结果填到最后一个文本框
        });
	}
	// ios 弹出键盘兼容问题
	function FocusiOS(){
		var clientHeight = 0 ;
		$('.inputFocus').on('focusin', function () {
			var u = navigator.userAgent, 
				app = navigator.appVersion; 
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if(isiOS){
				clientHeight = document.body.clientHeight/2 - 40;
	            $(".btn_wrap").css("padding-top",clientHeight);
	            window.scrollTo(0,clientHeight); 
			}
		});
		$(document).on('focusout', function () {
			var u = navigator.userAgent,
				app = navigator.appVersion; 
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if(isiOS){
				$(".btn_wrap").css("padding-top","0px");
				window.scrollTo(0,document.body.clientHeight);
			}
		});
	}
	// 航班机票金额查询
	function  FlightAjax( departureCity,arrivalCity ,particularMoneyVal,flightTypeuuid,tripId,protection){
		$.ajax({ 
	    	url: sy + 'travelapplication/getFlightSegment/' + departureCity + '/' + arrivalCity ,
			type : 'GET',
			dataType: 'json',
			contentType : 'application/json;charset=UTF-8',
	        success: function (data) {
	        	console.log(data)
	        	if (data.resultCode == 0) {
	        		particularMoney = data.result;
	        		if(tripId == 1){
	        			particularMoneyVal.val(particularMoney * 2);
	        		}else{
	        			particularMoneyVal.val(particularMoney);
	        		}
	        	}else if(data.resultCode == -1){
	        		particularMoneyVal.val('0');
	        		cueFrame(data.message)
	        	}
	        }
	    })
	}
	//点击添加明细定位到添加那一条
	function AddscrollTop(){
		var documentHeight = $(document).height();
		if(documentHeight > 980){
			var scrollTop = documentHeight - 980;
			$('html,body').scrollTop(scrollTop);
		}
	}
	// 住宿天数
	function stayDays(that,num){
		if(num >= 0 ){
//			num = Math.floor(num);
			var stayMoney = that.siblings('.housingCityShow').find('.departmentName').attr('uuid');
			that.siblings('.particularMoney').find('.particularMoneyVal').val( stayMoney * num );
		}else{
			cueFrame('请输入正确的天数！');
			that.find('.traveldaysVal').val('')
		}
	}