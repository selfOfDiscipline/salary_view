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
	var uuId = getUrlParam('uuId');
	var bouncedTime = 0 ;//  判断是否点击时间弹出框
	var initTimeDraughtstart ; //默认开始时间
	var initTimeDraughtend ;//默认开始时间
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r!=null) return unescape(r[2]);
		return null; //返回参数值
	};
	// 根据驳回状态判断是否显示 + 
	var rejectedType = localStorage.getItem('rejectedType');// 驳回状态
//	var rejectedType = '1'
	if(rejectedType == '1'){
//		$('.cancel_draught').hide();
		$('.details').css('pointer-events','none');
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
         	url: sy + 'travelapplication/getTravelApplication/'+uuId,
 			type : 'get',
 			dataType: 'json',
 //			jsonpCallback: "onBack",
 			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data)
            	if(data.resultCode == 0){
            		var user = data.result.travelApplication;
            		localStorage.setItem('fdOrgSid', user.fdOrgSid);
            		localStorage.setItem('fdSid', user.fdSid);
            		var subuser = data.result.user;
            		var src="" ;
            		var sac="" ;
            		var str="" ;
            		var stt="" ;
            		var lsr="" ;
            		var fileNameUrl = data.result.travelApplication.fileNameUrl
            		localStorage.setItem("fileNameUrl", JSON.stringify(fileNameUrl));
            		console.log(user.responsibleDate);
//            		// 根据职级判断条线类型
//          			if(user.rankType == 'M2'||user.rankType == 'M3'){
//          				$('.linear_type_click').show();
//          				var newObj = {1: "营销、设计、成本、运营、工程、客观专业条线 M3以上", 2: "其他条线 M3以上"};
//          				for (var val in newObj) {
//          					if( newObj[val] == user.businessLineType){
//          						lsr+='<li class="pitch clearfix">'
//          							 +'<div class="rankleft">'
//          								 +'<h3 class="rankTypelinear">'+ newObj[val]+'</h3>'
//          							 +'</div>'
//          							 +'<div class="rankright">'
//          								 +'<img class="no_selected" src="../../img/selected.png">'
//          							 +'</div>'
//          						  +'</li>'
//          					}else{
//          						lsr+='<li class="pitch clearfix">'
//          							 +'<div class="rankleft">'
//          								 +'<h3>'+ newObj[val]+'</h3>'
//          							 +'</div>'
//          							 +'<div class="rankright">'
//          								 +'<img class="no_selected" src="../../img/no_selected.png">'
//          							 +'</div>'
//          						  +'</li>'
//          					}
//          					$('.linear_ul').html(lsr);
//          				}
//    					$('.linearVal').html(user.businessLineType);
//          			}
          			//经办部门赋值
                    businessLineType = data.result.businessLineType;
                    for (var val in businessLineType) {
                    	if(user.organizationId == businessLineType[val].companyFullId ){
                    		stt+='<li class="pitch clearfix">'
                                +'<div class="rankleft">'
                                    +'<h3  class="rankTypebusines" id="'+ businessLineType[val].companyFullId+'" >'+ businessLineType[val].companyFullName +'</h3>'
                                +'</div>'
                                +'<div class="rankright">'
                                    +'<img class="no_selected" src="../../img/selected.png">'
                                +'</div>'
                            +'</li>'
                    	}else{
                    		stt+='<li class="pitch clearfix">'
                                +'<div class="rankleft">'
                                    +'<h3 id="'+ businessLineType[val].companyFullId+'" >'+ businessLineType[val].companyFullName +'</h3>'
                                +'</div>'
                                +'<div class="rankright">'
                                    +'<img class="no_selected" src="../../img/no_selected.png">'
                                +'</div>'
                            +'</li>'
                    	}
                        
                    }
                    $('.business_ul').html(stt);
                    var businessVal = $('.ranktype_ul li .rankTypebusiness').html();
                    var businessValuuId = $('.ranktype_ul li .rankTypebusiness').attr('id');
                    $('.businessVal').html(businessVal);
                    $('.businessVal').attr('uuid',businessValuuId);
                    $('.businessVal').html(user.organization);
                    $('.businessVal').attr('uuid',user.organizationId);
            		//预算主体赋值
          			budgetDeparval = data.result.budgetDepar;
                    for (var val in budgetDeparval) {
                        src+='<li class="pitch clearfix">'
                            +'<div class="rankleft">'
                                +'<h3 id="'+ budgetDeparval[val].id+'" >'+ budgetDeparval[val].budgetDepartmentName +'</h3>'
                            +'</div>'
                            +'<div class="rankright">'
                                +'<img class="no_selected" src="../../img/no_selected.png">'
                            +'</div>'
                        +'</li>'
                    };
                    $('.ranktype_ul').html(src);
                    $('.ranktype_ul #'+ user.budgetBody).attr('class','rankType');
                    $('.ranktype_ul #'+ user.budgetBody ).parent().siblings().children('img').attr('src','../../img/selected.png');
                    var rankType = $('.ranktype_ul li .rankType').html();
                    var rankTypeuuId = $('.ranktype_ul li .rankType').attr('id')
                    $('.rankTypeVal').html(rankType);
                    $('.rankTypeVal').attr('uuid',rankTypeuuId);
                    $('.rankTypeVal').html(user.budgetBodyName);
                    $('.rankTypeVal').attr('uuid',user.budgetBody);
                    //法人公司赋值
                    corporation = data.result.formationFormPO;
                    for (var val in corporation) {
                        console.log(corporation[val].id);
                        sac+='<li class="pitch clearfix">'
                            +'<div class="rankleft">'
                                +'<h3 id="'+ corporation[val].id+'" code="'+ corporation[val].companyCode+'" >'+ corporation[val].name +'</h3>'
                            +'</div>'
                            +'<div class="rankright">'
                                +'<img class="no_selected" src="../../img/no_selected.png">'
                            +'</div>'
                        +'</li>'
                    }
                    $('.corporation_ul').html(sac);
                    $('.corporation_ul #'+ user.lawCompanyId).attr('class','rankTypecom');
                    $('.corporation_ul #'+ user.lawCompanyId ).parent().siblings().children('img').attr('src','../../img/selected.png');
                    var corporation = $('.corporation_ul li .rankTypecom').html();
                    var corporationuuId = $('.corporation_ul li .rankTypecom').attr('id');
                    $('.corporation').html( corporation );
                    $('.corporation').attr( 'uuid',corporationuuId );
                    $('.corporation').html(user.lawCompanyName); 
                    $('.corporation').attr('uuid',user.lawCompanyId);
                    //费用科目赋值
                    subject = data.result.subject;
                    for (var val in subject) {
                        console.log(subject[val].id);
                        str+='<li class="pitch clearfix">'
                            +'<div class="rankleft">'
                                +'<h3 id="'+ subject[val].id+'" >'+ subject[val].subjectName +'</h3>'
                            +'</div>'
                            +'<div class="rankright">'
                                +'<img class="no_selected" src="../../img/no_selected.png">'
                            +'</div>'
                        +'</li>'
                    }
                    $('.subject_ul').html( str);
                    $('.subject_ul #'+ user.expenseAccount).attr('class','rankTypesub');
                    $('.subject_ul #'+ user.expenseAccount ).parent().siblings().children('img').attr('src','../../img/selected.png');
                    var subjectVal = $('.subject_ul li .rankTypesub').html();
                    var subjectValuuId = $('.corporation_ul li .rankTypesub').attr('id');
                    $('.subjectVal').html(subjectVal);
                    $('.subjectVal').attr('uuid',subjectValuuId );
                    $('.subjectVal').html(user.expenseAccountName );
                    $('.subjectVal').attr('uuid',user.expenseAccount );
          			
            	}	
            	var budgetBody = user.budgetBody
            	var expenseAccount = user.expenseAccount
            	initMoney(budgetBody,expenseAccount)
        		$('.Datenew').html(user.responsibleDate);//经办时间赋值
				$('.datetimestart').val(user.businessTripBeginDate);//开始时间赋值
				$('.datetimeend').val(user.businessTripEndDate);//结束时间赋值
				$('.subjectName').html(subuser.subjectName);
				$('.subjectName').attr('uuid',subuser.subjectId);
				$('.themeval').val(user.theme);
				$('.reason').val(user.remark);
				$('.grade').html(user.rankType);
				$('.subjectVal').html(user.expenseAccountName);
				$('.rankTypeVal').html(user.budgetBodyName);
				$('.businessVal').html(user.organization);//经办部门
				$('.business_trip_money').val(user.businessTripMoney);
				$('.travelday').html(user.businessTripDay)
				companyName = user.companyName;
      			companyId = user.companyId;
      			name = user.responsiblePersonName;
      			loginName = user.responsiblePersonId;
      			deptName = user.departmentName;
      			deptId = user.departmentId;
      			initTimeDraughtstart = user.businessTripBeginDate;
      			initTimeDraughtend = user.businessTripEndDate;
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
	//	点击删除此草稿
	$('.cancel_draught').click(function(){
        $(".delete_warn").fadeToggle();
        $(".delete_warn,.cancel_delete").click(function(){
            $(".delete_warn").hide();
        });
        var that = $(this);
        $(".confirm_deletion").click(function(){
        	$(".loading").fadeIn();
    		$.ajax({
    			url: sy() + "/travelapplication/deleteTravel/"+uuId,
    			type : 'GET',
    			dataType: 'json',
                success: function (data) {
                	console.log(data);
                	if(data.resultCode == 0){
                		window.location.href=" draught.html";
                	}else{
                		$(".loading").fadeOut();
                		var msg= "对不起，删除失败！"
                		cueFrame(message)
                	}
                }
    	    })
        });
	});
	//点击预算主体
	$('body').on('click', '.rank_rgba_click',function(){
		if(budgetDeparval){
			$('.rank_rgba').css('display','block')
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
		var rankTypeuuId =$(this).children('.rankleft').children('.rankType').attr('id');
		$('.rankTypeVal').html(rankType);
		$('.rankTypeVal').attr('uuid',rankTypeuuId);
		budgetId = $('.rankType').attr('id');//主体id	
		subjectId = $('.rankTypesub').attr('id');//费用科目id
		initMoney(budgetId,subjectId)
	})
	$('.rank_rgba').click(function(){
		$('.rank_rgba').hide();
	});
	//点击法人公司
	$('body').on('click', '.corporation_fix_click',function(){
		$('.corporation_fix').css('display','block')
	});
	$('body').on('click','.corporation_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypecom'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypecom');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankTypecom').html();
		var rankTypeuuId =$(this).children('.rankleft').children('.rankTypecom').attr('id');
		$('.corporation').html(rankType);
		$('.corporation').attr('uuid',rankTypeuuId);
	})
	$('.corporation_fix').click(function(){
		$('.corporation_fix').hide();
	});
	//点击费用科目
	$('body').on('click', '.subject_fix_click',function(){
		$('.subject_fix').css('display','block')
	});
	$('body').on('click','.subject_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypesub'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypesub');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankTypesub').html();
		var rankTypeuuId =$(this).children('.rankleft').children('.rankTypesub').attr('id');
		$('.subjectVal').html(rankType);
		$('.subjectVal').attr('uuid',rankTypeuuId);
		budgetId = $('.rankType').attr('id');//主体id	
		subjectId = $('.rankTypesub').attr('id');//费用科目id
		initMoney(budgetId,subjectId)
	})
	$('.subject_fix').click(function(){
		$('.subject_fix').hide();
	});
	// 点击经办部门
	$('body').on('click', '.service_bar_type',function(){
		$('.business_fix').css('display','block')
	});
	$('body').on('click','.business_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankTypebusines'); 
		$(this).children('.rankleft').children('h3').addClass('rankTypebusines');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		var rankType =$(this).children('.rankleft').children('.rankTypebusines').html();
		var rankTypeuuId =$(this).children('.rankleft').children('.rankTypebusines').attr('id');
		$('.businessVal').attr('uuid',rankTypeuuId);
		$('.businessVal').html(rankType);
	})
	$('.business_fix').click(function(){
		$('.business_fix').hide();
	}); 
	// 线性类型
	$('body').on('click', '.linear_type_click',function(){
		$('.linear_fix').css('display','block')
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
	    if(loginName){
	    	$.ajax({ 
	        	url: sy() + "/travelapplication/checkDays/"+datetimestart+"/"+datetimeend+"/"+ loginName,
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
	    }
	})
	// 根据驳回状态判断是否可修改金额
	var rejectedType = localStorage.getItem('rejectedType');// 驳回状态
	if(rejectedType == '1'){
		$('.content_bottom').css('pointer-events','none')
	}
	//点击下一步
	var hrefUrl = "";
	$('#next_step').click(function(){
		hrefUrl = 'check_newApply.html?uuId='+ uuId;
		$('#next_step').attr('disabled',"true");//添加disabled属性   
		preserveAjax(hrefUrl);
		
	});
	//点击保存至草稿
	$('#preserve').click(function (){
		$('#preserve').attr('disabled',"true");//添加disabled属性 
		hrefUrl = 'draught.html';
		preserveAjax(hrefUrl);
	});
	function preserveAjax(hrefUrl){
		var Datenew              = $('.Datenew').html();//经办日期
	    var datetimestart        = $('.datetimestart').val();//出差开始时间
	    var datetimeend          = $('.datetimeend').val();//出差结束日期
	    var travelday            = $('.travelday').html();//出差天数
	    var theme                = $('.themeval').val();//主题
	    var reason               = $('.reason').val();//事由
	    var rankType             = $('.rankTypeVal').html();//预算主体
	    var budgetDepartmentId   = $('.rankTypeVal').attr('uuid');//预算主体id
	    var rankTypecomid        = $('.corporation').attr('uuid'); //法人公司id
	    var rankTypecomcode      = $('.rankTypecom').attr('code'); //法人公司code
	    var rankTypecom          = $('.corporation').html(); //法人公司名
		var subjectName          = $('.subjectVal').html();//费用科目
		var subjectId            = $('.subjectVal').attr('uuid');//费用科目id
		var grade                = $('.grade').html();
		var businessSurplusMoney = $('.business_surplus_money').html(); //当前预算剩余
		var businessTripMoney    = $('.business_trip_money').val(); //本次使用预估
		var organization         = $('.businessVal').html();//经办部门
		var organizationId       = $('.businessVal').attr('uuid');//经办部门id
//		var businessLineType     = $('.rankTypelinear').html();//线性类型
		var budgetSurplus      = $('.business_surplus_money').html();//出差单中的预算剩余
		if(businessLineType){
			
		}else{
			businessLineType = "";
		}
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
					"organizationId":organizationId,
//					"businessLineType":businessLineType,
					"id":uuId
				}
		console.log(dataobj);
		$(".loading").fadeIn();
		var count
		if(rejectedType == '1'){
			count = 1 ;
		}else{
			if(new Date(initTimeDraughtstart.replace(/-/g, "/"))- new Date(datetimestart.replace(/-/g, "/")) == 0 && new Date(initTimeDraughtend.replace(/-/g, "/"))- new Date(datetimeend.replace(/-/g, "/")) == 0){
				var datetimestart = $('.datetimestart').val();//出差开始时间
			    var datetimeend   = $('.datetimeend').val();//出差结束日期
			    if(loginName){
			    	$.ajax({ 
			        	url: sy() + "/travelapplication/checkDays/"+datetimestart+"/"+datetimeend+"/"+ loginName,
						type : 'GET',
						dataType: 'json',
						async : false,
						contentType : 'application/json;charset=UTF-8',
			            success: function (data) {
			            	console.log(data.result);
			            	if(data.resultCode == 0){
			            		$('.count').attr('uuid','1');
			            		$('.travelday').html(data.result)
//			            		bouncedTime = 1;
			            	}else{
			            		var msg = data.message;
			            		cueFrame(msg)
			            	}
			            }
				    })
			    }
			};
			count = $('.count').attr('uuid');
		}
		if(count == '1' ){
			if(reason && theme && businessTripMoney ){
				if(rankTypecom && subjectName && rankType ){//法人公司
					//预估金额不能大于可用金额
//					if(parseFloat(businessTripMoney) < parseFloat(businessSurplusMoney)){
						$.ajax({ 
							url: sy + 'travelapplication/saveUpdateTravelapplication',
							type : 'POST',
							dataType: 'json',
							contentType : 'application/json;charset=UTF-8',
							data:JSON.stringify(dataobj),
				            success: function (data) {
				            	console.log(data)
				            	var result = data.result;
				            	if(data.resultCode == 0){
				            		localStorage.setItem("temp2",result);
				                	localStorage.setItem("temp", JSON.stringify(dataobj));
				                	window.location.href= hrefUrl ;
				            	}
				            }
						})
//					}else{
//						$(".loading").fadeOut();
//						$('#next_step').removeAttr("disabled");	//移除disabled属性  
//						$('#preserve').removeAttr("disabled"); //移除disabled属性  
//						var msg= '对不起，您的预估金额大于可用金额'
//				        cueFrame(msg)
//					}
				}else{
					$(".loading").fadeOut();
					var msg= '请选择完整后再进行下一步'
				    cueFrame(msg);
				}
				
			}else{
				$(".loading").fadeOut();
				$('#next_step').removeAttr("disabled"); //移除disabled属性  
				$('#preserve').removeAttr("disabled"); //移除disabled属性  
				var msg= '请填写完整'
	        	cueFrame(msg)
			}
		}else{
			$(".loading").fadeOut();
			$('#next_step').removeAttr("disabled"); //移除disabled属性  
			$('#preserve').removeAttr("disabled"); //移除disabled属性  
			var msg= '请计算出差天数'
        	cueFrame(msg)
		}
	};
 // 时间 
	function Appendzero(obj){
        if(obj<10) return "0" +""+ obj;
        else return obj;
   	};
   	var timeStart = $('.timestartClass:last');
	var timeEnd = $('.timeendClass:last')
	TimeInit(timeStart);
	TimeInit(timeEnd);
   	function TimeInit(el){
   		var theme = "ios";
   	    var mode = "scroller";
   	    var display = "bottom";
   	    var lang="zh";
   		var currYear = (new Date()).getFullYear();
   		//开始时间
   		el.mobiscroll().datetime({
   	        theme: theme,
   	        mode: mode,
   	        display: display,
   	        lang: lang,
   	        dateFormat:"yy-mm-dd",
//   	   	minDate: new Date(2012,00,00,23,30),
   	        maxDate: new Date(2100,11,31,23,30),
   	        stepMinute: 30
   	    });
   	}
//    var theme = "ios";
//    var mode = "scroller";
//    var display = "bottom";
//    var lang="zh";
//	var currYear = (new Date()).getFullYear();
//	//开始时间
//    $('#demo_datetime').mobiscroll().datetime({
//        theme: theme,
//        mode: mode,
//        display: display,
//        lang: lang,
//        dateFormat:"yy-mm-dd",
////   	minDate: new Date(2012,00,00,23,30),
//        maxDate: new Date(2100,11,31,23,30),
//        stepMinute: 30
//    });
//    //结束时间
//    $('#demo_datetime_end').mobiscroll().datetime({
//        theme: theme,
//        mode: mode,
//        display: display,
//        lang: lang,
//        dateFormat:"yy-mm-dd",
////   	minDate: new Date(2012,00,00,23,30),
//        maxDate: new Date(2100,11,31,23,30),
//        stepMinute: 30
//    });
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes(); 
	var seconds = date.getSeconds(); 
	var Datenew = year +'-'+ Appendzero(month) +'-'+ Appendzero(day);
	var onlyDate = year +'-'+ Appendzero(month) +'-'+ Appendzero(day) +' '+ Appendzero(hours) +':'+ Appendzero(minutes);
})