import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
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
				// {
				// 	path: 'salaryDepartment',
				// 	name: 'salaryDepartment',
				// 	component: () => import('@/views/systemSettings/salaryDepartment/list'),
				// 	meta: { title: '计薪人员' }
				// },
				{
					path: 'salaryApproval',
					name: 'salaryApproval',
					component: () => import('@/views/systemSettings/salaryApproval/list'),
					meta: { title: '流程列表' }
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
				{//可以修改基本信息
					path: 'userList',
					name: 'userList',
					component: () => import('@/views/salaryManagement/userList/list'),
					meta: { title: '员工列表' }
				},
				{//可以修改全量信息
					path: 'alluserList',
					name: 'alluserList',
					component: () => import('@/views/salaryManagement/alluserList/AllList'),
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
		{
			path: '/personalCenter',
			component: Layout,
			redirect: '/personalCenter',
			name: 'Example',
			meta: { title: '个人管理', icon: 'example' },
			children: [
				{
					path: 'editpassword',
					name: 'editpassword',
					component: () => import('@/views/personalCenter/editpassword/index'),
					meta: { title: '个人中心' }
				}
			]
		},
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
