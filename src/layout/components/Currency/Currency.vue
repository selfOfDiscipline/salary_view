<template>
  <div>
    <div :class="disabled ? 'el-input is-disabled' : 'el-input'">
      <input class="el-input__inner bxmoney" maxLength="18" :value="formatValue" :disabled="disabled" ref="input"
          placeholder="请输入金额" @input="updatevalue($event.target.value)" @blur="onBlur" @focus="selectAll" />
          <span class="inptuSpan">元</span>
    </div>
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
        default: 2,
        desc: "小数位"
      },
      disabled: {//是否禁用
        default: false,
      },
      right: {//是否是从右侧显示数据
        default: true
      },
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
          return this.value ? accounting.unformat(this.value) : "";
        } else {
          if (this.value === 0) {
            return accounting.formatMoney(this.value, this.symbol, this.decimal);
          } else if (
            this.value === "" ||
            this.value === null ||
            this.value === undefined
          ) {
            return "";
          } else {
            return accounting.formatMoney(this.value, this.symbol, this.decimal);
          }
        }
      }
    },
    methods: {
      updatevalue(value) {
        if (/((^-?[1-9]?\d*)|^-?0)(\.\d{0,2}){0,1}$/.test(value)) {//判断格式是否正确
          if (value === '-') {
            this.$emit("input", value);
          } else {
            let formatvalue = !!value ? accounting.unformat(value) : "";
            this.$emit("input", formatvalue);
          }
        } else if (/((^-?[1-9]?\d*)|^-?0)(\.\d+)$/.test(value)) {//小数点位数大于
          let formatvalue = accounting.unformat((value - 0).toFixed(2))
          this.$emit("input", formatvalue);
        } else {
          let formatvalue = !!value ? accounting.unformat(value) : "";
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

  .el-input{
    height: 34px !important;
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;


  }
  input{
    font-size: 12px;
    text-align: right;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    // height: $height!important;
    // line-height: $height!important;
  }
  .inptuSpan{

    background-color: #F5F7FA;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>
