import request from '@/utils/request'

// /config/user/updateUserPassword
// 修改密码
export function updateUserPassword(data) {
    return request({
        url: '/config/user/updateUserPassword',
        method: 'post',
        data
    })
}


