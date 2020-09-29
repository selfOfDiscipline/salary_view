import request from '@/utils/request'

// /salary/selectUserListBySalaryUser
// 计薪列表查询/
export function selectUserListBySalaryUser(data) {
  return request({
    url: 'salary/selectUserListBySalaryUser',
    method: 'post',
    data
  })
}
// 一键生成该负责人对应员工的本月基础工资单
export function generateTheMonthBasePayroll() {
    return request({
        url: '/salary/generateTheMonthBasePayroll',
        method: 'get',
    })
}
// 正常员工计薪
export function lastMonthCompute(data) {
    return request({
        url: '/salary/lastMonthCompute',
        method: 'post',
        data
    })
}
// 上月入职员工计薪
export function lastMonthIncomeCompute(data) {
    return request({
        url: '/salary/lastMonthIncomeCompute',
        method: 'post',
        data
    })
}
// 上月转正员工计薪
export function lastMonthBecomeCompute(data) {
    return request({
        url: '/salary/lastMonthBecomeCompute',
        method: 'post',
        data
    })
}


// 批量删除员工
// export function deleteUserByIds(params) {
//   return request({
//     url: '/config/user/deleteUserByIds',
//     method: 'get',
//     params
//   })
// }