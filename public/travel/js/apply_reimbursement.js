$(function(){
	localStorage.clear(); 
	var paymentCompanyId,paymentCompanyCode,paymentCompanyName//'付款单位Id,付款单位编码,付款单位名称
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
 	  //点击取消隐藏弹框
    $('.cancel').click(function(e){
        $('.Reminder').fadeToggle();
        e.stopPropagation()
    });
    // 点击任意位置弹框消失
    $('.Reminder').click(function(e){
        $('.Reminder').fadeToggle();
        e.stopPropagation()
    });
    var applicationCode = getUrlParam('applicationCode')
    var checkFlag = 1;// 是否冲账按钮
	init(uuId);
	function init(uuId){
 		$.ajax({ 
         	url: sy + 'travelReimburse/getTravelInfoById/'+uuId,
 			type : 'get',
 			dataType: 'json',
 //			jsonpCallback: "onBack",
 			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data);
	            if (data.resultCode == 0) {
	            	var result = data.result;
	            	var corporation= ""//银行
	            	var userId = data.result.businessTripPersonId;
	            	paymentCompanyId = data.result.lawCompanyId
	            	paymentCompanyCode = data.result.lawCompanyCode
	            	paymentCompanyName = data.result.lawCompanyName
	            	if( result ){
	            		$.ajax({ 
	                     	url: sy + 'travelReimburse/selectByOtherUserId/'+ userId,
	             			type :'get',
	             			dataType: 'json',
	             			contentType : 'application/json;charset=UTF-8',
	                        success: function (data) {
	                        	console.log(data)
	                        	if(data.resultCode == 0){
	                        		//收款银行赋值
	        						var corporation = data.result;
	        						var sac = "";
	        	         			for (var val in corporation) {
	        	         				console.log(corporation[val].id);
	        	         				
	        	         				sac+='<li class="pitch clearfix ">'
	        	         					+'<div class="rankleft">'
	        	         						+'<h3 uuid="'+ corporation[val].id+'" code="'+ corporation[val].account+'" >'+ corporation[val].bankName +'</h3>'
	        	         					+'</div>'
	        	         					+'<div class="rankright">'
	        	         						+'<img class="no_selected" src="../../img/no_selected.png">'
	        	         					+'</div>'
	        	         				 +'</li>'
	        	         			}
	        	         			console.log(sac)
	        	         			$('.corporation_ul').html(sac);
	        	         			$(".corporation_ul li:first").children().children('h3').attr('class','rankTypecom');
	        	         			$(".corporation_ul li:first").children().children('img').attr('src','../../img/selected.png');
	        	         			corporation = $('.corporation_ul li .rankTypecom').html();
	        	         			var srr="";
	        		            	srr+='<li>'
	        								+'经办人'
	        								+'<span class="detailsLeft">'
	        									+'<input type="text" placeholder="必填" name="name" id="name_val" uuid="'+ result.responsiblePersonId +'" value="'+ result.responsiblePersonName +'" class="name" disabled="disabled"/>'
	        								+'</span>'
	        							+'</li>'
	        							+'<li>'
	        								+'经办日期'
	        								+'<span class="detailsLeft">'
	        									+'<span class="deta_val Datenew">'+ result.responsibleDate +'</span>'
	        									+'<img class="corners_right" src="../../img/corners_right.png">'
	        								+'</span>'
	        							+'</li>'
	        							+'<li>'
	        								+'经办公司'
	        								+'<span class="detailsLeft">'
	        									+'<span class="deta_val companyName" uuid="'+ result.responsibleCompanyId +'">'+ result.responsibleCompanyName +'</span>'
	        								+'</span>'
	        							+'</li>'
	        							+'<li>'
	        								+'经办部门'
	        								+'<span class="detailsLeft">'
	        									+'<span class="deta_val deptName" uuid="'+ result.responsibleDepartmentId +'">'+ result.responsibleDepartmentName +'</span>'
	        								+'</span>'
	        							+'</li>'
	        							+'<li>'
	        								+'出差人'
	        								+'<span class="detailsLeft">'
	        									+'<input type="text"  uuid="'+ result.businessTripPersonId +'" placeholder="必填" name="name" id="" class="name" value="'+ result.businessTripPersonName +'" disabled="disabled"/>'
	        								+'</span>'
	        							+'</li>'
	        							+'<li>'
	        								+'出差开始时间'
	        								+'<span class="detailsLeft">'
	        									+'<input type="text" id="demo_datetime" class="detail_input datetimestart" readonly="readonly" value="'+ result.businessTripBeginDate +'" style="width: 4rem;border: none;text-align: right;"/>'
	        									+'<img class="corners_right" src="../../img/corners_right.png">'
	        								+'</span>'
	        							+'</li>'
	        							+'<li>'
	        								+'出差结束时间'
	        								+'<span class="detailsLeft">'
	        									+'<input type="text" id="demo_datetime_end" class="detail_input1 datetimeend" readonly="readonly"  value="'+ result.businessTripEndDate +'" style="width: 4rem;border: none;text-align: right;"/>'

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
	        									+'<span class="deta_val" uuid="">'+ result.rankType +'</span>'
	        								+'</span>'
	        							+'</li>'
	        							+'<li class="corporation_fix_click">'
	        								+'收款银行'
	        								+'<span class="detailsLeft">'
	        									+'<span class="deta_val corporation" uuid="">'+ corporation +'</span>'
	        									+'<img class="corners_right" src="../../img/corners_right.png">'
	        								+'</span>'
	        							+'</li>'
	        							+'<li class="balance">'
	        								+'是否冲账'
	        								+'<span class="detailsLeft">'
		        								+'<p class="checkBox" id="checkFlag">'
		        									+'<span class="checkButton"></span>'
		        								+'</p>'
	        								+'</span>'
	        							+'</li>'
	        							+'<li>'
	        								+'出差申请单'
	        								+'<span class="detailsLeft">'
	        									+'<span class="deta_val applicationCode">'+ applicationCode +'</span>'
	        								+'</span>'
	        							+'</li>'
	        							$('.details').html(srr);
	        			            	$('.themeval').val(result.theme);
	        			            	$('.reason').val(result.remark);
	        			            	$(".loading").fadeOut();
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
	                        	}
	                        }
	                    })
	            	}else{
	            		var msg = '对不起，没有相应数据'
						cueFrame(msg)
					}
				}else{
					cueFrame(data.message)
				}
            } 
 		})
	};
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
	//点击下一步
	var hrefUrl = "";
	var text = ""
	$('#next_step').click(function(){
		hrefUrl = "second_reimbursement.html?uuId="+ uuId+"&&state=0";
		text ="下一步";
		$('#next_step').attr('disabled',"true");//添加disabled属性   
		preserveAjax(hrefUrl);
	});
	//点击保存至草稿
	$('#preserve').click(function (){
		$('#preserve').attr('disabled',"true");//添加disabled属性 
		hrefUrl = "reimbursement.html";
		text = "保存";
		preserveAjax(hrefUrl);
	});
	//点击保存 ， 下一步的ajax
	function preserveAjax(hrefUrl){
		var Datenew            = $('.Datenew').html();//经办日期
		var companyName        = $('.companyName').html();//经办公司
		var companyId          = $('.companyName').data('uuid');//经办公司id
		var deptName           = $('.deptName').html();//经办部门
		var deptId             = $('.deptName').attr('uuid');//经办部门id
	    var datetimestart      = $('.datetimestart').val();//出差开始时间
	    var datetimeend        = $('.datetimeend').val();//出差结束日期
	    var travelday          = $('.travelday').html();//出差天数
	    var theme              = $('.themeval').val();//主题
	    var name               = $('.name').val();//经办人名称,出差人名
	    var loginName          = $('.name').attr('uuid');//经办人id,出差人id;
	    var reason             = $('.reason').val();//事由
	    var rankTypecomid      = $('.rankTypecom').attr('uuid'); //银行id
	    var rankTypecomcode    = $('.rankTypecom').attr('code'); //银行账号
	    var rankTypecom        = $('.rankTypecom').html(); //开户银行名称
//	    var applicationCode    = $('.applicationCode').html();
		var dataobj={	
				"feeExpenseBillPO":{
					"companyName"  : companyName ,
					"departmentId" : deptId ,
					"departmentName" : deptName,
					"theme" : theme ,
					"responsiblePersonId" : loginName,
					"responsiblePersonName" : name ,
					"responsibleDepartmentId" : deptId ,
					"responsibleDepartmentName" : deptName,
					"responsibleCompanyId" : companyId,
					"responsibleCompanyName" : companyName,
					"responsibleDate" : Datenew,
					"businessTripPersonId" : loginName,
					"businessTripPersonName" : name,
//					"rankType" : rankType, 
					"businessTripBeginDate" : datetimestart,
					"businessTripEndDate" : datetimeend,
					"businessTripDay": travelday,
					"description" : reason,
					"receiveCompanyType":1,
					"bankName":rankTypecom, //开户银行名称
					"bankAccount":rankTypecomcode, //银行账号
					"receiveBankId":rankTypecomid , //银行id
					"paymentCompanyId": paymentCompanyId,//'付款单位Id
					"paymentCompanyCode": paymentCompanyCode,//付款单位编码
					"paymentCompanyName":paymentCompanyName //付款单位名称
//					"applicationCode":applicationCode
					}
				}
		if( reason && theme ){
			if(rankTypecom){
				$(".loading").fadeIn();
				$.ajax({
		         	url: sy + 'travelReimburse/insertTravelReimburse/'+uuId,
				 	type : 'POST',
				 	dataType: 'json',
				 	contentType : 'application/json;charset=UTF-8',
				 	data:JSON.stringify(dataobj),
		            success: function (data) {
//		             	console.log(data);
		             	if (data.resultCode == 0) {
		             		localStorage.setItem('resultCode',JSON.stringify(data.result));
		             		localStorage.setItem('dataobj',JSON.stringify(dataobj));
		             		localStorage.setItem('checkFlag',checkFlag);
		             		window.location.href = hrefUrl;
		             	}else{
		             		$('#next_step').removeAttr("disabled");	//移除disabled属性  
		        			$('#preserve').removeAttr("disabled"); //移除disabled属性  
		             		$(".loading").fadeOut();
		            		var msg='对不起 , 新增失败！';
		            		cueFrame(msg);
		             	}
		            }
			    })
			}else{
	    		$('#next_step').removeAttr("disabled");	//移除disabled属性  
	 			$('#preserve').removeAttr("disabled"); //移除disabled属性  
	 			$(".loading").fadeOut();
	 			var msg = '收款单位/收款人银行联行号数据为空,请填写后再进行提交！';
	    		cueFrame(msg);
			}
			
		}else{
			$('#next_step').removeAttr("disabled");	//移除disabled属性  
			$('#preserve').removeAttr("disabled"); //移除disabled属性  
			$(".loading").fadeOut();
    		var msg='对不起,请填写完整！';
    		cueFrame(msg);
		}
		
	};
	
})