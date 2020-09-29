$(function(){
	var resMoney = 0;
	var uuId = getUrlParam('uuId');
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
    // ios 弹出键盘兼容问题
	FocusiOS();
	
	init(uuId);
	function init(uuId){
 		$.ajax({ 
         	url: sy + 'travelapplication/selectTravelInfo/'+uuId,
 			type : 'get',
 			dataType: 'json',
 //			jsonpCallback: "onBack",
 			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	if(data.resultCode == 0){
            		var fileNameUrl = data.result.fileNameUrl;
            		localStorage.setItem("fileNameUrl", JSON.stringify(fileNameUrl));
            		var fdOrgNameTree = data.result.fdOrgNameTree;
            		localStorage.setItem("fdOrgNameTree", fdOrgNameTree);
            		console.log(data)
            		var result = data.result;
                	var	stt=""
                	stt+='<li>'
                		+'经办日期'
    					+'<span class="detailsLeft">'
    						+'<span class="deta_val Datenew">'+ result.responsibleDate +'</span>'
    					+'</span>'
    				+'</li>'
    				+'<li>'
    					+'开始时间'
    					+'<span class="detailsLeft">'
    						+'<input type="text" id="demo_datetime" class="detail_input datetimestart" readonly="readonly" value="'+ result.businessTripBeginDate +'" style="border: none;text-align: right;"/>'
    						+'<img class="corners_right" src="../../img/corners_right.png">'
    					+'</span>'
    				+'</li>'
    				+'<li>'
    					+'截止日期'
    					+'<span class="detailsLeft">'
    						+'<input type="text" id="demo_datetime_end" class="detail_input1 datetimeend" readonly="readonly" value="'+ result.businessTripEndDate +'" style="border: none;text-align: right;"/>'
    						+'<img class="corners_right" src="../../img/corners_right.png">'
    					+'</span>'
    				+'</li>'
    				+'<li>'
    					+'出差天数'
    					+'<span class="detailsLeft">'
    						+'<span class="deta_val travelday">'+ result.businessTripDay +'</span>天'
    						+'</span>'
    				+'</li>'
    				+'<li>'
    					+'职级类型'
    					+'<span class="detailsLeft">'
    						+'<span class="deta_val grade">'+ result.rankType +'</span>'
    						+'<img class="corners_right" src="../../img/corners_right.png">'
    					+'</span>'
    				+'</li>'
//    				+'<li class="linear_type_click">'
//    					+'业务条线类型'
//    					+'<span class="detailsLeft">'
//    						+'<span class="deta_val linearVal">'+ result.businessLineType +'</span>'
//    						+'<img class="corners_right" src="../../img/corners_right.png">'
//    					+'</span>'
//    				+'</li>'
    				+'<li class="service_bar_type">'
    					+'经办部门'
    					+'<span class="detailsLeft">'
    						+'<span class="deta_val businessVal">'+ result.organization +'</span>'
    						+'<img class="corners_right" src="../../img/corners_right.png">'
    					+'</span>'
    				+'</li>'
    				+'<li class="rank_rgba_click">'
    					+'预算主体'
    					+'<span class="detailsLeft">'
    						+'<span class="deta_val rankTypeVal">'+ result.budgetBodyName +'</span>'
    						+'<img class="corners_right" src="../../img/corners_right.png">'
    					+'</span>'
    				+'</li>'
    				+'<li class="subject_fix_click">'
    					+'费用科目'
    					+'<span class="detailsLeft">'
    						+'<span class="deta_val subjectVal">'+ result.expenseAccountName +'</span>'
    						+'<img class="corners_right" src="../../img/corners_right.png">'
    					+'</span>'
    				+'</li>'
    				+'<li class="corporation_fix_click">'
    					+'法人公司'
    					+'<span class="detailsLeft">'
    						+'<span class="deta_val corporation" style="width: 5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: block;text-align: right;float: left;">'+ result.lawCompanyName +'</span>'
    						+'<img class="corners_right" src="../../img/corners_right.png">'
    					+'</span>'
    				+'</li>'
    				+'<li>'
    					+'当前预算剩余(不含本次)'
    					+'<span class="detailsLeft">'
    						+'<i class="the_money business_surplus_money"></i>'
    					+'</span>'
    				+'</li>'
    				+'<li>'
    					+'本次使用预估'
    					+'<span class="detailsLeft">'
    						+'<input type="text" style="font-style: normal;width: 3rem;" readonly="readonly"  name="name" id="" class="the_money business_trip_money" value="'+ result.businessTripMoney +'"/>'
    					+'</span>'
    				+'</li>'
                	$('.details').html(stt);
//                	if(result.rankType == 'M2'||result.rankType == 'M3'){
//          				$('.linear_type_click').show();
//    					$('.linearVal').html(result.businessLineType);
//          			}
                	$('.themeval').val(result.theme);
                	$('.reason').val(result.remark);
                	var budgetBody = result.budgetBody
                	var expenseAccount = result.expenseAccount
                	initMoney(budgetBody,expenseAccount)
                	$(".loading").fadeOut(); 
            	}
            }
 		})
	};
//	初始化可用金额
	function initMoney(budgetId,subjectId){
		$.ajax({
			url: sy() + "/travelapplication/getDepartmentMoney/"+budgetId+"/"+subjectId,
			type : 'GET',
			dataType: 'json',
//			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log('可使用金额'+data.result);
            	if(data.resultCode == 0){
            		var resMoney = data.result
            		$('.business_surplus_money').html(resMoney);
            	}
            	$(".loading").fadeOut();
            }
	    })
	};
	//点击下一步
	$('.next').click(function(){
		$(".loading").fadeIn(); 
        window.location.href="alter_newApply.html?uuId="+uuId;
	})
})