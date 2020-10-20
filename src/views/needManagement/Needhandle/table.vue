<template>
    <div>
        <el-table
            slot="main" v-loading="listLoading"
            :data="list" element-loading-text="Loading"
            fit stripe highlight-current-row height=400px>
            <el-table-column label="序号" width="55" type="index">
                
            </el-table-column>
            <el-table-column label="所属日期" show-overflow-tooltip min-width="120" prop="salaryDate">
                <template slot-scope="scope">
                    <span>{{ scope.row.salaryDate.substr(0, 7) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="员工姓名" prop="userName"></el-table-column>

            <!-- <el-table-column label="实付工资" show-overflow-tooltip min-width="120" prop="totalIncomeMoney">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalIncomeMoney |moneyFormit }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="薪资归属部门" show-overflow-tooltip min-width="120" prop="salaryDeptName">
                <template slot-scope="scope">
                    <span>{{ scope.row.salaryDeptName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="绩效数" prop="monthPerformanceRatio" min-width="100">
            </el-table-column>
            <el-table-column label="考勤" v-if="menuType == 0">
                <el-table-column label="出勤" prop="newEntryAttendanceDays;" min-width="120">
                </el-table-column>
                <!-- <el-table-column label="病假缺勤" prop="sickAdsenceDays" min-width="80">
                </el-table-column> -->
            </el-table-column>
            <el-table-column label="考勤" v-if="menuType == 2">
                <el-table-column label="其他缺勤" prop="otherAbsenceDays" min-width="80">
                </el-table-column>
                <el-table-column label="病假缺勤" prop="sickAdsenceDays" min-width="80">
                </el-table-column>
            </el-table-column>
            <el-table-column label="考勤" v-if="menuType == 1">
                <el-table-column label="转正前应出勤" prop="positiveBeforeAttendanceDays" min-width="120">
                </el-table-column>
                <el-table-column label="转正前其他缺勤" prop="positiveBeforeOtherAttendanceDays" min-width="120">
                </el-table-column> 
                <el-table-column label="转正前病假缺勤" prop="positiveBeforeSickAttendanceDays" min-width="120">
                </el-table-column>
                <el-table-column label="转正后应出勤" prop="positiveAfterAttendanceDays" min-width="120">
                </el-table-column>
                <el-table-column label="转正后其他缺勤" prop="positiveAfterOtherAttendanceDays" min-width="120">
                </el-table-column>
                <el-table-column label="转正后病假缺勤" prop="positiveAfterSickAttendanceDays" min-width="120">
                </el-table-column>
            </el-table-column>
            <el-table-column label="奖惩金额" prop="monthRewordsMoney" min-width="120">
                <template slot-scope="scope">
                    {{ scope.row.monthRewordsMoney | moneyFormit }}
                </template>    
            </el-table-column>
            <el-table-column label="是否计算社保" prop="computeSocialSecurityFlag" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.computeSocialSecurityFlag == 0">是</span>
                    <span v-if="scope.row.computeSocialSecurityFlag == 1">否</span>
                </template>    
            </el-table-column>
            <!-- computeSocialSecurityFlag -->
            <el-table-column label="税前工资" prop="bankTaxBeforeShouldSalary" width="80">
                <template slot-scope="scope">
                    {{ scope.row.bankTaxBeforeShouldSalary | moneyFormit }}
                </template>
            </el-table-column>
            <el-table-column label="代发实付工资" prop="bankRealitySalary" width="120">
                <template slot-scope="scope">
                    {{ scope.row.bankRealitySalary | moneyFormit }}
                </template>
            </el-table-column>
            <el-table-column label="他行实付工资" prop="otherBankRealitySalary" width="120">
                <template slot-scope="scope">
                    {{ scope.row.otherBankRealitySalary | moneyFormit }}
                </template>
            </el-table-column>
            <el-table-column label="实付总计" prop="monthSalaryRealityTotal" width="120">
                <template slot-scope="scope">
                    {{ scope.row.monthSalaryRealityTotal | moneyFormit }}
                </template>
            </el-table-column>
            <el-table-column label="公司缴纳">
                <el-table-column label="养老" prop="yanglCompanyPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.yanglCompanyPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="工伤" prop="gongsCompanyPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.gongsCompanyPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="生育" prop="shengyCompanyPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.shengyCompanyPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="失业" prop="shiyCompanyPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.shiyCompanyPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="医疗" prop="yilCompanyPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.yilCompanyPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="公积金" prop="housingFundCompanyPayTotal" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.housingFundCompanyPayTotal | moneyFormit }}
                    </template>     
                </el-table-column>
            </el-table-column>
            <el-table-column label="个人缴纳">
                <el-table-column label="养老" prop="yanglPersonPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.yanglPersonPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="工伤" prop="gongsPersonPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.gongsPersonPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="生育" prop="shengyPersonPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.shengyPersonPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="失业" prop="shiyPersonPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.shiyPersonPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="医疗" prop="yilPersonPayMoney" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.yilPersonPayMoney | moneyFormit }}
                    </template>
                </el-table-column>
                <el-table-column label="公积金" prop="housingFundPersonPayTotal" width="80">
                    <template slot-scope="scope">
                        {{ scope.row.housingFundPersonPayTotal | moneyFormit }}
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { BoxCard } from '@/layout/components'
import {startSalaryFlow} from '@/api/personalneed'
import {selectDeptList,selectRoleList,selectSalaryDeptList,saveOrUpdateManageUser} from '@/api/userList'

import { getSalaryInfoByApplicationCode } from '@/api/personalneed'
export default {
props: {
    menuType:'',
    applicationCode:"",
},
name: 'Add',
components: {
    BoxCard,
},
data(){
    return{
        listLoading:false,
        list:[],
        SalaryDeptlist:[],
        showDate:false,
        form: {
        },
        PostTypeOption:[
            {
                typeName: '管理岗',
                id: 0
            },
            {
                typeName: '技术岗',
                id: 1
            }
        ],
        rules:{//单据类型
            userName:[
                { required: true, message: '请选择岗位类型', trigger: 'blur' },
            ],
        },
        selectRoletlist:[],
        selectDeptlist:[],
    }
},
computed:{
},
created(){
    // this.form.id = this.positiveId
    // this.form.userName = this.positiveName;
    console.log( this.applicationCode  ,'1234567')

},
mounted() {
    this.getSalaryInfoByApplicationCode()
    // this.SalaryDeptList()
},
methods: {
    getSalaryInfoByApplicationCode(){
        this.listLoading = true
        getSalaryInfoByApplicationCode({applicationCode:this.applicationCode, menuType: this.menuType}).then(res =>{
            if(res.code == 200){
                this.list=res.data
                this.listLoading = false
            }else{
                this.$message({
                    message: res.message,
                    type: 'error'
                });
                this.listLoading = false
            }
        })
    },
}

}
</script>
<style lang="scss" scoped>
.el-form-item__content{
    width: 220px;
}
</style>
