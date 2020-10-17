import Layout from '@/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入
export const loadView = (view) => {
    return (resolve) => require([`@/views${view}`], resolve)
}
export function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  if(!asyncRouterMap){return []}
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      } else {
        // let comp = route.component.slice(2);
        let arr = route.component.split('views');
        // route.component = ()=>import(`@/views${arr[1]}`)
        route.component = loadView(arr[1])
      }
    }else if(route.component === ''){
        delete route.component
    }
    if (route.children) {
        if(route.children.length>0){
            route.children = filterAsyncRouter(route.children)
        }
    }
    if(route.children&&route.children.length&&route.children[0].title==="首页"){
        delete route.children[0].children
    }
    return true
  })
  return accessedRouters
}
