import request from '@/utils/request'


// 查询全量部门结构
export function selectDeptList() {
  return request({
    url: '/config/dept/selectDeptList',
    method: 'get'
  })
}

// 查询全量岗位结构
export function selectRoleList() {
    return request({
      url: '/config/role/selectRoleList',
      method: 'get'
    })
  }
  
  // 查询薪资核算部门列表
  export function selectSalaryDeptList(data) {
    return request({
      url: '/config/base/selectSalaryDeptList',
      method: 'post',
      data
    })
  }
  
  // 新增或修改用户信息
  export function saveOrUpdateManageUser(data) {
    return request({
      url: '/config/user/saveOrUpdateManageUser',
      method: 'post',
      data
    })
  }

// 查询人员列表
export function selectUserList(data) {
  return request({
    url: '/config/user/selectUserList',
    method: 'post',
    data
  })
}
// 查询所有人员列表
export function selectAllUserList(data) {
  return request({
    url: '/config/user/selectAllUserList',
    method: 'post',
    data
  })
}

// 批量删除员工
export function deleteUserByIds(params) {
  return request({
    url: '/config/user/deleteUserByIds',
    method: 'get',
    params
  })
}


// 根据用户ID查询用户信息
export function getUserInfoById(params) {
  return request({
    url: '/config/user/getUserInfoById',
    method: 'get',
    params
  })
}

// 给员工转正或离职
export function updateUserRankByCondition(data) {
  return request({
    url: '/config/user/updateUserRankByCondition',
    method: 'post',
    data
  })
}

// // 查询人员列表全部
// export function selectAllUserList(data) {
//   return request({
//     url: '/config/user/selectAllUserList',
//     method: 'post',
//     data
//   })
// }
// 修改用户基础信息
export function updateUserByCondition(data) {
  return request({
    url: '/config/user/updateUserByCondition',
    method: 'post',
    data
  })
}

