import currencyInputComponent from "./CurrencyInput";

const currencyInput = {
  install:function(Vue){
    Vue.component("currency-input",currencyInputComponent)
  }
}

export default currencyInput
