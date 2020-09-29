/**
 * 点击已审核，未审核查看 第一页
 */
$(function(){
	var uuId = getUrlParam('uuId');
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r!=null) return unescape(r[2]);
		return null; //返回参数值
	}
	var checkFlag = 1;
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
    var reimburseId ;
	init(uuId);
	function init(uuId){
 		$.ajax({ 
         	url: sy + 'travelReimburse/getReimburseById/'+uuId,
 			type : 'get',
 			dataType: 'json',
 			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
	            if (data.resultCode == 0) {
	            	var reversalLength = data.result.reversalLength;//冲账明细条数
	            	reimburseId = data.result.reimburse.id;
	            	// 取出提交身份id
	            	localStorage.setItem('businessTripDay',data.result.travel.businessTripDay);
	            	localStorage.setItem('fdOrgNameTree',data.result.travel.fdOrgNameTree);
	            	var result = data.result.travel;
	            	var corporation = data.result.reimburse.bankName == null ? "" : data.result.reimburse.bankName;
	            	if(result){
	            		console.log(result)
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
//									+'<u class="count">计算</u>'
								+'</span>'
							+'</li>'
							+'<li>'
								+'职级类型'
								+'<span class="detailsLeft">'
									+'<span class="deta_val rankType">'+ result.rankType +'</span>'
									+'<img class="corners_right" src="../../img/corners_right.png">'
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
								if(reversalLength <= 0){
									srr+='<p class="checkBox" id="checkFlag">'
										+'<span class="checkButton" style="left:5px"></span>'
									+'</p>'
								}else{
									srr+='<p class="checkBox checkBoxChange" id="checkFlag">'
										+'<span class="checkButton" style="left:23px"></span>'
									+'</p>'
								}
	            	            srr+='</span>'
							+'</li>'
								+'<li>'
								+'出差申请单'
								+'<span class="detailsLeft">'
									+'<span class="deta_val applicationCode">'+ result.applicationCode +'</span>'
								+'</span>'
							+'</li>'
							$('.details').html(srr);
			            	$('.themeval').val(result.theme);//标题
				            $('.reason').val(result.remark);//事由
				            $(".loading").fadeOut();
					
	            	}
	            }
            } 
 		})
	};
	
	//点击返回列表
	$('.save').click(function(){reimbursement
		window.location.href="reimbursement.html";
	});
	//点击下一步
	$('.next').click(function(){
		$(".loading").fadeIn();
		localStorage.setItem('checkFlag',checkFlag);
		window.location.href="check_second_reimbursement.html?uuId="+uuId;
	});
	
})

