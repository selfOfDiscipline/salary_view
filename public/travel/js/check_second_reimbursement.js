/**
 * 点击已审核  未审核查看
 */
$(function(){
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r!=null) return unescape(r[2]);
		return null; //返回参数值
	};
	var uuId = getUrlParam('uuId');
	//上一页是否冲账标识
    var checkFlag = localStorage.getItem('checkFlag');
    if(checkFlag == 1){
    	$('.balance').show();
    }else if(checkFlag == 2){
    	$('.balance').hide();
    }
	if(checkFlag == 1){
    	$('.balance').show();
    }else if(checkFlag == 2){
    	$('.balance').hide();
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
    // 取出提交身份id
	var fdOrgNameTree  = localStorage.getItem('fdOrgNameTree');
	var businessTripDay  = localStorage.getItem('businessTripDay');//出差天数
//	var fdOrgSid = localStorage.setItem('fdOrgSid');
//	var fdSid = localStorage.setItem('fdSid');
	if(fdOrgNameTree == 'null'){
		fdOrgNameTree = '暂无提交身份';
	}else{
		fdOrgNameTree = fdOrgNameTree;
	}
    $('.identity_wrap span').html(fdOrgNameTree);
//    $('.identity_wrap span').attr('fdOrgSid',fdOrgSid);
//    $('.identity_wrap span').attr('fdSid',fdSid);
 	// 取出发票id
    init()
    function init(){
    	$.ajax({ 
         	url:sy + 'travelReimburse/getReimburseDetailById/'+uuId,
 			type : 'get',
 			dataType: 'json',
 			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
                console.log(data);
              	if (data.resultCode == 0) {
              		var res =data.result;
                    var stt="";
                    var str="";
                    var src = "";
                    var srl = "";
                    var oths = '';
                    var otherTypes = [];
                    var result= [];
                    var resultcho = [];
                    var resulttal = [];
                    var user = []
                    var budgetDeparval = [];
                    var rev = '';
                    var reversalItem = [];
                    for(var j in res){
                    	result = res['99'];
                    	resultcho = res['4'];
                    	user = res['user'];
                    	resulttal = res['102'];
                    	budgetDeparval = res['budgetDepar'];
                    	resultreversal = res['reversalItem'];
                    	otherTypes = res['otherTypes'];
                    }
                    if( otherTypes.length != 0 ){
                    	for(var oth in otherTypes){
                    		 oths+='<div class="stay_details">'
	     	    				    +'<ul class="stay_ul">'
		     	    				    +'<input type="hidden" class="" value="">'
		     	    			        +'<input type="hidden" class="" value="' + otherTypes[oth].id + '">'
		     	    			        +'<input type="hidden" class="" value="' + otherTypes[oth].invoiceTypeCode + '">'
		     	    			        +'<input type="hidden" class="" value="">'
		     	    			        +'<input type="hidden" class="" value="">'
		     	    			        +'<input type="hidden" class="" value="">'
		     	    			        +'<input type="hidden" class="" value="">'
		     	    			        +'<input type="hidden" class="" value="">'
		     	    			        +'<input type="hidden" class="" value="'+ otherTypes[oth].invoiceTypeName +'">'
		     	    			        +'<li>类型<span class="right_important black overnowrap">'+ otherTypes[oth].invoiceTypeName +'</span></li>'
		     	    			        +'<input type="hidden" class="" value="">'
		     	    			        +'<input type="hidden" class="" value="">'
		     	    			        +'<input type="hidden" class="" value="'+ otherTypes[oth].billingTime +'">'
		     	    			        +'<li>发生日期<span class="right_important black">'+ otherTypes[oth].billingTime +'</span></li>'
		     	    			        +'<input type="hidden" class="" value="'+ otherTypes[oth].billingMoney +'">'
		     	    			        +'<li>金额<span class="right_important black">¥'+ otherTypes[oth].billingMoney +'</span></li>'
		     	    			        +'<input type="hidden" class="" value="0.00">'
		     	    			        +'<li>税率<span class="right_important black">0.00%</span></li>'
		     	    			        +'<input type="hidden" class="" value="0.00">'
		     	    			        +'<li>税额<span class="right_important black">¥0.00</span></li>'
		     	    			        +'<input type="hidden" class="" value="'+ otherTypes[oth].billingMoney +'">'
		     	    			        +'<li>含税金额<span class="right_important black">¥'+ otherTypes[oth].billingMoney +'</span></li>'
		     	    			        +'<li class="black">本次使用金额<span class="right_important blue"><input type="text" value="'+  otherTypes[oth].thisEmployMoney+'" placeholder="0.00" class="resmoney" name="" id="allmoney"></span></li>'
		     	    			        +'<input type="hidden" class="" value="'+ otherTypes[oth].budgetBody +'">'
		     	    			        +'<li class="black">预算主体<img class="corners" src="../../img/corners_right.png"><span class="right_important rankTypeVal gray">'+ otherTypes[oth].budgetBodyName +'</span></li>'
		     	    			        +'<input type="hidden" class="costSubject" value="'+ otherTypes[oth].costSubject +'">'
		     	    			        +'<li class="black costClick">费用科目<img class="corners" src="../../img/corners_right.png"><span class="right_important gray costSubjectVal">'+ otherTypes[oth].costSubjectName +'</span></li>'
		     	    			        +'<input type="hidden" class="fundType" value="'+ otherTypes[oth].fundType+'">'
		     	    			        if( otherTypes[oth].fundType == 1 ){
		     	    			        	oths+='<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">住宿费</span></li>'
		     	    			        }else if(otherTypes[oth].fundType == 2){
		     	    			        	oths+='<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">交通费</span></li>'
		     	    			        }else if(otherTypes[oth].fundType == 3){
		     	    			        	oths+='<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">餐费</span></li>'
		     	    			        }else if(otherTypes[oth].fundType == 4){
		     	    			        	oths+='<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">其他</span></li>'
		     	    			        }
                    		            oths+='<li class="black">分摊金额<span class="right_important blue"><input type="text" value="'+ otherTypes[oth].apportionedAmount +'" placeholder="-11.00" class="sharemoney" name="" id="sharemoney"></span></li>'
		     	    			    +'</ul>'
	     	    			    +'<div class="delete_detail">删除明细</div>'
	     	    			+'</div>'
	                    }
                    	console.log(oths)
                    	$('#rest').html(oths);
                    }
                    //冲账dom
                    for(var r in resultreversal){
                    	rev+='<div class="stay_details">'
                            +'<ul class="stay_ul">'
                                +'<input type="hidden" class="" value="'+ resultreversal[r].id +'">'
                                +'<input type="hidden" class="" value="'+ resultreversal[r].borrowId +'">'
                                +'<input type="hidden" class="" value="'+ resultreversal[r].theme +'">'
                                +'<li>主题<span class="right_important black overnowrap">'+ resultreversal[r].theme +'</span></li>'
                                +'<input type="hidden" class="" value="'+ resultreversal[r].borrowMoney +'">'
                                +'<li>借款金额<span class="right_important black overnowrap">¥'+ resultreversal[r].borrowMoney +'</span></li>'
                                +'<input type="hidden" class="" value="'+ resultreversal[r].haveReversalMoney +'">'
                                +'<li>已冲账金额<span class="right_important black">¥'+ resultreversal[r].haveReversalMoney +'</span></li>'
                                +'<input type="hidden" class="remainMoney" value="'+ resultreversal[r].waitReversalMoney +'">'
                                +'<li>待冲账金额<span class="right_important black">¥'+ resultreversal[r].waitReversalMoney +'</span></li>'
                                +'<li>本次冲账金额<span class="right_important black"><input type="number" class="borrowMoney" value="'+ resultreversal[r].thisReversalMoney +'" placeholder="0.00" readonly></span></li>'
                                +'<li>申请人<span class="right_important black">'+ resultreversal[r].applicationPersonName +'</span></li>'
                                +'<li>申请部门<span class="right_important black">'+ resultreversal[r].applicationDepartmentName +'</span></li>'
                                +'<li>申请时间<span class="right_important black">'+ resultreversal[r].applicationDate +'</span></li>'
                          +'</ul>'
                          +'<div class="delete_detail balanceId" uuid="'+ resultreversal[r].borrowId +'">删除明细</div>'
                      +'</div>'
                    }
                    $('#balanceDom').append(rev);
                	for (var a in resulttal) {
                		var excludingTaxMoney = resulttal[a].excludingTaxMoney == null ? "" : resulttal[a].excludingTaxMoney ; 
                		srl+='<div class="stay_details" style="height: 6.5rem;">'
							+'<ul id="allowance">'
//								+'<li>出差天数<span class="right_important black businessTripDay">'+ businessTripDay +'</span></li>'
//								+'<li>每日餐补金额<span class="right_important black tax">'+ excludingTaxMoney +'</span></li>'
								+'<li>总金额<span class="right_important black taxIncludedAmount">'+ resulttal[a].billingMoney +'</span></li>'
								+'<li class="black">本次使用金额'
									+'<span class="right_important blue">'
										+'<input type="text" value="'+ resulttal[a].thisEmployMoney +'" placeholder="'+ resulttal[a].thisEmployMoney +'" class="resmoney amountUsed" name="" id="allmoney">'
									+'</span>'
								+'</li>'
	                            +'<input type="hidden" class="budgetBody" value="'+ resulttal[a].budgetBody +'">'
	                           	+'<li class="black rank_rgba_click">预算主题'
	                           		+'<img class="corners" src="../../img/corners_right.png">'
	                           		+'<span class="right_important rankTypeVal gray departmentName">'+ resulttal[a].budgetBodyName +'</span>'
	                           	+'</li>'
	                           +' <input type="hidden" class="costSubject" value="'+ resulttal[a].costSubject +'">'
	                           +' <li class="black costClick">费用科目'
	                            	+'<img class="corners" src="../../img/corners_right.png">'
	                            	+'<span class="right_important gray subject_pay">'+ resulttal[a].costSubjectName +'</span>'
	                            +'</li>'
	                            +'<input type="hidden" class="fundTypeval" value="5">'
	                            +'<li class="black fundType">款项类型'
	                           		+'<img class="corners" src="../../img/corners_right.png">'
	                           		+'<span class="right_important gray fundType">误餐补助</span>'
	                           	+'</li>'
	                            +'<li class="black">分摊金额'
		                            +'<span class="right_important blue">'
	                            		+'<input type="text" value="'+ resulttal[a].apportionedAmount +'" placeholder="0.00" class="sharemoney apportionedAmount inputFocus" name="" id="sharemoney">'
	                            	+'</span>'
	                           +' </li>'
							+'</ul>'
							+'<div class="delete_detail">删除明细</div>'
						+'</div>'
                    }
                	console.log(srl)
                    $('#allowance').html(srl)
        			$('.rankTypeVal').html(budgetDeparval[0].budgetDepartmentName);
        			$('.rankTypeVal').parents('.rank_rgba_click').prev('input').val(budgetDeparval[0].id);
                    if( result ){
//                    	sum+tax
                    	console.log(result);
                    	for(var obj in result){
                            stt+='<div class="stay_details">'
                                    +'<ul class="stay_ul">'
                                    	+'<input type="hidden" class="" value="'+ result[obj].sourceId +'">'
                                    	+'<input type="hidden" class="" value="'+ result[obj].invoiceTypeCode +'">'
                                        +'<input type="hidden" class="" value="'+ result[obj].id +'">'
	                                    +'<input type="hidden" class="" value="'+ result[obj].invoiceItemId +'">'
	                                    +'<input type="hidden" class="" value="">'
                                        +'<input type="hidden" class="" value="">'
                                        +'<input type="hidden" class="" value="">'
                                        +'<input type="hidden" class="" value="">'
                                        +'<input type="hidden" class="" value="">'
                                        +'<input type="hidden" class="" value="">'
                                        +'<input type="hidden" class="" value="'+ result[obj].goodserviceName +'">'
                                        +'<li>商户名称<span class="right_important black overnowrap" style="width: 6rem;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;text-align: right;">'+ result[obj].goodserviceName +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ result[obj].businessName +'">'
                                        +'<li>类别<span class="right_important black overnowrap" style="width: 6rem;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;text-align: right;">'+ result[obj].businessName +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ result[obj].billingTime +'">'
                                        +'<li>发生日期<span class="right_important black">'+ result[obj].billingTime +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ result[obj].excludingTaxMoney +'">'
                                        +'<li>金额<span class="right_important black">¥'+ result[obj].excludingTaxMoney +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ result[obj].taxRate +'">'
                                        +'<li>税率<span class="right_important black">'+ result[obj].taxRate * 100 +"%" +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ result[obj].taxMoney +'">'
                                        +'<li>税额<span class="right_important black">¥'+ result[obj].taxMoney +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ result[obj].billingMoney +'">'
                                        +'<li>含税金额    <span class="right_important black">¥'+ result[obj].billingMoney +'</span></li>'
                                        +'<li class="black">本次使用金额<span class="right_important blue"><input type="text" value="'+ result[obj].thisEmployMoney +'" placeholder="0.00" class="resmoney" name="" id="allmoney"></span></li>'
                                        +'<input type="hidden" class="" value="'+ result[obj].budgetBody+'">'
                                        +'<li class="black rank_rgba_click">预算主题<img class="corners" src="../../img/corners_right.png"><span class="right_important rankTypeVal gray">'+ result[obj].budgetBodyName +'</span></li>'
                                        +'<input type="hidden" class="subjectId" value="'+ result[obj].costSubject +'">'
                                        +'<li class="black costClick">费用科目<img class="corners" src="../../img/corners_right.png"><span class="right_important gray subject_pay">'+ result[obj].costSubjectName +'</span></li>'
                                        +'<input type="hidden" class="fundType" value="'+ result[obj].fundType +'">'//款项类型
                                        if(result[obj].fundType == '1'){
                                        	stt+='<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">住宿费</span></li>'
                                        }else if(result[obj].fundType == '2'){
                                        	stt+='<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">交通费</span></li>'
                                        }else if(result[obj].fundType == '3'){
                                        	stt+='<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">餐费</span></li>'
                                        }else if(result[obj].fundType == '4'){
                                        	stt+='<li class="black fundType accommodationFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">其他</span></li>'
                                        }
                            			stt+='<li class="black">分摊金额<span class="right_important blue"><input type="text" value="'+ result[obj].apportionedAmount +'" placeholder="0.00" class="sharemoney" name="" id="sharemoney"></span></li>'
                                  +'</ul>'
                                  +'<div class="delete_detail" uuid="'+ result[obj].id +'">删除明细</div>'
                            +'</div>'
                    	}
                    	$('#choochoo').append(stt);
                    };
                    if( resultcho ){
                    	console.log(resultcho);
                    	for(var i in resultcho){
                    		var a = resultcho[i].sum + resultcho[i].tax;
                    		var am =a.toFixed(2);
                            str+='<div class="stay_details">'
                            		+'<ul class="stay_ul">'
	                            		+'<input type="hidden" class="" value="'+ resultcho[i].sourceId +'">'
	                                	+'<input type="hidden" class="" value="'+ resultcho[i].invoiceTypeCode +'">'
	                                    +'<input type="hidden" class="" value="'+ resultcho[i].id +'">'
	                                    +'<input type="hidden" class="" value="'+ resultcho[i].invoiceItemId +'">'
		                                +'<input type="hidden" class="" value="">'
		                                +'<input type="hidden" class="" value="">'
		                                +'<input type="hidden" class="" value="">'
		                                +'<input type="hidden" class="" value="">'
		                                +'<input type="hidden" class="" value="">'
		                                +'<input type="hidden" class="" value="">'
                                        +'<input type="hidden" class="" value="'+ resultcho[i].goodserviceName +'">'
                                        +'<li>商户名称<span class="right_important black overnowrap" style="width: 6rem;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;text-align: right;">'+ resultcho[i].goodserviceName +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ resultcho[i].businessName +'">'
                                        +'<li>类别<span class="right_important black overnowrap" style="width: 6rem;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;text-align: right;">'+ resultcho[i].businessName +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ resultcho[i].billingTime +'">'
                                        +'<li>发生日期<span class="right_important black">'+ resultcho[i].billingTime +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ resultcho[i].excludingTaxMoney +'">'
                                        +'<li>金额<span class="right_important black">¥'+ resultcho[i].excludingTaxMoney +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ resultcho[i].taxRate +'">'
                                        +'<li>税率<span class="right_important black">'+ resultcho[i].taxRate * 100 +"%" +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ resultcho[i].taxMoney +'">'
                                        +'<li>税额<span class="right_important black">¥'+ resultcho[i].taxMoney +'</span></li>'
                                        +'<input type="hidden" class="" value="'+ resultcho[i].billingMoney  +'">'
                                        +'<li>含税金额    <span class="right_important black">¥'+ resultcho[i].billingMoney  +'</span></li>'
                                        +'<li class="black">本次使用金额<span class="right_important blue"><input type="text" value="'+ resultcho[i].thisEmployMoney +'" placeholder="0.00" class="resmoney" name="" id="allmoney"></span></li>'
                                        +'<input type="hidden" class="" value="'+ resultcho[i].budgetBody+'">'
                                        +'<li class="black rank_rgba_click">预算主体<img class="corners" src="../../img/corners_right.png"><span class="right_important rankTypeVal gray">'+ resultcho[i].budgetBodyName +'</span></li>'
                                        +'<input type="hidden" class="subjectId" value="'+ resultcho[i].costSubject +'">'
                                        +'<li class="black costClick">费用科目<img class="corners" src="../../img/corners_right.png"><span class="right_important gray subject_pay">'+ resultcho[i].costSubjectName +'</span></li>'
                                        +'<input type="hidden" class="fundType" value="'+ resultcho[i].fundType +'">'//款项类型
                                        if(resultcho[i].fundType == '1'){
                                        	str+='<li class="black fundType choochooFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">住宿费</span></li>'
                                        }else if(resultcho[i].fundType == '2'){
                                        	str+='<li class="black fundType choochooFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">交通费</span></li>'
                                        }else if(resultcho[i].fundType == '3'){
                                        	str+='<li class="black fundType choochooFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">餐费</span></li>'
                                        }else if(resultcho[i].fundType == '4'){
                                        	str+='<li class="black fundType choochooFundType">款项类型<img class="corners" src="../../img/corners_right.png"><span class="right_important gray fundTypeval">其他</span></li>'
                                        }
                    					str+='<li class="black">分摊金额<span class="right_important blue"><input type="text" value="'+ resultcho[i].apportionedAmount +'" placeholder="0.00" class="sharemoney" name="" id="sharemoney"></span></li>'
                                  +'</ul>'
                                  +'<div class="delete_detail" uuid="'+ resultcho[i].id +'">删除明细</div>'
                            +'</div>'
                    	}
                    	$('#accommodation').html(str);
                    }
              	}else{
            		cueFrame(data.message)
            	}
            	$(".loading").fadeOut();
            	calculateMoney()
            }
 		})
	};
	// 点击收起，展开
	$(".stay_text").click(function(){
		if($(this).siblings().children().css("display")=="none"){
			$(this).siblings().children().show(10);
		}else{
			$(this).siblings().children().hide(10);
		}
	});
	//点击返回列表
	$('.next').click(function(){
		$(".loading").fadeIn();
		window.location.href="reimbursement.html";
	});
	
})
