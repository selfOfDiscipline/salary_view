var dataobj  =JSON.parse(localStorage.getItem("temp"));
var HotelsTripscityId;  //点击酒店或者差补时
var particularMoney;
$(function(){
	$("#addEnclosure").click(function(){
        addTheme();
    });
    /*附件上传  end*/
    $(".return").click(function(){
        window.location.href="my_invoice.html?type=back&returnUseStatus=" + $.getUrlParam('returnUseStatus');
    });
    var listItem = ['businessTripId',
		'id',
		'transportType',
		'tripType',
		'businessTripLevel',
		'startAddress',
		'startAddressId',
		'departureCityFlightType',
//		'flightType',
		'endAddress',
		'endAddressId',
		'arrivalCityFlightType',
		'businessTripDay',
		'startDate',
		'endDate',
		'itemMoney',
		'paymentType',
		'passportName',
		'remarks'];
	var num=1;
	
	var settingType = '0,1,2,3,4';
	var transportType
	
	var uuId = getUrlParam('uuId');
	//	出行  用车 飞机初始化请求
	init();
	$('.businessTripId').val(uuId);
	var resultId = localStorage.getItem("temp2");
	$('#resultId').val(resultId);
	$('.traveldaysVal').val(dataobj.businessTripDay);//默认出差天数
	$('.traveldaysVal').attr('placeholder',0)
	console.log(resultId);
//	var dataobj  =JSON.parse(localStorage.getItem("temp"));
//	取出附件数组
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
	// 可用金额
	console.log(dataobj)
	var uuId = dataobj.id;
	var budgetId = dataobj.budgetBody;
	var subjectId = dataobj.expenseAccount;
	var datetimestart = dataobj.businessTripBeginDate;
	var datetimeend = dataobj.businessTripEndDate;
	console.log(uuId);
	$('.content_hide .timestartClass').val(datetimestart);
	$('.content_hide .timeendClass').val(datetimeend);
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
    var fdOrgSid = localStorage.getItem("fdOrgSid");
    var fdSid = localStorage.getItem("fdSid")
	var resMoney = 0;

	identityAjax()
	function identityAjax(){
		$.ajax({ 
        	url: sy + 'travelReimburse/getUserStandardInfoByUserId',
			type : 'GET',
			dataType: 'json',
			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data);
            	var budgetDeparval = data.result;
            	var src = ""
            	if (data.resultCode == 0) {
        			for (var val in budgetDeparval) {
            			if(fdSid == budgetDeparval[val].fdSid && fdOrgSid == budgetDeparval[val].fdOrgSid){
            				src+='<li class="pitch clearfix ">'
             					 +'<div class="rankleft">'
             						 +'<h3 class="rankType" fdSid="'+ budgetDeparval[val].fdSid+'" fdOrgSid="'+ budgetDeparval[val].fdOrgSid+'" fdInitiatingProcess="'+ budgetDeparval[val].fdInitiatingProcess+'" fdOrgSidTree="'+ budgetDeparval[val].fdOrgSidTree+'">'+ budgetDeparval[val].fdName + '>' + budgetDeparval[val].fdOrgNameTree +'</h3>'
             					 +'</div>'
             					 +'<div class="rankright">'
             						 +'<img class="no_selected" src="../../img/selected.png">'
             					 +'</div>'
             				  +'</li>'
            			}else{
            				src+='<li class="pitch clearfix ">'
            					 +'<div class="rankleft">'
            						 +'<h3 fdSid="'+ budgetDeparval[val].fdSid+'" fdOrgSid="'+ budgetDeparval[val].fdOrgSid+'" fdInitiatingProcess="'+ budgetDeparval[val].fdInitiatingProcess+'" fdOrgSidTree="'+ budgetDeparval[val].fdOrgSidTree+'">'+ budgetDeparval[val].fdName + '>' + budgetDeparval[val].fdOrgNameTree +'</h3>'
            					 +'</div>'
            					 +'<div class="rankright">'
            						 +'<img class="no_selected" src="../../img/no_selected.png">'
            					 +'</div>'
            				  +'</li>'
            			}
        			}
        			$('.ranktype_ul').html(src);
        			if( fdOrgSid == 'null' ){
        				$(".ranktype_ul li:first").children().children('h3').attr('class','rankType');
    					$(".ranktype_ul li:first").children().children('img').attr('src','../../img/selected.png');
        			}else{
        				
        			}
        			$('.identity_wrap span').html($('.ranktype_ul li .rankType').html());
					$('.identity_wrap span').attr('fdSid',$('.ranktype_ul li .rankType').attr('fdSid'));
					$('.identity_wrap span').attr('fdOrgSid',$('.ranktype_ul li .rankType').attr('fdOrgSid'));
					$('.identity_wrap span').attr('fdOrgSidTree',$('.ranktype_ul li .rankType').attr('fdOrgSidTree'));
					$('.identity_wrap span').attr('fdInitiatingProcess',$('.ranktype_ul li .rankType').attr('fdInitiatingProcess'));
            	}
            }
	    })
	};
	$('body').on('click','.identity_wrap',function(){
		 $('.rank_rgba').show();
	})
	$('body').on('click','.ranktype_ul li', function(){
		console.log($(this).children('.rankright').children('.no_selected').attr('src'))
		$(this).siblings().children('.rankleft').children('h3').removeClass('rankType'); 
		$(this).children('.rankleft').children('h3').addClass('rankType');
		$(this).siblings().children('.rankright').children('.no_selected').attr('src','../../img/no_selected.png');
		$(this).children('.rankright').children('.no_selected').attr('src','../../img/selected.png');  
		$('.identity_wrap span').html($(this).children('.rankleft').children('.rankType').html());
		$('.identity_wrap span').attr('fdSid',$(this).children('.rankleft').children('.rankType').attr('fdSid'));
		$('.identity_wrap span').attr('fdOrgSid',$(this).children('.rankleft').children('.rankType').attr('fdOrgSid'));
		$('.identity_wrap span').attr('fdOrgSidTree',$(this).children('.rankleft').children('.rankType').attr('fdOrgSidTree'));
		$('.identity_wrap span').attr('fdInitiatingProcess',$(this).children('.rankleft').children('.rankType').attr('fdInitiatingProcess'));
		
	})
	$('.rank_rgba').click(function(){
		$('.rank_rgba').hide();
	});	
	function init(){
		$.ajax({
        	url: sy() + "/travelapplication/getTravelapplicationDetail/" + uuId ,
			type : 'GET',
			dataType: 'json',
			async: false,
//			contentType : 'application/json;charset=UTF-8',
            success: function (data) {
            	console.log(data);
            	var result = data.result
//            	if(data.resultCode == 0){
            		var wrapLen = result.length;
            		// 显示总条数
            		$('.article').text(wrapLen);
            		// 判断返回的明细数是否大于0
            		if(wrapLen == 0){
            			num = 0 ;
            		}else{
            			num = wrapLen ;
            		}
            		// 拼接明细字符 
            		DomstrFun(result,uuId);
            		$('.content_wrap').find('.timestartClass').each(function(){
        				TimeInit($(this))
        			})
        			$(".loading").fadeOut();
            	}
//            }
	    })
	};
	// 点击选择飞机 火车 酒店 住宿
	SelectiveType();
	// 点击收起
	ClickPackUp();
	// 点击选择往返
	BackAndForth();
	// 点击删除明细
	DeleteDetail();
	
	// 点击添加明细
	iptProp();
	function iptProp(){
		$('.details:last').find('li').each( function( index , val){
//			var name = listItem[ index ];
//			$(this).find('input').prop("name",'itemList['+num+']'+ name );
		});
	};
	$('.plusAdd').click(function(){
		PlaneSttDom();
		num++;
		var colneDom = $(".content_hide").children().first('.wrap').clone(true);
		$(".content_wrap").append( colneDom );
		//点击添加明细定位到添加那一条
		AddscrollTop();
		// 出差明细数
		DetailNum();
//		$(".content_wrap").children().last('.wrap').find('.detail').html('出差明细'+num);
		iptProp();
		var wrapLen = $(".content_wrap").children().length;
		$('.article').text(wrapLen);
		var timeStart = $('.timestartClass:last');
		var timeEnd = $('.timeendClass:last')
		TimeInit(timeStart);
		TimeInit(timeEnd);
	});
	// 点击展开
	$('.content_wrap').on('click','.few_right',function(){
		$(this).parent('.fewer').hide();
		$(this).parent().siblings('.details').show();
	});
	
	// 点击选择滴滴城市
	var that;
	var scrollTop = 0 ;
	var flightuuid = '1';
	$('body').on('click','.departure_city',function(){
		scrollTop = $(this).offset().top;
		var cityNum = $(this).parent().siblings('.transportType_li').children('.selected_clickVal').val();
	    that = $(this);
	    //飞机
	    var flightuuid = '1';
	    if(cityNum == 1){
	    	HotelsTripscityId = cityNum;
	    	var href = 'selectXieChengCityList';
	    	var depositCity = JSON.parse(localStorage.getItem( href ));
	    	$('#newApply').hide();
		    $(".Citywrap").show();
		    $('.aircraftTab').show();
		    $('.city').css('margin-top','0');
		    flightuuid = '1';
		    DomcityList( depositCity ,flightuuid);
		    // 城市模糊搜索
		    $("#cityipt").focus(function(){
				$('html,body').animate({scrollTop:0},0);//回到顶端
		    })
	    	$("#cityipt").on('input propertychange', function(){
	    		var activeText = $('.active').html();
	    		if(activeText == '国内'){
	    			flightuuid = '1';
	    			var href = 'selectXieChengCityList';
	    			doSearchDept(href,flightuuid);
			    }else{
			    	flightuuid = '2';
			    	var href = 'sel';
			    	doSearchDept(href,flightuuid);
			    }
	    	});
	    //打车
	    }else if(cityNum == 4){
	    	HotelsTripscityId = cityNum;
	    	var href = 'selectDrippingCityListByPid';
	    	var depositCity = JSON.parse(localStorage.getItem( href ));
	    	$('#newApply').hide();
	    	$('.aircraftTab').hide();
	    	$('.city').css('margin-top','1.25rem')
		    $(".Citywrap").show();
	    	flightuuid = '1';
		    DomcityList( depositCity,flightuuid )
	    	// 城市模糊搜索
		    $("#cityipt").focus(function(){
				$('html,body').animate({scrollTop:0},0);//回到顶端
		    })
	    	$("#cityipt").on('input propertychange', function(){
	    		doSearchDept(href,flightuuid);
	    	});
		//酒店,差补
	    }else if(cityNum == 5 || cityNum == 3){
	    	HotelsTripscityId = cityNum;
	    	var getCityList = JSON.parse(localStorage.getItem( 'getCityList' ));
	    	HotelDomcityList( getCityList,HotelsTripscityId );
	    	$('#newApply').hide();
	    	$('.aircraftTab').hide();
	    	$('.city').css('margin-top','1.25rem')
		    $(".Citywrap").show();
		    $(".letter").hide();
		    $("#cityipt").focus(function(){
				$('html,body').animate({scrollTop:0},0);//回到顶端
		    })
		    $("#cityipt").on('input propertychange', function(){
		    	$('html,body').animate({scrollTop:0},0);//回到顶端
		    	HoteldoSearchDept(getCityList,HotelsTripscityId)
	    	});
	    }
	    $('html,body').animate({scrollTop:0},0);//回到顶端
	});
	// 点击国际港澳台
	$('#international').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var href = 'sel';
		var depositCity = JSON.parse(localStorage.getItem( href ));
		flightuuid = '2';
		DomcityList( depositCity,flightuuid);
		$('.letter').show();
		// 城市模糊搜索
//    	$("#cityipt").on('input propertychange', function(){
//    		doSearchDept(href,flightuuid);
//    	});
	})
	// 点击国内
	$('#inland').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var href = 'selectXieChengCityList';
		var depositCity = JSON.parse(localStorage.getItem( href ));
		flightuuid = '1';
		DomcityList( depositCity ,flightuuid);
		$('.letter').show();
		// 城市模糊搜索
//    	$("#cityipt").on('input propertychange', function(){
//    		doSearchDept(href,flightuuid);
//    	});
	})
	//点击索引查询城市
	$('body').on('click', '.letter a', function () {
	    var s = $(this).html();
	    console.log($('#' + s + '1').offset().top - '50')
	    $('html,body').scrollTop($('#' + s + '1').offset().top - '50');
	    $("#showLetter span").html(s);
	    $("#showLetter").show().delay(500).hide(0);
	});
	 //中间的标记显示
	 $('body').on('onMouse', '.showLetter span', function () {
	    $("#showLetter").show().delay(500).hide(0);
	});
	//  点击选中城市	
	$('body').on('click', '.city-list p', function () {
		if(HotelsTripscityId == 1){
			var tripId = that.parent().siblings('.tripRoute').find('.selected_clickTypeVal').val();
			that.children('input').val( $(this).html());
			that.siblings('.flightType').val( $(this).attr('uuid') );
	    	that.next('input').val( $(this).attr('data-id') );
	    	var departureCity = that.parents('.details').find('.departmentName').val();
	    	var arrivalCity = that.parents('.details').find('.arriveName').val();
	    	var departureCityUuid = that.parents('.details').find('.departureCityFlightType').val();
	    	var arrivalCityUuid = that.parents('.details').find('.arrivalCityFlightType').val();
	    	var particularMoneyVal = that.parents('.details').find('.particularMoneyVal');
//	    	var flightTypeVal = that.parents('.details').find('.flightType');
	    	var protection = that.parents('.details').find('.protection');
	    	var cityValArray = [departureCity,arrivalCity];
	    	var CityUuidArray = [departureCityUuid,arrivalCityUuid];
	    	console.log(CityUuidArray)
	    	var Ifcitycode = "2";
	    	var flightTypeuuid = "1";
	    	cityValArray.forEach( value =>{ 
	    		if(value === "请选择" || value === "") { 
	    			Ifcitycode = 1
	    		}
	    	})
	    	// 是否为国际航班
	    	CityUuidArray.forEach(v=>{
			    if(v === '2') {
			    	flightTypeuuid = 2 ;//则包含该元素
			    }
			})
			if(Ifcitycode == 2 && flightTypeuuid == 1){
	    		FlightAjax( departureCity,arrivalCity,particularMoneyVal,flightTypeuuid,tripId,protection );
	    		console.log(departureCity ,arrivalCity)
	    		particularMoneyVal.attr("readonly");
	    		particularMoneyVal.attr('unselectable','no')
	    		particularMoneyVal.attr('onfocus','this.blur()')
	    		protection.hide();
	    	}else if(Ifcitycode == 2 && flightTypeuuid == 2){
	    		protection.show();
	    		particularMoneyVal.val('');
	    		particularMoneyVal.removeAttr("readonly");
	    		particularMoneyVal.removeAttr('unselectable');
	    		particularMoneyVal.removeAttr('onfocus')
	    	}
		}else if(HotelsTripscityId == 3 || HotelsTripscityId == 5){
			var busDay = that.parents().siblings('.traveldays').find('.traveldaysVal').val();
			var dayNum = busDay ;
//			var dayNum = Math.floor(busDay);//根据天数计算金额时天数向上取整
			that.children('input').val( $(this).html());
			that.children('input').attr('uuid', $(this).attr('data-id'));
			that.parent().siblings('.particularMoney').find('input').val( $(this).attr('data-id') * dayNum);
			that.next('input').val( $(this).html() );
		}else{
			that.children('input').val( $(this).html());
			that.next('input').val( $(this).attr('data-id') );
		}
	     CityShowandhide();
	});
	//  点击取消隐藏城市列表
	$('.cancel_city').click(function(){
		CityShowandhide()
	});
	function CityShowandhide(){
		$('.aircraftTab ul li').first().addClass('active').siblings().removeClass('active');
		$('#cityipt').val('')
	    $('#newApply').show();
	    $(".Citywrap").hide();
	    $('.letter').show();
		$('#SearchCityVal').hide();
		$('#InitCityVal').show();
//		alert(scrollTop)
		$('html,body').animate({
		       scrollTop: scrollTop -'100'
		}, 0);
	}
	// 当dom加载完之后加载携程国际城市    
	$(document).ready(function(){
		var href = 'sel';
		$.ajax({ 
	    	url: sy + 'travelServer/selectXieChengCityListByInternational',
			type : 'GET',
			dataType: 'json',
			contentType : 'application/json;charset=UTF-8',
	        success: function (data) {
	        	if(data.resultCode == 0) {
	        		var res = data.result;
	        		localStorage.setItem( href , JSON.stringify(res));
	        		var testa = [];
	        		for( var i  in res){
	            		testa = testa.concat(res[i])
	        		}
//	        		alert(testa)
	        		sessionStorage.setItem("deptList" + href, JSON.stringify(testa));
//	        		alert(JSON.parse(sessionStorage.getItem("deptListsel")).length)
				    $(".loading").fadeOut();
	        	}
	        }
	    })
	})
	// 当dom加载完之后加载携程城市    
	$(document).ready(function(){
		var href1 = 'selectXieChengCityList';
		CityAjax( href1 );
		var href2 = 'selectDrippingCityListByPid';
		CityAjax( href2 );
		// 酒店城市
		HotelCity(resultId);
	})
	//点击保存  saveUpdateDetail
	//点击下一步
	var hrefUrl = "";
	var text = ""
	$('#next_step').click(function(){
		$('#next_step').attr('disabled',"true");//添加disabled属性   
		hrefUrl = 'draught.html';
		text ="提交";
		Url = sy + 'travelflow/travelapplication/2' ;
		preserveAjax(hrefUrl,text,Url);
	});
	//点击保存至草稿
	$('#preserve').click(function (){
		$('#preserve').attr('disabled',"true");//添加disabled属性 
		hrefUrl = 'draught.html';
		text = "保存";
		Url = sy + 'travelapplication/saveUpdateDetail'
		preserveAjax(hrefUrl,text,Url);
	});
	//点击保存  提交的ajax
	function preserveAjax(hrefUrl , text ,Url){
		var fdOrgNameTree = $('.identity_wrap span').html();
		var fdSid = $('.identity_wrap span').attr('fdSid');
		var fdOrgSidTree = $('.identity_wrap span').attr('fdOrgSidTree');
		var fdOrgSid = $('.identity_wrap span').attr('fdOrgSid');
		var fdInitiatingProcess = $('.identity_wrap span').attr('fdInitiatingProcess');
		var itemList = [],key = '',key2 = '',key3 = '';
		$('.content_wrap').children().each(function(index,element){
			var num = index + 1;
			key = "listItem" + num;
			itemList[key] = {};
			$(element).find('.details').find('input').each(function(index2,element2){
				itemList[key][listItem[index2]] = $(element2).prop('value');
			});
		});
		var list = [];
		for (var index in itemList) {
		  list.push(itemList[index]);
		}
		for (var stt in list) {
			  parseInt(list[stt].id);
		}
		var dataobj = {
				'id':parseInt(uuId),
				'fdSid':fdSid,
    			'fdOrgNameTree':fdOrgNameTree,
    			'fdOrgSid':fdOrgSid,
				'itemList':list,
				'fileNameUrl':JSON.stringify(source_fileNameUr_file)
				};
		var cityVal = [];
    	for(var i =0;i<list.length;i++){
    		cityVal.push(list[i].endAddress);
    		cityVal.unshift(list[i].startAddress);
    	};
    	// 判断国际航班护照名是否为空,国际航班机票预估是否为空
    	var protectionVal = "";
    	var protectionMoney = 2;
    	for(var i =0;i<list.length;i++){
    		if(list[i].departureCityFlightType == 2 || list[i].arrivalCityFlightType == 2 && list[i].transportType == 1){
    			if(list[i].passportName ){
    				protectionVal = 1
    			}else{
    				protectionVal = 2
    			}
    		}
    		if(list[i].transportType == 2  ){
    			if(list[i].itemMoney != "" ){
    				protectionMoney = 2
    			}else{
    				protectionMoney = 1
        		}
			}
    	};
    	console.log(dataobj);
    	var citycode = ""
    	cityVal.find(function(value) { 
    		if(value === "请选择" || value === "请填写") { 
    			citycode = 1
    		}
    	})
    	if(list.length == 0 && text == "提交"){
    		$('#next_step').removeAttr("disabled");	//移除disabled属性  
			$('#preserve').removeAttr("disabled"); //移除disabled属性  
    		$(".loading").fadeOut();
    		var msg= '请填写出差计划';
    		cueFrame(msg);
    	}else if( text == "保存"){
    		$(".loading").fadeIn(); 
			$.ajax({ 
		    	url: Url ,
				type : 'POST',
				dataType: 'json',
				contentType : 'application/json;charset=UTF-8',
				data : JSON.stringify(dataobj),
		        success: function (data) {
		        	console.log(data);
		        	if (data.resultCode == 0) {
		        		window.location.href=hrefUrl;
		        	}else{
		        		$('#next_step').removeAttr("disabled");	//移除disabled属性  
		    			$('#preserve').removeAttr("disabled"); //移除disabled属性  
		        		$(".loading").fadeOut();
                		var msg = '对不起,'+ text +'失败！';
                		cueFrame(msg);
		        	}
		        }
		    })
    	}else{
    		if(fdInitiatingProcess == '-1' && text == "提交"){
        		$('#next_step').removeAttr("disabled");	//移除disabled属性  
    			$('#preserve').removeAttr("disabled"); //移除disabled属性  
        		var msg='对不起,该角色无发起流程权限！';
        		cueFrame(msg);
        	}else{
        		if(protectionVal == 2){
        			var msg='对不起，请将护照名填写完整后再进行' + text;
            		cueFrame(msg);
            		$('#next_step').removeAttr("disabled");	//移除disabled属性  
        			$('#preserve').removeAttr("disabled"); //移除disabled属性  
        		}else{
        			if(protectionMoney == 1){
        				var msg='对不起，请填写预估金额后再进行' + text;
                		cueFrame(msg);
                		$('#next_step').removeAttr("disabled");	//移除disabled属性  
            			$('#preserve').removeAttr("disabled"); //移除disabled属性  
        			}else{
        				if(citycode == 1) { 
                    		var msg='对不起，请选择城市后再进行' + text;
                    		cueFrame(msg);
                    		$('#next_step').removeAttr("disabled");	//移除disabled属性  
                			$('#preserve').removeAttr("disabled"); //移除disabled属性  
                		}else{
                			$(".loading").fadeIn(); 
                			$.ajax({ 
                		    	url: Url ,
                				type : 'POST',
                				dataType: 'json',
                				contentType : 'application/json;charset=UTF-8',
                				data : JSON.stringify(dataobj),
                		        success: function (data) {
                		        	console.log(data);
                		        	if (data.resultCode == 0) {
                		        		window.location.href=hrefUrl;
                		        	}else{
                		        		$('#next_step').removeAttr("disabled");	//移除disabled属性  
                		    			$('#preserve').removeAttr("disabled"); //移除disabled属性  
                		        		$(".loading").fadeOut();
                                		var msg = '对不起,'+ text +'失败！';
                                		cueFrame(msg);
                		        	}
                		        }
                		    })
                		}
        			}
        		}
        	}
		}
	}
	function Appendzero(obj){
        if(obj<10) return "0" +""+ obj;
        else return obj;
   	};
  //输入天数计算住宿金额
   	$('.traveldaysVal').on('input propertychange', function(){
		var than = $(this).parents('.traveldays');
		var num = $(this).val()
		stayDays(than,num)
	});
   	// 时间初始化
	var timeStart = $('.timestartClass:last');
	var timeEnd = $('.timeendClass:last');
	TimeInit(timeStart);
	TimeInit(timeEnd);
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes(); 
	var seconds = date.getSeconds(); 
	var Datenew = year +'-'+ Appendzero(month) +'-'+ Appendzero(day)
	var onlyDate = year +'-'+ Appendzero(month) +'-'+ Appendzero(day) +' '+ Appendzero(hours) +':'+ Appendzero(minutes) ;
})
