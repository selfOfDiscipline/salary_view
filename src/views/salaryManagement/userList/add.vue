<template>
    <div class="app-container" v-loading="approvalLoading">
        <div v-if="resove">
            <BaseInfo ref="baseInfo"  :baseInfoData="baseInfoData" :isDisable="isDisable" :status="status"></BaseInfo>
            <IssuingBank ref="issuingBank" :issuingBankData="issuingBankData" :isDisable="isDisable" :status="status"></IssuingBank>
            <OtherBanks ref="otherBanks" :otherBanksData="otherBanksData" :isDisable="isDisable" :status="status"></OtherBanks>
            <!-- IssuingBank -->
            <Matching ref="matching" :matchingData="matchingData" :isDisable="isDisable" :status="status"></Matching>
            <SocialSecurity ref="socialSecurity" :socialSecurityData="socialSecurityData" :isDisable="isDisable" :status="status"></SocialSecurity>
            <OtherDeduction ref="otherDeduction" :otherDeductionData="otherDeductionData" :isDisable="isDisable" :status="status"></OtherDeduction>
            <div class="btn-area">
                <el-button type="primary" plain @click="SaveSubmit()" v-if="status!='2'">保存</el-button>
                <el-button type="primary" plain @click="callBack" v-if="status!='2'">关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {selectDeptList,selectRoleList,selectSalaryDeptList,saveOrUpdateManageUser,getUserInfoById,updateUserByCondition} from '@/api/userList'
import { BoxCard } from '@/layout/components'
import BaseInfo from './BaseInfo'
import OtherBanks from './OtherBanks'
import IssuingBank from './IssuingBank'
import Matching from './matching'
import SocialSecurity from './SocialSecurity'
import OtherDeduction from './OtherDeduction'
import myTree from "./myTree"
import { rules ,RankTypeOption,PostTypeOption} from "./utils";
export default {
    name: 'Adduser',
    props: {
        userId:'',
        status:'',
    },
    created () {
        // alert(this.userId)
        // if(this.userId){
        //     console.log(this.userId,'185');
        //     this.getUser(this.userId,this.status);
        // }
    },
    components: {
        BoxCard,
        myTree,
        BaseInfo,//基本信息
        OtherBanks,//其他银行
        IssuingBank,//代发银行
        Matching,//配比信息
        SocialSecurity,//社保
        OtherDeduction//其他扣除
    },
    data(){
        return{
            isDisable:false,
            resove: true,//是否加载完成数据
            baseInfoData:{},
            issuingBankData:{},
            otherBanksData:{},
            matchingData:{},
            socialSecurityData:{},
            otherDeductionData:{},
            SalaryDeptlist: [],
            cascaderList: [], // 弹窗树
            showName: '', //弹窗树显示的字段名
            expandedKeys: [],//弹窗树默认显示
            checkedTreeData: [],
            dialogVisible: false,
            dialogTitle: '',
            selectDeptlist:null,
            selectRolelist:null,
            defaultProps: {
                children: 'childList',
                label: 'roleName'
            },
            approvalLoading:false,
            compareDateStaus:null,
            currentPage:1,
            total:100,
            pageSize:10,
            pageNum:1,
            isall:-1,
            baseInfo:{
                pageSize:'',
                pageNum:'',
            },
            showbill:false,
            // action:process.env.VUE_APP_BASE_API+'/file/upload',
            hearders:{},
            uploaddata:{
                uuid:''
            },
            ticketlist: [],
            value1:'',
            user:{
                userSex:0,
                householdType:0,},
                userDetail:{
                userDeptId:'',
                salaryDeptId:'',
                roleIds:'',
            },
            
            
            processOptions:[],
            tableData: [],//行内编辑的list
            editRow: {},//当前选中行
            selectlistRow:[],
            selectkey2:[],
            ids:'',
            names:'', 
            rules:rules,
            RankTypeOption:RankTypeOption,
            PostTypeOption:PostTypeOption,
            userDetailId:'',
        }
    },
    
    methods:{
        SaveSubmit(e){
            this.$confirm('确认要提交该员工基本信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const baseInfo = this.$refs.baseInfo.getBaseInfo(true);
                const issuingBank = this.$refs.issuingBank.getIssuingBank(true);
                const otherBanks = this.$refs.otherBanks.getOtherBanks(false);
                const matching = this.$refs.matching.getMatching(true);
                const socialSecurity = this.$refs.socialSecurity.getSocialSecurity(true); 
                const otherDeduction = this.$refs.otherDeduction.getOtherDeduction(true);
                console.log(matching,'matching')
                
                let query = {
                    user:Object.assign(baseInfo,issuingBank,otherBanks),
                    userDetail:Object.assign(matching,socialSecurity,otherDeduction),
                    roleIds:matching.roleIds
                }
                if(this.userId){
                    query.user.id = this.userId
                    query.userDetail.id = this.userDetailId
                }
                delete query.userDetail.userDeptName;
                delete query.userDetail.salaryDeptName;
                delete query.userDetail.roleIds
                console.log(query)
                if(query.user && query.userDetail){
                    if(this.status == 1){
                        updateUserByCondition(query).then(res => {
                            console.log(res);
                            
                            if(res.code == 200){
                                this.$message({
                                    type: 'success',
                                    message: '保存成功！'
                                })
                                this.$emit('reload')
                                this.callBack();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message:res.message
                                })
                            }
                        })
                    }else{
                        saveOrUpdateManageUser(query).then(res => {
                            console.log(res);
                            
                            if(res.code == 200){
                                this.$message({
                                    type: 'success',
                                    message: '保存成功！'
                                })
                                this.$emit('reload')
                                this.callBack();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message:res.message
                                })
                            }
                        })
                    }
                }
               
            })
            
           
        },
        callBack() {
            this.$emit('closeDialog');
            this.handleCloseBindWarnStandard()
        },
        handleCloseBindWarnStandard() {
            this.$emit("closeBindWarnStandard");
        },
        handleDelete(index, row) {
        },
        getUser(id,status){
            console.log(status)
            this.resove = false;
            this.approvalLoading = true;
            getUserInfoById({id:id}).then(res=>{
                const {roleNames,deptName} =res.data;
                const {
                    userDeptId,
                    userName,
                    userAccount,userSex,userCard,userTel,userEmail,socialSecurityCard,
                    salaryDeptId,userEntryDate,planChangeFormalDate,realityChangeFormalDate,
                    userLeaveDate,socialSecurityStartDate, originalAddress,nowAddress,
                    householdType,workCity,remark,salaryBankCard,
                    userPostType,userRankType,
                    salaryBankOpen,
                    salaryBankOpenName,
                    salaryBankOpenProvince,
                    salaryBankOpenCity,
                    otherBankCard,
                    otherBankOpen,
                    otherBankOpenName,
                    otherBankOpenProvince,
                    otherBankOpenCity,
                } = res.data.user
                const {
                    childEducation,continueEducation,homeLoanInterest,homeRents,supportParents,otherDeduct,
                    // userDeptId,
                    standardSalary,salaryGrantRatio,performanceRatio,bankSalary, stipulationStartTaxMoney, 
                    postSalary,
                    postSubsidy,  otherSubsidy, addComputerSubsidy,
                    // deductOther,
                    yilBaseMoney,yilPersonRatio,yilCompanyRatio,yilPersonAddMoney,yilCompanyAddMoney,
                    gongsBaseMoney,gongsPersonRatio, gongsCompanyRatio,
                    shengyBaseMoney,shengyPersonRatio,shengyCompanyRatio,
                    yanglBaseMoney,yanglPersonRatio,yanglCompanyRatio,
                    shiyBaseMoney,shiyPersonRatio,shiyCompanyRatio, 
                    otherBaseMoney,otherPersonRatio,otherCompanyRatio,
                    housingFundBaseMoney,housingFundPersonRatio,housingFundCompanyRatio,
                    totalIncomeMoney,
                    totalTaxableSelfMoney,
                    totalAlreadyTaxableMoney,
                    totalDeductMoney,
                    totalSpecialDeductMoney,
                    totalChildEducation,
                    totalContinueEducation,
                    totalHomeLoanInterest,
                    totalHomeRents,
                    totalSupportParents,
                    totalOtherDeduct,
                    deductThing,
                    id,
                } = res.data.userDetail
                this.userDetailId = id
                let roleIds='';
                if(res.data.roleIds){
                    roleIds = res.data.roleIds
                }
                // 基本信息
                this.baseInfoData ={
                    userDeptId:userDeptId,
                    userDeptName:deptName,
                    userPostType:userPostType,
                    userRankType:userRankType,
                    userName:userName,
                    userAccount:userAccount,
                    userSex:userSex,
                    userCard:userCard,
                    userTel:userTel,
                    userEmail:userEmail,
                    socialSecurityCard:socialSecurityCard,
                    salaryDeptId:salaryDeptId,
                    userEntryDate:userEntryDate,
                    planChangeFormalDate:planChangeFormalDate,
                    realityChangeFormalDate:realityChangeFormalDate,
                    userLeaveDate:userLeaveDate,
                    socialSecurityStartDate:socialSecurityStartDate,
                    originalAddress:originalAddress,
                    nowAddress:nowAddress,
                    householdType:householdType,
                    workCity:workCity,
                    remark:remark,
                }
                // 代发银行
                this.issuingBankData={
                    salaryBankCard:salaryBankCard,
                    salaryBankOpen:salaryBankOpen,
                    salaryBankOpenName:salaryBankOpenName,
                    salaryBankOpenProvince:salaryBankOpenProvince,
                    salaryBankOpenCity:salaryBankOpenCity,
                }
                // 其他银行
                this.otherBanksData={ 
                    otherBankCard:otherBankCard,
                    otherBankOpen:otherBankOpen,
                    otherBankOpenName:otherBankOpenName,
                    otherBankOpenProvince:otherBankOpenProvince,
                    otherBankOpenCity:otherBankOpenCity,
                }
                // 社保
                this.socialSecurityData={
                    yilBaseMoney,
                    yilPersonRatio,
                    yilCompanyRatio,
                    yilPersonAddMoney,
                    yilCompanyAddMoney,

                    gongsBaseMoney,
                    gongsPersonRatio,
                    gongsCompanyRatio,

                    shengyBaseMoney,
                    shengyPersonRatio,
                    shengyCompanyRatio,

                    yanglBaseMoney,
                    yanglPersonRatio,
                    yanglCompanyRatio,

                    shiyBaseMoney,
                    shiyPersonRatio,
                    shiyCompanyRatio,

                    otherBaseMoney,
                    otherPersonRatio,
                    otherCompanyRatio,

                    housingFundBaseMoney,
                    housingFundPersonRatio,
                    housingFundCompanyRatio,
                }
               
                this.matchingData = {
                    id:id,
                    // userDeptId:userDeptId,userDeptName:deptName,
                    roleIds:roleIds,
                    
                    userRoleName:roleNames,
                    standardSalary:standardSalary,
                    salaryGrantRatio:salaryGrantRatio,
                    performanceRatio:performanceRatio,
                    bankSalary:bankSalary,
                    stipulationStartTaxMoney:stipulationStartTaxMoney,
                    postSalary:postSalary,
                    postSubsidy:postSubsidy,
                    otherSubsidy:otherSubsidy,
                    addComputerSubsidy:addComputerSubsidy,
                    deductThing:deductThing
                    // otherSubsidy:otherSubsidy,
                    // deductOther:deductOther,
                }
                console.log( userPostType)
                
                // 其他扣除
                this.otherDeductionData = {
                    childEducation:childEducation,
                    continueEducation:continueEducation,
                    homeLoanInterest:homeLoanInterest,
                    homeRents:homeRents,
                    supportParents:supportParents,
                    otherDeduct:otherDeduct,
                    totalIncomeMoney:totalIncomeMoney,
                    totalTaxableSelfMoney:totalTaxableSelfMoney,
                    totalAlreadyTaxableMoney:totalAlreadyTaxableMoney,
                    totalDeductMoney:totalDeductMoney,
                    totalSpecialDeductMoney:totalSpecialDeductMoney,
                    totalChildEducation:totalChildEducation,
                    totalContinueEducation:totalContinueEducation,
                    totalHomeLoanInterest:totalHomeLoanInterest,
                    totalHomeRents:totalHomeRents,
                    totalSupportParents:totalSupportParents,
                    totalOtherDeduct:totalOtherDeduct,
                }
                console.log(this.baseInfoData,'185')
                if(status == 1 ){
                    this.isDisable = true;
                }else if(status == 2){
                    this.isDisable = true;
                }
                // console.log(this.isDisable,'００００');
                
                this.resove = true;
                this.approvalLoading = false;
                
                
            })
        }
        
    },
    computed:{

    },
    
    mounted() {
        if(this.userId){
            console.log(this.userId,'185');
            this.getUser(this.userId,this.status);
        }
    },

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
