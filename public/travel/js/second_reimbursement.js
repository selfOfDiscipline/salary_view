// 本次冲账金额校验
function Moneychange(){
    var borrowMoney = $(this).val();
    console.log(borrowMoney)
	var remainMoney = $(this).parent().prev().prev().val();
	if(borrowMoney > remainMoney){
		var message = '本次冲账金额不能大于待冲账金额！';
  		cueFrame(message)
	}
};
$(function(){
//	$(".loading").fadeIn();
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r!=null) return unescape(r[2]);
		return null; //返回参数值 
	} 
	var uuId = getUrlParam('uuId');
	// 扫码添加callbackFun
	$('#button_scanQRCode1').click(function(){
		callbackFun();
	})
	// 弹出键盘兼容问题
	FocusiOS();
    // 附件上传 
    $("#addEnclosure").click(function(){
        addTheme();
    });
    //上一页是否冲账标识
    var checkFlag = localStorage.getItem('checkFlag');
    if(checkFlag == 1){
    	$('.balance').show();
    }else if(checkFlag == 2){
    	$('.balance').hide();
    }
    // 上一页返回的code
	var resultCode =localStorage.getItem('resultCode');
    var applyDataobj = JSON.parse(localStorage.getItem('dataobj')).feeExpenseBillPO;
    // 获取当前窗口的Url
    var SecondUrl = window.location.href;
    localStorage.setItem('SecondUrl',SecondUrl);
    localStorage.setItem('dataobj',JSON.stringify(JSON.parse(localStorage.getItem('dataobj'))));
    // 取出发票id
//    var InvoiceId_code = new Object();
//	localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
	var InvoiceId_code = JSON.parse(localStorage.getItem('InvoiceId_code'));
	var feeBorrowIds = JSON.parse(localStorage.getItem('feeBorrowIds'));
	console.log(feeBorrowIds)
	
	var AccommodationHtml = localStorage.getItem('AccommodationHtml');
	var ChoochooHtml = localStorage.getItem('ChoochooHtml');
	var RestHtml = localStorage.getItem('RestHtml');
	var balanceDomHtml = localStorage.getItem('balanceDomHtml');
	var ImporMoney = JSON.parse(localStorage.getItem('ImporMoney'));
	var sharemoney = JSON.parse(localStorage.getItem('sharemoney'));
	var borrowMoney = JSON.parse(localStorage.getItem('borrowMoney'));// 冲账金额
	
	$('.businessTripBeginDate').html(applyDataobj.businessTripBeginDate);
	$('.businessTripEndDate').html(applyDataobj.businessTripEndDate);
	$('.businessTripDay').html(applyDataobj.businessTripDay);
	$('.departmentName').html(applyDataobj.departmentName);
	if(InvoiceId_code || feeBorrowIds ){
		var state = getUrlParam('state');
		if( state == 0 ){
			mealInit(InvoiceId_code,state)
		}else if(state == 1 ){
			mealInit(feeBorrowIds,state)
		}
		identityAjax()
	}else{
		mealInit()
		identityAjax()
	};
	function identityAjax(){
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
          				src+='<li class="pitch clearfix ">'
          					 +'<div class="rankleft">'
          						 +'<h3 fdSid="'+ budgetDeparval[val].fdSid+'" fdOrgSid="'+ budgetDeparval[val].fdOrgSid+'" fdInitiatingProcess="'+ budgetDeparval[val].fdInitiatingProcess+'" fdOrgSidTree="'+ budgetDeparval[val].fdOrgSidTree+'">'+ budgetDeparval[val].fdName + '>' + budgetDeparval[val].fdOrgNameTree +'</h3>'
          					 +'</div>'
          					 +'<div class="rankright">'
          						 +'<img class="no_selected" src="../../img/no_selected.png">'
          					 +'</div>'
          				  +'</li>'
          			}
					$('.ranktype_ul').html(src);
					$(".ranktype_ul li:first").children().children('h3').attr('class','rankType');
					$(".ranktype_ul li:first").children().children('img').attr('src','../../img/selected.png');
					$('.identity_wrap span').html($('.ranktype_ul li .rankType').html());
					$('.identity_wrap span').attr('fdSid',$('.ranktype_ul li .rankType').attr('fdSid'));
					$('.identity_wrap span').attr('fdOrgSid',$('.ranktype_ul li .rankType').attr('fdOrgSid'));
					$('.identity_wrap span').attr('fdOrgSidTree',$('.ranktype_ul li .rankType').attr('fdOrgSidTree'));
					$('.identity_wrap span').attr('fdInitiatingProcess',$('.ranktype_ul li .rankType').attr('fdInitiatingProcess'));
            	}else{
              		var message = data.message;
              		cueFrame(message)
              	}
            }
	    })
	}
	$('body').on('click','.identity_wrap',function(){
		 $('.rank_rgba').show();
	})
	$('body').on('click','.ranktype_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankType'); 
		$(this).children('.rankleft').children('h3').addClass('rankType');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		$('.identity_wrap span').html($(this).children('.rankleft').children('.rankType').html());
		$('.identity_wrap span').attr('fdSid',$(this).children('.rankleft').children('.rankType').attr('fdSid'));
		$('.identity_wrap span').attr('fdOrgSid',$(this).children('.rankleft').children('.rankType').attr('fdOrgSid'));
		$('.identity_wrap span').attr('fdOrgSidTree',$(this).children('.rankleft').children('.rankType').attr('fdOrgSidTree'));
		$('.identity_wrap span').attr('fdInitiatingProcess',$(this).children('.rankleft').children('.rankType').attr('fdInitiatingProcess'));
	})
	$('.rank_rgba').click(function(){
		$('.rank_rgba').hide();
	});	
	var subjectIdInit ,subjectNameInit ,budgetDepartmentNameInit ,budgetDeparvalInit;
//	餐旅补助ajax
	function mealInit(){
		$.ajax({ 
         	url: sy + 'travelReimburse/getSubsidy/' + resultCode,
 			type : 'get',
 			dataType: 'json',
 			contentType :'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data);
              	if (data.resultCode == 0) {
              		var result = data.result;
              		if(result){
              			$('.costSubject').val(result.user.subjectId);
              			subjectIdInit = result.user.subjectId;
              			subjectNameInit = result.user.subjectName;
              			$('.costSubjectVal').html(result.user.subjectName)
              			var subsidy = result.subsidy == null ? "0" : result.subsidy; 
              			$('.tax').html( subsidy );
              			$('.taxIncludedAmount').html(subsidy);
//              			$('.taxIncludedAmount').html(subsidy * applyDataobj.businessTripDay);
              			if(ImporMoney){
              				$('.amountUsed').val( ImporMoney[ImporMoney.length - 1]);
              			}else{
              				$('.amountUsed').val(result.subsidy);
              			}
              			if(sharemoney){
              				$('.apportionedAmount').val( sharemoney[sharemoney.length - 1]);
              			}else{
              				$('.apportionedAmount').val(result.subsidy);
              			}
              		}
              		calculateMoney()
              		var budgetDeparval = result.budgetDepar;
              		var src=""
          			//  预算主体id
          			$('.budgetBody').val(budgetDeparval[0].id);
          			$('.rankTypeVal').html(budgetDeparval[0].budgetDepartmentName);
	              	budgetDepartmentNameInit = budgetDeparval[0].budgetDepartmentName;
	              	budgetDeparvalInit = budgetDeparval[0].id;
          			$('.rankTypeVal').parents('.rank_rgba_click').prev('input').val(budgetDeparval[0].id);
          			if(InvoiceId_code && state == 0){
          				init(InvoiceId_code,state);
          			}else if(feeBorrowIds && state == 1){
          				init(feeBorrowIds,state);
          			}else{
          				$(".loading").fadeOut();
          			}
              	}else{
              		var message = data.message;
              		cueFrame(message)
              	}
              	$(".loading").fadeOut();
            }
		})
	};
	function init(dataobj,state ){
		$(".loading").fadeIn();
		if(AccommodationHtml){
			$('#accommodation').html(AccommodationHtml);
		};
		if(ChoochooHtml){
			$('#choochoo').html(ChoochooHtml);
		};
		if(balanceDomHtml){
			$('#balanceDom').html(balanceDomHtml);
		}
		if(RestHtml){
			$('#rest').html(RestHtml);
		}
		RestHtml
		if(ImporMoney){
			var num = -1;
			$(".wrap_details .stay_details").each(function(){
				num++ ;
			    $(this).find('.resmoney').prop('value',ImporMoney[num])
			})
		}
		if(sharemoney){
			var num = -1;
			$(".wrap_details .stay_details").each(function(){
				num++ ;
			    $(this).find('.sharemoney').prop('value',sharemoney[num])
			})
		};
		if(borrowMoney){
			var num = -1;
			$("#balanceDom .stay_details").each(function(){
				num++ ;
				console.log(borrowMoney[num]);
			    $(this).find('.borrowMoney').prop('value',borrowMoney[num])
			})
		};
		if(dataobj){
			if( state == 0){
				$.ajax({ 
		         	url: sy + 'travelReimburse/getInvoiceDetailById',
		 			type : 'post',
		 			dataType: 'json',
		 			contentType : 'application/json;charset=UTF-8',
		 			data:JSON.stringify(dataobj),
		            success: function (data) {
		                console.log(data);
		              	if (data.resultCode == 0) {
		              		var res =data.result;
		                    var stt="";
		                    var str="";
		                    var src = "";
		                    var result= [];
		                    var resultcho = [];
		                    var user = []
		                    var budgetDeparval = [];
		                    for(var j in res){
		                    	result = res['99'];
		                    	console.log(result);
		                    	resultcho = res['1'];
		                    	user = res['user'];
		                    	budgetDeparval = res['budgetDepar'];
		                    }
		                    if( result ){
		                    	console.log(result);
		                    	for(var obj in result){
		                    		var a = result[obj].sum + result[obj].tax;
		                    		var am =a.toFixed(2);
		                    		var businessName = result[obj].businessName == null ? "" : result[obj].businessName; 
		                    		var taxRate = result[obj].taxRate == null ? "0" : result[obj].taxRate; 
		                            stt+='<div class="stay_details">'
		                                    +'<ul class="stay_ul">'
		                                    	+'<input type="hidden" class="" value="'+ result[obj].truthStatus +'">' // 验真状态
		                            			+'<input type="hidden" class="" value="99">'
			                                    +'<input type="hidden" class="" value="'+ result[obj].sourceId +'">'
			                                    +'<input type="hidden" class="" value="'+ result[obj].id +'">'
			                                    +'<input type="hidden" class="" value="'+ result[obj].invoiceDataCode +'">'
		                                        +'<input type="hidden" class="" value="">'
		                                        +'<input type="hidden" class="" value="">'
		                                        +'<input type="hidden" class="" value="">'
		                                        +'<input type="hidden" class="" value="">'
		                                        +'<input type="hidden" class="" value="火车票">'
		                                        +'<input type="hidden" class="" value="'+ businessName +'">'
		                                        +'<li>商户名称<span class="right_important black overnowrap">'+ businessName +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ result[obj].goodserviceName +'">'
		                                        +'<li>类别<span class="right_important black overnowrap">'+ result[obj].goodserviceName +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ result[obj].billingTime +'">'
		                                        +'<li>发生日期<span class="right_important black">'+ result[obj].billingTime +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ result[obj].sum +'">'
		                                        +'<li>金额<span class="right_important black">¥'+ result[obj].sum +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+  taxRate +'">'
		                                        +'<li>税率<span class="right_important black">'+ taxRate*100 +"%" +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ result[obj].tax +'">'
		                                        +'<li>税额<span class="right_important black">¥'+ result[obj].tax +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ am +'">'
		                                        +'<li>含税金额    <span class="right_important black">¥'+ am + '</span></li>'
		                                        +'<li class="black">本次使用金额<span class="right_important blue"><input type="text" value="'+ am +'" placeholder="'+ am +'" class="resmoney" name="" id="allmoney"></span></li>'
		                                        +'<input type="hidden" class="" value="'+ budgetDeparvalInit +'">'
		                                        +'<li class="black">预算主体<img class="corners" src="../../img/corners_right.png"><span class="right_important rankTypeVal gray">'+ budgetDepartmentNameInit +'</span></li>'
		                                        +'<input type="hidden" class="costSubject" value="'+ subjectIdInit +'">'
		                                        +'<li class="black costClick">费用科目<img class="corners" src="../../img/corners_right.png"><span class="right_important gray costSubjectVal">'+ subjectNameInit +'</span></li>'
		                                        +'<input type="hidden" class="fundType" value="2">' // 款项类型
		                                        +'<li class="black fundType choochooFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">交通费</span></li>'
		                                        +'<li class="black">分摊金额<span class="right_important blue"><input type="text" value="'+ am +'" placeholder="'+ am +'" class="sharemoney" name="" id="sharemoney"></span></li>'
		                                  +'</ul>'
		                                  +'<div class="delete_detail sourceId" uuid="'+ result[obj].sourceId +'" code="'+ result[obj].invoiceTypeCode +'">删除明细</div>'
		                            +'</div>'
		                    	}
		                    	$('#choochoo').append(stt);
		                    };
		                    if( resultcho ){
		                    	console.log(resultcho);
		                    	for(var i in resultcho){
		                    		var a = resultcho[i].sum + resultcho[i].tax;
		                    		var am =a.toFixed(2)
		                            str+='<div class="stay_details">'
		                                    +'<ul class="stay_ul">'
		                                    	+'<input type="hidden" class="" value="'+ resultcho[i].truthStatus +'">' // 验真状态
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].invoiceTypeCode +'">'
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].sourceId +'">'
			                                    +'<input type="hidden" class="" value="'+ resultcho[i].id +'">'
			                                    +'<input type="hidden" class="" value="'+ resultcho[i].invoiceDataCode +'">'
		                                        +'<input type="hidden" class="" value="">'
		                                        +'<input type="hidden" class="" value="">'
		                                        +'<input type="hidden" class="" value="">'
		                                        +'<input type="hidden" class="" value="">'
		                                        
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].invoiceTypeName +'">'
		                                        
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].businessName +'">'
		                                        +'<li>商户名称<span class="right_important black overnowrap">'+ resultcho[i].businessName +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].goodserviceName +'">'
		                                        +'<li>类别<span class="right_important black overnowrap">'+ resultcho[i].goodserviceName +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].billingTime +'">'
		                                        +'<li>发生日期<span class="right_important black">'+ resultcho[i].billingTime +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].sum +'">'
		                                        +'<li>金额<span class="right_important black">¥'+ resultcho[i].sum +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].taxRate +'">'
		                                        +'<li>税率<span class="right_important black">'+ resultcho[i].taxRate*100 +"%" +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ resultcho[i].tax +'">'
		                                        +'<li>税额<span class="right_important black">¥'+ resultcho[i].tax +'</span></li>'
		                                        +'<input type="hidden" class="" value="'+ am +'">'
		                                        +'<li>含税金额    <span class="right_important black">¥'+ am +'</span></li>'
		                                        +'<li class="black">本次使用金额<span class="right_important blue"><input type="text" value="'+ am +'" placeholder="'+ am +'"  class="resmoney" name="" id="allmoney"></span></li>'
		                                        +'<input type="hidden" class="" value="'+ budgetDeparvalInit +'">'
		                                        +'<li class="black">预算主体<img class="corners" src="../../img/corners_right.png"><span class="right_important rankTypeVal gray">'+ budgetDepartmentNameInit +'</span></li>'
		                                        +'<input type="hidden" class="costSubject" value="'+ subjectIdInit +'">'
		                                        +'<li class="black costClick">费用科目<img class="corners" src="../../img/corners_right.png"><span class="right_important gray costSubjectVal">'+ subjectNameInit +'</span></li>'
		                                        +'<input type="hidden" class="fundType" value="1">'//款项类型
		                                        +'<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">住宿费</span></li>'
		                                        +'<li class="black">分摊金额<span class="right_important blue"><input type="text" value="'+ am +'" placeholder="'+ am +'" class="sharemoney" name="" id="sharemoney"></span></li>'
		                                  +'</ul>'
		                                  +'<div class="delete_detail sourceId" uuid="'+ resultcho[i].sourceId +'" code="'+ resultcho[i].invoiceTypeCode +'">删除明细</div>'
		                            +'</div>'
		                    	}
		                    	$('#accommodation').append(str);
		                    }
		                    if(user){
		                    	var subjectId =user.subjectId;
		                    	var subjectName = user.subjectName;
		                    	$('.subject_pay').html(subjectName);
		                    	$('.subjectId').val(subjectId);
		                    	$('.subjectName').val(subjectName);
		                    };
		                    if( budgetDeparval ){
		            			 $('.rankTypeVal').html(budgetDeparval[0].budgetDepartmentName);
		            			 $('.rankTypeVal').parents('.rank_rgba_click').prev('input').val(budgetDeparval[0].id);
		                    }
		              	}
		              	calculateMoney();	              	
		              	$(".loading").fadeOut();
		            }
		 		})
			}else if(state == 1){
				$.ajax({ 
		         	url: sy + 'travelapplication/getBorrowByIds?feeBorrowIds='+ feeBorrowIds,
		 			type : 'post',
		 			dataType: 'json',
		 			contentType : 'application/json;charset=UTF-8',
		 			data:JSON.stringify(dataobj),
		            success: function (data) {
		                console.log(data);
		                var result = data.result;
		              	if (data.resultCode == 0) {
		              		var balanceDom = "";
		              		for(var i in result){
			              		balanceDom+='<div class="stay_details">'
	                                +'<ul class="stay_ul">'
	                                    +'<input type="hidden" class="" value="'+ result[i].id +'">'
		                                +'<input type="hidden" class="" value="'+ result[i].theme +'">'
		                                +'<li>主题<span class="right_important black overnowrap">'+ result[i].theme +'</span></li>'
		                                +'<input type="hidden" class="" value="'+ result[i].borrowMoney +'">'
		                                +'<li>借款金额<span class="right_important black overnowrap">¥'+ result[i].borrowMoney +'</span></li>'
		                                +'<input type="hidden" class="" value="'+ result[i].reversalMoney +'">'
		                                +'<li>已冲账金额<span class="right_important black">¥'+ result[i].reversalMoney +'</span></li>'
		                                +'<input type="hidden" class="remainMoney" value="'+ result[i].remainMoney +'">'
		                                +'<li>待冲账金额<span class="right_important black">¥'+ result[i].remainMoney +'</span></li>'
		                                +'<li>本次冲账金额<span class="right_important black"><input type="number" class="borrowMoney" value="" placeholder="0.00"></span></li>'
	//	                                +'<input type="hidden" class="" value="'+ result[i].applicationPersonName +'">'
		                                +'<li>申请人<span class="right_important black">'+ result[i].applicationPersonName +'</span></li>'
	//	                                +'<input type="hidden" class="" value="'+ result[i].applicationDepartmentName +'">'
		                                +'<li>申请部门<span class="right_important black">'+ result[i].applicationDepartmentName +'</span></li>'
	//	                                +'<input type="hidden" class="" value="'+ result[i].applicationDate +'">'
		                                +'<li>申请时间<span class="right_important black">'+ result[i].applicationDate +'</span></li>'
		                          +'</ul>'
		                          +'<div class="delete_detail balanceId" uuid="'+ result[i].id +'">删除明细</div>'
		                      +'</div>'
		              		}
		              		$('#balanceDom').append(balanceDom);
		              		$('.borrowMoney').on("input propertychange",function(){
		              			var borrowMoney = $(this).val();
		              			var remainMoney = $(this).parents('li').siblings('.remainMoney').val();
		              			console.log(borrowMoney - remainMoney)
		              			if(borrowMoney - remainMoney >0){
		              				var message = '本次冲账金额不能大于待冲账金额！';
		              		  		cueFrame(message)
		              			}
		              		});
		              	}
		            }
		        })
			}
		}
	};
	var that;
	//	款项类型accommodationF
	$('body').on('click', '.accommodationFundType',function(){
		that = $(this);
		var ThisFundVal = that.children('span').html();
		var newObj = {1: "住宿费", 2: "交通费", 3: "餐费", 4: "其他"};
		var src="";
		for (var val in newObj) {
			if( newObj[val] == ThisFundVal){
				src+='<li class="pitch clearfix">'
					 +'<div class="rankleft">'
						 +'<h3 class="rankTypebusines" uuid="'+ [val]+'" >'+ newObj[val]+'</h3>'
					 +'</div>'
					 +'<div class="rankright">'
						 +'<img class="no_selected" src="../../img/selected.png">'
					 +'</div>'
				  +'</li>'
			}else{
				src+='<li class="pitch clearfix">'
					 +'<div class="rankleft">'
						 +'<h3 uuid="'+ [val]+'" >'+ newObj[val]+'</h3>'
					 +'</div>'
					 +'<div class="rankright">'
						 +'<img class="no_selected" src="../../img/no_selected.png">'
					 +'</div>'
				  +'</li>'
			}
			$('.business_ul').html(src);
		}
		$('.business_fix').show();
		$('body').on('click','.business_ul li', function(){
			console.log($(this).children('.rankright').children('.no_selected').attr('src'))
			$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypebusines'); 
			$(this).children('.rankleft').children('h3').addClass('rankTypebusines');
			$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
			$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
			var rankType = $(this).children('.rankleft').children('.rankTypebusines').html();
			var rankTypeId = $(this).children('.rankleft').children('.rankTypebusines').attr('uuid');
			that.children('.fundTypeval').html(rankType);
			that.prev('.fundType').val(rankTypeId)
		})
	});
	$('.business_fix').click(function(){
		$('.business_fix').hide();
	});
	//	火车票款项类型
	$('body').on('click', '.choochooFundType',function(){
		var that = $(this);
		var ThisFundVal = that.children('span').html();
		var newObj = {2: "交通费", 4: "其他"};
		var src="";
		for (var val in newObj) {
			if( newObj[val] == ThisFundVal){
				src+='<li class="pitch clearfix">'
					 +'<div class="rankleft">'
						 +'<h3 class="rankTypebusines" uuid="'+ [val]+'" >'+ newObj[val]+'</h3>'
					 +'</div>'
					 +'<div class="rankright">'
						 +'<img class="no_selected" src="../../img/selected.png">'
					 +'</div>'
				  +'</li>'
			}else{
				src+='<li class="pitch clearfix">'
					 +'<div class="rankleft">'
						 +'<h3 uuid="'+ [val]+'" >'+ newObj[val]+'</h3>'
					 +'</div>'
					 +'<div class="rankright">'
						 +'<img class="no_selected" src="../../img/no_selected.png">'
					 +'</div>'
				  +'</li>'
			}
			$('.corporation_ul').html(src);
		}
		$('.corporation_fix').show();
		$('body').on('click','.corporation_ul li', function(){
			console.log($(this).children('.rankright').children('.no_selected').attr('src'))
			$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypecom'); 
			$(this).children('.rankleft').children('h3').addClass('rankTypecom');
			$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
			$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
			var rankType =$(this).children('.rankleft').children('.rankTypecom').html();
			var rankTypeId =$(this).children('.rankleft').children('.rankTypecom').attr('uuid');
			that.children('.fundTypeval').html(rankType);
			that.prev('.fundType').val(rankTypeId)
		})
	});
	$('.corporation_fix').click(function(){
		$('.corporation_fix').hide();
	});
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
	// 点击明细 + 显示弹框
	$('.content_title').click(function(){
		$('.invoice_wrap').show()
	});
	// 点击冲账  + 显示弹框
	$('#balanceAdd').click(function(){
		$(".loading").fadeIn();
		InvoicFun();
		window.location.href="import_invoice.html?uuId="+ uuId +"&&state=1";
	});
	// 点击任意位置弹框消失
    $('.invoice_wrap').click(function(e){
        $('.invoice_wrap').hide();
    });
	// 点击取消隐藏弹框
	$('.invoice_cancel').click(function(){
		$('.invoice_wrap').hide();
	});
	// 点击导入我的发票
	$('.import').click(function(){
		$('.invoice_wrap').css('display','none')
		$(".loading").fadeIn();
		InvoicFun();
		window.location.href="import_invoice.html?uuId="+ uuId+"&&state=0";
	});
	// 手动添加
    $(".manual").click(function(){
    	$('.invoice_wrap').css('display','none')
		$(".loading").fadeIn();
        window.location.href="../invoice/manual_addition.html";
    });
    //添加其他发票
	$('.rest').click(function(){
		$('.invoice_wrap').css('display','none');
		$('.content_two').css('display','none');
		$('.content_ul').css('display','block')
	});
	$('#trainSure').click(function(){
		var res = '';
		var invoiceType   = $('#invoiceDataCode').val(); //发票类型
		var invoiceTypeId = $('#invoiceDataCode').attr('uuid');
		var funds         = $('#invoiceNumber').val();   //款项类型
		var fundsId       = $('#invoiceNumber').attr('uuid'); 
		var totalAmount   = $('#totalAmount').val();     //票据金额
		var taxRate       = $('#taxRate').val();         //税率
		var billingTime   = $('#billingTime').val();     //时间
		if( invoiceType == '' ){
			var msg='对不起,请选择发票类型！';
    		cueFrame(msg);
		}else if(funds == ''){
			var msg='对不起,请选择款项类型！';
    		cueFrame(msg);
		}else if(totalAmount == ''){
			var msg='对不起,请填写票据金额！';
    		cueFrame(msg);
		}else if(taxRate == '' && 0 <=parseInt(taxRate) <= 100){
			var msg='对不起,请正确填写税率！';
    		cueFrame(msg);
		}else if(billingTime == ''){
			var msg='对不起,请选择开票/发生日期！';
    		cueFrame(msg);
		}else{
			res+='<div class="stay_details">'
				    +'<ul class="stay_ul">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="'+ invoiceTypeId +'">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="'+ invoiceType +'">'
			        +'<li>类型<span class="right_important black overnowrap">'+ invoiceType +'</span></li>'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="">'
			        +'<input type="hidden" class="" value="'+ billingTime +'">'
			        +'<li>发生日期<span class="right_important black">'+ billingTime +'</span></li>'
			        +'<input type="hidden" class="" value="'+ totalAmount +'">'
			        +'<li>金额<span class="right_important black">¥'+ totalAmount +'</span></li>'
			        +'<input type="hidden" class="" value="0.00">'
			        +'<li>税率<span class="right_important black">0.00%</span></li>'
			        +'<input type="hidden" class="" value="'+ 0.00 +'">'
			        +'<li>税额<span class="right_important black">¥'+ 0.00 +'</span></li>'
			        +'<input type="hidden" class="" value="'+ totalAmount +'">'
			        +'<li>含税金额<span class="right_important black">¥'+ totalAmount +'</span></li>'
			        +'<li class="black">本次使用金额<span class="right_important blue"><input type="text" value="'+ totalAmount +'" placeholder="0.00" class="resmoney" name="" id="allmoney"></span></li>'
			        +'<input type="hidden" class="" value="'+ budgetDeparvalInit +'">'
			        +'<li class="black">预算主体<img class="corners" src="../../img/corners_right.png"><span class="right_important rankTypeVal gray">'+ budgetDepartmentNameInit +'</span></li>'
			        +'<input type="hidden" class="costSubject" value="'+ subjectIdInit +'">'
			        +'<li class="black costClick">费用科目<img class="corners" src="../../img/corners_right.png"><span class="right_important gray costSubjectVal">'+ subjectNameInit +'</span></li>'
			        +'<input type="hidden" class="fundType" value="'+ fundsId +'">'
			        +'<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">'+ funds +'</span></li>'
			        +'<li class="black">分摊金额<span class="right_important blue"><input type="text" value="'+ totalAmount +'" placeholder="-11.00" class="sharemoney" name="" id="sharemoney"></span></li>'
			    +'</ul>'
			    +'<div class="delete_detail">删除明细</div>'
			+'</div>'
			$('#rest').append(res);
			calculateMoney();
			$('#totalAmount').val('');     //票据金额
			$('#billingTime').val('');     //时间
			$('.invoice_wrap').css('display','none');
			$('.content_two').css('display','block');
			$('.content_ul').css('display','none');
		}
	});

	//发票,款项类型拼接字符
	TypeDom();
	function TypeDom(){
		var lsr = '';
		var fsrc = '';
		var newObj = { 100:"出租车票", 101:"长途汽车票", 110:"其他实名交通票", 111:"其他非实名交通票", 104:"过路费" , 105:"资金调拨", 106:"其他定额发票", 107:"机票行程单", 108:"无票预付", 103:"其他"};
		var newObjfund = { 2: "交通费", 3: "餐费", 1: "住宿费", 4: "其他"};
		for (var val in newObj) {
			lsr+='<li class="pitch clearfix">'
			 +'<div class="rankleft">'
				 +'<h3 class="rankTypelinear" uuid="'+ [val] +'">'+ newObj[val]+'</h3>'
			 +'</div>'
			 +'<div class="rankright">'
				 +'<img class="no_selected" src="../../img/no_selected.png">'
			 +'</div>'
		  +'</li>'
		}
		$('.linear_ul').html(lsr);
		$(".linear_ul li:first").find('h3').addClass('rankTypelinear');
		$(".linear_ul li:first").find('.no_selected').attr('src','../../img/selected.png');
		$('#invoiceDataCode').attr('uuid', $(".linear_ul li:first").find('.rankTypelinear').attr('uuid') )
		$('#invoiceDataCode').val( $(".linear_ul li:first").find('.rankTypelinear').html() );
        // 款项类型拼接str			
		for (var vals in newObjfund) {
			fsrc+='<li class="pitch clearfix">'
			 +'<div class="rankleft">'
				 +'<h3 class="rankTypelinear" uuid="'+ [vals]+'">'+ newObjfund[vals]+'</h3>'
			 +'</div>'
			 +'<div class="rankright">'
				 +'<img class="no_selected" src="../../img/no_selected.png">'
			 +'</div>'
		  +'</li>'
		}
		$('.subject_ul').html(fsrc);
		$(".subject_ul li:first").find('h3').addClass('rankTypesub');
		$(".subject_ul li:first").find('.no_selected').attr('src','../../img/selected.png');
		$('#invoiceNumber').attr('uuid', $(".subject_ul li:first").find('.rankTypesub').attr('uuid') )
		$('#invoiceNumber').val( $(".subject_ul li:first").find('.rankTypesub').html() );
	} 
	// 点击发票类型选择
	$('.invoice_Click').click(function(){
		$('.linear_fix').show();
	});
	$('body').on('click','.linear_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypelinear'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypelinear');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType = $(this).children('.rankleft').children('.rankTypelinear').html();
		$('#invoiceDataCode').val(rankType);
		$('#invoiceDataCode').attr('uuid',$(this).children('.rankleft').children('.rankTypelinear').attr('uuid'))
	})
	$('.linear_fix').click(function(){
		$('.linear_fix').hide();
	});
	// 点击款项类型选择
	$('.fund_Click').click(function(){
		$('.subject_fix').show();
	});
	$('body').on('click','.subject_ul li', function(){
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypesub'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypesub');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankTypesub').html();
		console.log(rankType)
		$('#invoiceNumber').val(rankType);
		$('#invoiceNumber').attr('uuid',$(this).children('.rankleft').children('.rankTypesub').attr('uuid'))
	})
	$('.subject_fix').click(function(){
		$('.subject_fix').hide();
	});
    //	点击手动添加 ，导入
	function InvoicFun(){
        // 将本次金额存入数组	
		var ImporMoney = [];
		$(".resmoney").each(function(){
	        ImporMoney.push($(this).val());
	    });
		console.log(ImporMoney);
		localStorage.setItem('ImporMoney',JSON.stringify(ImporMoney));
		// 将本次金额存入数组	
		var sharemoney = [];
		$(".sharemoney").each(function(){
			sharemoney.push($(this).val());
	    });
		localStorage.setItem('sharemoney',JSON.stringify(sharemoney));
		// 将本次冲账金额存入数组	
		var borrowMoney = [];
		$(".borrowMoney").each(function(){
			borrowMoney.push($(this).val());
	    });
		localStorage.setItem('borrowMoney',JSON.stringify(borrowMoney));
		// 住宿下发票明细html
		var AccommodationHtml = $('#accommodation').html()
		localStorage.setItem('AccommodationHtml',AccommodationHtml);
		// 火车下发票明细html
		var ChoochooHtml = $('#choochoo').html()
		localStorage.setItem('ChoochooHtml',ChoochooHtml);
		// 其他下发票明细html
		var RestHtml = $('#rest').html()
		localStorage.setItem('RestHtml',RestHtml);
		var balanceDomHtml = $('#balanceDom').html();
		localStorage.setItem('balanceDomHtml',balanceDomHtml);
		// 跳转前将当前页的发票id和code取出并存localStorage
		var ImportinvoiceId_code = new Object();
		$(".sourceId").each(function(){
	        var code = $(this).attr("code");
	        var uuid = $(this).attr("uuid");
	        ImportinvoiceId_code[uuid] = code;
	    });
		console.log(ImportinvoiceId_code)
		localStorage.setItem('InvoiceId_code',JSON.stringify(ImportinvoiceId_code));
		// 跳转前将当前页的领借款id取出并存localStorage
		var ImportfeeBorrowIds = [];
		$(".balanceId").each(function(){
	        var uuid = $(this).attr("uuid");
	        ImportfeeBorrowIds.push(uuid);
	    });
		localStorage.setItem('feeBorrowIds',JSON.stringify(ImportfeeBorrowIds));
	}
	//	点击删除明细单 delete_detail
	$('.content_two').on('click','.delete_detail',function () {
		var that = this;
		$(".delete_warn").fadeToggle();
        $(".delete_warn,.cancel_delete").click(function(){
            $(".delete_warn").hide();
        });
        $(".confirm_deletion").click(function(){
        	$(that).parent('.stay_details').remove();
        	calculateMoney();
        });
	});
	// 点击收起，展开
	$(".stay_text").click(function(){
		if($(this).siblings().children().css("display")=="none"){
			$(this).siblings().children().show(10);
//			$(this).children('img').css('transform','rotate(180deg)')
			console.log(1111)
		}else{
			$(this).siblings().children().hide(10);
//			$(this).children('img').css('transform','rotate(0deg)')
			console.log(9999)
		}
	});
	$('.rank_rgba_click').click(function(){
		$('.rank_rgba').css('display','block')
	});
	// 价格相加	
	$('.wrap_details').on('keyup','.resmoney',function(){
		calculateMoney()
    });
	calculateMoney()
	//点击下一步
	var hrefUrl = "";
	var text = "";
	var Url = "";
	$('#next_step').click(function(){
		hrefUrl = "reimbursement.html";
		text ="提交";
		Url = sy + 'travelflow/reimburse';
		$('#next_step').attr('disabled',"true");//添加disabled属性   
		preserveAjax(hrefUrl,text,Url);
	});
	//点击保存至草稿
	$('#preserve').click(function (){
		$('#preserve').attr('disabled',"true");//添加disabled属性 
		hrefUrl = "reimbursement.html";
//		Url = sy + 'travelReimburse/insertTravelReimburse/'+ uuId ;
		Url = sy + 'travelReimburse/insertTravelReimburseDetail';
		text = "保存";
		preserveAjax(hrefUrl,text,Url);
	});
	//点击保存 ， 下一步的ajax
	function preserveAjax(hrefUrl,text,Url){
		var fdOrgNameTree = $('.identity_wrap span').html();
		var fdSid = $('.identity_wrap span').attr('fdSid');
		var fdOrgSidTree = $('.identity_wrap span').attr('fdOrgSidTree');
		var fdOrgSid = $('.identity_wrap span').attr('fdOrgSid');
		var fdInitiatingProcess = $('.identity_wrap span').attr('fdInitiatingProcess');
//		alert(fdOrgSidTree)
		var listItem = [
			'truthStatus', // 验真状态
        	'invoiceTypeCode',//发票类型
        	'invoiceId',//发票id
        	'invoiceItemId',//发票明细id
        	
        	'invoiceDataCode',//发票号
        	'accountSubjectId',//核算科目id
        	'accountSubjectName',//核算科目名称
        	'taxAmount',//本次使用金额（税额）
        	'thisNotTaxMoney',//本次使用金额（不含税）
        	
        	'invoiceTypeName',//发票类型名称
        	
        	'goodserviceName',//货物或劳务名称
        	'businessName',//商户名称
        	'billingTime',//日期
        	'excludingTaxMoney',//票据金额（不含税）-金额
        	'taxRate',//税率
        	'taxMoney',//税额
        	'billingMoney',//票据金额
        	'thisEmployMoney',//本次使用金额（含税）
        	'budgetBody',//
        	'costSubject',//
        	'fundType',
        	'apportionedAmount'// 分摊金额
        	];
		var tax = $('.tax').html(),
		taxIncludedAmount = $('.taxIncludedAmount').html(),
		amountUsed = $('.amountUsed').val(),
		budgetBody = $('.budgetBody').val(),
		costSubject = $('.costSubject').val(),
		apportionedAmount = $('.apportionedAmount').val(),
		businessTripDay   =$('.businessTripDay').html(),
		fundType = $('#allowance .fundTypeval').val(),
		amountUsed = $('.amountUsed').val();
		var concatobj =[{
				"invoiceTypeCode": '102',
				'invoiceTypeName':'误餐补助',//发票类型名称
//				"goodserviceName": businessTripDay,
				"excludingTaxMoney":taxIncludedAmount,
				"billingMoney":taxIncludedAmount,
				"thisEmployMoney": amountUsed,
				"budgetBody":budgetBody,
				"costSubject":costSubject,
				"fundType":fundType,
				"apportionedAmount":apportionedAmount,
				"TaxMoney": 0 ,
				'taxRate': 0,//税率
	        	'taxMoney': 0,//税额
		}]
		console.log(concatobj)
	    var itemList = [];
	    var key = '';
	    var key2 = '';
	    var key3 = ''; 
	    $('.details_box').children().each(function(index,element){
	        var num=index+1;
	        key="listItem"+num;
	        itemList[key] = {};
	        $(element).find('.stay_ul').find('input').each(function(index2,element2){
	            itemList[key][listItem[index2]] = $(element2).prop('value');
	            console.log(itemList[key][listItem[index2]])
	        })
	    });
	    var list = [];
	    for (var index in itemList) {
	    	list.push(itemList[index]);
	    }
	    console.log(list)
	    // 冲账参数
	    var balanceList = [];
	    var balanceItem = [
	    	'borrowId',                 //新增时当前冲账明细的id
	    	'theme',                    //主题
	    	'borrowMoney',              //借款金额
	    	'waitReversalMoney',        //已冲账金额
	    	'haveReversalMoney',        //待冲账金额
	    	'thisReversalMoney',        //本次冲账金额
        	];
	    $('#balanceDom').children().each(function(index,element){
	       var num=index+1;
	        key="balanceItem"+num; 
	        balanceList[key] = {};
	        $(element).find('.stay_ul').find('input').each(function(index2,element2){
	        	balanceList[key][balanceItem[index2]] = $(element2).prop('value');
	            console.log(balanceList[key][balanceItem[index2]])
	        })
	    });
	    var ballist = [];
	    for (var a in balanceList) {
	    	ballist.push(balanceList[a]);
	    }
	    console.log(ballist	)
	    if(list == ""){
	    	var dataobjAjax = { 
    			'feeExpenseBillPO' : {
					"id":resultCode,
					'fdSid':fdSid,
	    			'fdOrgNameTree':fdOrgNameTree,
	    			'fdOrgSid':fdOrgSid
    			},
    			'feeExpenseInvoiceItemPOList' : concatobj ,
    			'fileNameUrl':JSON.stringify(source_fileNameUr_file),
        		'feeReversalItemPOlist':ballist
	    	}
	    }else{
	    	var listAll = list.concat(concatobj);
	    	console.log(listAll);
	    	//
	        var dataobjAjax = { 
    			'feeExpenseBillPO' : {
    					"id":resultCode,
    					'fdSid':fdSid,
    	    			'fdOrgNameTree':fdOrgNameTree,
    	    			'fdOrgSid':fdOrgSid
    			},
        		'feeExpenseInvoiceItemPOList':listAll,
        		'fileNameUrl':JSON.stringify(source_fileNameUr_file),
        		'feeReversalItemPOlist':ballist
        	}
	    }
	    console.log(dataobjAjax)
	    var resMoney = $('.resMoney').html();
	    var allMoney = $('.article i').html();
	    var balanceAllMoney = 0;
	    for(var m in ballist){
	    	var MoneyVal = ballist[m].thisReversalMoney;
            if(MoneyVal == ""){
                MoneyVal = 0;
            }
            balanceAllMoney+=parseFloat(MoneyVal);//加最后结果
	    }
	    if(checkFlag == 1 && ballist.length != 0 || checkFlag == 2 && ballist.length == 0){
			if(fdInitiatingProcess == '-1' && text == "提交" ){
				$('#next_step').removeAttr("disabled");	//移除disabled属性  
	 			$('#preserve').removeAttr("disabled"); //移除disabled属性  
	 			$(".loading").fadeOut();
	    		var msg='对不起,该岗位无发起流程权限！';
	    		cueFrame(msg);
			}else{
				if(allMoney < balanceAllMoney && text == "提交" ){
					$('#next_step').removeAttr("disabled");	//移除disabled属性  
		 			$('#preserve').removeAttr("disabled"); //移除disabled属性  
					var msg='对不起,冲账金额不能大于报销金额！';
		    		cueFrame(msg);
				}else{
					$(".loading").fadeIn();
					$.ajax({ 
				         url: Url ,
				         type : 'POST',
				         dataType: 'json',
				         contentType : 'application/json;charset=UTF-8',
				         data : JSON.stringify(dataobjAjax),
				         success: function (data) {
				        	 console.log(data)
				         	 if (data.resultCode == 0) {
				         		window.location.href=hrefUrl;
				            }else{
				            	$('#next_step').removeAttr("disabled");	//移除disabled属性  
				 	 			$('#preserve').removeAttr("disabled"); //移除disabled属性  
				 	 			$(".loading").fadeOut();
				 	 			var msg = data.message;
				 	    		cueFrame(msg);
				             }
				         }
				    })
				}
			}
		}else if(checkFlag == 1 && ballist.length == 0 ){
			$('#next_step').removeAttr("disabled");	//移除disabled属性  
 			$('#preserve').removeAttr("disabled"); //移除disabled属性  
 			$(".loading").fadeOut();
 			var msg = '对不起，请添加冲账明细！';
    		cueFrame(msg);
		}
	}
	// 开票日期
    var theme = "ios";
    var mode = "scroller";
    var display = "bottom";
    var lang="zh";
    var currYear = (new Date()).getFullYear();
    $('#billingTime').mobiscroll().date({
        theme: theme,
        mode: mode,
        display: display,
        lang: lang,
        dateFormat:"yy-mm-dd",
        onSelect:function(valueText, inst){
            $(".train_date").hide();
        }
    });
})
