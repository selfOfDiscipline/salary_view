$(function(){
	var budgetDeparval = ""; //预算主体
	var corporation = ""; //法人公司
	var subject = ""; //费用科目
	var businessLineType = ''; //条线类型
	var budgetId = "";
	var subjectId = "";
	var companyName = '';//经办公司
	var companyId   = '';//经办公司id
	var deptName    = '';//经办部门
	var deptId      = '';//经办部门id
    var name        = '';//经办人名称,出差人名
    var loginName   = '';//经办人id,出差人id;
	init(); 
	function init(gettravel){
 		$.ajax({
         	url: sy + 'travelapplication/getUserInfo',
 			type : 'get',
 			dataType: 'json',
 			async: false, 
 			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data)
            	if(data.resultCode == 0){
            		var user = data.result.user;
            		var src = "" ;
            		var sac = "" ;
            		var str = "" ;
            		var stt = "" ;
          			companyName = user.companyName;
          			companyId = user.companyId;
          			name = user.responsiblePersonName;
          			loginName = user.responsiblePersonId;
          			deptName = user.departmentName;
          			deptId = user.deptId;
          			$('.subjectName').html(user.subjectName);
          			$('.subjectName').attr('uuid',user.subjectId);
          			$('.grade').html(user.grade);//职级类型
          			$('.name').html(user.name);
          			// 根据职级判断条线类型
//          			if(user.grade == 'M2'||user.grade == 'M3'){
//          				$('.linear_type_click').show();
//          				$(".linear_ul li:first").children().children('h3').attr('class','rankTypelinear');
//    					$(".linear_ul li:first").children().children('img').attr('src','../../img/selected.png');
//    					var linearVal = $('.linear_ul li .rankTypelinear').html();
//    					$('.linearVal').html(linearVal);
//          			}
          			//预算主体赋值
          			budgetDeparval = data.result.budgetDepar;
          			for (var val in budgetDeparval) {
          				src+='<li class="pitch clearfix ">'
          					 +'<div class="rankleft">'
          						 +'<h3 uuid="'+ budgetDeparval[val].id+'" >'+ budgetDeparval[val].budgetDepartmentName +'</h3>'
          					 +'</div>'
          					 +'<div class="rankright">'
          						 +'<img class="no_selected" src="../../img/no_selected.png">'
          					 +'</div>'
          				  +'</li>'
          			}
					$('.ranktype_ul').html(src);
					$(".ranktype_ul li:first").children().children('h3').attr('class','rankType');
					$(".ranktype_ul li:first").children().children('img').attr('src','../../img/selected.png');
					var rankType = $('.ranktype_ul li .rankType').html();
					$('.rankTypeVal').html(rankType);
          			 //法人公司赋值
					corporation = data.result.corporation;
         			 for (var val in corporation) {
         				 console.log(corporation[val].id);
         				 sac+='<li class="pitch clearfix ">'
         					 +'<div class="rankleft">'
         						 +'<h3 uuid="'+ corporation[val].id+'" code="'+ corporation[val].companyCode+'" >'+ corporation[val].name +'</h3>'
         					 +'</div>'
         					 +'<div class="rankright">'
         						 +'<img class="no_selected" src="../../img/no_selected.png">'
         					 +'</div>'
         				  +'</li>'
         			 }
         			 $('.corporation_ul').html(sac);
         			 $(".corporation_ul li:first").children().children('h3').attr('class','rankTypecom');
         			 $(".corporation_ul li:first").children().children('img').attr('src','../../img/selected.png');
         			 var corporation = $('.corporation_ul li .rankTypecom').html();
         			$('.corporation').html(corporation);
         			//费用科目赋值
         			subject = data.result.subject;
					for (var val in subject) {
						console.log(subject[val].id);
						str+='<li class="pitch clearfix ">'
							 +'<div class="rankleft">'
								 +'<h3 uuid="'+ subject[val].id+'" >'+ subject[val].subjectName +'</h3>'
							 +'</div>'
							 +'<div class="rankright">'
								 +'<img class="no_selected" src="../../img/no_selected.png">'
							 +'</div>'
						  +'</li>'
					}
					$('.subject_ul').html(str);
					$(".subject_ul li:first").children().children('h3').attr('class','rankTypesub');
					$(".subject_ul li:first").children().children('img').attr('src','../../img/selected.png');
					var subjectVal = $('.subject_ul li .rankTypesub').html();
					$('.subjectVal').html(subjectVal);
					
      				$('.service_bar_type').show();
      				//经办部门
      				businessLineType = data.result.businessLineType;
          			for (var val in businessLineType) {
          				console.log(businessLineType[val].id);
          				stt+='<li class="pitch clearfix ">'
          					 +'<div class="rankleft">'
          						 +'<h3 uuid="'+ businessLineType[val].companyFullId+'" >'+ businessLineType[val].companyFullName +'</h3>'
          					 +'</div>'
          					 +'<div class="rankright">'
          						 +'<img class="no_selected" src="../../img/no_selected.png">'
          					 +'</div>'
          				  +'</li>'
          			}
					$('.business_ul').html(stt);
					$(".business_ul li:first").children().children('h3').attr('class','rankTypebusines');
					$(".business_ul li:first").children().children('img').attr('src','../../img/selected.png');
					var businessVal = $('.business_ul li .rankTypebusines').html();
					$('.businessVal').html(businessVal);
            	}
        		budgetId = $('.rankType').attr('uuid');//主体id	
        		subjectId = $('.rankTypesub').attr('uuid');//费用科目id
        		initMoney(budgetId,subjectId)
        		$(".loading").fadeOut();
            }
 		})
	};
	function initMoney(budgetId,subjectId){
		$.ajax({
			url: sy() + "/travelapplication/getDepartmentMoney/"+budgetId+"/"+subjectId,
			type : 'GET',
			dataType: 'json',
//			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data.result);
            	if(data.resultCode == 0){
            		var resMoney = data.result
            		$('.business_surplus_money').html(resMoney);
            	}
//            	$(".loading").fadeOut();
            }
	    })
	};
	//点击预算主体
	$('body').on('click', '.rank_rgba_click',function(){
		if(budgetDeparval){
			$('.rank_rgba').show()
		}else{
			var msg= '对不起，您没有可以选择的预算主体'
	    	cueFrame(msg)
		}
	});
	$('body').on('click','.ranktype_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankType'); 
		$(this).children('.rankleft').children('h3').addClass('rankType');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankType').html();
		console.log(rankType)
		$('.rankTypeVal').html(rankType);
		budgetId = $('.rankType').attr('uuid');//主体id	
		subjectId = $('.rankTypesub').attr('uuid');//费用科目id
		initMoney(budgetId,subjectId)
	})
	$('.rank_rgba').click(function(){
		$('.rank_rgba').hide();
	});
	
	
	//点击法人公司
	$('body').on('click', '.corporation_fix_click',function(){
		
			$('.corporation_fix').show()
		
	});
	$('body').on('click','.corporation_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypecom'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypecom');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankTypecom').html();
		console.log(rankType)
		$('.corporation').html(rankType);
	})
	$('.corporation_fix').click(function(){
		$('.corporation_fix').hide();
	});
	//点击费用科目
	$('body').on('click', '.subject_fix_click',function(){
		
		$('.subject_fix').show()
		
	});
	$('body').on('click','.subject_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypesub'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypesub');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankTypesub').html();
		console.log(rankType)
		$('.subjectVal').html(rankType);
		budgetId = $('.rankType').attr('uuid');//主体id	
		subjectId = $('.rankTypesub').attr('uuid');//费用科目id
		initMoney(budgetId,subjectId)
	})
	$('.subject_fix').click(function(){
		$('.subject_fix').hide();
	});
	// 经办部门
	$('body').on('click', '.service_bar_type',function(){
		if(businessLineType){
			$('.business_fix').show()
		}else{
			var msg= '对不起，您没有可以选择的经办部门'
	    	cueFrame(msg)
		}
	});
	$('body').on('click','.business_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypebusines'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypebusines');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankTypebusines').html();
		console.log(rankType)
		$('.businessVal').html(rankType);
	})
	$('.business_fix').click(function(){
		$('.business_fix').hide();
	});
	// 线性类型
	$('body').on('click', '.linear_type_click',function(){
		if(businessLineType){
			$('.linear_fix').show()
		}else{
			var msg= '对不起，您没有可以选择的线性类型'
	    	cueFrame(msg)
		}
	});
	$('body').on('click','.linear_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypelinear'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypelinear');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankTypelinear').html();
		console.log(rankType)
		$('.linearVal').html(rankType);
	})
	$('.linear_fix').click(function(){
		$('.linear_fix').hide();
	});
	// 校验天数
	$('.count').click(function(){
		var datetimestart = $('.datetimestart').val();//出差开始时间
	    var datetimeend   = $('.datetimeend').val();//出差结束日期
		$.ajax({ 
        	url: sy() + "/travelapplication/checkDays/"+datetimestart+"/"+datetimeend+"/"+loginName,
			type : 'GET',
			dataType: 'json',
			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data.result);
            	if(data.resultCode == 0){
            		$('.count').attr('uuid','1');
            		$('.travelday').html(data.result)
            	}else{
            		var msg = data.message;
            		cueFrame(msg)
            	}
            }
	    })
	})
	//点击下一步
	var hrefUrl = "";
	$('#next_step').click(function(){
		hrefUrl = 'newApply';
		$('#next_step').attr('disabled',"true");//添加disabled属性   
		preserveAjax(hrefUrl);
//		$(".loading").fadeIn();
	});
	//点击保存至草稿
	$('#preserve').click(function (){
		$('#preserve').attr('disabled',"true");//添加disabled属性 
		hrefUrl = 'draught';
		preserveAjax(hrefUrl);
//		$(".loading").fadeIn();
	});
	function preserveAjax(hrefUrl){
		
		var Datenew            = $('.Datenew').html();//经办日期
//		var companyName        = $('.companyName').html();//经办公司
//		var companyId          = $('.companyName').attr('uuid');//经办公司id
//		var deptName           = $('.deptName').html();//经办部门
//		var deptId             = $('.deptName').attr('uuid');//经办部门id
	    var datetimestart      = $('.datetimestart').val();//出差开始时间
	    var datetimeend        = $('.datetimeend').val();//出差结束日期
	    var travelday          = $('.travelday').html();//出差天数
	    var theme              = $('.themeval').val();//主题
//	    var name               = $('.name').val();//经办人名称,出差人名
//	    var loginName          = $('.name').attr('uuid');//经办人id,出差人id;
	    var rankType           = $('.rankType').html();//主体
	    var reason             = $('.reason').val();//事由
	    var budgetDepartmentId = $('.rankType').attr('uuid');//主体id
	    var rankTypecomid      = $('.rankTypecom').attr('uuid'); //法人公司id
	    var rankTypecomcode    = $('.rankTypecom').attr('code'); //法人公司code
	    var rankTypecom        = $('.rankTypecom').html(); //法人公司名
		var subjectName        = $('.rankTypesub').html();//费用科目
		var subjectId          = $('.rankTypesub').attr('uuid');//费用科目id
		var grade              = $('.grade').html();
		var businessSurplusMoney = $('.business_surplus_money').html(); //当前预算剩余
		var businessTripMoney  = $('.business_trip_money').val(); //本次使用预估
		var organization       = $('.rankTypebusines').html();//经办部门
		var organizationId     = $('.rankTypebusines').attr('uuid');//经办部门
//		var businessLineType   = $('.rankTypelinear').html();//线性类型
		var budgetSurplus      = $('.business_surplus_money').html();//出差单中的预算剩余
		if(businessLineType){
			organization 
		}else{
			businessLineType = "";
		}
//		alert(rankTypecomcode)
		var dataobj={
					"businessTripMoney": businessTripMoney ,//本次使用预估
					"companyId":companyId, //公司id
					"responsibleCompanyName":companyName,//经办公司
					"responsibleCompanyId":companyId,//经办公司id
					"lawCompanyId":rankTypecomid,//法人公司id
					"lawCompanyCode":rankTypecomcode,//法人公司code
					"lawCompanyName":rankTypecom,//法人公司名
					"subjectName" : subjectName,//费用科目
					"expenseAccount" : subjectId,//费用科目id
					"companyName"  : companyName ,//公司
					"departmentId" : deptId ,//经办部门id
					"departmentName" : deptName, //经办部门
					"theme" : theme ,//主题
					"budgetSurplus":budgetSurplus ,//预算剩余
					"responsiblePersonId" : loginName,
					"responsiblePersonName" : name ,
					"responsibleDepartmentId" : deptId ,
					"responsibleDepartmentName" : deptName,
					"responsibleCompanyId" : companyId,
					"responsibleCompanyName" : companyName,
					"responsibleDate" : Datenew,
					"businessTripPersonId" : loginName,
					"businessTripPersonName" : name,
					"remark" : reason,
					"businessTripBeginDate" : datetimestart,
					"businessTripEndDate" : datetimeend,
					"businessTripDay": travelday,
					"budgetBody" : budgetDepartmentId,
					"rankType":grade,
					"organization":organization,
					'organizationId':organizationId
//					"businessLineType":businessLineType
				}
		var count = $('.count').attr('uuid'); 
		console.log(budgetDepartmentId)
		if(count =='1'){
			if(reason && theme && businessTripMoney ){
				if(rankTypecom && subjectName && rankType ){//法人公司
//					if(parseFloat(businessTripMoney) <=parseFloat(businessSurplusMoney)){
						$(".loading").fadeIn();
						$.ajax({ 
				        	url: sy + 'travelapplication/insertTravelapplication',
							type : 'POST',
							dataType: 'json',
							contentType : 'application/json;charset=UTF-8',
							data:JSON.stringify(dataobj),
				            success: function (data) {
				            	console.log(data)
				            	var result = data.result;
				            	if(data.resultCode == 0){
				            		$(".loading").fadeIn();
				            		localStorage.setItem("temp2",result);
				                	localStorage.setItem("temp", JSON.stringify(dataobj));
				                	window.location.href= hrefUrl + ".html";
				            	}else{
				            		$(".loading").fadeOut();
				            		var msg= '新增失败'
				            		cueFrame(msg)
				            		$('#next_step').removeAttr("disabled");	//移除disabled属性  
				            		$('#preserve').removeAttr("disabled"); //移除disabled属性  
				            	}
				            }
						})
//					}else{
////						$(".loading").fadeOut();
//						$('#next_step').removeAttr("disabled");	//移除disabled属性  
//						$('#preserve').removeAttr("disabled"); //移除disabled属性  
//						var msg= '对不起，您的预估金额大于可用金额'
//				        cueFrame(msg)
//					}
				}else{
//					$(".loading").fadeOut();
					var msg= '请选择完整后再进行下一步'
				    cueFrame(msg);
					
				}
				
			}else{
//				$(".loading").fadeOut();
				$('#next_step').removeAttr("disabled"); //移除disabled属性  
				$('#preserve').removeAttr("disabled"); //移除disabled属性  
				var msg= '请填写完整'
	        	cueFrame(msg)
			}
		}else{
//			$(".loading").fadeOut();
			$('#next_step').removeAttr("disabled"); //移除disabled属性  
			$('#preserve').removeAttr("disabled"); //移除disabled属性  
			var msg= '请计算出差天数'
        	cueFrame(msg)
		}
	};
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
        e.stopPropagation();
    });	
    // 时间 
	function Appendzero(obj){
        if(obj<10) return "0" +""+ obj;
        else return obj;
   	};
    var theme = "ios",mode = "scroller", display = "bottom",lang="zh",currYear = (new Date()).getFullYear();
	//开始时间
    $('#demo_datetime').mobiscroll().datetime({
        theme: theme,
        mode: mode,
        display: display,
        lang: lang,
        dateFormat:"yy-mm-dd",
        maxDate: new Date(2100,11,31,23,30),
        stepMinute: 30
    });
    //结束时间
    $('#demo_datetime_end').mobiscroll().datetime({
        theme: theme,
        mode: mode,
        display: display,
        lang: lang,
        dateFormat:"yy-mm-dd",
        maxDate: new Date(2100,11,31,23,30),
        stepMinute: 30
    });
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes(); 
	var seconds = date.getSeconds(); 
	var Datenew = year +'-'+ Appendzero(month) +'-'+ Appendzero(day);
	var onlyDate = year +'-'+ Appendzero(month) +'-'+ Appendzero(day) +' '+ Appendzero(hours) +':'+ Appendzero(minutes);
	console.log(onlyDate);
	$('.Datenew').html(Datenew);
	$('#demo_datetime').val(onlyDate);	
	$('#demo_datetime_end').val(onlyDate);	
	// ios 弹出键盘兼容问题
	
	FocusiOS();
//	$('.reason').on('focusin', function () {
//		var u = navigator.userAgent, 
//			app = navigator.appVersion; 
//		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//		if(isiOS){
//			var clientHeight = document.body.clientHeight/2 - 40;
//            $(".btn_wrap").css("padding-top",clientHeight);
//            window.scrollTo(0,clientHeight); 
//		}
//	});
//	$(document).on('focusout', function () {
//		var u = navigator.userAgent,
//			app = navigator.appVersion; 
//		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//		if(isiOS){
//			$(".btn_wrap").css("padding-top","0px");
//			window.scrollTo(0,document.body.clientHeight);
//		}
//	});
	
})