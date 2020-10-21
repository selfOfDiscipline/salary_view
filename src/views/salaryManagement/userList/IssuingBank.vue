<template>
        <div>
            <BoxCard title="代发银行信息" class="modelbox">
                <el-form 
                    :inline="true" 
                    :model="form" 
                    :rules="rules" 
                    ref="form"  
                    label-position="right" 
                    class="form-area" 
                    label-width="130px" 
                    slot="main">
                    <el-form-item label="银行卡号" prop="salaryBankCard">
                        <el-input v-model="form.salaryBankCard" placeholder="请输入代发银行卡号" :disabled="isDisable&&status==2"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行" prop="salaryBankOpen">
                        <el-input v-model="form.salaryBankOpen" placeholder="请输入代发开户行" :disabled="isDisable&&status==2"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行名称" prop="salaryBankOpenName">
                        <el-input v-model="form.salaryBankOpenName" placeholder="请输入代发开户行名称" :disabled="isDisable&&status==2"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行省份" prop="salaryBankOpenProvince">
                        <el-input v-model="form.salaryBankOpenProvince" placeholder="请输入代发开户行省份" :disabled="isDisable&&status==2"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行城市" prop="salaryBankOpenCity">
                        <el-input v-model="form.salaryBankOpenCity" placeholder="请输入代发开户行城市" :disabled="isDisable&&status==2"></el-input>
                    </el-form-item>
                </el-form>
            </BoxCard>
        </div>
    </template>
          
    <script>
        import {BoxCard} from '@/layout/components'
        import {selectDeptList,selectRoleList,selectSalaryDeptList,saveOrUpdateManageUser} from '@/api/userList'
        import { rules } from "./utils";
        export default {
            props: {
                issuingBankData: {
                    type: Object,
                    default: {},
                    required: true,
                    count: 0
                },
                isEdit: {
                    default: ''
                },
                isDisable: {
                    default: false
                },
                status:{
                    default: ''
                }
            },
            components: {
                BoxCard,
            },
            created(){
                
                this.form = this.issuingBankData
            },
            data() {
                return {
                    form:{
                        salaryBankCard:'',
                        salaryBankOpen:'',
                        salaryBankOpenName:'',
                        salaryBankOpenProvince:'',
                        salaryBankOpenCity:'',
                    },
                    rules:rules,
                    SalaryDeptlist:[],
                }
            },
            mounted(){
                this.SalaryDeptList()
            },
            methods: {
                SalaryDeptList(){
                    let par={
                        pageNum: 1,
                        pageSize: 100,
                        salaryDeptName: ""
                    }
                    selectSalaryDeptList(par).then(res => {
                        console.log(res)
                        // 
                        if(res.code == 200){
                            this.SalaryDeptlist = res.data.dataList
    
                        }
                    })
                },
                getIssuingBank(d) {//获取基本信息 d是否校验
                    // const self = this
                    let isAll = false
                    this.$refs['form'].validate((valid) => {
                        if (valid) {
                            isAll = true
                        } else {
                            return false;
                        }
                    });
                    return isAll ? this.form : false
                }
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
         .traval{
        height: 22px;
        margin-left: 16px;
      }
      .selectCompany{
            width: 180px !important;
        }
    </style>
          