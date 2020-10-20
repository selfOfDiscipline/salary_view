<template>
        <div class="mainconbox">
            <div class="topTool">
                <el-row>
                    <el-col :span="18">
                        <div class="searchInput">
                            <el-form ref="form" :model="querydata" label-width="100px" :inline="true" :class="isAll?'allheight':'oneheight'">
                                <!-- <el-form-item>
                                    <el-input v-model="querydata.userName" placeholder="请输入员工姓名" clearable />
                                </el-form-item>  -->
                                <el-form-item>
                                    <el-date-picker
                                        v-model="querydata.salaryDate"
                                        type="month"
                                        value-format="yyyy-MM"
                                        format="yyyy-MM"
                                        placeholder="选择月">
                                    </el-date-picker>
                                </el-form-item>
                                <!-- <el-form-item>
                                    <el-select v-model="querydata.userPostType" filterable placeholder="请选择岗位类型">
                                        <el-option v-for="item in PostTypeOption"
                                            :key="item.id"
                                            :label="item.typeName"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-select v-model="querydata.salaryDeptId" filterable placeholder="请选择薪资归属部门">
                                        <el-option v-for="item in SalaryDeptlist"
                                            :key="item.id"
                                            :label="item.salaryDeptName"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item> -->
                            </el-form>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="btn">
                            <div class="btnwrap">
                                <el-button type="primary" plain @click="search">搜索</el-button>
                                <!-- <el-button type="primary" plain @click="resetform">重置</el-button> -->
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <BoxCard title="工资列表">
                <template #btnarea>
                    <!-- <el-button type="primary" plain @click="Educe">导出</el-button> -->
                </template>
                <el-table
                    slot="main" v-loading="listLoading"
                    :data="list" element-loading-text="Loading"
                    fit stripe highlight-current-row :height="tableheight">
                    <el-table-column label="序号" width="55">
                        <template slot-scope="scope">
                        {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column label=" 薪资归属日期" prop="salaryDate">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salaryDate.substr(0,7)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label=" 薪资归属部门" show-overflow-tooltip min-width="120" prop="salaryDeptName">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salaryDeptName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="管理岗汇总" show-overflow-tooltip min-width="120" prop="salaryDeptManageTotal">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salaryDeptManageTotal |moneyFormit }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="成本岗汇总" show-overflow-tooltip min-width="120" prop="salaryDeptCostTotal">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salaryDeptCostTotal}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="技术岗汇总" show-overflow-tooltip min-width="120" prop="salaryDeptSkillTotal">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salaryDeptSkillTotal |moneyFormit }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="部门汇总" show-overflow-tooltip min-width="120" prop="salaryDeptMoneyTotal">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salaryDeptMoneyTotal |moneyFormit }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div id="pageFooter" slot="foot">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        :page-sizes="[10, 20, 30, 50]"
                        layout=" prev, pager, next, total,sizes,jumper"
                        :total="total">
                    </el-pagination>
                    <div class="goButton">GO</div>
                </div>
            </BoxCard>
            <el-dialog  
                width="400px"
                height="400px"
                modal-append-to-body  
                append-to-body
                :title="dialogName === 'edit' ? '编辑' : '新增'" 
                :visible.sync="editFormVisible" 
                :close-on-click-modal="false" 
                @close="editFormVisible = false">
                <Add v-if="isAdd && editFormVisible"
                    @reload="fetchData"
                    @closeDialog="editFormVisible = false" >
                </Add>
            </el-dialog>
        </div>
    </template>
      <script>
      import { BoxCard } from '@/layout/components'
      import Add from './add'
      import {selectRoleList,selectSalaryDeptList} from '@/api/userList'
      import { selectCollectListBySalaryDate } from '@/api/historical'
      
      import { selectUserSalaryDeptList,deleteUserSalaryDeptByIds } from '@/api/salaryDepartment'
      export default {
        name: 'FlowList',
        components: {
          BoxCard,
          Add
        },
        filters: {
         
        },
        computed: {
            tableheight() {
                if (this.isAll) {
                    return 'calc(100vh - 314px)'
                } else {
                    return 'calc(100vh - 254px)'
                }
            }
        },
        data() {
          return {
            name:'',
            PostTypeOption:[
                {
                    typeName: '管理岗',
                    id: 0
                },
                {
                    typeName: '成本岗',
                    id: 1
                },
                {
                    typeName: '技术岗',
                    id: 2
                }
            ],
            SalaryDeptlist:[],
            list:[],
            listLoading: false,
            currentPage: 1,
            total: 0,
            pageSize: 10,
            pageNum: 1,
            querydata: {},
            isall: -1,
            isAll: false,
            dialogName: '',
            isAdd: true, //true新增 false修改
            dialogVisible: false,//新增编辑弹窗
            editFormVisible:false,
          }
        },
        
        created() {
    
        },
        mounted() {
          this.fetchData()
          this.SalaryDeptList();
      
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
            // 导出
            Educe(){

            },
            handleCurrentChange(e) {
                console.log(e, '页码')
                this.pageNum = e
                // this.querydata.pageSize = 10
                this.fetchData()
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.fetchData()
            },
            
            fetchData() {
                this.listLoading = true
                this.querydata.pageNum = this.pageNum
                this.querydata.pageSize = this.pageSize
                console.log(this.querydata,'00000')
                selectCollectListBySalaryDate(this.querydata).then(res => {
                    if(res.code  == 200 ){
                        this.list = res.data;
                    }
                    // this.total = Number(res.data.total)
                    this.listLoading = false
                })
            },
            search() {
                this.pageNum = 1
                // this.pageSize=10
                this.fetchData()
            },
            
            resetform() {
                this.querydata = {}
                this.createTime = ''
            },
            goadd(name) {
                this.isAdd = true
                this.dialogName = name
                this.editFormVisible = !this.editFormVisible
            
            },
            delFlow(data) {
                this.$confirm('是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const lsdata = { ids: data.id }
                    deleteUserSalaryDeptByIds(lsdata).then(res => {
                        console.log(res)
                        if (res.code == 200) {
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            })
                            this.fetchData()
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.message || 'error',
                                type: 'error'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    })
                })
               
            }
        }
    }
    </script>
 <style lang="scss" scoped>
    #pageFooter {
        padding-right: 129px;
    }

    .form-area{
        padding: 0 !important;
    }
    .modelbox{
    margin-bottom: 10px;
    background: rgba(255,255,255,0.80);
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border-radius: 4px;
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
        padding-right: 15px;
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
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    .el-button{
        width: 97px;
        height: 32px;
        padding: 0;
        line-height: 32px;
        margin: 0 8px 8px;
    }
    }
    .operationtext{
    color: #409EFF;
    cursor:pointer;
    }
// .el-dialog__wrapper{
//     z-index: 3000 !important;
// }
.btn-area{
    width: 220px;
    margin: 0 auto;
    margin-top: 15px;
}
.redSide {
        width: 4px;
    height: 16px;
    background: #2395f7;
    display: inline-block;
    position: relative;
    left: -6px;
    top: 3px;
    border-radius: 2px;

}
.ml-10 {
    margin-left: 10px;
}
.fw-bd {
    font-weight: 700;
}
.ft-14 {
        font-family: PingFangSC-Medium;
    display: inline-block;
    // padding-left: 5px;
    font-size: 14px;
    color: #333333;
    font-weight: 700;
    line-height: 1;
}
.el-dialog__header {
    padding: 20px 20px 20px 20px;
}
.mainconbox{
//   padding:0 15px;
    .el-button{
    height: 32px;
    // width: 97px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 0 26px;
    font-size: 12px;
    }
    .el-form-item {
    // width: 50%;
    margin-right: 0;
    // float: left;
    // display: flex;
    padding-right: 25px;
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
    }
    .topTool{
    min-height: 54px;
    border-radius: 4px;
    background-color: #ffffff;
    overflow: hidden;

    // padding: 10px 15px;
    // margin-bottom: 10px;
    .toolform{
        transition: max-height 1s;
        overflow: hidden;
    }
    .btn{
        overflow: hidden;
    //   padding-left: 26px;
        margin-top: 10px;
    //   .searchtext{
    //     padding-right: 16px;
    //     font-size: 12px;
    //     color: #1660A3;
    //   }
    }
    }
    .formbox{
    border-radius: 4px;
    margin:7px 0;
    background-color: #ffffff;
    .btn{
            overflow: hidden;
    /* height: 83px; */
    padding: 10px 15px;
        .btnwrap{
        float: right;
        }
    }
    // .table-area{
    //   min-height: 500px;

    // }
    }
    .pagination{
    padding: 20px;
    overflow: hidden;
    .el-pagination{
        float: right;
        margin-right: 129px;
    }
    }
    .allheight{
    height: auto;
    padding: 10px 15px;
    max-height: 300px;
    }
    .oneheight{
    height:54px;
    overflow: hidden;
    padding: 10px 15px;
    max-height: 60px;
    }
}

</style>   
      