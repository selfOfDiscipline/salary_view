<template>
  <div :class="hasBorder ? 'cards hasBoxShadow' : 'cards'">
    <div class="head">
      <div :class="title ? 'title' : 'empty'">
        {{title}}
      </div>
      <div class="right" v-if="canedit">
        <slot name="btnarea">

        </slot>
      </div>
    </div>
    <slot name="main">

    </slot>
    <div :class="(hasBorder && !hasFoot) ? 'foot': 'foot footHeight'">
      <slot name="foot">

      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      hasBorder: {
        type: Boolean,
      },
      hasFoot: {
        type: Boolean,
        default: true
      },
      canedit:{
        type: Boolean,
        default: true
      }
    },
    data: function() {
      return {
      }
    },
    created() {
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  $height: 44px;
  >>>.el-dialog .el-dialog__header {
    margin-right: 20px;
  }
  .cards {
    background: #fff;
    overflow: hidden;
    padding: 0 25px;
    margin: 0;
    margin-top: 4px;
    .head {
      display: flex;
      align-items: center;
      min-height: 50px;
      line-height: $height;
      padding: 0;
      justify-content: space-between;
      .title {
        font-family: PingFangSC-Medium;
        display: inline-block;
        padding-left: 5px;
        font-size: 14px;
        color: #333333;
        font-weight: 700;
        line-height: $height;
        &::before{
          content: "";
          width: 4px;
          height: 16px;
          background: #2395f7;
          display: inline-block;
          position: relative;
          left: -6px;
          top: 3px;
          border-radius: 2px;
        }
      }
      .right .el-button {
        min-width: 92px;
        padding: 0 21px;
      }
    }
    .foot {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      min-height: 10px;
    }
    .footHeight{
      // height: 28px;
    }
    >>> .pagination {
      text-align: right;
      padding: 10px 0;
    }
  }
  .hasBoxShadow {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
  }
</style>
