import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
// import router from './router'
import router from './router/index-router';
// 菜单
import permission from './permission'
import '@/icons' // icon
import '@/permission' // permission control
import currencyInput from "@/layout/components/CurrencyInput";
Vue.use(currencyInput)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.filter('moneyFormit', function(val) {
  if (val != null) {
    let newval = val.toLocaleString()
    if ((newval + '').indexOf('.') == -1) {
      newval += '.00'
    }
    return newval
  } else {
    return val
  }
})
Vue.filter('UppercaseMoney', function(price) {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
	  ['元', '万', '亿'],
	  ['', '拾', '佰', '仟']
  ]
  let num = Math.abs(price)
  let s = ''
  fraction.forEach((item, index) => {
	  s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '')
  })
  s = s || '整'
  num = Math.floor(num)
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
	  let p = ''
	  for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p
      num = Math.floor(num / 10)
	  }
	  s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
})

Vue.filter('dataFormat', function(val) {
  if (val != null) {
    const lsarr = val.split(' ')
    return lsarr[0]
  } else {
    return val
  }
})

Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
