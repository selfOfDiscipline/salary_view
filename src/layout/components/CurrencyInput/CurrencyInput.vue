<template>
  <div>
    <!-- <div :class="disabled ? 'el-input is-disabled' : 'el-input'"> -->
      <input class="el-input__inner" maxLength="18" :value="formatValue" :disabled="disabled" ref="input"
             placeholder="请输入金额" @input="updatevalue($event.target.value)" @blur="onBlur" @focus="selectAll" />
    <!-- </div> -->
  </div>
</template>

<script>
  import accounting from "accounting";
  export default {
    props: {
      value: {
        type: [String, Number],
        default: 0,
        desc: "数值"
      },
      symbol: {
        type: String,
        default: "",
        desc: "货币标识符"
      },
      decimal: {
        type: Number,
        default: 3,
        desc: "小数位"
      },
      disabled: {//是否禁用
        default: false,
      },
      right: {//是否是从右侧显示数据
        default: false
      },
      isPositive: false,
      elvalue: [String, Number]
    },
    data() {
      return {
        focused: false
      };
    },
    computed: {
      formatValue() {
        if (this.focused) {
          return this.value //? accounting.unformat(this.value)
        } else {
          if (this.value === 0) {
            return accounting.formatMoney(this.value, this.symbol, this.decimal);
          } else if (
            this.value === "" ||
            this.value === null ||
            this.value === undefined
          ) {
            return "";
          } else if (this.value === '-') {
            return '-'
          } else {
            return accounting.formatMoney(this.value, this.symbol, this.decimal);
          }
        }
      }
    },
    methods: {
      updatevalue(value) {
        if(value<=1){
          const isPositive = this.isPositive
          const reg = isPositive ? /((^[1-9]?\d*)|^0)(\.\d{0,2}){0,1}$/ : /((^-?[1-9]?\d*)|^-?0)(\.\d{0,2}){0,1}$/
          const pointReg = isPositive ? /((^[1-9]?\d*)|^0)(\.\d+)$/ : /((^-?[1-9]?\d*)|^-?0)(\.\d+)$/
          if (reg.test(value)) {//判断格式是否正确
            if (value === '-') {
              this.$emit("input", value);
            } else {
              let formatvalue = !!value ? accounting.unformat(value) : "0.000";
              this.$emit("input", formatvalue);
            }
          } else if (pointReg.test(value)) {//小数点位数大于
            let formatvalue = accounting.unformat((value - 0).toFixed(3))
            this.$emit("input", formatvalue);
          } else {
            let formatvalue
            if (isPositive) {
              formatvalue = accounting.unformat('')
            } else {
              formatvalue = !!value ? accounting.unformat(value) : "0.000";
            }
            this.$emit("input", formatvalue);
          }
        }else{
          let formatvalue = "0.000";
          this.$emit("input", formatvalue);
        }
        
      },
      onBlur() {
        this.focused = false;
        this.$emit("blur", event);
        this.dispatch("ElFormItem", "el.form.blur", [this.value]);
      },
      selectAll(event) {
        this.focused = true;
        setTimeout(() => {
          event.target.select();
        }, 0);
      },
      dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;

          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  $height: 32px;
  .left-input input{
    text-align: left;
  }
  input{
    font-size: 12px;
    text-align: left;
    height: $height!important;
    line-height: $height!important;
  }
</style>
