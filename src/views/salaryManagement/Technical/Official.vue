<template>
    <div class="mainconbox">
        <div class="topTool">
            <el-row>
                <el-col :span="18">
                    <div class="searchInput">
                    <el-form ref="form" :model="querydata" label-width="100px" :inline="true" :class="isAll?'allheight':'oneheight'">
                        <el-form-item>
                            <el-input v-model="querydata.theme" placeholder="请输入员工姓名" clearable />
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="querydata.userSalaryDeptId" filterable placeholder="请选择薪资归属部门">
                                <el-option v-for="item in SalaryDeptlist"
                                    :key="item.id"
                                    :label="item.salaryDeptName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="btn">
                    <div class="btnwrap">
                        <el-button type="primary" plain @click="search">搜索</el-button>
                        <el-button type="primary" plain @click="resetform">重置</el-button>
                    </div>
                    </div>
                </el-col>
                </el-row>
            </div>
            <BoxCard title="计薪列表">
                <template #btnarea>
                    <el-button type="primary" plain @click="click" >一键生成</el-button>
                </template>
                <el-table
                    :cell-style="cellStyle" 
                    slot="main"
                    v-loading="listLoading"
                    :data="list"
                    element-loading-text="Loading"
                    fit
                    highlight-current-row
                    :height="tableheight">
                    <el-table-column label="序号" width="55">
                        <template slot-scope="scope">
                            {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column label="员工姓名" prop="userName" show-overflow-tooltip min-width="120"/>
                    <el-table-column label="薪资归属部门" show-overflow-tooltip min-width="120" prop="salaryDeptName">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salaryDeptName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="基本工资" prop="monthBaseSalary" min-width="80" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.monthBaseSalary | moneyFormit }}
                        </template>
                    </el-table-column>
                    <el-table-column label="绩效占比" prop="monthPerformanceRatio" min-width="100">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.monthPerformanceRatio"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="其他缺勤" prop="otherAbsenceDays" min-width="80">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.otherAbsenceDays"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="病假缺勤" prop="sickAdsenceDays" min-width="80">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.sickAdsenceDays"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="奖惩金额" prop="monthRewordsMoney;" min-width="120">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.monthRewordsMoney"></el-input>
                        </template>
                    </el-table-column>
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

                    <el-table-column label="操作" prop="businessTripMoney" fixed="right">
                        <template slot-scope="scope">
                            <el-tooltip placement="top">
                                <div slot="content">计算</div>
                                <svg-icon icon-class="calculate" @click="calculate(scope.row)" style="cursor: pointer;"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <div id="pageFooter" slot="foot">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        :page-sizes="[100, 200, 300, 500]"
                        layout=" prev, pager, next, total,sizes,jumper"
                        :total="total">
                    </el-pagination>
                    <div class="goButton">GO</div>
                </div>
            </BoxCard>
        </div>  
    </div>
</template>
<script>
import { BoxCard } from '@/layout/components'
import { selectUserListBySalaryUser,generateTheMonthBasePayroll,lastMonthCompute } from '@/api/Technical'
import {selectDeptList,selectRoleList,selectSalaryDeptList,saveOrUpdateManageUser} from '@/api/userList'
export default {
    props: {
        userId:'',
    },
    name: 'FlowList',
    components: {
        BoxCard
    },
    filters: {
        householdTypefilter(e) {
            switch (e) {
            case 0:
                return '城镇'
            case 1:
                return '农村'
            }
        },
        statusfilter(e) {
            switch (e) {
            case 0:
                return '试用期'
            case 1:
                return '正式'
            case 2:
                return '离职'
            
            }
        },
    },
    data() {
        return {
            SalaryDeptlist:[],
            list:[],
            listLoading: false,
            currentPage: 1,
            total: 10,
            pageSize: 100,
            pageNum: 1,
            querydata:{
                menuType: 2,
                pageNum: 1,
                pageSize: 100,
                // thisDateLastMonth: "2020-09-22T03:16:54.117Z",
                // thisDateMonth: "2020-09-22T03:16:54.117Z",
                userName: "",
                userSalaryDeptId:''
            },
            isall: -1,
            isAll: false
        }
    },
    computed: {
        tableheight() {
            if (this.isAll) {
                return 'calc(100vh - 318px)'
            } else {
                return 'calc(100vh - 312px)'
            }
        }
    },
    mounted() {
        this.fetchData()
        this.SalaryDeptList()
    },
    methods: {
        //设置指定行、列、具体单元格颜色
        cellStyle(row, column, rowIndex, columnIndex){
            if(row.row.currentComputeFlag === 1){ //指定坐标rowIndex ：行，columnIndex ：列
               return 'background:#e1f1ff' 
            }else{
                return ''
            }
        },
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
        click(){
            generateTheMonthBasePayroll().then(res => {
                if(res.code ==200){
                    this.fetchData()
                }
            })
        },
        calculate(row){
            console.log(row)
            let par = { 
                id: row.id,
                monthPerformanceRatio:row.monthPerformanceRatio,//绩效占比
                otherAbsenceDays: row.otherAbsenceDays,
                sickAbsenceDays: row.sickAbsenceDays,
                monthRewordsMoney:row.monthRewordsMoney
            }
            lastMonthCompute(par).then(res => {
                if(res.code == 200){
                    this.fetchData()
                }else{
                    this.$message({
                        showClose: true,
                        message: res.message || 'error',
                        type: 'error'
                    })
                }
            })
        },

        handleCurrentChange(e) {
            console.log(e, '页码')
            this.pageNum = e
            this.fetchData()
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData()
        },
        fetchData() {
            // if(this.querydata.userSalaryDeptId){
                this.listLoading = true
                this.querydata.pageNum = this.pageNum
                this.querydata.pageSize = this.pageSize
                selectUserListBySalaryUser(this.querydata).then(res => {
                    this.list = res.data.dataList
                    this.total = Number(res.data.total)
                    this.listLoading = false
                })
            // }else{
            //     this.$message.warning('请选择薪资归属部门')
            // }
        },
        search() {
            this.pageNum = 1
            // this.pageSize=10
            this.fetchData()
        },
        
        showall() {
            this.isAll = !this.isAll
        },
            resetform() {
            this.querydata = {}
            this.createTime = ''
        },
    }
}
</script>
      
<style lang="scss" scoped>
    .cards{
        padding: 0 5px !important;
    }
    .el-form-item{
        margin-bottom: 0px !important;
    }
</style>
      
      