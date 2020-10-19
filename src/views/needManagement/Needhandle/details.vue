<template>
    <div class="app-container">
        <el-dialog
            title="审批意见"
            :visible.sync="showopinion"
            width="30%"
            @close="showopinionClick"
            append-to-body>
            <el-input
                type="textarea"
                placeholder="请输入审批意见"
                v-model="opinion"
                show-word-limit>
            </el-input>
            <span slot="footer">
                <el-button @click="showopinionClick">取 消</el-button>
                <el-button type="primary"  @click="opinion_Confirm('form')">确 定</el-button>
            </span>
        </el-dialog>
        <BoxCard title="基本信息" class="modelbox">
            <el-form :inline="true" :model="form" ref="form" label-position="right" 
                class="form-area" 
                label-width="100px" 
                slot="main">
                <el-form-item label="单据编号" prop="applicationCode">
                    <el-input v-model="form.applicationCode" disabled></el-input>
                </el-form-item>
                <el-form-item label="创建人" prop="createName">
                    <el-input v-model="form.createName" disabled></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                    <el-input v-model="form.createTime" disabled></el-input>
                </el-form-item>

                <!-- <el-form-item label="薪资归属部门" prop="salaryDeptName">
                    <el-input v-model="form.salaryDeptName" disabled ></el-input>
                </el-form-item> -->
                
            </el-form>
        </BoxCard>
        <BoxCard title="薪资列表" class="modelbox">
                <el-table
                slot="main" v-loading="listLoading"
                :data="list" element-loading-text="Loading"
                fit stripe highlight-current-row height=320px>
                <el-table-column label="序号" width="55" type="index">
                    
                </el-table-column>
                <el-table-column label="所属日期" show-overflow-tooltip min-width="120" prop="salaryDate">
                    <template slot-scope="scope">
                        <span>{{ scope.row.salaryDate.substr(0, 7) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="员工姓名" prop="userName"></el-table-column>
                <el-table-column label="实付工资" show-overflow-tooltip min-width="120" prop="totalIncomeMoney">
                    <template slot-scope="scope">
                        <span>{{ scope.row.totalIncomeMoney |moneyFormit }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="薪资归属部门" show-overflow-tooltip min-width="120" prop="salaryDeptName">
                    <template slot-scope="scope">
                        <span>{{ scope.row.salaryDeptName}}</span>
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
                
                <!-- <el-table-column label="操作" prop="businessTripMoney" width="100" fixed="right">
                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">删除</div>
                            <svg-icon icon-class="del" @click="delFlow(scope.row)" style="cursor: pointer;"/>
                        </el-tooltip>
                    </template>
                </el-table-column> -->
            </el-table>
        </BoxCard>
        <div class="btn-area">
            <el-button type="primary" plain @click="handleThisNode(0)" v-if="form.approverStatus == 0">同意</el-button>
            <el-button type="primary" plain @click="handleThisNode(1)" v-if="form.approverStatus == 0">驳回</el-button>
            <el-button type="primary" plain @click="callBack">关闭</el-button>
        </div>
    </div>
</template>
          
<script>
import {BoxCard} from '@/layout/components'
import { selectPersonAgendaList,getSalaryInfoByApplicationCode} from '@/api/personalneed'
// import { rules ,RankTypeOption,PostTypeOption} from "./utils";
import { saveOrUpdateFlowConfig,getFlowConfigById,handleThisNode } from '@/api/salaryApproval'
import {selectDeptList,selectRoleList,selectSalaryDeptList,selectAllUserList} from '@/api/userList'
export default {
    props: {
        rowData:'',
    },
    components: {
        BoxCard,
    },
    created(){
        if(this.rowData){
            this.form = this.rowData;
            console.log(this.form)
            this.getSalaryInfoByApplicationCode(this.rowData.applicationCode)
        }
    },
    data() {
        return {
            status:'',
            opinion:'',
            showopinion:false,
            listLoading:false,
            roleOption:[
                {
                    name:'副总',
                    roleId:'2'
                },
                {
                    name:'核算人员',
                    roleId:'12'
                },
                {
                    name:'汇总人员',
                    roleId:'14'
                }
            ],
            TypeOptions:[
                {
                    type: '否',
                    id: 0
                },
                {
                    type: '是',
                    id: 1
                },
            ],
            form:{},
            SalaryDeptlist:[],
            usreList:[],
            // RankTypeOption:RankTypeOption,
            // PostTypeOption:PostTypeOption,
            // tableData:[],//行内编辑的list
            tableData:[],
            editRow: {},//当前选中行
            selectlistRow:[],
            list:[],
        }
    },
    mounted(){
        console.log(this.salaryId);
        // this.SalaryDeptList()
        // this.selectAllUserList();
    },
    methods: {
        showopinionClick(){
            this.opinion="";
            this.showopinion = false;
        },
        opinion_Confirm(){
            if(this.opinion == ''){
                this.$message.warning('请输入审批意见！')
            }else{
                let approverStatus = ''
                if(this.status == 0 ){
                    approverStatus = 0
                }else{
                    approverStatus = 1
                }
                let par = {
                    approverStatus:approverStatus,
                    id:this.form.id,
                    opinion:this.opinion
                }
                handleThisNode( par ).then(res =>{
                    if(res.code == 200){
                        this.$emit('reload')
                        this.$emit('closeDialog');
                        this.callBack()
                    }else{

                    }
                })
            }
        },
        handleThisNode(status){
            this.status = status;
            this.showopinion = true;
        },
        // 同意
        agree(){},
        // 驳回
        rejected(){},
        getSalaryInfoByApplicationCode(code){
            this.listLoading = true
            getSalaryInfoByApplicationCode({applicationCode:code}).then(res =>{
                if(res.code == 200){
                     this.list=res.data
                     this.listLoading = false
                }
            })
        },
        depChange(e){
            for (const iterator of this.SalaryDeptlist) {
                if(iterator.id==e){
                    this.form.flowSalaryDeptName = iterator.salaryDeptName
                }
            }
        },
        approverChange(index,e){
            // for (const iterator of this.usreList) {
            //     if(iterator.budgetDepartmentFullName==e){
            //         this.form.budgetDepartmentId = iterator.id
            //     }
            // }
            
            console.log(e.toString())
            // this.approverIds = this.sels.map(item => item.id).toString();
            // approverChange
        },
        // selectAllUserList(){
        //     let par ={
        //         pageNum: 1,
        //         pageSize:1000,
        //     }
        //     selectAllUserList(par).then(res =>{
        //         console.log(res);
        //         this.usreList = res.data.dataList
                
        //     })
        // },
        SaveSubmit(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    
                    this.tableData.forEach((item, index) => {
                        console.log(item,index)
                        this.tableData[index].approverIds = item.approverIds.toString();
                    })
                    // for (const iterator of this.tableData) {
                    //     this.tableData[iterator].approverIds = iterator.approverIds.toString()
                    //     // this.tableData.approverIds= iterator.approverIds.toString()
                    // }
                    console.log(this.tableData,'111111');
                    if(this.salaryId){
                        this.form.id = this.salaryId
                    }
                    let par ={
                        baseFlowConfig:this.form,
                        baseFlowConfigDetailList:this.tableData
                    }
                    console.log(par)
                    debugger
                    saveOrUpdateFlowConfig(par).then(res =>{
                        console.log(res);   
                        if(res.code == 200){
                            this.$emit('reload')
                            this.callBack()
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        callBack() {
            this.$emit('closeDialog');
            this.handleCloseBindWarnStandard()
        },
        handleCloseBindWarnStandard() {
            this.$emit("closeBindWarnStandard");
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
        getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        },
        // 新增一行
        addRow (e) {
            let list = {
                sortNum:'',
                nodeName:'',
                firstFlag:0,
                lastFlag:0,
                approverNames:'',
                approverIds:'',
                id:this.getRandomArbitrary(1,2),
            }
            
            console.log(this.tableData,'1234567')
            
            this.tableData.push(list);
        },
        // 行内编辑选中的数据
        selectRow (val) {
            this.selectlistRow = val
        },
        // 行内编辑的删除
        delData() {
            if(this.selectlistRow.length != 0){
                for (let i = 0; i < this.selectlistRow.length; i++) {
                    let val = this.selectlistRow;
                    // 获取选中行的索引的方法
                    // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
                    val.forEach((val, index) => {
                        this.tableData.forEach((v, i) => {
                            if (val.id === v.id) {
                                // i 为选中的索引
                                this.tableData.splice(i, 1);
                            }
                        })
                    })
                }
            }else{
                this.$message({
                    message: '请选择要删除的数据',
                    type: 'warning'
                });
            }
            // this.$refs.tableData1.clearSelection()
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
          