<template>
    <div>
        <BoxCard title="社保信息" class="modelbox">
            <el-form 
                :inline="true" 
                :model="form" 
                :rules="rules" 
                ref="form"  
                label-position="right" 
                class="form-area" 
                label-width="130px" 
                slot="main">
                <el-form-item label="医疗基数" prop="yilBaseMoney">
                    <el-input v-model="form.yilBaseMoney" placeholder="请输入医疗工伤生育基数"  :disabled="isDisable&&status==2"></el-input>
                </el-form-item>
                <el-form-item label="医疗个人系数" prop="yilPersonRatio">
                    <currency-input v-model="form.yilPersonRatio" placeholder="请输入医疗个人系数" :disabled="isDisable&&status==2"></currency-input>
                </el-form-item>
                <el-form-item label="医疗公司系数" prop="yilCompanyRatio">
                    <currency-input v-model="form.yilCompanyRatio":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>
                <el-form-item label="医疗个人另缴金额" prop="yilPersonAddMoney">
                    <el-input v-model="form.yilPersonAddMoney" placeholder="请输入医疗个人另缴金额" :disabled="isDisable&&status==2"></el-input>
                </el-form-item>
                <el-form-item label="医疗公司另缴金额" prop="yilCompanyAddMoney">
                    <el-input v-model="form.yilCompanyAddMoney" placeholder="请输入医疗个人另缴金额" :disabled="isDisable&&status==2"></el-input>
                </el-form-item>
                
                <el-form-item label="工伤基数" prop="gongsBaseMoney">
                    <el-input v-model="form.gongsBaseMoney" placeholder="请输入医疗工伤生育基数"  :disabled="isDisable&&status==2"></el-input>
                </el-form-item>
                <el-form-item label="工伤个人系数" prop="gongsPersonRatio">
                    <currency-input v-model="form.gongsPersonRatio" placeholder="请输入工伤个人系数" :disabled="isDisable&&status==2"></currency-input>
                </el-form-item>
                <el-form-item label="工伤公司系数" prop="gongsCompanyRatio">
                    <currency-input v-model="form.gongsCompanyRatio" placeholder="请输入工伤公司系数" :disabled="isDisable&&status==2"></currency-input>
                </el-form-item>
                <el-form-item label="生育基数" prop="shengyBaseMoney">
                    <el-input v-model="form.shengyBaseMoney" placeholder="请输入医疗工伤生育基数"  :disabled="isDisable&&status==2"></el-input>
                </el-form-item>
                <el-form-item label="生育个人系数" prop="shengyPersonRatio">
                    <currency-input v-model="form.shengyPersonRatio" placeholder="请输入生育个人系数" :disabled="isDisable&&status==2"></currency-input>
                </el-form-item>
                <el-form-item label="生育公司系数" prop="shengyCompanyRatio">
                    <currency-input v-model="form.shengyCompanyRatio" placeholder="请输入生育公司系数":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>

                <el-form-item label="养老基数" prop="yanglBaseMoney">
                    <el-input v-model="form.yanglBaseMoney" placeholder="请输入养老失业基数":disabled="isDisable&&status==2"  ></el-input>
                </el-form-item>
                <el-form-item label="养老个人系数" prop="yanglPersonRatio">
                    <currency-input v-model="form.yanglPersonRatio" placeholder="请输入养老个人系数":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>
                <el-form-item label="养老公司系数" prop="yanglCompanyRatio">
                    <currency-input v-model="form.yanglCompanyRatio" placeholder="请输入":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>
                <el-form-item label="失业基数" prop="shiyBaseMoney">
                    <el-input v-model="form.shiyBaseMoney" placeholder="请输入养老失业基数":disabled="isDisable&&status==2"  ></el-input>
                </el-form-item>
                <el-form-item label="失业个人系数" prop="shiyPersonRatio">
                    <currency-input v-model="form.shiyPersonRatio" placeholder="请输入养老公司系数":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>
                <el-form-item label="失业公司系数" prop="shiyCompanyRatio">
                    <currency-input v-model="form.shiyCompanyRatio" placeholder="请输入失业公司系数":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>

                <el-form-item label="其他险基数" prop="otherBaseMoney">
                    <el-input v-model="form.otherBaseMoney" placeholder="请输入养老失业基数":disabled="isDisable&&status==2"  ></el-input>
                </el-form-item>
                <el-form-item label="其他险个人系数" prop="otherPersonRatio">
                    <currency-input v-model="form.otherPersonRatio" placeholder="请输入养老公司系数":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>
                <el-form-item label="其他险公司系数" prop="otherCompanyRatio">
                    <currency-input v-model="form.otherCompanyRatio" placeholder="请输入失业公司系数":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>

                <el-form-item label="公积金基数" prop="housingFundBaseMoney">
                    <el-input v-model="form.housingFundBaseMoney" placeholder="请输入公积金基数":disabled="isDisable&&status==2" ></el-input>
                </el-form-item>
                <el-form-item label="公积金个人系数" prop="housingFundPersonRatio">
                    <currency-input v-model="form.housingFundPersonRatio" placeholder="请输入公积金个人系数":disabled="isDisable&&status==2" ></currency-input>
                </el-form-item>
                <el-form-item label="公积金公司系数" prop="housingFundCompanyRatio"  >
                    <currency-input v-model="form.housingFundCompanyRatio" placeholder="请输入公积金公司系数":disabled="isDisable&&status==2"></currency-input>
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
            socialSecurityData: {
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
            if(this.socialSecurityData.housingFundBaseMoney){
                this.form = this.socialSecurityData
            }
        },
        computed: {
        
        },
        data() {
            return {
                form:{
                    yilBaseMoney:0,
                    yilPersonRatio:0,
                    yilCompanyRatio:0,
                    yilPersonAddMoney:0,
                    yilCompanyAddMoney:0,

                    gongsBaseMoney:0,
                    gongsPersonRatio:0,
                    gongsCompanyRatio:0,

                    shengyBaseMoney:0,
                    shengyPersonRatio:0,
                    shengyCompanyRatio:0,

                    yanglBaseMoney:0,
                    yanglPersonRatio:0,
                    yanglCompanyRatio:0,

                    shiyBaseMoney:0,
                    shiyPersonRatio:0,
                    shiyCompanyRatio:0,

                    otherBaseMoney:0,
                    otherPersonRatio:0,
                    otherCompanyRatio:0,

                    housingFundBaseMoney:0,
                    housingFundPersonRatio:0,
                    housingFundCompanyRatio:0,
                },
                rules:rules,
                }
        },
        methods: {
            getSocialSecurity(d) {//获取基本信息 d是否校验
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
              