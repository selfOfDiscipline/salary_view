// 保存预定数据
var dataList;
$(function(){
    // 时间戳转换为日期格式
    function add0(m){return m<10?'0'+m:m }
    function format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
        return y+'-'+add0(m)+'-'+add0(d);
    }
    // console.log(format(1245678900000))

    // 返回
    $(".return").click(function(){
        history.back();
    });

    // M1,M2,M3 权限
    $.ajax({
        url:sy()+'/travelServer/judgeUserRankForBusiness',
        type : 'get',
        dataType: 'json',
        contentType : 'application/json;charset=UTF-8',
        //sdata: JSON.stringify(idData),
        success: function (data) {
            if(data){
                $("#Jurisdiction").show();
                // $('#content ul.details:last-child').css('margin-bottom','2.8rem');
                $("#Jurisdiction").click(function(){
                    if(parseInt(getQueryString("transport_type")) == 1){
                        window.location.href = sy() + "/feeInvoice/toXieChengFlightPage";
                    }else if(parseInt(getQueryString("transport_type")) == 4){
                        $.ajax({
                            url:sy()+'/didi/api/loginDiDi',
                            type : 'GET',
                            dataType: 'json',
                            contentType : 'application/json;charset=UTF-8',
                            success: function (data) {
                                // true  /  false 权限页面
                                if(data.resultCode == 0){
                                    window.location.href = "openapp://?name="+ encodeURIComponent(data.result) + "&url=" + encodeURIComponent("https://dc.tt/esappd");
                                }else{
                                    $("#promptContent").html(data.message);
                                    $(".Reminder").fadeToggle();
                                    $(".Reminder,.cancel").click(function(e){
                                        $(".Reminder").hide();
                                    })
                                }
                            }
                        });
                    }
                })
            }else{
                $("#Jurisdiction").hide();
            }
        },
        error:function(){}
    });

    // 获取列表
    var queryData = {
        "page": 1,
        "rows": 10,
        "changeType": parseInt(getQueryString("transport_type"))
    };
    $.ajax({
        url:sy()+'/travelServer/selectTravelapplicationList',
        type : 'POST',
        dataType: 'json',
        contentType : 'application/json;charset=UTF-8',
        data: JSON.stringify(queryData),
        success: function (data) {
            $(".loading").fadeOut();
            var listString = "";
            var listStartString = "";
            var listEndString = "";
            var detailString = '';
            var detailStart = '';
            var detailEnd = '';
            var detailData = [];
            if(data.resultCode == 0){
                dataList = data.result.res;
                // 判断是否为空数组
                if(dataList.length != 0){
                    $(".background_remind").hide();
                    // 判断是哪一个类型跳转过来的？ 飞机为1，打车为4
                    if(parseInt(getQueryString("transport_type")) == 1){
                        for(var item in dataList){
                            listStartString = '<ul class="details clearfix">' +
                                '<li class="subjectData">' +
                                '<span class="detailList slide_out_details"></span>' +
                                '<div class="details_title">' +
                                '<span>'+ dataList[item].theme +'</span>' +
                                '<p>'+ dataList[item].applicationCode +'</p>' +
                                '<p>'+ dataList[item].responsibleDate +'</p>' +
                                '</div>';
                            listEndString = '</li></ul>';

                            detailData = dataList[item].itemList;
                            // 排除详情为空
                            if(detailData.length !== 0){
                                detailStart = '<div class="toggleCon">';
                                for(var el in detailData){
                                    if(detailData[el].itemMoney == null){
                                        detailData[el].itemMoney = 0.0;
                                    }
                                    detailString +='<ul class="toggleBox flight">' +
                                        '<li>明细<p>'+ detailData[el].startAddress +'- '+ detailData[el].endAddress +'</p></li>' +
                                        // '<li>金额<p><i>¥</i>'+ detailData[el].itemMoney +'</p></li>' +
                                        '<li>日期<p>'+ detailData[el].startDate.split(" ")[0] +'</p></li>' +
                                        '<li class="fixed_position flight_com" ><span class="order" onclick="clickTaskFlight('+JSON.stringify(dataList[item].id)+','+JSON.stringify(detailData[el].id)+')">预订</span><span class="change_application" uuid="'+ dataList[item].id +'">更改</span></li>'+
                                        '</ul>';
                                }
                                detailEnd = '</div>';
                            }
                            listString += (listStartString + detailStart + detailString + detailEnd +listEndString);
                            detailData = [];
                            detailStart = '';
                            detailString = '';
                            detailEnd = '';
                        }
                        $("#content").append(listString);
                    } else if(parseInt(getQueryString("transport_type")) == 4){
                        for(var item in dataList){
                            listStartString = '<ul class="details clearfix">' +
                                '<li class="subjectData">' +
                                '<span class="detailList slide_out_details"></span>' +
                                '<div class="details_title">' +
                                '<span>'+ dataList[item].theme +'</span>' +
                                '<p>'+ dataList[item].applicationCode +'</p>' +
                                '<p>'+ dataList[item].responsibleDate +'</p>' +
                                '</div>';
                            listEndString = '</li></ul>';

                            detailData = dataList[item].itemList;
                            // 排除详情为空
                            if(detailData.length !== 0){
                                detailStart = '<div class="toggleCon">';
                                for(var el in detailData){
                                    if(detailData[el].itemMoney == null){
                                        detailData[el].itemMoney = 0.0;
                                    }
                                    detailString +='<ul class="toggleBox">' +
                                        '<li>明细<p>'+ detailData[el].startAddress +'- '+ detailData[el].endAddress +'</p></li>' +
                                        // '<li>金额<p><i>¥</i>'+ detailData[el].itemMoney +'</p></li>' +
                                        '<li>日期<p>'+ detailData[el].startDate.split(" ")[0] +'</p></li>' +
                                        '</ul>';
                                }
                                detailEnd = '<ul class="toggleBox" style="margin-bottom: 0;border: none;background: none;"><li class="fixed_position"><span class="order" onclick="clickTaskTaxi('+JSON.stringify(dataList[item].id)+')">打车</span><span class="change_application">更改</span></li></ul></div>';
                            }
                            listString += (listStartString + detailStart + detailString + detailEnd +listEndString);
                            detailData = [];
                            detailStart = '';
                            detailString = '';
                            detailEnd = '';
                        }
                        $("#content").append(listString);
                    }

                    // 隐藏，显示
                    $(".slide_out_details").click(function(){
                        $(this).siblings(".toggleCon").slideToggle();
                        $(this).toggleClass("slide_in_details");
                    });

                    // 更改-- 出差申请
                    $(".change_application").click(function(){
                    	var uuId = $(this).attr('uuid');
                        window.location.href="../leave/audited_travel.html?uuId="+uuId;;
                    });
                }else if(dataList.length == 0){
                    // 成功  获取数据为空 显示提示
                    $(".background_remind").show();
                }
            } else if(data.resultCode == -1){
                // 失败
                $("#promptContent").html(data.message);
                $(".Reminder").fadeToggle();
                $(".Reminder,.cancel").click(function(){
                    $(".Reminder").hide();
                })
            }
        }
    });
});

// 正则解析？参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 获取？参数值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// 预订飞机
function clickTaskFlight(id,ids){
    var flightObj;
    if(dataList){
        for(var i=0;i<dataList.length;i++){
            var flightid = dataList[i].id;
            if(id==flightid){
                if(dataList[i].itemList.length>0){
                    for(var j=0;j<dataList[i].itemList.length;j++){
                        var flightData = dataList[i].itemList[j];
                        if(ids == flightData.id){
                             flightObj={
                                "startAddressId":flightData.startAddressId,
                                "endAddressId":flightData.endAddressId,
                                "tripType":flightData.tripType,
                                "businessTripLevel":flightData.businessTripLevel,
                                "startDate":flightData.startDate,
                                "endDate":flightData.endDate,
                                // "itemMoney":flightData.itemMoney,
                                "id":flightData.id,
                                 "coseFlag":parseInt(getQueryString("coseFlag"))
                            };
                        }
                    }
                }
            }
        }
    }

    $.ajax({
        url:sy()+'/xieChengApi/setApprovalByXieCheng',
        type : 'POST',
        dataType: 'json',
        contentType : 'application/json;charset=UTF-8',
        data: JSON.stringify(flightObj),
        success: function (data) {
            if(data.resultCode == 0 || data.resultCode == 1){ // 成功
                window.location.href=sy() + "/feeInvoice/toXieChengPage?tripType="+ flightObj.tripType +"&&businessTripLevel=" + flightObj.businessTripLevel +
                    "&&startDate=" + flightObj.startDate + "&&endDate=" + flightObj.endDate +
                    "&&startAddressId=" + flightObj.startAddressId + "&&endAddressId=" + flightObj.endAddressId + "&&id=" + flightObj.id;
            }else if(data.resultCode == -1){ // 失败
                $("#promptContent").html(data.message);
                $(".Reminder").fadeToggle();
                $(".Reminder,.cancel").click(function(e){
                    $(".Reminder").hide();
                })
            }
        }
    })
}

// 点击打车
function clickTaskTaxi(id){
    var itemObj;
    var itemArr=[];
    if(dataList){
        for(var i=0;i<dataList.length;i++){
            var uuid = dataList[i].id;
            if(id==uuid){
                if(dataList[i].itemList.length>0){
                    for(var j=0;j<dataList[i].itemList.length;j++){
                        var jData = dataList[i].itemList[j];
                        var tripObj={
                            "startAddress":jData.startAddress,
                            "startAddressId":parseInt(jData.startAddressId),
                            "endAddress":jData.endAddress,
                            "endAddressId":parseInt(jData.endAddressId),
                            "startDate":jData.startDate.substring(0,10),
                            "endDate":jData.endDate.substring(0,10)
                        };
                        itemArr.push(tripObj)
                    }
                }
                itemObj=	{
                    "id":dataList[i].id,
                    "businessTripBeginDate":dataList[i].businessTripBeginDate.substring(0,10),
                    "businessTripEndDate":dataList[i].businessTripEndDate.substring(0,10),
                    "rankType":dataList[i].rankType,
                    "itemList":itemArr
                };
            }
        }
    }
    $.ajax({
        url:sy()+'/didi/api/getDiDiCreateApproval',
        type : 'POST',
        dataType: 'json',
        contentType : 'application/json;charset=UTF-8',
        data: JSON.stringify(itemObj),
        success: function (data) {
            if(data.resultCode == 0){ // 成功
                // 页面加载滴滴单点登录
                $.ajax({
                    url:sy()+'/didi/api/loginDiDi',
                    type : 'GET',
                    dataType: 'json',
                    contentType : 'application/json;charset=UTF-8',
                    success: function (data) {
                        // true  /  false 权限页面
                        if(data.resultCode == 0){
                            window.location.href = "openapp://?name="+ encodeURIComponent(data.result) +"&url=https://dc.tt/esappd";
                        }else{
                            $("#promptContent").html(data.message);
                            $(".Reminder").fadeToggle();
                            $(".Reminder,.cancel").click(function(e){
                                $(".Reminder").hide();
                            })
                        }
                    }
                });
            }else if(data.resultCode == -1){ // 失败
                $("#promptContent").html(data.message);
                $(".Reminder").fadeToggle();
                $(".Reminder,.cancel").click(function(e){
                    $(".Reminder").hide();
                })
            }
        }
    })
}
