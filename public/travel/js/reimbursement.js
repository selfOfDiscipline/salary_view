// 分页页码
var startNum= 1;
var timers = null;
//判断数据是否到底部了
var not_use_bottom;
var Status = 2;
var liLen = 0;
//  判断是否点击时间弹出框
var bouncedTime = 0
var useSting = '<li class="bottom_title">我是有底线的喔!</li>';
localStorage.clear(); 
$( function() {
	initAjax();
	function initAjax(){
		$('.background_remind').hide()
		if (Status == 1) {
			Status = '0,2,7,8';
		};
		if (Status == 2) {
			Status = '1,2';
		}
		if (Status == 3) {
			Status = '3';
		}
		var dataobj={	
				'pageSize':10,
				'startNum':startNum,
				'approveStatus':Status
			}
		console.log('#draught'+Status)
		$.ajax({ 
        	url: sy + 'travelReimburse/list',
			type : 'POST',
			dataType: 'json',
			contentType : 'application/json;charset=UTF-8',
			data:JSON.stringify(dataobj),
            success: function (data) {
            	console.log(data)
            	if(data.resultCode == 0){
            		var resdata = data.result.pos.res;
            		var Url = data.result.url;
                	if( resdata ){
                		var src="";
                		if (Status == '0,2,7,8') {
                			for (var i = 0; i < resdata.length; i++) {
                				var expenseMoney = resdata[i].expenseMoney == null ? "" : resdata[i].expenseMoney;  
                	    		src+=
                	        		'<li class="wrap">'
                						+'<div class="wrap_left">'
	                						+'<div class="subject">'+ resdata[i].theme +'</div>'
	            							+'<div class="details">'
	            								+'<div class="details_left">'
	            									+'<div class="hendline">'+ resdata[i].description +'</div>'
	            									+'<div class="seriel">'+ resdata[i].applicationCode.substr(6,23) +'</div>'
	            								+'</div>'
                								+'<div class="details_right">'
                									+'<div class="date">'+ resdata[i].applicationDate +'</div>'
                									+'<div class="cost">CNY '+ expenseMoney +'</div>'
                								+'</div>'
                							+'</div>'
                						+'</div>'
                						+'<div class="wrap_right draught_click" uuid="'+ resdata[i].id +'">'
                							+'<div class="tates">'
                								+'<img src="../../img/tates.png">'
                							+'</div>'
                						+'</div>'
                					+'</li>'
                	    	}
//                			console.log(src)
//                	    	$('#draught_1').append(src);	
                		}else if(Status == '1,2'){
                			for (var i = 0; i < resdata.length; i++) {
                				var expenseMoney = resdata[i].expenseMoney == null ? "" : resdata[i].expenseMoney; 
                	    		src+=
                	        		'<li class="wrap">'
                						+'<div class="wrap_left pending" uuid="'+ resdata[i].id +'" type="'+ resdata[i].backType +'">'
	                						+'<div class="subject">'+ resdata[i].theme +'</div>'
	            							+'<div class="details">'
	            								+'<div class="details_left">'
	            									+'<div class="hendline">'+ resdata[i].description +'</div>'
	            									+'<div class="seriel">'+ resdata[i].applicationCode.substr(6,23) +'</div>'
	            								+'</div>'
                								+'<div class="details_right">'
                									+'<div class="date">'+ resdata[i].applicationDate +'</div>'
                									+'<div class="cost">CNY '+ expenseMoney +'</div>'
                								+'</div>'
                							+'</div>'
                						+'</div>'
                						+'<div class="wrap_right pending_click" uuid="'+ resdata[i].id +'">'
	                						+'<div class="tated" uuid="'+ Url +  resdata[i].flowCode +'"> 查看 </div>'
											+'<div class="examine" uuid="'+ resdata[i].id +'" flowCode="'+ resdata[i].flowCode +'" type="'+ resdata[i].backType +'"> 撤回 </div>'
                						+'</div>'
                					+'</li>'
                	    	}
//                	    	$('#draught_2').append(src);	
                		}else if(Status == '3'){
                			for (var i = 0; i < resdata.length; i++) {
                				var expenseMoney = resdata[i].expenseMoney == null ? "" : resdata[i].expenseMoney; 
                	    		src+=
                	        		'<li class="wrap">'
                						+'<div class="wrap_left audited" uuid="'+ resdata[i].id +'">'
                							+'<div class="subject">'+ resdata[i].theme +'</div>'
                							+'<div class="details">'
                								+'<div class="details_left">'
                									+'<div class="hendline">'+ resdata[i].description +'</div>'
                									+'<div class="seriel">'+ resdata[i].applicationCode.substr(6,23) +'</div>'
                								+'</div>'
                								+'<div class="details_right">'
                									+'<div class="date">'+ resdata[i].applicationDate +'</div>'
                									+'<div class="cost">CNY '+ expenseMoney +'</div>'
                								+'</div>'
                							+'</div>'
                						+'</div>'
                						+'<div class="wrap_right audited_click" uuid="'+ Url +  resdata[i].flowCode +'" >'
                							+'<div class="tatedes" uuid="'+ resdata[i].id +'"> 查看 </div>'
                						+'</div>'
                					+'</li>'
                	    	}
//                	    	$('#draught_3').append(src);	
                		}
                		if(Status == '0,2,7,8' && startNum == 1){
                            $('#draught_1').html(src);
                            liLen = $('#draught_1 li').length;
                        } else if(Status == '1,2' && startNum == 1){
                        	$('#draught_2').html(src);
                        	liLen = $('#draught_2 li').length;
                        } else  if(Status == '3' && startNum == 1){
                        	$('#draught_3').html(src);
                        	liLen = $('#draught_3 li').length;
                        } else if(Status == '0,2,7,8' && startNum > 1){ // 滚动
                        	$('#draught_1').append(src);
                        	liLen = $('#draught_1 li').length;
                        } else if(Status == '1,2' && startNum > 1){
                        	$('#draught_2').append(src);
                        	liLen = $('#draught_2 li').length;
                        } else if(Status == '3' && startNum > 1){
                        	$('#draught_3').append(src);
                        	liLen = $('#draught_3 li').length;
                        }
                		liLen = $('#draught_1 li').length;
                		$(".loading").fadeOut();
                	}
                	// 滚动加载  全局变量控制是否调用 ajax (获取数据不足十条，false)
            		if(resdata.length == 10){
                        not_use_bottom = true;
                    } else if(resdata.length < 10 && resdata.length > 0){
                        not_use_bottom = false;
                    }else if(resdata.length == 0 && startNum == 1){
                    	not_use_bottom = false;
                    	$('.background_remind').show()
                    }else if(resdata.length == 0){
                    	not_use_bottom = false;
                    }
            	}
            }
       })
	};
	// 下拉加载
    $('.ul').scroll(function() {
        //当时滚动条离底部60px时开始加载下一页的内容
        if (($(this)[0].scrollTop + $(this).height() + 60) >= $(this)[0].scrollHeight) {
            // alert("当时滚动条离底部60px时开始加载下一页的内容")
            clearTimeout(timers);
            timers = setTimeout(function() {
                if(not_use_bottom){
                    startNum = startNum + 1;
                    initAjax();
                }
            }, 200);
        }
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
 // 点击 切换状态
	$('.all_content')[0].style.left = "-100%";
	var startX = '',disX ='';
	$('.nav_ul').on('click','li',function(){
		var index = $(this).index();
		Status = index+1;
		startNum = 1;
		$(".loading").fadeIn();
		$('.all_content').css('left','-' + index * 100 + '%');
		$('.nav_ul li').eq(index).addClass('active').siblings().removeClass('active')
		$('.nav_ul').children().children().attr('class','');
		$(this).children().attr('class','underline');
		overScreen(index);
		
		$('.all_content ul').css({
          'height': '',
          'overflow': ''
      });
		initAjax();
	});
	// 滚动超一屏  点击切换、滑动切换  高度还原 (0为false,if(pageIndex)  pageIndex=0,不走方法)
    function overScreen(pageIndex) {
        // if(pageIndex != NaN){}
        setTimeout(hideSiblings(pageIndex), 500);
        function hideSiblings(pageIndex) {
            $('.all_content ul').eq(pageIndex).siblings('ul').css({
                'height': 0,
                'overflow': 'hidden'
            });
            $('.all_content ul').eq(pageIndex).siblings('ul').html("");
        }
    }
	// 点击新建
	$('.shut').click(function(){
		$(".loading").fadeIn(); 
		window.location.href="request_note.html";
	});
	 //点击草稿
	$('.all_content').on('click','.draught_click',function(){
		var uuId = $(this).attr('uuid');
		$(".loading").fadeIn();
		window.location.href="alter_apply_reimbursement.html?uuId="+uuId;
	});
    // 点击待审核撤回
	$('.all_content').on('click','.pending_click .examine',function(){
		if($(this).attr('type') == '1'){
			cueFrame('该流程节点不可撤回！')
		}else{
			var flowCode = $(this).attr('flowCode');
			var uuId = $(this).attr('uuid');
			var that = $(this);
			$(".loading").fadeIn(); 
			CheckAjaxFun(uuId,that,flowCode);
		}
	});
	
	// 点击待审核查看
	$('.all_content').on('click','.pending',function(){
		$(".loading").fadeIn();
		var uuId = $(this).attr('uuid');
		if($(this).attr('type') == '1'){
			localStorage.setItem('rejectedType', $(this).attr('type'));
			window.location.href="alter_apply_reimbursement.html?uuId="+uuId;
		}else{
			window.location.href="check_apply_reimbursement.html?uuId="+uuId;
		}
	});
	// 点击待审核查看审批流程
	$('.all_content').on('click','.pending_click .tated',function(){
		var HrefUrl = $(this).attr('uuid');
		window.location.href = HrefUrl;
	});  
    // 点击已审核查看  
	$('.all_content').on('click','.audited',function(){
		var uuId = $(this).attr('uuid');
		$(".loading").fadeIn(); 
		window.location.href="check_apply_reimbursement.html?uuId="+uuId;
	});
	//点击已审核查看审批流程
	$('.all_content').on('click','.audited_click',function(){
		var HrefUrl = $(this).attr('uuid');
		window.location.href = HrefUrl;
	});
	function CheckAjaxFun(uuId,that,flowCode){
		$.ajax({
         	url: sy + 'travelflow/withdrawProcessForReimburse/' + flowCode +'/'+ uuId,
 			type : 'GET',
 			dataType: 'json',
 			contentType : 'application/json;charset=UTF-8',
 			success: function (data) {
 				console.log(data)
 				if(data.resultCode == 0){
 					that.parent().parent('.wrap').remove();
 	 				$(".loading").fadeOut(); 
 				}else{
 					$(".loading").fadeOut(); 
 					cueFrame(data.message)
 				}
 			}
 		});
	}
})
