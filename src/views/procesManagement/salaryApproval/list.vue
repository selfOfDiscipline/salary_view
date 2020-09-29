<template>
        <div class="mainconbox">
            <div class="topTool">
                <el-row>
                    <el-col :span="18">
                        <div class="searchInput">
                            <el-form ref="form" :model="querydata" label-width="100px" :inline="true" :class="isAll?'allheight':'oneheight'">
                                <el-form-item>
                                    <el-input v-model="querydata.flowEnCode" placeholder="请输入流程编码" clearable />
                                </el-form-item>
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
            <BoxCard title="流程配置列表">
                <template #btnarea>
                    <el-button type="primary" plain @click="goadd('add')">新增</el-button>
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
                    <el-table-column label=" 流程编号" prop="flowEnCode"></el-table-column>
                    <!-- <el-table-column label="流程类型" show-overflow-tooltip min-width="120" prop="flowType">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salaryDeptName }}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column label=" 流程名称" prop="flowName"></el-table-column>
                    <el-table-column label=" 适用部门名称" prop="flowSalaryDeptName"></el-table-column>
                    <el-table-column label="创建时间 " prop="createTime"></el-table-column>
                    <el-table-column label="操作" prop="businessTripMoney" width="100" fixed="right">
                        <template slot-scope="scope">
                            <el-tooltip placement="top">
                                <div slot="content">删除</div>
                                <svg-icon icon-class="del" @click="delFlow(scope.row)" style="cursor: pointer;"/>
                            </el-tooltip>
                            <el-tooltip placement="top">
                                <div slot="content">查看</div>
                                <svg-icon icon-class="eye" @click="goedit('edit',scope.row)" style="cursor: pointer;"/>
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
                        :page-sizes="[10, 20, 30, 50]"
                        layout=" prev, pager, next, total,sizes,jumper"
                        :total="total">
                    </el-pagination>
                    <div class="goButton">GO</div>
                </div>
            </BoxCard>
            <el-dialog  
                fullscreen 
                modal-append-to-body
                append-to-body
                :title="dialogName === 'edit' ? '编辑流程配置' : '新增流程配置'" 
                :visible.sync="editFormVisible" 
                :close-on-click-modal="false" 
                :show-close="showClose"
                @close="editFormVisible = false">
                <Add v-if="isAdd && editFormVisible"
                    :salaryId="salaryId"   
                    @reload="fetchData"
                    @closeDialog="editFormVisible = false" >
                </Add>
            </el-dialog>
        </div>
    </template>
      <script>
      import { BoxCard } from '@/layout/components'
      import Add from './add'
      import { selectFlowList } from '@/api/salaryApproval'
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
                salaryId:'',
                showClose:true,
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
      
        },
        methods: {
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
                selectFlowList(this.querydata).then(res => {
                    if(res.code  == 200 ){
                        this.list = res.data.dataList;
                    }
                    this.total = Number(res.data.total)
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
            goedit(name,data) {
                this.salaryId = data.id;
                // this.isAdd = false
                this.dialogName = name;
                
                this.editFormVisible = !this.editFormVisible
            
            },
            delFlow(data) {
                this.$confirm('是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const lsdata = { ids: data.id }
                    deleteFlowConfigByIds(lsdata).then(res => {
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
    
      