import currencys from "./Currency";

const currency = {
  install:function(Vue){
    Vue.component("currency",currencys)
  }
}

export default currency