<template>
        <!-- 待办列表 -->
        <div class="mainconbox">
            <div class="topTool">
                <el-row>
                    <el-col :span="18">
                        <div class="searchInput">
                            <el-form ref="form" :model="querydata" label-width="100px" :inline="true" :class="isAll?'allheight':'oneheight'">
                                <el-form-item>
                                    <el-input v-model="querydata.applicationCode" placeholder="请输入单据编号" clearable />
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
            <BoxCard title="待办列表">
                <template #btnarea v-if="allowCollectFlag">
                    <el-button type="primary" plain  @click="collect">汇总</el-button>
                </template>
                <el-table
                    slot="main" v-loading="listLoading"
                    :data="list" element-loading-text="Loading"
                    @selection-change="selectRow"
                    fit stripe highlight-current-row :height="tableheight">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column label="序号" width="55">
                        <template slot-scope="scope">
                            {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column label="单据编号" prop="applicationCode" show-overflow-tooltip  min-width="120">
                        <template slot-scope="scope">
                            <a @click="goadd(scope.row)">{{scope.row.applicationCode}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="节点名称" prop="nodeName"></el-table-column>
                    <el-table-column label="上一节点处理人" prop="createName"></el-table-column>
                    <el-table-column label="创建时间" show-overflow-tooltip min-width="120" prop="createTime">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime.substr(0,10) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="审批人" prop="editName"></el-table-column>
                    <el-table-column label="审批状态" show-overflow-tooltip min-width="120" prop="approverStatus">
                        <template slot-scope="scope">
                            <span >{{ scope.row.approverStatus | statusfilter }}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="操作" prop="businessTripMoney" width="100" fixed="right">
                        <template slot-scope="scope">
                            <el-tooltip placement="top">
                                <div slot="content">审批</div>
                                <svg-icon icon-class="eye" @click="delFlow(scope.row)" style="cursor: pointer;"/>
                            </el-tooltip>
                        </template>
                    </el-table-column> -->
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
                :title="dialogName === 'edit' ? '薪资审批' : '薪资审批'" 
                :visible.sync="editFormVisible" 
                :close-on-click-modal="false" 
                @close="editFormVisible = false">
                <Details v-if="isAdd && editFormVisible"
                    @reload="fetchData"
                    :rowData="rowData"
                    @closeDialog="editFormVisible = false" >
                </Details>
            </el-dialog>
        </div>
    </template>
      <script>
      import { BoxCard } from '@/layout/components'
      import Details from './details'
      import {collectTheMonthSalaryFlow} from '@/api/salaryApproval'
      import {selectSalaryByApplicationCode,selectPersonAgendaList} from '@/api/personalneed'
      export default {
        name: 'FlowList',
        components: {
          BoxCard,
          Details
        },
        filters: {
         
        },
        computed: {
            tableheight() {
                if (this.isAll) {
                    return 'calc(100vh - 254px)'
                } else {
                    return 'calc(100vh - 254px)'
                }
            },
        },
        filters:{
            statusfilter(e){
                switch(e){
                    case 2:
                    return '审批通过'
                    case 1:
                    return '驳回'
                    case 0:
                    return '待审'
                }
            }
        },
        data() {
          return {
            allowCollectFlag:null,
            name:'',
            rowData:"",
            selectlistRow:[],
            list:[],
            listLoading: false,
            currentPage: 1,
            total: 0,
            pageSize: 10,
            pageNum: 1,
            querydata: {},
            isall: -1,
            isAll: true,
            dialogName: '',
            isAdd: true, //true新增 false修改
            dialogVisible: false,//新增编辑弹窗
            editFormVisible:false,
          }
        },
        
        created() {
            this.allowCollectFlag =  sessionStorage.getItem('allowCollectFlag') ==="false" ? false : true;;
            // console.log(this.allowCollectFlag);
        },
        mounted() {
            this.fetchData()
            // this.panduan();
        },
        methods: {
            // panduan(){
            //     this.allowCollectFlag =  sessionStorage.getItem('allowCollectFlag');
            //     console.log(this.allowCollectFlag);
            // },
             // 行内编辑选中的数据
            selectRow (val) {
                this.selectlistRow = val
            },  
            collect(){
                console.log(this.selectlistRow)
                if(this.selectlistRow){
                    let ids = this.selectlistRow.map(item => item.id).toString();
                    collectTheMonthSalaryFlow({ids:ids}).then(res => {
                        if(res.code  == 200 ){
                            this.$message({
                                showClose: true,
                                message:res.message,
                                type: 'success'
                            })
                            console.log(res)
                            // this.list = res.data.dataList;
                        }else {
                            this.$message({
                                message: res.message,
                                type: "error"
                            });
                        }
                    })
                }
                
               
                // collectTheMonthSalaryFlow
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
                selectPersonAgendaList(this.querydata).then(res => {
                    if(res.code  == 200 ){
                        this.list = res.data.dataList;
                    }else {
                        this.$message({
                            message: res.message,
                            type: "error"
                        });
                    }
                    this.total = Number(res.data.total);
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
            goadd(row) {
                this.rowData = row;
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
    
      