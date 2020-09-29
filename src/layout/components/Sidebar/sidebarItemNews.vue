<template>
  <el-menu
    default-active="2"
    class="menucss"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
    :unique-opened="true"
    :collapse="isCollapse"
    :collapse-transition="false"
    :popper-append-to-body="true"
    router
  >
    <template v-for="(item,idx) in menuList">
      <el-submenu @mouseenter.native="handleEnter" :popper-append-to-body="true" v-if="item.meta&&item.meta.title&&item.children" :index="idx+''" :key="idx">
        <template slot="title">
          <svg-icon :icon-class="item.meta.icon" />
          <span slot="title">{{item.meta.title}}</span>
        </template>
        <template v-if="item.children.length">
          <el-menu-item
            v-for="(val,j) in item.children"
            :index="val.redirect"
            :key="j+'$'"
            class="submenu-title-noDropdown"
            :popper-append-to-body="true"
          >{{val.meta.title}}</el-menu-item>
        </template>
      </el-submenu>
      <template v-else>
        <el-menu-item :popper-append-to-body="true" @mouseenter.native="handleEnter" :index="item.redirect" :key="idx" class="submenu-title-noDropdown">
          <svg-icon :icon-class="item.children&&item.children[0].meta.icon" />
          <span slot="title">{{item.children&&item.children[0].meta.title}}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
export default {
  props:{
    menuList: {
      type: Array,
      required: true
    }
  },
    computed: {
    ...mapGetters([
      'sidebar',
      'userInfo'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
    },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleEnter(e){
        console.log(e.currentTarget)
        let sidebarContainer = document.querySelector(".sidebar-container");
        let menuAlert = document.querySelectorAll(".el-menu--horizontal");
        let divW = sidebarContainer.getBoundingClientRect().width;
        console.log(72,divW)
        for(var i=0;i<menuAlert.length;i++){
          if(menuAlert[i].style.display !== "none"){
            console.log(menuAlert[i])
          }
        }
      }
    }
}
</script>
<style lang="stylus" scoped>

</style>