import request from '@/utils/request'

export function logout() {
  return request({
    url: 'config/user/logout',
    method: 'get'
  })
}
