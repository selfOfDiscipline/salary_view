import request from '@/utils/request'

// /salary/selectHistorySalaryList
// 查询历史工资单列表
export function selectHistorySalaryList(data) {
  return request({
    url: '/salary/selectHistorySalaryList',
    method: 'post',
    data
  })
}

// 汇总工资单
export function selectCollectListBySalaryDate(params) {
    return request({
        url: '/salary/selectCollectListBySalaryDate',
        method: 'get',
        params
    })
}

// 导出
export function exportSalaryBill(data){
  return request({
      url: "salary/exportSalaryBill",
      method: "post",
      data,
      responseType: 'blob'
  })
}
