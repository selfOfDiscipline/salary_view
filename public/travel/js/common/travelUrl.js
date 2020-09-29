// import request from 'request'
// document.write("<script language='javascript' src='../../js/common/request.js'></script>");
function getList(data) {
    return request({
      url: '/newtravelpc/selectFeeBusinessListByCondition',
      method: 'post',
      data
    })
}