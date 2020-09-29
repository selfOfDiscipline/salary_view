import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'config/user/login',
    method: 'post',
    data
  })
}

// 查询个人菜单
export function getMenu(params) {
  return request({
    url: 'config/menu/selectMenuList',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: 'config/user/logout',
    method: 'get'
  })
}
