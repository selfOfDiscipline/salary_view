<template>
  <div class="nav" :class="{'has-logo':showLogo}">
      <img src="@/assets/toggle.png" alt="" class="togglebtn" @click="toggleSideBar">
      <logo v-if="showLogo" :collapse="isCollapse" />
      <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <div class="avatar-wrapper">
          <!-- female -->
          <img src="@/assets/male.png" :class="isCollapse?'user-avatar2':'user-avatar'">
          <p v-if="!isCollapse" class="usertext">{{userName}}</p>
          <!-- <p v-if="!isCollapse" class="usertext">薪资管理系统</p> -->
      </div>
      <div class="menuBigBox" id="menuBigBox" @mousemove="handlerSetScroll" @mouseleave="handlerSetHidden">
      <div class="menuBox" id="menuBox" @mousemove="checkLeave">
      <div class="scrollBox">
      <!-- <el-scrollbar> -->
      <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="true"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical "
          id="menucss"
      >
          <!-- <sidebar-item v-for="(route, index) in routes" :key="route.path" :item="route" :base-path="route.path" :mark="index + ''" /> -->
          <sidebar-item class="myside" @mouseenter.native="handleEnter" @mouseleave.native="handleLeave" v-for="(route, index) in routes" :key="index" :item="route" :base-path="route.path" :mark="index + ''" />
      </el-menu>
      <!-- </el-scrollbar> -->
      </div>
      </div>
      </div>
      <div class="signoutwrap">
          <div class="signout" @click="logout">
          <svg-icon icon-class="exit" />
          <span v-if="!isCollapse">退出系统</span>
          </div>
      </div>
      <!-- </el-scrollbar> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {logout} from '@/api/user'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
// import SidebarItem from './sidebarItemNews'
import variables from '@/styles/variables.scss'
import { removeToken } from '@/utils/auth'

export default {
components: { SidebarItem, Logo },
computed: {
  ...mapGetters([
    'sidebar',
    'userInfo'
  ]),
  routes() {
    console.log(this.$store.state.user.antRouter,'caodan =====')
    // return this.$router.options.routes
    return this.$store.state.user.antRouter

  },
  // activeMenu() {
  //   const route = this.$route
  //   const { meta, path } = route
  //   const routes = this.$router.options.routes
  //   const cur = '/' + path.split('/')[1]
  //   // if set path, the sidebar will highlight the path you set
  //   if (meta.activeMenu) {
  //     return meta.activeMenu
  //   }
  //   return "1"
  // },
  showLogo() {
    return this.$store.state.settings.sidebarLogo
  },
  variables() {
    return variables
  },
  isCollapse() {
    return !this.sidebar.opened
  }
},
data () {
  return {
   activeMenu: '2',
    RetutnUrl:'',
    userName:'',
    menuBigBox: null,
    bigBoxW: 0,
    action:process.env.VUE_APP_BASE_API+'/login',
  }
},

mounted() {
  this.userName = sessionStorage.getItem('userName');
  // this.userName =getAttribute("userName")   
  // this.userName = this.$store.state.user.userInfo.userName
    this.RetutnUrl = window.location.href;
    this.$nextTick(function(){
      this.setMenuW()
    })
    // console.log(this.RetutnUrl)
},
watch:{
  isCollapse:{
    handler(val,oldVal){
      if(val!=oldVal){
        if(val === false){
          this.$nextTick(function(){
            this.setMenuW(171)
          })
        }else{
          this.$nextTick(function(){
            this.setMenuW(54)
          })
        }
      }
    }
  }
},
methods: {
  async logout() {
    removeToken('userInfo')
    logout().then((res) => {
      
      if(res.code == 401 || res.code ==200){
        
          this.$store.commit('user/SET_USERINFO', {})
          this.$store.commit("user/SET_LOGINTIME",'1')
               window.location.href = action;
          }else{
              this.$message.error(res.message)
          }
      });
  },
  toggleSideBar() {
    // console.log(555)
    this.$store.dispatch('app/toggleSideBar')
  },
  handlerSetScroll(e){
    if(event.target.className !== "scrollBox"){
      // this.setStyle(-260,260)
      this.setMenuW()
      this.setStyle(-150,150)
    }
  },
  handlerSetHidden(e){
    this.setStyle(0,0)
  },
  checkLeave(event){
    if(event.target.className === "scrollBox"){
      this.setStyle(0,0)
    }
  },
  setStyle(marginR,paddingR){
    let scrollBox = document.getElementById("menuBox")
    scrollBox.style.marginRight = marginR+"px"
    scrollBox.style.paddingRight = paddingR+"px"
  },
  setMenuW(val){
    let bigBox = document.querySelector(".sidebar-container")
    let menucss = document.getElementById("menucss")
    // console.log(138,bigBox)
    if(bigBox){
      let bigBoxW = bigBox.getBoundingClientRect().width
      if(bigBoxW != this.bigBoxW&&bigBoxW!="54"||bigBoxW != this.bigBoxW&&bigBoxW!="170"){
        this.bigBoxW = bigBoxW
        // menucss.style.width = bigBoxW + "px"
        menucss.setAttribute('style', `width: ${bigBoxW-1}px !important`);
      }
      if(val){
        bigBoxW = val
        menucss.setAttribute('style', `width: ${bigBoxW-1}px !important`);
      }
    }
  },
  handleEnter(e){
    let curDOC = e.currentTarget
    let menu = curDOC.querySelector('.el-menu--inline')
    let scrollBox = document.querySelector(".scrollBox")
    let scrollBoxPos = scrollBox.getBoundingClientRect()
    if(menu){
      menu.style.overflowY="scroll"
      menu.style.overflowX="hidden"
      menu.style.display = "block"
      let pos = menu.getBoundingClientRect()
      let winH = window.innerHeight
      // console.log(pos,scrollBoxPos)
      if(pos.bottom>scrollBoxPos.bottom){
        let dif = pos.bottom - scrollBoxPos.bottom
        menu.style.top = -dif+"px"
      }
      // if(pos.bottom>winH){
      //   let dif = pos.bottom - winH + 100
      //   menu.style.top = -dif+"px"
      // }
    }
  },
  handleLeave(e){
    let curDOC = e.currentTarget
    let menu = curDOC.querySelector('.el-menu--inline')
    if(menu){
      menu.style.display = "none"
    }
  }
}
} 
</script>
<style lang='scss' scoped>
.nav{
position: relative;
.signoutwrap{
  position: absolute;
  bottom: 17px;
  left: 50%;
  transform: translateX(-50%);
  .signout{
    display: inline-block;
    white-space: nowrap;
    span{
      white-space: nowrap;
    }
  }
}
}
@media screen and (min-device-height: 900px) {
.nav {
  .signoutwrap{
    bottom: 30px;
  }
}
}
.myside{
position: relative;
font-size: 0;
}
.menuBigBox{
max-width: 170px;
}
.menuBox{
overflow: hidden;
position: relative;
} 
.scrollBox{
height: calc(100vh - 240px);
scroll-behavior:smooth;
overflow-x: hidden;
overflow-y: scroll;
-webkit-overflow-scrolling: touch;
// padding-right: 283px;
// margin-right: -300px;
padding-right: 170px;
margin-right: -170px;
}
.avatar-wrapper{
margin-top: 45px; //45
margin-bottom: 58px; //58
height: 80px;;
}
// @media screen and (device-height: 768px) {
@media screen and (max-device-height: 768px) {
// @media screen and (max-height: 768px) {
#app{
.menuBigBox{
  .myside{
    >>>.el-menu-item{
        height: 36px;
        line-height: 36px;
    }
    >>>.el-submenu .el-submenu__title{
      height: 36px;
      line-height: 36px;
    }
    >>>.el-submenu .el-menu-item{
      height: 36px;
      line-height: 36px;
    }
    >>>.nest-menu{
      height: 36px;
      line-height: 36px;
    }
  }
}
}
}
.user-avatar{
width: 62px;
border-radius: 50%;
margin: auto;
display: block;
}
.user-avatar2{
width: 35px;
border-radius: 50%;
margin: auto;
display: block;
transition-delay: 0s;
}
.usertext{
width: 100%;
font-size: 18px;
line-height: 28px;
color: #FFFFFF;
text-align: center;
}
// .menucss{
//   height: calc(80vh) !important;
// }
.signoutwrap{
// height: 40px;
// line-height: 40px;
// padding-top: 20px;
// padding-bottom: 20px;
position: relative;
background-color: #000e1b;
cursor: pointer;
}
.signout{
font-size: 14px;
color: #D8D8D8;
text-align: center;
width: 100%;
border: transparent;
.svg-icon{
  font-size: 20px;
  margin-right: 6px !important;
  vertical-align: -0.25em;
}
span{
  font-size: 14px;

}
}
.togglebtn{
  position: absolute;
  right: -10px;
  top: calc(50vh - 42px);
  width: 10px;
  height: 85px;
  cursor: pointer;
}
.menuBigBox{
.menuBox{
  margin-right: 0px;
  padding-right: 0px;
}
}
.menuBigBox:hover{
.menuBox{
  margin-right: -150px;
  padding-right: 150px;
}
}
</style>
