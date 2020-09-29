import request from '@/utils/request'

// 个人发起的流程列表
export function selectMineAgendaList(data) {
  return request({
    url: 'agenda/selectMineAgendaList',
    method: 'post',
    data
  })
}
// 查询个人待办列表
export function selectPersonAgendaList(data) {
  return request({
    url: 'agenda/selectPersonAgendaList',
    method: 'post',
    data
  })
}
// 查询工资单列表
export function getSalaryInfoByApplicationCode(params) {
  return request({
    url: '/agenda/getSalaryInfoByApplicationCode',
    method: 'get',
    params
  })
}
// 处理当前节点
export function handleThisNode(params) {
  return request({
    url: '/agenda/handleThisNode',
    method: 'get',
    params
  })
}

// 发起薪资审批流程
export function startSalaryFlow(params) {
  return request({
    url: '/salary/startSalaryFlow',
    method: 'get',
    params
  })
}


