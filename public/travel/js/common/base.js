//接口地址前半部分
function sy() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPath = curWwwPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	// return(localhostPath + projectName);
	// var Url = 'http://fmin.seedland.cc:8081'
	var Url = 'http://new-fkdev.seedland.cc:8181'
    console.log(Url,'请求路径')
	return(Url);
}