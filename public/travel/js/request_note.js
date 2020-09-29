$(function(){
	// 分页页码
	var startNum= 1;
	var timers = null;
	//判断数据是否到底部了
	var not_use_bottom;
	var Status = 1;
	init(startNum);
	function init(startNum){
		var dataobj = {'pageSize' : 15, 'startNum':startNum }
		$.ajax({ 
        	url:sy + 'travelReimburse/getTravelApplicationByCurrentUser',
			type : 'POST',
			dataType: 'json',
			contentType : 'application/json;charset=UTF-8',
			data:JSON.stringify(dataobj),
            success: function (data) {
            	console.log(data)
            	if(data.resultCode == 0){
            		var res = data.result.res;
            		var stt="";
            		console.log(res.length);
            		if(res.length == 15){
                        not_use_bottom = true;
                    } else if(res.length < 15 && res.length > 0){
                        not_use_bottom = false;
                    }else if(res.length == 0 && startNum == 1 ){
                    	not_use_bottom = false;
                    	$('.background_remind').show()
                    }else if(res.length == 0 ){
                    	not_use_bottom = false;
                    }
            		if(res.length != 0){
            			for(var obj in res){
                			stt+='<li class="wrap clearfix" style="height:1.25rem;">'
    		            			+'<div class="wrap_left">'
    		        				+'<div class="details" style="margin-top: 0;">'
    		        					+'<div class="details_left">'
    		        						+'<div class="hendline" style="line-height: .75rem;font-family: PingFangSC-Regular;font-size: 16px;color: #0D0E10;letter-spacing: 0;width: 6.7rem;">'+ res[obj].theme +'</div>'
    		        						+'<div class="seriel">'+ res[obj].responsibleDate +'</div>'
    		        					+'</div>'
    		        				+'</div>'
    		        			+'</div>'
    		        			+'<div class="wrap_right pending_click" uuid="'+ res[obj].id +'" application="'+ res[obj].applicationCode +'">'
    		        				+'<div class="tatedes" style="line-height:1.25rem;color: #D2D2D2;"> 选择 </div>'
    		        			+'</div>'
    		        		+'</li>'
                		}
            			$('.content').append(stt);
            		}
            		// 滚动加载  全局变量控制是否调用 ajax (获取数据不足十条，false)
            	}
            	$(".loading").fadeOut();
            }
		})
	};
	// 下拉加载
	$(window).scroll(function() {
       //当时滚动条离底部60px时开始加载下一页的内容
//    	console.log($(document).scrollTop() , $(document).height() - $(window).height()-60)
        if ( $(document).scrollTop()>= $(document).height() - $(window).height()-60) {
//        	alert(not_use_bottom)
            clearTimeout(timers);
            timers = setTimeout(function() {
                if(not_use_bottom){
                    startNum = startNum + 1;
                    init(startNum);
                }
            }, 200);
        }
    });
	// 点击每一个选择
	$('.content').on('click','.pending_click',function(){
		var uuId = $(this).attr('uuid');
		$(".loading").fadeIn();
		var applicationCode = $(this).attr('application');
//		localStorage.setItem('applicationCode',applicationCode);
		window.location.href="apply_reimbursement.html?uuId="+uuId +"&&applicationCode="+applicationCode;
	});
	
})