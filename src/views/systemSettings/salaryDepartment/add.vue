<template>
    <div class="app-container">
        <el-form :inline="true" :model="form" :rules="rules" ref="form" label-position="right" >
          <el-form-item label="薪资核算人员:" prop="userId">
            <el-select v-model="form.userId" filterable placeholder="请选择薪资核算人员" @change="roleChange">
                <el-option v-for="item in selectRoletlist"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="薪资核算部门:" prop="salaryDeptId">
            <el-select v-model="form.salaryDeptId" filterable placeholder="请选择薪资核算部门" @change="depChange">
                <el-option v-for="item in selectDeptlist"
                    :key="item.id"
                    :label="item.salaryDeptName"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
            
        </el-form>
        <div class="formbtn" style="width:100%;margin-top: 50px;text-align: center;">
                <el-button type="primary" plain @click="callBack">取消</el-button>
                <el-button type="primary" plain @click="onSubmit">确定</el-button>
            </div>
    </div>
</template>
<script>
    import { BoxCard } from '@/layout/components'
    import { selectUserComputeRoleList,selectSalaryDeptList,saveUserSalaryDept } from '@/api/salaryDepartment'
    export default {
        name: 'Add',
        components: {
            BoxCard,
        },
        data(){
            return{
                form: {
                    userId:'',
                    salaryDeptId:'',
                },
                rules:{
                    userId:[
                        { required: true, message: '请选择薪资核算人员', trigger: 'blur' },
                    ],
                    salaryDeptId:[
                        { required: true, message: '请选择薪资核算部门', trigger: 'blur' },
                    ],
                },
                selectRoletlist:[],
                selectDeptlist:[],
            }
        },
        computed:{
        },
        mounted() {
            this.selectDept()
            this.selectRole()
        },
        methods: {
            callBack() {
                this.$emit('closeDialog');
                this.handleCloseBindWarnStandard()
            },
            handleCloseBindWarnStandard() {
                this.$emit("closeBindWarnStandard");
            },
            selectDept(){
                let par ={
                    pageNum: 1,
                    pageSize: 20,
                    salaryDeptName: ""
                }
                selectSalaryDeptList(par).then( res =>{
                    console.log(res);
                    this.selectDeptlist = res.data.dataList
                })
            },
            selectRole(){
                let par={
                    pageNum: 1,
                    pageSize: 10,
                    salaryDeptName: "",
                    userName: ""
                }
                selectUserComputeRoleList(par).then( res =>{
                    console.log(res);
                    if(res.code == 200){
                        this.selectRoletlist = res.data.dataList
                    }
                   
                })
            },
            depChange(e){
                for (const iterator of this.selectDeptlist) {
                    if(iterator.id == e){
                        this.form.salaryDeptName = iterator.salaryDeptName
                    }
                }
            },
           
            roleChange(e){
                for (const iterator of this.selectRoletlist) {
                    if(iterator.id == e){
                        this.form.userName = iterator.userName
                        this.form.userAccount = iterator.userAccount
                    }
                }
            },
            onSubmit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        saveUserSalaryDept(this.form).then(res =>{
                            if(res.code == 200){ 
                                console.log(res);
                                this.$emit('reload')
                                this.callBack()
                                this.$message({
                                    type: 'success',
                                    message: res.message
                                })
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.message
                                })
                            }
                           
                            
                        })
                    } else {
                        return false;
                    }
                });
            }
            
        }
      
      }
      </script>
      
      <style lang="scss" scoped>
      
      
      .tevBtn{
          height: 32px !important;
          line-height: 32px !important;
      
      }
      .app-container{
      
        padding: 20px;
      //   padding-bottom: 65px;
        position: relative;
      //   margin-bottom: 15px;
        padding-top:0px;
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
            margin:20px 0;
      
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
      
      
        //查看发票
      
      
          .invoicMain {
              width: 1160px;
              margin: 0 auto;
              font-size: 14px;
              color: #000;
            ul li {
                list-style: none;
                margin: 0;
                padding: 0;
            }
      
            label {
                color: #9c5223;
            }
          }
      
          .invoiceHeader {
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
      
          .headerLeft li:nth-child(1) {
              text-indent: 1em;
          }
      
          .headerLeft li img {
              width: 105px;
              height: 105px;
      
          }
          .headerMiddle{
              margin: 0 auto;
              margin-bottom: 24px;
          }
          .headerMiddle h1 {
              font-size: 32px;
              color: #9c5223;
              font-family: 'kaiti';
              margin: 5px 12px;
          }
      
          .line {
              height: 3px;
              border-top: #9c5223 1px solid;
              border-bottom: #9c5223 1px solid;
          }
          .headerRight{
              width: 100%;
              padding: 10px 0;
          }
          .headerRight li {
              float: left;
              width: 20%;
              line-height: 24px;
          }
      
          .invoiceBody {
              border: 1px solid #9c5223;
          }
      
          .userInfo {
              width: 100%;
              display: flex;
              align-items: center;
              height: 96px;
              border-bottom: 1px solid #9c5223;
          }
      
          .userInfo ul {
              width: 65%;
              margin: 0 5px;
              padding: 0;
      
          }
      
          .userInfo ul li {
              line-height: 24px;
          }
      
          .buy {
              width: 20px;
              border-right: 1px solid #9c5223;
              /* padding: 0 10px; */
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              color: #9c5223;
          }
      
          .password {
              width: 20px;
              /* padding: 0 10px; */
              border-right: 1px solid #9c5223;
              border-left: 1px solid #9c5223;
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              color: #9c5223;
          }
      
          .pwdInfo {
              flex: 1;
              padding-left: 5px;
          }
      
          .goodsInfo {
              height: 210px;
              margin: 0;
              padding: 0;
      
          }
      
          .goodsInfo li {
              display: flex;
              color: #9c5223;
              text-align: center;
          }
      
          .name {
              width: 260px;
              border-right: 1px solid #9c5223;
          }
      
          .spec {
              width: 140px;
              border-right: 1px solid #9c5223;
          }
      
          .qty {
              width: 108px;
              border-right: 1px solid #9c5223;
          }
      
          .unit,
          .taxRate {
              width: 65px;
              border-right: 1px solid #9c5223;
          }
      
          .qty,
          .price {
              width: 160px;
              border-right: 1px solid #9c5223;
          }
      
          .money {
              flex: 1;
              border-right: 1px solid #9c5223;
          }
      
          .taxAmount {
              flex: 1;
          }
      
          .GoodsTable {
              height: 210px;
              width: 100%;
              border-collapse: collapse;
          }
      
          .GoodsTable td {
              border-right: 1px solid #9c5223;
              color: #9c5223;
          }
      
          .GoodsTable tr:nth-child(1),
          .GoodsTable tr:nth-last-child(2) {
              height: 24px;
          }
      
          .GoodsTable tr:nth-last-child(1) {
              height: 34px;
          }
      
          .GoodsTable tr:nth-child(1) td {
              text-align: center;
          }
      
          .GoodsTotal {
              border-top: 1px solid #9c5223;
              border-bottom: 1px solid #9c5223;
          }
      
          .total td:nth-child(1) {
              text-align: center;
          }
      
          .invoicetFooter {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: space-between;
          }
      
          .invoicetFooter li {
              width: 25%;
          }
          .customWidth{
            width:80%;
          }
      </style>
      