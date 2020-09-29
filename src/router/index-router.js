import Vue from 'vue'
import Router from 'vue-router'
import { setToken, getToken } from '@/utils/auth';
// import store from '../store';
Vue.use(Router)

import Layout from '@/layout';
// var constantRouterMap=[]

// export default new Router({
//   routes: constantRouterMap
 
// })
export const constantRoutes = [
	{
		path: '/',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	
	// {
	// 	path: '/example',
	// 	component: Layout,
	// 	redirect: '/example/table',
	// 	name: 'Example',
	// 	meta: { title: '预算管理', icon: 'example' },
	// 	children: [
	// 	{
	// 		path: 'table',
	// 		name: 'Table',
	// 		component: () => import('@/views/table/index'),
	// 		meta: { title: 'Table', icon: 'table' }
	// 	},
	// 	{
	// 		path: 'tree',
	// 		name: 'Tree',
	// 		component: () => import('@/views/tree/index'),
	// 		meta: { title: 'Tree', icon: 'tree' }
	// 	}
	// 	]
	// },
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
		// {
		// 	path: '/salaryManagement',
		// 	component: Layout,
		// 	redirect: '/salaryManagement',
		// 	name: 'Example',
		// 	meta: { title: '员工管理', icon: 'example' },
		// 	children: [
		// 		{
		// 			path: 'userList',
		// 			name: 'userList',
		// 			component: () => import('@/views/salaryManagement/userList/list'),
		// 			meta: { title: '管理岗员工' }
		// 		},
		// 		{
		// 			path: 'Management',
		// 			name: 'Management',
		// 			component: () => import('@/views/salaryManagement/Management/list'),
		// 			meta: { title: '技术岗员工' }
		// 		}
		// 	]
		// },
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
				// {
				// 	path: 'businessApproval',
				// 	name: 'businessApproval',
				// 	component: () => import('@/views/procesManagement/businessApproval/list'),
				// 	meta: { title: '业务审批' }
				// }
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
				// 	path: 'Management',
				// 	name: 'Management',
				// 	component: () => import('@/views/salaryManagement/Management/list'),
				// 	meta: { title: '管理岗计薪' }
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
		// {
		// 	path: '/personalManagement',
		// 	component: Layout,
		// 	redirect: '/personalManagement',
		// 	name: 'Example',
		// 	meta: { title: '个人管理', icon: 'example' },
		// 	children: [
		// 		{
		// 			path: 'personalCenter',
		// 			name: 'personalCenter',
		// 			component: () => import('@/views/personalManagement/personalCenter/list'),
		// 			meta: { title: '个人中心' }
		// 		}
		// 	]
		// },
]
const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes
	});

const router = createRouter();
export function resetRouter() {
	
	const newRouter = createRouter();
	router.matcher = newRouter.matcher; // reset router
}
 
export default router;
