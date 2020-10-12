<template>
    <div class="app-container" v-loading="approvalLoading">
        <BoxCard title="基本信息" class="modelbox">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-position="right" 
                class="form-area" 
                label-width="100px" 
                slot="main">
                <el-form-item label="流程编号" prop="flowEnCode">
                    <el-input v-model="form.flowEnCode" placeholder="请输入流程编号" ></el-input>
                </el-form-item>
                <el-form-item label="流程名称" prop="flowName">
                    <el-input v-model="form.flowName" placeholder="请输入流程名称" ></el-input>
                </el-form-item>
                <el-form-item label="流程类型" prop="flowType">
                    <el-input v-model="form.flowType" placeholder="请输入流程类型" maxlength="18"></el-input>
                </el-form-item>
                <el-form-item label="薪资归属部门" prop="flowSalaryDeptId">
                    <el-select v-model="form.flowSalaryDeptId" filterable placeholder="请选择薪资归属部门" @change="depChange">
                        <el-option v-for="item in SalaryDeptlist"
                            :key="item.id"
                            :label="item.salaryDeptName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="适用角色" prop="flowRoleId">
                    <el-select v-model="form.flowRoleId" filterable placeholder="请选择适用角色">
                        <el-option v-for="item in roleOption"
                            :key="item.roleId"
                            :label="item.name"
                            :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="flowRoleName">
                    <el-radio-group v-model="form.flowRoleName">
                        <el-radio :label = '0'>启用</el-radio>
                        <el-radio :label = '1'>停用</el-radio>
                    </el-radio-group>   
                </el-form-item>
            </el-form>
        </BoxCard>
        <BoxCard title="流程明细" class="modelbox">
            <template  #btnarea>
                <el-button type="primary" plain @click="delData">删除</el-button>
                <el-button type="primary" plain @click="addRow(this)">新增</el-button>
            </template>
            <!-- @selection-change="selectRow"  -->
            <el-table
                :data="tableData"
                stripe
                class="table-area"
                highlight-current-row
                @selection-change="selectRow"
                slot="main">
                <el-table-column type="selection" width="50" ></el-table-column>
                <el-table-column label="流程序号"  prop="sortNum">
                    <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.sortNum"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="节点名称"  prop="nodeName">
                    <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.nodeName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="是否是第一节点"  prop="firstFlag">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.firstFlag"  placeholder="是否是第一节点" size="mini">
                            <el-option v-for="item in TypeOptions"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="是否是最后节点"  prop="lastFlag">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.lastFlag"  placeholder="是否是第一节点" size="mini">
                            <el-option v-for="item in TypeOptions"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="审批人"  prop="approverIds" width="400">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.approverIds" @change="approverChange(scope.$index,scope.row.approverIds)" multiple  filterable  placeholder="审批人" size="mini" style="width:400px !important;" >
                            <el-option v-for="item in usreList"
                                :key="item.id"
                                :label="item.userName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
        </BoxCard>
        <div class="btn-area">
            <el-button type="primary" plain @click="SaveSubmit()">保存</el-button>
            <el-button type="primary" plain @click="callBack">关闭</el-button>
        </div>
    </div>
</template>
          
<script>
import {BoxCard} from '@/layout/components'
import { rules ,RankTypeOption,PostTypeOption} from "./utils";
import { saveOrUpdateFlowConfig,getFlowConfigById } from '@/api/salaryApproval'
import {selectDeptList,selectRoleList,selectSalaryDeptList,selectAllUserList} from '@/api/userList'
export default {
    props: {
        salaryId:'',
    },
    components: {
        BoxCard,
    },
    created(){
        console.log(this.salaryId);
        
        if(this.salaryId){
            this.getFlowConfigById(this.salaryId)
        }
    },
    data() {
        return {
            approvalLoading:false,
            roleOption:[
                {
                    name:'副总',
                    roleId:'2'
                },
                {
                    name:'核算人员',
                    roleId:'12'
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
            rules:rules,
            SalaryDeptlist:[],
            usreList:[],
            // RankTypeOption:RankTypeOption,
            // PostTypeOption:PostTypeOption,
            // tableData:[],//行内编辑的list
            tableData:[],
            editRow: {},//当前选中行
            selectlistRow:[],
        }
    },
    mounted(){
        console.log(this.salaryId);
        this.SalaryDeptList()
        this.selectAllUserList();
    },
    methods: {
        getFlowConfigById(id){
            getFlowConfigById({id:id}).then(res =>{
                console.log(res);
                debugger
                const { baseFlowConfig,baseFlowConfigDetailList} = res.data;
                this.form = baseFlowConfig;
                baseFlowConfigDetailList.forEach((item, index) => {
                    console.log(item,index)
                    baseFlowConfigDetailList[index].approverIds =item.approverIds.split(',');
                })
                this.tableData = baseFlowConfigDetailList
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
        selectAllUserList(){
            let par ={
                pageNum: 1,
                pageSize:1000,
            }
            selectAllUserList(par).then(res =>{
                console.log(res);
                this.usreList = res.data.dataList
                
            })
        },
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
          