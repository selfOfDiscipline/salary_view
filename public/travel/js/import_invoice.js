$(function () {
	var uuId = getUrlParam('uuId');
	var state = getUrlParam('state');
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r!=null) return unescape(r[2]);
		return null; //返回参数值
	};
	// 提示弹框 
    function cueFrame(message){
        $("#promptContent").html(message);
        $(".Reminder").fadeToggle();
    };
    // 	  点击取消隐藏弹框
    $('.cancel').click(function(e){
        $('.Reminder').fadeToggle();
        e.stopPropagation()
    });
    // 点击任意位置弹框消失	
    $('.Reminder').click(function(e){
        $('.Reminder').fadeToggle();
        e.stopPropagation()
    });
	var alteruuId = localStorage.getItem('alteruuId');
	var InvoiceIdCode = JSON.parse(localStorage.getItem('InvoiceId_code'));//发票id,code 
	var feeBorrowIds =  JSON.parse(localStorage.getItem('feeBorrowIds'));// 领借款id
	var applyDataobj = JSON.parse(localStorage.getItem('dataobj'));
//    localStorage.setItem('dataobj',JSON.stringify(applyDataobj));
	console.log(feeBorrowIds);
	var SecondUrl = localStorage.getItem('SecondUrl');
	var Url = SecondUrl.substr(0,SecondUrl.length  - 1)
	console.log( Url)
	//	报销申请单的id
//	var Id = localStorage.getItem('Id');
//	localStorage.setItem('Id',Id);
	//	住宿
//	var AccommodationHtml = localStorage.getItem('AccommodationHtml');
//	localStorage.setItem('AccommodationHtml',AccommodationHtml);
	//	火车
//	var ChoochooHtml = localStorage.getItem('ChoochooHtml');
//	localStorage.setItem('ChoochooHtml',ChoochooHtml);
	//	差旅餐补
//	var AllowancedHtml = localStorage.getItem('AllowancedHtml');
//	localStorage.setItem('AllowancedHtml',AllowancedHtml);
	
//	var ImporMoney = JSON.parse(localStorage.getItem('ImporMoney'));
//	localStorage.setItem('ImporMoney',JSON.stringify(ImporMoney));
//	var sharemoney = JSON.parse(localStorage.getItem('sharemoney'));
//	localStorage.setItem('sharemoney',JSON.stringify(sharemoney));
	// 分页页码
	var startNum= 1;
	var timers = null;
	//判断数据是否到底部了
	var not_use_bottom;
	var Status = 1;
	var idAry = []
	if(state == 0){
		for( var a in InvoiceIdCode){
			idAry = idAry.concat([a])
	    }
		$("title").html("我的发票");
		init(startNum);
	}else{
		idAry = feeBorrowIds ;
		$("title").html("领借款申请");
		initBalance(startNum)
		// 冲账列表
	}
//	for( var a in InvoiceIdCode){
//		idAry = idAry.concat([a])
//    }
	function init(startNum){
		var dataobj = {
				'startNum':startNum,
				'pageSize': 10
				};
		$.ajax({ 
         	url: sy + 'travelReimburse/invoiceList',
 			type : 'post',
 			dataType: 'json',
 			contentType : 'application/json;charset=UTF-8',
 			data: JSON.stringify(dataobj),
            success: function (data) {
            	console.log(data)
            	if(data.resultCode == 0){
            		var res = data.result.res;
                	var srr="";
                	if( res ){
                		for( var obj in res){
                    		flag = getTypeById(res[obj].id); 
            				if(1 == flag){
            					srr+='<li class="wrap remove_invoice">'
    	    							+'<div class="wrap_left">'
    	    								+'<div class="subject">'+ res[obj].purchaserName +'</div>'
    	    								+'<div class="details">'
    	    									+'<div class="details_left">'
    	    										+'<div class="hendline">销售方：'+ res[obj].salesName + '</div>'
    	    										+'<div class="seriel">开票时间：'+ res[obj].billingTime +'</div>'
    	    									+'</div>'
    	    									+'<div class="details_right">'
    	    										+'<div class="date"></div>'
    	    										+'<div class="cost">¥'+ res[obj].totalTaxSum +'</div>'
    	    									+'</div>'
    	    								+'</div>'
    	    							+'</div>'
    	    							+'<div class="wrap_right">'
    										+'<div class="tates" id="'+ res[obj].id +'"  code="'+ res[obj].invoiceTypeCode +'" uuid="'+ res[obj].id +'" style="width: .5rem;">'
    										+'<img src="../../img/no_selected.png">'
    									+'</div>'
    								+'</div>'
    							+'</li>'
            				}else{
            					srr+='<li class="wrap">'
    	    							+'<div class="wrap_left">'
    	    								+'<div class="subject">'+ res[obj].purchaserName +'</div>'
    	    								+'<div class="details">'
    	    									+'<div class="details_left">'
    	    										+'<div class="hendline">销售方：'+ res[obj].salesName + '</div>'
    	    										+'<div class="seriel">开票时间：'+ res[obj].billingTime +'</div>'
    	    									+'</div>'
    	    									+'<div class="details_right">'
    	    										+'<div class="date"></div>'
    	    										+'<div class="cost">¥'+ res[obj].totalTaxSum +'</div>'
    	    									+'</div>'
    	    								+'</div>'
    	    							+'</div>'
    	    							+'<div class="wrap_right">'
    										+'<div class="tates" id="'+ res[obj].id +'"  code="'+ res[obj].invoiceTypeCode +'" uuid="'+ res[obj].id +'" style="width: .5rem;">'
    										+'<img src="../../img/no_selected.png">'
    									+'</div>'
    								+'</div>'
    							+'</li>'
            				}
    						
                    	}
                	}
                	// 滚动加载  全局变量控制是否调用 ajax (获取数据不足十条，false)
            		if(res.length == 10){
                        not_use_bottom = true;
                    } else if(res.length < 10 && res.length > 0){
                        not_use_bottom = false;
                    }else if(res.length == 0 ){
                        	not_use_bottom = false;
                    }else if(res.length == 0 || startNum =='1'){
                    	not_use_bottom = false;
                    	$('.background_remind').show()
                    }
                	$('.content').append(srr);
                	$('.remove_invoice').remove();
                	var contentLen = $('.content li').length;
                	if(contentLen == 0 ){
                		$('.background_remind').show();
                		$('.determine').html('取消');
                	}
                	InvoiceIdCode = [];
                	localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceIdCode));
                	feeBorrowIds = []
                	localStorage.setItem('feeBorrowIds',JSON.stringify(feeBorrowIds));
            	}
	            $(".loading").fadeOut();
            }
        })
	}
	function initBalance(startNum){
		var dataobj = {
				'startNum': startNum,
				'pageSize': 10
				};
		$.ajax({ 
         	url: sy + 'travelapplication/getBorrowListWithTravel',
 			type : 'post',
 			dataType: 'json',
 			contentType : 'application/json;charset=UTF-8',
 			data: JSON.stringify(dataobj),
            success: function (data) {
            	if(data.resultCode == 0){
            		var res = data.result.res;
                	var srr="";
                	if( res ){
                		for( var obj in res){
                			console.log(res[obj].theme )
                    		flag = getTypeById(res[obj].id); 
            				if(1 == flag){
            					srr+='<li class="wrap remove_invoice">'
    	    							+'<div class="wrap_left">'
    	    								+'<div class="subject">'+ res[obj].theme +'</div>'
    	    								+'<div class="details">'
    	    									+'<div class="details_left">'
    	    										+'<div class="hendline">领借款编号：'+ res[obj].borrowCode + '</div>'
    	    										+'<div class="seriel">申请日期：'+ res[obj].applicationDate +'</div>'
    	    									+'</div>'
    	    									+'<div class="details_right">'
    	    										+'<div class="date"></div>'
    	    										+'<div class="cost">¥'+ res[obj].borrowMoney +'</div>'
    	    									+'</div>'
    	    								+'</div>'
    	    							+'</div>'
    	    							+'<div class="wrap_right">'
    										+'<div class="tates" id="'+ res[obj].id +'" uuid="'+ res[obj].id +'" style="width: .5rem;">'
    										+'<img src="../../img/no_selected.png">'
    									+'</div>'
    								+'</div>'
    							+'</li>'
            				}else{
            					srr+='<li class="wrap">'
	    							+'<div class="wrap_left">'
	    								+'<div class="subject">'+ res[obj].theme +'</div>'
	    								+'<div class="details">'
	    									+'<div class="details_left">'
	    										+'<div class="hendline">领借款编号：'+ res[obj].borrowCode + '</div>'
	    										+'<div class="seriel">申请日期：'+ res[obj].applicationDate +'</div>'
	    									+'</div>'
	    									+'<div class="details_right">'
	    										+'<div class="date"></div>'
	    										+'<div class="cost">¥'+ res[obj].borrowMoney +'</div>'
	    									+'</div>'
	    								+'</div>'
	    							+'</div>'
	    							+'<div class="wrap_right">'
										+'<div class="tates" id="'+ res[obj].id +'" uuid="'+ res[obj].id +'" style="width: .5rem;">'
										+'<img src="../../img/no_selected.png">'
									+'</div>'
								+'</div>'
							+'</li>'
            				}
    						
                    	}
                	}
                	// 滚动加载  全局变量控制是否调用 ajax (获取数据不足十条，false)
            		if(res.length == 10){
                        not_use_bottom = true;
                    } else if(res.length < 10 && res.length > 0){
                        not_use_bottom = false;
                    }else if(res.length == 0 ){
                        	not_use_bottom = false;
                    }else if(res.length == 0 || startNum =='1'){
                    	not_use_bottom = false;
                    	$('.background_remind').show()
                    }
                	$('.content').append(srr);
                	$('.remove_invoice').remove();
                	var contentLen = $('.content li').length;
                	if(contentLen == 0 ){
                		$('.background_remind').show();
                		$('.determine').html('取消');
                	}
                	InvoiceIdCode = [];
                	localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceIdCode));
                	feeBorrowIds = []
                	localStorage.setItem('feeBorrowIds',JSON.stringify(feeBorrowIds));
            	}else{
            		
            	}
	            $(".loading").fadeOut();
            }
        })
	}
	$('.content').on('click','.wrap_right',function () {
		var src = $(this).children().children('img').attr('src');
		if(src == '../../img/no_selected.png'){
			$(this).children().addClass('current');
		   	$(this).children().children('img').attr('src','../../img/selected.png');
		}else{
			$(this).children().removeClass('current');
			$(this).children().children('img').attr('src','../../img/no_selected.png');
		}
	});
	//  判断上次是否选中的方法	
	function getTypeById(id){
		var flag = 0
		for(var item = 0 ; item < idAry.length ; item ++){
			if(idAry[item]==id){
				flag = 1;
				break;
			}
		}
		return flag;
	};
	
	//判断数据是否到底部了
	var not_use_bottom;
	// 下拉加载
	$(window).scroll(function() {
       //当时滚动条离底部60px时开始加载下一页的内容
//    	console.log($(document).scrollTop() , $(document).height() - $(window).height()-60)
        if ( $(document).scrollTop()>= $(document).height() - $(window).height()-60) {
//             alert("当时滚动条离底部60px时开始加载下一页的内容+1")
            clearTimeout(timers);
            timers = setTimeout(function() {
                if(not_use_bottom){
                    startNum = startNum + 1;
                    if(state == 0){
                    	init(startNum);
                    }
                }
            }, 200);
        }
    });
	
	//点击确定   跳转
	$('.determine').click(function () {
		var determinetext = $(this).html();
		if(state == 0){
			var InvoiceId_code = new Object();
		    $(".current").each(function(){
		        var code = $(this).attr("code");
		        var uuid = $(this).attr("uuid");
		        InvoiceId_code[uuid] = code;
		    });
		    console.log(InvoiceId_code);
		    if(determinetext == '确定'){
				if (JSON.stringify(InvoiceId_code) != "{}"){
					$(".loading").fadeIn(); 
					if(alteruuId == 1){ 
						localStorage.setItem('alteruuId',0);
						localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
						window.location.href= Url+state;
					}else{
						localStorage.setItem('alteruuId',1);
						localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
						window.location.href=Url+state;
					}
				}else{
	//				$(".loading").fadeOut(); 
					var message = '请至少选中一条数据后确定！'
					cueFrame(message)
				}
		    }else if(determinetext == '取消'){
		    	$(".loading").fadeIn(); 
				if(alteruuId == 1){ 
					localStorage.setItem('alteruuId',0);
					localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
					window.location.href= Url+state;
				}else{
					localStorage.setItem('alteruuId',1);
					localStorage.setItem('InvoiceId_code',JSON.stringify(InvoiceId_code));
					window.location.href=Url+state;
				}
			}
		}else if(state == 1){
			var feeBorrowIds = [];
		    $(".current").each(function(){
//		        var code = $(this).attr("code");
		        var uuid = $(this).attr("uuid");
		        feeBorrowIds.push(uuid);
		    });
		    console.log(feeBorrowIds);
		    if(determinetext == '确定'){
				if (JSON.stringify(feeBorrowIds) != "[]") {
					$(".loading").fadeIn(); 
					if(alteruuId == 0){
						localStorage.setItem('alteruuId',1);
						localStorage.setItem('feeBorrowIds',JSON.stringify(feeBorrowIds));
						window.location.href=Url+state;
					}else{ 
						localStorage.setItem('alteruuId',0);
						localStorage.setItem('feeBorrowIds',JSON.stringify(feeBorrowIds));
						window.location.href=Url+state;
					} 
				}else{
					var message ='请至少选中一条数据后确定！'
					cueFrame(message)
					
				}
		    }else if(determinetext == '取消'){
		    	$(".loading").fadeIn(); 
				if(alteruuId == 0){
					localStorage.setItem('alteruuId',1);
					localStorage.setItem('feeBorrowIds',JSON.stringify(feeBorrowIds));
					window.location.href=Url+state;
				}else{ 
					localStorage.setItem('alteruuId',0);
					localStorage.setItem('feeBorrowIds',JSON.stringify(feeBorrowIds));
					window.location.href=Url+state;
				} 
		    }
		}
	})
})