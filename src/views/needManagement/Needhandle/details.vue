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
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="正式员工" name="Official">
                <tableDta :menuType="menuType" :applicationCode="code"/>
            </el-tab-pane>
            <el-tab-pane label="上月入职" name="Induction">
                <tableDta :menuType="0" :applicationCode="code"/>
            </el-tab-pane>
            <el-tab-pane label="上月转正" name="Positive">
                <tableDta :menuType="1" :applicationCode="code"/>
            </el-tab-pane>
        </el-tabs>
        <div class="btn-area">
            <el-button type="primary" plain @click="handleThisNode(0)" v-if="form.approverStatus == 0">同意</el-button>
            <el-button type="primary" plain @click="handleThisNode(1)" v-if="form.approverStatus == 0">驳回</el-button>
            <el-button type="primary" plain @click="callBack">关闭</el-button>
        </div>
    </div>
</template>
          
<script>
import {BoxCard} from '@/layout/components'
import tableDta from './table'

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
        tableDta
    },
    created(){
        if(this.rowData){
            this.form = this.rowData;
            console.log(this.form)
            this.code = this.rowData.applicationCode
            // this.getSalaryInfoByApplicationCode(this.rowData.applicationCode)
        }
    },
    data() {
        return {
            menuType:'',
            code:'',
            activeName: 'Official',
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
        
        getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        },
        
        
        handleClick(tab, event) {
            // if(tab.name == 'Induction'){

            // }
                console.log(tab.name, event);
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
        .app-container{
    padding-bottom: 0px !important;
    position: relative;
    margin-bottom: 15px;
}
    </style>
          