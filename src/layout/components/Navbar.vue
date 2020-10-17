<template>
  <div class="navbar">
    <div class="headerLogo">
      <img src="@/assets/logo1.png" alt="" class="logo">
      <div class="operationGroup" >
          <!-- 您好：{{userName}} -->
        <!-- <el-dropdown  @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </el-dropdown> -->
      </div>
    </div>
    <div class="breadcrumbWrap">
      <breadcrumb class="breadcrumb-container" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  
  data(){
      return{
          userName:'',
      }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
    methods: {
        // handleCommand(command) {
        //     if(command == '1'){
        //         window.open('http://new-fkdev.seedland.cc:8090/#/invoice')
        //     }else{
        //         this.$router.push({
        //             path: '/systemManagement/PersonalSettings/index'
        //         })
        //     }
        // },
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    },
  created(){
      // this.userName = this.$store.state.user.userInfo.userName
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;
  z-index: 10;
  .headerLogo{
    height: 60px;
    position: relative;
    .logo{
      margin-top: 10px;
      margin-left: 15px;
      /* width: 200px; */
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumbWrap{
    background: #F7F7F7;
    width: 100%;
    height: 38px;
  }
  .breadcrumb-container {
    float: left;
    margin-left: 33px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
  .operationGroup{
    // line-height: 60px;
    position: fixed;
    width: 130px;
    // height: 60px;
    right: 0px;
    top: 20px;
    font-size: 14px;
    font-weight: bold;
    font-family: PingFangSC-Regular;
  }
  .el-dropdown-link .el-dropdown-selfdefine{
      height: 60px;
  }
//   .el-dropdown-link {
//     cursor: pointer;
//     color: #1660a3;
//   }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
