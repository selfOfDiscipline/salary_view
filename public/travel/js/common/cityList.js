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
// 点击选择滴滴城市
var that;
// 城市列表渲染  
function DomcityList( res , flightType){
	var str="";
	for (var i in res) {
        str+='<div class="city-list" id="InitCityVal">'
                +'<span class="city-letter" id="'+ [i]+'1">'+ [i] +'</span>'
                for (var obj in  res[i]) {
                    str+='<p data-id="'+ res[i][obj].code +'" uuid="'+ flightType +'">'+  res[i][obj].name +'</p>';
                }
            +'</div>'
    }
    $('.city').html(str);
}
//酒店城市列表渲染  
function HotelDomcityList( res,HotelsTripscityId ){
	var str="";
	console.log(res)
	str+='<div class="city-list" id="InitCityVal">'
		for (var obj in  res) {
			if(HotelsTripscityId == 3){
				str+='<p data-id="'+ res[obj].hotelStandard +'">'+  res[obj].cityName +'</p>';
			}else if(HotelsTripscityId == 5){
				str+='<p data-id="'+ res[obj].travelSupport +'">'+  res[obj].cityName +'</p>';
			}
	    }
	+'</div>'
	console.log(res)
    $('.city').html(str);
}
// 酒店城市
function HotelCity(resultId){
	$.ajax({ 
		url: sy + 'travelapplication/getCityList/' + resultId ,
		type : 'GET',
		dataType: 'json',
		contentType : 'application/json;charset=UTF-8',
	    success: function (data) {
	    	if (data.resultCode == 0) {
	    		var res = data.result;
	    		localStorage.setItem( 'getCityList', JSON.stringify(res));
			    $(".loading").fadeOut();
	    	}
	    }
	})
}
// 加载滴滴 携程城市
function CityAjax( href ){
	$.ajax({ 
    	url: sy + 'travelServer/' + href ,
		type : 'GET',
		async : false ,
		dataType: 'json',
		contentType : 'application/json;charset=UTF-8',
        success: function (data) {
        	if (data.resultCode == 0) {
        		var res = data.result;
        		localStorage.setItem( href , JSON.stringify(res));
        		var testa = [];
        		for( var i  in res){
            		testa = testa.concat(res[i])
        		}
        		localStorage.setItem("deptList" + href, JSON.stringify(testa));
//        		alert(href);
        		if(href == 'selectXieChengCityListByInternational'){
        			alert(JSON.parse(localStorage.getItem("deptList" + href)).length)
        		}
			    $(".loading").fadeOut();
        	}
        }
    })
}
//酒店城市模糊搜索 HoteldoSearchDept
function HoteldoSearchDept(getCityList,HotelsTripscityId){
	var deptList = JSON.parse(localStorage.getItem('getCityList'));
	var condition = $("#cityipt").val();
	var reg = new RegExp(condition);
	var items = [];
	var str=""
	console.log(deptList.length);
	if(condition.length == 0){
//		$('.letter').show()
		$('#SearchCityVal').hide();
		$('#InitCityVal').show();
		$('html,body').animate({scrollTop:0},100);//回到顶端
	}else{
		for(var i=0; i < deptList.length;i++){
			var temp = deptList[i].cityName;
			if(temp.match(reg)){
				items.push(deptList[i]);
			}
		}
		console.log(items)
		if(items.length != 0){
			$('html,body').animate({scrollTop:0},100);//回到顶端
			var SearchCity = $(".city").find("#SearchCityVal");
			if(SearchCity.length > 0){
				$('#SearchCityVal').remove();
				str+='<div class="city-list" id="SearchCityVal">'
    				for(var y = 0;y < items.length ; y++){
    					if( HotelsTripscityId == 3){
    						str+='<p data-id="'+ items[y].hotelStandard +'">'+ items[y].cityName +'</p>';
    					}else{
    						str+='<p data-id="'+ items[y].travelSupport +'">'+ items[y].cityName +'</p>';
    					}
    	    		}
        		str+='</div>'
				$('#InitCityVal').hide()
				$(".city").append(str);
        		$('.letter').hide()
			} else{
				str+='<div class="city-list" id="SearchCityVal">'
					for(var y = 0;y < items.length ; y++){
						if( HotelsTripscityId == 3){
    						str+='<p data-id="'+ items[y].hotelStandard +'">'+ items[y].cityName +'</p>';
    					}else{
    						str+='<p data-id="'+ items[y].travelSupport +'">'+ items[y].cityName +'</p>';
    					}
					}
        		str+='</div>'
				$('#InitCityVal').hide()
				$(".city").append(str);
        		$('.letter').hide();
        		items = [];
			}
		}else{
			$('#SearchCityVal').hide();
			$('#InitCityVal').show()
		}
	}
} 
// 滴滴携程城市模糊搜索
function doSearchDept(href,flightType){
//	alert(href)
	if( href == 'sel' ){
		var deptList = JSON.parse(sessionStorage.getItem("deptListsel"));
	}else{
		var deptList = JSON.parse(localStorage.getItem("deptList" + href));
	}
	var condition = $("#cityipt").val();
	var reg = new RegExp(condition);
	var items = [];
	var str="";
	if(condition.length == 0){
		$('.letter').show()
		$('#SearchCityVal').hide();
		$('#InitCityVal').show();
		$('html,body').animate({scrollTop:0},100);//回到顶端
	}else{
		for(var i=0; i < deptList.length;i++){
			var temp = deptList[i].name;
			if(temp.match(reg)){
				items.push(deptList[i]);
			}
		}
		console.log(items)
		if(items.length != 0){
			$('html,body').animate({scrollTop:0},100);//回到顶端
			var SearchCity = $(".city").find("#SearchCityVal");
			if(SearchCity.length > 0){
				$('#SearchCityVal').remove();
				str+='<div class="city-list" id="SearchCityVal">'
    				for(var y = 0;y < items.length ; y++){
    					str+='<p data-id="'+ items[y].code +'" uuid="'+ flightType +'">'+  items[y].name +'</p>'
    	    		}
        		str+='</div>'
				$('#InitCityVal').hide()
				$(".city").append(str);
        		$('.letter').hide()
			}else{
				str+='<div class="city-list" id="SearchCityVal">'
    				for(var y = 0;y < items.length ; y++){
    					str+='<p data-id="'+ items[y].code +'" uuid="'+ flightType +'">'+  items[y].name +'</p>'
    	    		}
        		str+='</div>'
				$('#InitCityVal').hide()
				$(".city").append(str);
        		$('.letter').hide();
        		items = [];
			}
		}else{
			$('#SearchCityVal').hide();
			$('#InitCityVal').show()
		}
	}
}
