import router from '@/router/index-router.js'
import { filterAsyncRouter } from '@/utils/filterRouter'
import { getMenu, login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth';
import store from './store'

var getRouter //用来获取后台拿到的路由
console.log(getRouter,'1111111')

router.beforeEach( async (to, from, next) => {
    console.log(to)
    // let token = getToken()
    if (!getRouter && to.fullPath !== '/') { 
        
        getMenu().then(res => {
            console.log(res)
            getRouter = res.data
            routerGo(to, next)
            
        })
        // routerGo(to, next) //执行路由跳转方法
    }else{
        next()
    }
    
//     console.log(!getRouter)
//     let token = getToken()
//     
//         getMenu().then(res => {
//             console.log(res)
//             routerGo(to, next) //执行路由跳转方法
//         })
//     } else {
//         next()
//     }
})
import Layout from '@/layout';
let notFound = [
    {
        path: '/',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    
]

function routerGo(to, next) {
    console.log(getRouter,'........')
    getRouter = filterAsyncRouter(getRouter) //过滤路由
    let allRouter = getRouter.concat(notFound)
    router.addRoutes(allRouter) //动态添加路由
    store.commit("user/SET_ROUTER",allRouter) // 保存路由，做侧边栏菜单渲染工作
    console.log(allRouter,'全部菜单')
    next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
    localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
    return JSON.parse(window.localStorage.getItem(name));
}
