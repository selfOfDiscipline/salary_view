$(function  () {
	var uuId = getUrlParam('uuId');
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
    }
    // 点击任意位置弹框消失
    $('.Reminder').click(function(e){
        $('.Reminder').fadeToggle();
        e.stopPropagation()
    });
	init()
	function init(){
		$.ajax({ 
        	url: sy + 'travelapplication/selectTravelHistoryInfoById/'+uuId,
			type : 'get',
			dataType: 'json',
			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data)
            	if(data.resultCode == 0){
            		var resdata =data.result;
            		console.log(resdata)
            		if(resdata.length == 0){
            			$('.background_remind').show();
            			$(".loading").fadeOut();
                		var msg = '暂无历史数据'
                		cueFrame(msg)
            		}else{
            			var src="";
                		for (var i in resdata) {
                			console.log(resdata[i])
    	            		src+='<li class="wrap">'
    								+'<div class="wrap_left">'
    									+'<div class="subject">'+ resdata[i].theme +'</div>'
    									+'<div class="details">'
    										+'<div class="details_left">'
    											+'<div class="hendline">'+ resdata[i].remark +'</div>'
    											+'<div class="seriel">'+ resdata[i].applicationCode +'</div>'
    										+'</div>'
    										+'<div class="details_right">'
    											+'<div class="date">'+ resdata[i].responsibleDate +'</div>'
    											+'<div class="cost">CNY '+ resdata[i].businessTripMoney +'</div>'
    										+'</div>'
    									+'</div>'
    								+'</div>'
    								+'<div class="wrap_right pending_click" uuid="'+ resdata[i].id +'">'
    									+'<div class="tatedes"> 查看 </div>'
    								+'</div>'
    							+'</li>'
    	            	}
    	            	$('.content').html(src);	
    	            	$(".loading").fadeOut();
            		}
            	}
            }
		})
	};
	
	$('.content').on('click','.pending_click',function(){
		var uuId = $(this).attr('uuid');
		window.location.href="alter_travel.html?uuId="+uuId;
	});
})