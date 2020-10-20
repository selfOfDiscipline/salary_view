<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" /> -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <div class="appmain-wrap">
        <app-main />
      </div>
      <!-- <div class="bottom">
        �版权所有：实地地产集团有限公司  ALL RIGHTS RESERVED: GUANGZHOU SEEDLAND REAL ESTATE DEVELOPMENT CO., LTD
      </div> -->
    </div>

  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import {WatermarkSeedland} from '@/utils/watermark-seedland'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
  },
  mounted(){
    console.log(this.$store.state)
    let userName = sessionStorage.getItem('userName');
    // let loginTime = this.$store.state.user.loginTime
    // 时间修改为24小时制
    // window.onload = function () {
    //   // alert(111)
    //   new WatermarkSeedland('张三', {
    //     isMobile: true
    //   });
    // }
    new WatermarkSeedland(userName, {isMobile: true});
    // this.diyfun();
	  // .$watermark.set(`费控系统，，${loginTime}`)
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .appmain-wrap{
    position: absolute;
    width: 100%;
    top: 98px;
    min-height: calc(100vh - 98px);
    height: auto;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 12px;
    color: #94A4AC;
  }
</style>
