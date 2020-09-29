import request from '@/utils/request'
// 核算人员与部门配置列表
export function selectUserSalaryDeptList(data) {
  return request({
    url: '/config/base/selectUserSalaryDeptList',
    method: 'post',
    data
  })
}
// 查询角色是薪资核算的人员列表
export function selectUserComputeRoleList(data) {
  return request({
    url: 'config/base/selectUserComputeRoleList',
    method: 'post',
    data
  })
}
// 薪资归属部门列表
export function selectSalaryDeptList(data) {
  return request({
    url: 'config/base/selectSalaryDeptList',
    method: 'post',
    data
  })
}

// 新增用户薪资部门关联数据
export function saveUserSalaryDept(data) {
  return request({
    url: 'config/base/saveUserSalaryDept',
    method: 'post',
    data
  })
}

// /config/base/deleteUserSalaryDeptByIds
// 批量删除用户薪资部门关联表数据
export function deleteUserSalaryDeptByIds(params) {
  return request({
    url: 'config/base/deleteUserSalaryDeptByIds',
    method: 'get',
    params
  })
}