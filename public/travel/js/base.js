// document.write("<script language=javascript src='http://ui.tahoecn.com:8181/jslib/burialPointPlus.js'></script>");
//$('form').attr('onkeydown', 'if(event.keyCode==13){return false;}'); //防止回车提交表单

//接口地址前半部分
function sy() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPath = curWwwPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	// return(localhostPath + projectName);
	var Url = 'http://new-fkdev.seedland.cc:8181'
	return(Url);
}

/*
 *调用方法：$('#formid').jsontoform(jsonObj)
 *注意:jsonObj必须是duixiang，参数中的key为表单中的name，value为表单中的value.
 */
/*String.prototype.lTrim=function(){return this.replace(/^'/,"");}; 
String.prototype.rTrim = function(){return this.replace(/'*$/, "");};//去掉右面空格;   
String.prototype.Trim = function(){return this.lTrim().rTrim();}; //记得各句后都有分号  
*/

$.fn.jsontoform = function(jsonObj) {
	var formid = "#" + $(this).attr("id"); //input,textarea,select;  
	// var objs = jsonObj.split(',');
	for(x in jsonObj) {
		// var kvs = objs[i].split(':');
		//layerAlert('',kvs.length);  
		var k = x;
		var v = jsonObj[x] == null ? '' : jsonObj[x];
		//layerAlert('',k+"  "+v);  
		selector = formid + " [name='" + k + "']";
		//layerAlert('',selector);  
		//layerAlert('',$(selector).length);  
		if($(selector).length > 0) {
			for(j = 0; j < $(selector).length; j++) {
				//text or password   
				if($(selector).attr("type") == "text" || $(selector).attr("type") == "password" || $(selector).attr("type") == "number" || $(selector).attr("type") == "hidden") {
					$(selector).val(v);
				}
				if($(selector).attr("type") == "number") {
					$(selector).val(Number(v).toFixed(2));
				}
				//combo select   
				if($(selector).attr("type") == null && $(selector).length == 1) {
					var selector1 = formid + " select[name='" + k + "']";
					//console.log(selector1);
					if($(selector1).length == 1) {
						for(n = 0; n < $(selector1 + " option").length; n++) {
							//layerAlert('',n+":"+$(selector+" option:eq("+n+")").val()+"["+$(selector+" option:eq("+n+")").html()+"]==?=="+v);  
							if($(selector1 + " option:eq(" + n + ")").val() == v) {
								$(selector1 + " option:eq(" + n + ")").attr("selected", true);
								break;
							}
						};
					}
				}
				// checkbox  
				if($(selector).attr("type") == "checkbox") {
					var checkboxselector = "input[type='checkbox'][name='" + k + "']";
					var options = v.split('|');
					for(m = 0; m < options.length; m++) {
						for(k = 0; k < $(checkboxselector).length; k++) {
							if($(checkboxselector + ":eq(" + k + ")").val() == options[m]) {
								$(checkboxselector + ":eq(" + k + ")").attr("checked", true);
							}
						}
					}
				}
				//readio  
				if($(selector).attr("type") == "radio") {
					var radioselector = "input[type='radio'][name='" + k + "']";
					for(k = 0; k < $(radioselector).length; k++) {
						if($(radioselector + ":eq(" + k + ")").val() == v) {
							$(radioselector + ":eq(" + k + ")").attr("checked", true);
						}
					}
				}

				//textarea  
				if($("textarea[name='" + k + "']").length == 1) {
					$("textarea[name='" + k + "']").val(v);
				}

			}
		}

	}
}

function toJsonObj(ldata) {
	var obj = new Object();
	try {
		$(ldata).each(function(i, o) {
			obj[o.name] = o.value;
		});
	} catch(e) {}
	return obj;
}

// 获取当前公司id
function getCurCompanyId() {
	var curCompanyId = window.top.$('#currentCompany').attr('data-id');
	// console.log(curCompanyId);
	return curCompanyId;
}
// 获取当前公司
function getCurCompany() {
	var curCompany = {};
	curCompany.id = window.top.$('#currentCompany').attr('data-id');
	curCompany.name = window.top.$('#currentCompany').text();
	return curCompany;
}
// 获取登录人所属公司
function getBaseCompany(){
    var baseCompany = {};
    baseCompany.id = window.top.$("#baseCompany").attr("data-id");
    baseCompany.name = window.top.$("#baseCompany").val();
    return baseCompany;
}
// 通过cookie获取当前公司
function getCurCompanyByCookie() {
	var curCompany = {};
	curCompany.id = getCookie('fk-curCompanyId');
	curCompany.name = getCookie('fk-curCompanyName');
	return curCompany;
}
// 获取userName和userId
function getUser() {
	var user = {};
	user.userName = window.top.$('#userName').text();
	user.userId = window.top.$('#userId').val();
	return user;
}
// 通过cookie获取userName和userId
function getUserByCookie() {
	var user = {};
	user.userName = getCookie('fk-userName');
	user.userId = getCookie('fk-userId');
	return user;
}
// 设置cookie
function setCookie(name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	window.top.document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toUTCString());
}
// 获取cookie
function getCookie(name) {
	var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
	var arr = document.cookie.match(reg);
	if(arr) {
		return unescape(arr[2]);
	} else {
		return null;
	}

}
// 树状列表（只能选择叶子节点，并且返回所有父级节点的名称用'-'连接）

// 判断是否是父级节点
/**
 **tr的class名结构必须是'treegrid-6 treegrid-parent-6'格式
 **target是所点击的tr,targetId是从目标tr的class名中treegrid-6截取的数字
 */
function isParent(target, targetId) {
	var isParent = false;
	$.each($(target).siblings('tr'), function(index, item) {
		if($(item).hasClass('treegrid-parent-' + targetId)) {
			isParent = true;
			return false;
		}
	});
	return isParent;
}
// 排列父级节点名称
function reverseFNames(tr) {
	//return getFName(tr).split('-').reverse().join('-');
	return getFName(tr);
}
// 获取父级节点名称
function getFName(tr) {
	var parentClassStr = $(tr).attr('class').match(/treegrid-parent-(\S+)/);
	//var parentClass;
	// var parentClassPos = parentClass.indexOf('treegrid-parent-');
	var parentClassNumber;
	var parentsName;

	if(parentClassStr != null) {
		//parentClass = parentClassStr[0];
		parentClassNumber = parentClassStr[1];
		parentsName = $(tr).find('td').eq(0).text();

		$.each($(tr).siblings('tr'), function(index, item) {
			if($(item).hasClass('treegrid-' + parentClassNumber)) {
				// return parentsName + '-' + getFName(item);
				//parentsName += '-' + (getFName(item));
				parentsName = getFName(item) + "-" + parentsName;
				return false;
			}
		});
	} else {
		parentsName = $(tr).find('td').eq(0).text();
	}

	return parentsName;

}
//获取组织机构ID
function getOrganizationId() {
	return $(".organization ").attr('data-id');
}

//window.open打开新页面
function windowOpenNewUrl(url) {
	var newWindow = window.open('');
	newWindow.location.href = url;
}

//IE 9下 console未定义问题
window.console = window.console || (function() {
	var c = {};
	c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function() {};
	return c;
})();
//loading
   setSize();
    var maskFlag;
	function setSize() {
        if(maskFlag){
            $("#mask").css("height", "100%");
        }else{
            $("#mask").css("height", $(window).height());
        }
	}
	$(window).resize(function () {          //当浏览器大小变化时
        setSize()
    });
    
function   layerAlert(title,message){   
	if(title.length==0){
		title="提示"
	}
	 layer.alert(message, {
	  skin: 'layui-layer-red',
	  closeBtn: 0 ,
	  title:title
	
});
}

//var confirmisok=false;
//function   layerConfirm(title,message,){
//	if(title.length==0){
//		title="提示"
//	}
//	layer.confirm(message, {
//	skin: 'layui-layer-red',   
//	title: title,       
//	btn: ['确定', '取消']       
//}, function(index) {
//	 layer.close(index);
//   return confirmisok=true;
//}, function(index) {
//	layer.close(index);
//	 return confirmisok=false;
//});
//
//}
//表单重置
 function resetForm(id){
 	$("#"+id+" input").val("")
 	
 }

 $(document).on('click', '.pagination .disabled a', function() {
	 return false;
 });
 
 //获取当前服务器时间
 function getDate(){
	 var nowdate;
	 $.ajax({
		 async: false,
		 cache:false,   
		 type: "get",
		 url: sy()+"/dateForViews",
		 success: function (result) {
			 nowdate= new Date(result.result);
		  },
		  error : function() {
			  nowdate= new Date();
		  }
	 });
	 return nowdate;
 }
 //判断当前登录人是否是申请人
 function checkApplyUser(applyUserId){
	 var loginName;
	 $.ajax({
		 async: false,
		 type: "get",
		 url: sy()+"/getLoginName",
		 success: function (data) {
			loginName = data.result.loginName;
		 },
		 error : function() {
		 }
	 });
	 if(applyUserId == loginName){
		 return true;
	 }else{
		 return false;
	 }
 }
 //获取当前登录人
 function queryApplyUser(){
	 var userName;
	 $.ajax({
		 async: false,
		 type: "get",
		 url: sy()+"/getLoginName",
		 success: function (data) {
			 userName = data.result.userName;
		 },
		  error : function() {
			
		  }
	 });
	 return userName;
 }
//页面全部只读（input、button、select、textarea）
 function formDisabled(){
	 $("input,button,select,textarea").attr("disabled",true);
 }
 
 //千分位
 function formatCurrency(num) {
	 if(num!=undefined){
	    num = num.toString().replace(/\$|\,/g,'');
	    if(isNaN(num))
	        num = "0";
	    sign = (num == (num = Math.abs(num)));
	    num = Math.floor(num*100+0.50000000001);
	    cents = num%100;
	    num = Math.floor(num/100).toString();
	    if(cents<10)
	    cents = "0" + cents;
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    num = num.substring(0,num.length-(4*i+3))+','+
	    num.substring(num.length-(4*i+3));
	    return (((sign)?'':'-') + num + '.' + cents);
	 }
	 return null;
	}
 
 //去除千分位
 function quchu(num){
	 if(num==undefined||num==""||num==null){
		 return 0.00;
	 }else if(typeof(num)=="number"){
		 return Number(num.toFixed(2));
	 }else if(num==NaN){
		 return 0.00;
	 }
	 var a = num.split(",");
	 var b = parseFloat(a.join(""));
	 
	 return Number(b.toFixed(2));
 }
 
 $("input.money").change(function(){
		var mon = $(this).val();
		$(this).val(formatCurrency(mon));
	});
 
 function qfw(){
		$("body").find(".money").each(function(){
			 $(this).val(formatCurrency($(this).val()));
	   });
	}
 
 //判断table tbody是否有tr,没有隐藏
 function hideTable(tableId,tableParentId){
	var contents =  $("#"+tableId).find("tbody tr");
	if(contents == null || contents.length == 0){
		$("#"+tableParentId).hide();
	}
 }
// 获取字符串长度（区分中英文）
function gblen(str) {
    var len = 0;
    for (var i=0; i<str.length; i++) {
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}

 function GetQueryString(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
		var context = ""; 
		if (r != null) 
	    	context = r[2]; 
		reg = null; 
		r = null; 
		return context == null || context == "" || context == "undefined" ? "" : context; 
	}
 /*格式化时间new Date(value).format("yyyy-MM")*/
 Date.prototype.format = function(fmt) { 
      var o = { 
         "M+" : this.getMonth()+1,                 //月份 
         "d+" : this.getDate(),                    //日 
         "h+" : this.getHours(),                   //小时 
         "m+" : this.getMinutes(),                 //分 
         "s+" : this.getSeconds(),                 //秒 
         "q+" : Math.floor((this.getMonth()+3)/3), //季度 
         "S"  : this.getMilliseconds()             //毫秒 
     }; 
     if(/(y+)/.test(fmt)) {
             fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
     }
      for(var k in o) {
         if(new RegExp("("+ k +")").test(fmt)){
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
      }
     return fmt; 
 }
 //新增遮罩层
 function layerLoad(){
     var loadIndex = null;
     function show(){
        if(loadIndex == null){
            loadIndex = layer.load(2,{shade:[.5,"#000"]});
        }
     }
     function close(){
        if(loadIndex != null){
            layer.close(loadIndex);
            loadIndex = null;
        }
     }
     return {
         show:show,
         close:close
     }
 }
var loadMask = layerLoad();//方法 show：显示 close：关闭

//关闭页面
function closeWindow(){
    layer.confirm('确定关闭当前页面？', {
        skin: 'layui-layer-red',   
        title: '提示',       
        btn: ['确定', '取消']       
    }, function(index) {
        layer.close(index);
        window.close();
    }, function(index) {
        layer.close(index);
    });
}

// 导出文件时 判断文件导出成功后关闭遮蔽罩
function exportExcelForm(obj){
    var timer,flag=0;
    var _self=obj._self;// 按钮对象
    var downloadToken=obj.time,//时间戳,cookie的value
        url=obj.url,// 下载的url
        triggerDelay = 1000,// 循环的时间（单位ms）
        method = obj.method == undefined ? 'get' : obj.method;
    _self.innerHTML='导出中...';
    // _self.classList.add('disabled');
    _self.setAttribute('disabled',true);
    timer=setTimeout(function() {// 定义定时器
        function checkToken(){
            var timerll=setInterval(function(){// 循环任务
                var sertoken=getCookie(obj.key);
                if(sertoken/*&&(sertoken==downloadToken)*/){// 判断下载请求是否结束
                    clearTimeout( downloadTimer );// 关闭定时器
                    clearInterval( timerll );// 关闭循环任务
                    $('#mask').hide();// 关闭遮蔽罩
                    frame.remove();// 删除iframe元素
                    // _self.classList.remove('disabled');
                    _self.removeAttribute('disabled');
                    _self.innerHTML=obj.text;
                    clearCookie(obj.key);// 清除设定的cookie
                    flag=0;
                }else if(sertoken){
                    layerAlert("",obj.text+'失败');
                    clearTimeout( downloadTimer );
                    clearInterval( timerll );
                    $('#mask').hide();
                    clearCookie(obj.key);
                    // _self.classList.remove('disabled');
                    _self.removeAttribute('disabled');
                    _self.innerHTML=obj.text;
                }
            },100);
        }
        if(!flag){// 0：false；1：true
            flag=1;
            var frame = '';
            if (method == "get"){
                // 创建一个隐藏的iframe元素，去下载
                frame=$('<iframe />').attr('src', url).attr('id','iframe_download_report').hide().appendTo('body');
            } else if (method == "post") {
                // 创建一个隐藏的iframe元素，去下载
                frame=$('<iframe />').attr('id','iframe_download_report').hide();
                var form = $('<form target="" method="'+method+'" action="'+url+'">');
                for (var item in obj.data){
                    $(form).append("<input type='hidden' name='"+item+"' value='"+obj.data[item]+"'/>");
                }
                $(form).append('<input type="hidden" name="time" value="'+downloadToken+'"/>');
                $(frame).append(form);
                $(frame).appendTo('body');
                $(form).submit();
            }
            // 创建定时器
            var downloadTimer=setTimeout(checkToken,triggerDelay);
        }
    }, triggerDelay);
}
// 删除cookie中的某个key
function clearCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null){
    	if (name === 'expenseDownload'){
            document.cookie= name + "="+cval+";path=/fk;expires="+exp.toGMTString();
		} else {
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();// 有效时间？
        }
    }
}

// 存在流程code的单据，暂存更新OA数据
function updateDataToOA(flowCode){
	var url = sy()+"/dataUpdate/updateToOA";
	$.ajax({
		url:url,
		data:{flowCode:flowCode},
		dataType:'json',
		// contentType:'application/json; charset=utf-8',
		type:'post',
		async:false,
		cache:false,
		success:function (json) {
            console.log(json.message);
			if (json.resultCode == 0){

			}
		},
		error:function (err) {

        }
	});
}
// 判断是否是空
function checkIsNotEmpty(str){
	if (str == undefined){
        return false;
	} else if (str == null){
        return false;
	} else if (str == ""){
        return false;
	} else if (str == "null"){
		return false;
	} else {
        return true;
	}
};
//年度下拉框
function yearSelect(ele){
     $.ajax({ 
         url:sy()+'/dateForViews',
         type : 'post',
         dataType: 'json',
         async:false,
         contentType : 'application/json;charset=UTF-8',
         success: function (data) {
             var oDate = new Date(data.result),  //将时间戳转为时间
             yearVal = oDate.getFullYear(); //获取时间年份
             var yearMinus_Two = yearVal - 2;
             var yearMinus_One = yearVal - 1;
             var yearAdd_One   = yearVal + 1;
             var yearAdd_Two   = yearVal + 2;
             var yearAdd_Three = yearVal + 3;
             var  arr=[yearMinus_Two,yearMinus_One,yearVal,yearAdd_One,yearAdd_Two,yearAdd_Three];
             var src = ""
            // 循环年份到下拉列表 
             for (var i = 0; i < arr.length; i++) {
                if(arr[i] == yearVal){
                	 src+='<option value="'+ arr[i] +'" selected>'+ arr[i] +'</option>'//默认选中当前年份
                }else{
                	src+='<option value="'+ arr[i] +'">'+ arr[i] +'</option>'
                }
            };
            $(ele).html(src);
         }
     })
} 
//月份下拉框
function monthSelect(ele){
     $.ajax({ 
         url:sy()+'/dateForViews',
         type : 'post',
         dataType: 'json',
         async:false,
         contentType : 'application/json;charset=UTF-8',
         success: function (data) {
             var oDate = new Date(data.result),  //将时间戳转为时间
             yearVal = oDate.getMonth() + 1; //获取时间月份
             var yearMinus_twelve = 12;
             var yearMinus_eleven = 11;
             var yearMinus_Ten = 10;
             var yearMinus_Nine = 9;
             var yearMinus_Eight = 8;
             var yearMinus_Seven = 7;
             var yearMinus_Six = 6;
             var yearMinus_Five = 5;
             var yearMinus_Four = 4;
             var yearMinus_Three = 3;
             var yearMinus_Two = 2;
             var yearMinus_One = 1;
             var  arr=[yearMinus_twelve,yearMinus_eleven,yearMinus_Ten,yearMinus_Nine,yearMinus_Eight,yearMinus_Seven,yearMinus_Six,yearMinus_Five,yearMinus_Four,yearMinus_Three,yearMinus_Two,yearMinus_One];
             var src = ""
            // 循环月份到下拉列表 
             for (var i = 0; i < arr.length; i++) {
                if(arr[i] == yearVal){
               	 src+='<option value="'+ arr[i] +'" selected>'+ arr[i] +'</option>'//默认选中当前月份
               }else{
               	src+='<option value="'+ arr[i] +'">'+ arr[i] +'</option>'
               }
            };
            $(ele).html(src);
         }
     })
} 