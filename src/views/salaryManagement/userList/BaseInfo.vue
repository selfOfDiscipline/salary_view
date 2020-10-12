<template>
    <div>
        <BoxCard title="基本信息" class="modelbox">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-position="right" 
                class="form-area" 
                label-width="130px" 
                slot="main"
                >
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="form.userName" placeholder="请输入姓名" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="OA账号" prop="userAccount">
                    <el-input v-model="form.userAccount" placeholder="请输入OA账号" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userSex">
                    <el-radio-group v-model="form.userSex" :disabled="isDisable">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证号" prop="userCard">
                    <el-input v-model="form.userCard" placeholder="请输入身份证号" maxlength="18" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="userTel">
                    <el-input v-model="form.userTel" placeholder="请输入手机号" maxlength="11" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input v-model="form.userEmail" placeholder="请输入邮箱" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="社保卡号">
                    <el-input v-model="form.socialSecurityCard" placeholder="请输入社保卡号" maxlength="18" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="薪资归属部门" prop="salaryDeptId">
                    <el-select v-model="form.salaryDeptId" filterable placeholder="请选择薪资归属部门" :disabled="isDisable">
                        <el-option v-for="item in SalaryDeptlist"
                            :key="item.id"
                            :label="item.salaryDeptName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="岗位类型" prop="userPostType">
                    <el-select v-model="form.userPostType" filterable placeholder="请选择岗位类型" :disabled="isDisable">
                        <el-option v-for="item in PostTypeOption"
                            :key="item.id"
                            :label="item.typeName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="在职状态" prop="userRankType">
                    <el-select v-model="form.userRankType" filterable placeholder="请选择在职状态" :disabled="isDisable">
                        <el-option v-for="item in RankTypeOption"
                            :key="item.id"
                            :label="item.typeName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职日期" prop="userEntryDate">
                    <el-date-picker :disabled="isDisable"
                        v-model="form.userEntryDate"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择入职日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="预计转正日期" prop="planChangeFormalDate">
                    <el-date-picker :disabled="isDisable"
                        v-model="form.planChangeFormalDate"
                            type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择预计转正日期111111111">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="实际转正日期" prop="realityChangeFormalDate">
                    <el-date-picker :disabled="isDisable"
                        v-model="form.realityChangeFormalDate"
                            type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择实际转正日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="离职日期" prop="userLeaveDate">
                    <el-date-picker :disabled="isDisable"
                        v-model="form.userLeaveDate"
                            type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择离职日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="社保开始缴纳日期" prop="socialSecurityStartDate">
                    <el-date-picker :disabled="isDisable"
                        v-model="form.socialSecurityStartDate"
                            type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择社保开始缴纳日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="户籍所在地" prop="originalAddress">
                    <el-input v-model="form.originalAddress" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="现居住地" prop="nowAddress">
                    <el-input v-model="form.nowAddress" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="户口类型" prop="householdType">
                        <el-radio-group v-model="form.householdType" :disabled="isDisable">
                            <el-radio :label="0">城镇</el-radio>
                            <el-radio :label="1">农村</el-radio>
                        </el-radio-group>
                    </el-form-item>
                <el-form-item label="工作城市" prop="workCity">
                    <el-input v-model="form.workCity" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="备注" style="width:100%" prop="remark" >
                    <el-input
                        :disabled="isDisable"
                        type="textarea"
                        placeholder="请输入备注"
                        v-model="form.remark"
                        maxlength="200"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
        </BoxCard>
    </div>
</template>
      
<script>
    import {BoxCard} from '@/layout/components'
    import {selectDeptList,selectRoleList,selectSalaryDeptList,saveOrUpdateManageUser} from '@/api/userList'
    import { rules ,RankTypeOption,PostTypeOption} from "./utils";
    export default {
        props: {
            baseInfoData: {
                type: Object,
                default: {},
                required: true,
                count: 0
            },
            isEdit: {
                default: ''
            },
            isDisable: {
                default: ''
            }
        },
        components: {
            BoxCard,
        },
        created(){
            if(this.baseInfoData){
                console.log(this.isDisable)
                // this.isDisable = this.isdisable;
                this.form = this.baseInfoData
            }
            
        },
        data() {
            return {
                // isDisable:false,
                form:{
                    userName:'',
                    userAccount:'',
                    userSex:0,
                    userCard:'',
                    userTel:'',
                    userEmail:'',
                    socialSecurityCard:'',
                    salaryDeptId:'',
                    userEntryDate:'',
                    planChangeFormalDate:'',
                    realityChangeFormalDate:'',
                    userLeaveDate:'',
                    socialSecurityStartDate:'',
                    originalAddress:'',
                    nowAddress:'',
                    householdType:0,
                    workCity:'',
                    remark:'',
                },
                rules:rules,
                SalaryDeptlist:[],
                RankTypeOption:RankTypeOption,
                PostTypeOption:PostTypeOption,
            }
        },
        mounted(){
            this.SalaryDeptList()
        },
        methods: {
            SalaryDeptList(){
                let par={
                    pageNum: 1,
                    pageSize: 10,
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
            getBaseInfo(d) {//获取基本信息 d是否校验
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
      