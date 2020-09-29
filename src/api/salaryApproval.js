import request from '@/utils/request'

///flow/selectFlowList
// 查询所有流程配置列表
export function selectFlowList(data) {
  return request({
    url: 'flow/selectFlowList',
    method: 'post',
    data
  })
}

// 批量删除
export function deleteFlowConfigByIds(params) {
  return request({
    url: '/flow/deleteFlowConfigByIds',
    method: 'get',
    params
  })
}

// 新增或修改流程信息
export function saveOrUpdateFlowConfig(data) {
    return request({
      url: '/flow/saveOrUpdateFlowConfig',
      method: 'post',
      data
    })
  }


// 根据流程主表ID查询流程信息
export function getFlowConfigById(params) {
    return request({
      url: 'flow/getFlowConfigById',
      method: 'get',
      params
    })
  }