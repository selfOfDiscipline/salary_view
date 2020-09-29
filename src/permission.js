import router from '@/router/index-router.js'
import { filterAsyncRouter } from '@/utils/filterRouter'
import { getMenu, login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth';
import store from './store'

var getRouter //用来获取后台拿到的路由
console.log(getRouter,'1111111')

router.beforeEach( async (to, from, next) => {
    if (!getRouter) { 
        routerGo(to, next)
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
    {
        path: '/salary',
        component: Layout,
        redirect: '/salary',
        name: 'Example',
        meta: { title: '财务管理', icon: 'example' },
        children: [
            {
                path: 'userList',
                name: 'userList',
                component: () => import('@/views/salary/salary/list'),
                meta: { title: '汇总工资' }
            },
            {
                path: 'Management',
                name: 'Management',
                component: () => import('@/views/salary/historicalWages/list'),
                meta: { title: '历史工资' }
            }
        ]
    },
    {
        path: '/systemSettings',
        component: Layout,
        redirect: '/systemSettings',
        name: 'Example',
        meta: { title: '基础设置', icon: 'example' },
        children: [
            {
                path: 'salaryDepartment',
                name: 'salaryDepartment',
                component: () => import('@/views/systemSettings/salaryDepartment/list'),
                meta: { title: '薪资部门' }
            },
            {
                path: 'businessDepartment',
                name: 'businessDepartment',
                component: () => import('@/views/systemSettings/businessDepartment/list'),
                meta: { title: '业务部门' }
            },
            {
                path: 'roleManagement',
                name: 'roleManagement',
                component: () => import('@/views/systemSettings/roleManagement/list'),
                meta: { title: '角色管理' }
            },
            {
                path: 'authoritymManagement',
                name: 'authoritymManagement',
                component: () => import('@/views/systemSettings/authoritymManagement/list'),
                meta: { title: '权限管理' }
            },
            {
                path: 'performanceManagement',
                name: 'performanceManagement',
                component: () => import('@/views/systemSettings/performanceManagement/list'),
                meta: { title: '绩效管理' }
            },
            {
                path: 'socialSecurity',
                name: 'socialSecurity',
                component: () => import('@/views/systemSettings/socialSecurity/list'),
                meta: { title: '社保管理' }
            }
        ]
    },
    {
        path: '/procesManagement',
        component: Layout,
        redirect: '/procesManagement',
        name: 'Example',
        meta: { title: '流程管理', icon: 'example' },
        children: [
            {
                path: 'salaryApproval',
                name: 'salaryApproval',
                component: () => import('@/views/procesManagement/salaryApproval/list'),
                meta: { title: '薪资审批' }
            },
            {
                path: 'businessApproval',
                name: 'businessApproval',
                component: () => import('@/views/procesManagement/businessApproval/list'),
                meta: { title: '业务审批' }
            }
        ]
    },
    {
        path: '/salaryManagement',
        component: Layout,
        redirect: '/salaryManagement',
        name: 'Example',
        meta: { title: '薪资管理', icon: 'example' },
        children: [
            {
                path: 'userList',
                name: 'userList',
                component: () => import('@/views/salaryManagement/userList/list'),
                meta: { title: '员工列表' }
            },
            // {
            //     path: 'Management',
            //     name: 'Management',
            //     component: () => import('@/views/salaryManagement/Management/list'),
            //     meta: { title: '管理岗计薪' }
            // },
            {
                path: 'Technical',
                name: 'Technical',
                component: () => import('@/views/salaryManagement/Technical/list'),
                meta: { title: '员工计薪' }
            }
        ]
    },
    {
        path: '/needManagement',
        component: Layout,
        redirect: '/needManagement',
        name: 'Example',
        meta: { title: '待办管理', icon: 'example' },
        children: [
            {
                path: 'Needhandle',
                name: 'Needhandle',
                component: () => import('@/views/needManagement/Needhandle/list'),
                meta: { title: '待办列表' }
            },
            {
                path: 'personalneedHandle',
                name: 'personalneedHandle',
                component: () => import('@/views/needManagement/personalneedHandle/list'),
                meta: { title: '个人待办' }
            }
        ]
    },
    
    {
        path: '/personalManagement',
        component: Layout,
        redirect: '/personalManagement',
        name: 'Example',
        meta: { title: '个人管理', icon: 'example' },
        children: [
            {
                path: 'personalCenter',
                name: 'personalCenter',
                component: () => import('@/views/personalManagement/personalCenter/list'),
                meta: { title: '个人中心' }
            }
        ]
    },
]

function routerGo(to, next) {
    
    getRouter = filterAsyncRouter(getRouter) //过滤路由
    let allRouter = getRouter.concat(notFound)
    router.addRoutes(allRouter) //动态添加路由
    store.commit("user/SET_ROUTER",allRouter) // 保存路由，做侧边栏菜单渲染工作
    console.log(allRouter)
    next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
    localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
    return JSON.parse(window.localStorage.getItem(name));
}
