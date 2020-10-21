<template>
    <div class="app-container">
        <BoxCard title="基本信息" class="modelbox">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-position="right" 
                class="form-area" 
                label-width="130px" 
                slot="main">
                <el-form-item label="姓名">
                    <el-input v-model="form.userName" placeholder="请输入姓名" readonly></el-input>
                </el-form-item>
                <el-form-item label="OA账号">
                    <el-input v-model="form.userAccount" placeholder="请输入OA账号" readonly></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.userCard" placeholder="请输入身份证号" maxlength="18" readonly></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.userTel" placeholder="请输入手机号" maxlength="11" readonly></el-input>
                </el-form-item>
                <el-form-item label="入职日期" >
                    <el-date-picker readonly
                        v-model="form.userEntryDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        placeholder="请选择入职日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="在职状态" prop="userRankType">
                    <el-select v-model="form.userRankType" 
                    disabled
                    filterable placeholder="在职状态" >
                        <el-option v-for="item in RankTypeOption" readonly
                            :key="item.id"
                            :label="item.typeName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </BoxCard>
        <BoxCard title="修改密码" class="modelbox pawd">
            <el-form :inline="true" :model="form" ref="form" :rules="rules" label-position="right" 
                class="form-area" 
                label-width="100px" 
                slot="main"> 
                <el-form-item label="账号" prop="account">
                    <el-input v-model="form.userAccount"></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="form.oldPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" >
                    <el-input v-model="form.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button type="primary" plain @click="">取消</el-button> -->
                    <el-button type="primary" plain @click="SaveSubmit">确定修改</el-button>
                </el-form-item>
            </el-form>
        </BoxCard>
    </div>
</template>
            
<script>
    import { updateUserPassword } from '@/api/personalCenter'
    import {getUserInfoById} from '@/api/userList'
    import {BoxCard} from '@/layout/components'
    export default {
        
        components: {
            BoxCard,
        },
        
        data() {
            return {
                RankTypeOption:[
                    {
                        typeName: '试用期',
                        id: 0
                    },
                    {
                        typeName: '正式',
                        id: 1
                    },
                    {
                        typeName: '离职',
                        id: 2
                    }
                ],
                userId:'',
                rules:{//单据类型
                    account:[
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    oldPassword:[
                        { required: true, message: ' 请输入旧密码', trigger: 'blur' },
                    ],
                    newPassword:[
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                    confirmPassword:[
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                    ],
                },
                form:{

                },
            }
        },
        mounted(){
            this.userId =  sessionStorage.getItem('userId');
            this.getUserInfoById(this.userId);
        },
        methods: {
            getUserInfoById(id){
                getUserInfoById({id:id}).then(res=>{
                    if(res.code == 200){
                        this.form=res.data.user
                    }
                   
                }
            )},
            SaveSubmit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        const { userAccount,oldPassword,newPassword,confirmPassword} = this.form;
                        let par ={
                            account:userAccount,
                            oldPassword:oldPassword,
                            newPassword:newPassword,
                            confirmPassword:confirmPassword
                        }
                        updateUserPassword(par).then(res =>{
                            console.log(res);   
                            if(res.code == 200){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                })
                            }else{
                                this.$message({
                                    type: 'error',
                                    message:res.message
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>
<style lang="scss" scoped>

        .pro-tree{
                /* width: 100%; */
                height: 24px;
            }
            .pro-tree .filter-tree{
                width: 100%;
                min-width: 280px;
                position: relative;
                max-height: 300px;
                overflow: auto;
                z-index: 9;
                border-radius: 4px;
                border: 1px solid #DCDFE6;
            }
        .tevBtn{
            height: 32px !important;
            line-height: 32px !important;
        
        }
        .app-container{
        
        //   padding: 20px;
          padding-bottom: 65px;
          position: relative;
          margin-bottom: 15px;
        }
          .modelbox{
            margin-bottom: 10px;
          }
          .form-area{
                    margin: 20px 0;
                    padding: 0 20px;
                    width: 100%;
                    .el-form-item {
                        width: 50%;
                        margin-right: 0;
                        float: left;
                        display: flex;
                        padding-right: 25px;
                        margin-bottom: 10px;
                        margin-top: 10px;
                    &.remark {
                        width: 100%;
                        display: flex;
                        >>> .el-form-item__content {
                        flex: 1;
                        }
                    }
                    }
                    >>> .el-form-item__content {
                    flex: 1;
                    .el-select {
                        width: 100%;
                    }
                    .el-date-editor{
                        width: 80%;
                    }
                    
                    .el-date-editor.el-input__inner{
                        width: 100%;
                        height: 35px !important;
                    }
                    .el-input-number{
                        width: 100%;
                    }
                    }
                }
          .form-area{
            margin: 20px 0;
            padding: 0 20px;
            width: 100%;
            .el-form-item {
              width: 50%;
              margin-right: 0;
              float: left;
              display: flex;
              padding-right: 30px;
              &.remark {
                width: 100%;
                display: flex;
                >>> .el-form-item__content {
                  flex: 1;
                }
              }
            }
            >>> .el-form-item__content {
              flex: 1;
              .el-select {
                width: 100%;
              }
              .el-date-editor{
                width: 100%;
              }
              .el-date-editor.el-input__inner{
                width: 100%;
              }
              .el-input-number{
                width: 100%;
              }
            }
          }
            .greendot{
              display:inline-block;
              width:15px;
              height:15px;
              border-radius:50%;
              background-color:#59e459;
              position:relative;
              top:4px;
              left:12px;
            }
            .reddot{
              display:inline-block;
              width:15px;
              height:15px;
              border-radius:50%;
              background-color:red;
              position:relative;
              top:4px;
              left:12px;
            }
          .table-area{
            // padding: 0 20px;
            >>>.el-date-editor{
              width: 100%;
            }
          }
         .btn-area{
              margin: 20px 0;
            // position: absolute;
            // bottom: 0;
            // left: 50%;
            // transform: translateX(-50%);
            .el-button{
              width: 97px;
              height: 32px;
              padding: 0;
            //   line-height: 32px;
              margin: 0 8px 8px;
            }
          }
          .operationtext{
            color: #409EFF;
            cursor:pointer;
          }
      
          .selectCompany{
                width: 180px !important;
            }
        </style>
     
              