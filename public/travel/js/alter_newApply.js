$(function(){
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
	init(uuId);
	function init(uuId){
		$.ajax({
        	url: sy() + "/travelapplication/getTravelapplicationDetail/" + uuId ,
			type : 'GET',
			dataType: 'json',
//			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data);
            	var result = data.result
            	if(data.resultCode == 0){
            		// 拼接明细            		
//            		var wrapLen = $('.content_wrap').children().length;
        			$('.article').html(result.length);
        			DomstrFun(result,resultId);
        			$(".loading").fadeOut();
            	}
            }
	    })
	};
	// 取出附件数组
	var fileNameUrl  = JSON.parse(localStorage.getItem("fileNameUrl"));
	if(fileNameUrl == "" || fileNameUrl == null){
        fileNameUrl = "[]"
    }
    var fileNameUrlData = JSON.parse(fileNameUrl);
    if(fileNameUrlData.length == 0){
        $("#noAttachment").show();
    } else {
        $("#noAttachment").hide();
        var enclosureStr = "";
        for(var files in fileNameUrlData){
            if (fileNameUrlData.hasOwnProperty(files)){
                changeSuffix = file_extension(fileNameUrlData[files].filename);
                enclosureStr +=  '<li class="show_lists"><span class="list_left  '+ changeSuffix +'"></span><p>'+ fileNameUrlData[files].filename +'</p><input type="hidden" value="'+ fileNameUrlData[files].url +'"><span  class="list_right"></span></li>';
            }
        }
        $(".enclosure_list").append(enclosureStr);
        // 添加附件 1.不变动附件 ； 2.手动添加 push attachment_data ；3.手动删除 ； 4.既添加，有删除
        source_fileNameUr_file = source_fileNameUr_file.concat(fileNameUrlData);
        deleteAttachment();
    }
	$('.identity_wrap span').html( localStorage.getItem("fdOrgNameTree"))
	$('.content_one').on('click','.cencal',function(){
		var message = '对不起，您不能删除此明细！'
		cueFrame(message)
	});
	// 点击展开
	$('.content_wrap').on('click','.few_right',function(){
		$(this).parent('.fewer').hide();
		$(this).parent().siblings('.details').show();
	});
	$('.content_wrap').on('click','.pack_up',function(){
		$(this).parent('.details').hide();
		$(this).parent().siblings('.fewer').show();
	})
	//点击返回列表
	$('.next').click(function(){
		window.location.href="draught.html";
	});
	
	
})
