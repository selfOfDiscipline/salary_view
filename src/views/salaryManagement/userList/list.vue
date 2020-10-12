<template>
    <div class="mainconbox">
      <div class="topTool">
        <el-row>
          <el-col :span="18">
            <div class="searchInput">
              <el-form ref="form" :model="querydata" label-width="100px" :inline="true" :class="isAll?'allheight':'oneheight'">
                    <el-form-item>
                    <el-input v-model="querydata.userName" placeholder="请输入员工姓名" />
                    </el-form-item>
                    <el-form-item>
                    <el-input v-model="querydata.salaryDeptName" placeholder="请输入部门名称"/>
                    </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="btn">
              <div class="btnwrap">
                <!-- <span class="searchtext" @click="showall">高级搜索
                  <i :class="isAll ? 'el-icon-d-arrow-left pack_up' : 'el-icon-d-arrow-left'" />
                </span> -->
                <el-button type="primary" plain @click="search">搜索</el-button>
                <el-button type="primary" plain @click="resetform">重置</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <BoxCard title="员工列表">
        <template #btnarea>
          <el-button type="primary" plain @click="goadd('add')">新增</el-button>
        </template>
        <el-table slot="main" v-loading="listLoading" :data="list"
          element-loading-text="Loading" fit stripe highlight-current-row :height="tableheight">
          <el-table-column label="序号" width="55">
            <template slot-scope="scope">
              {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="员工姓名" prop="userName" />
          <el-table-column label="部门" show-overflow-tooltip min-width="120" prop="salaryDeptName">
            <template slot-scope="scope">
              <span>{{ scope.row.salaryDeptName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="基本工资" prop="standardSalary">
              <template slot-scope="scope">
                  {{ scope.row.standardSalary | moneyFormit }}
              </template>
          </el-table-column>
          <el-table-column label="工作性质" prop="userRankType">
            <template slot-scope="scope">
                <span>{{ scope.row.userRankType| statusfilter}}</span>
                </template>
          </el-table-column>
          <el-table-column label="操作" prop="businessTripMoney" width="100" fixed="right">
            <template slot-scope="scope">
                <el-tooltip placement="top">
                    <div slot="content">修改全量信息</div>
                    <svg-icon icon-class="edit" @click="goedit('edit',scope.row,0)" style="cursor: pointer;"/>
                </el-tooltip>
                <el-tooltip placement="top">
                    <div slot="content">删除</div>
                    <svg-icon icon-class="del" @click="delFlow(scope.row)" style="cursor: pointer;"/>
                </el-tooltip>
                <el-tooltip placement="top">
                    <div slot="content">修改在职状态</div>
                    <svg-icon icon-class="positive" @click="positive(scope.row)" style="cursor: pointer;"/>
                </el-tooltip>
                <el-tooltip placement="top">
                    <div slot="content">修改基本信息</div>
                        <svg-icon icon-class="edit" @click="goedit('edit',scope.row,1)" style="cursor: pointer;"/>
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
            :title="dialogName === 'edit' ? '编辑员工信息' : '新增员工信息'" 
            :visible.sync="editFormVisible" 
            :close-on-click-modal="false" 
            :show-close="showClose"
            @close="editFormVisible = false">
            <Add v-if="isAdd && editFormVisible"
                :userId="userId" 
                :status="status"
                @reload="fetchData"
                @closeDialog="editFormVisible = false" >
            </Add>
        </el-dialog>
        <el-dialog  
            width="400px"
            modal-append-to-body  
            append-to-body
            title="修改在职状态" 
            :visible.sync="positiveFormVisible" 
            :close-on-click-modal="false" 
            @close="positiveFormVisible = false">
            <Positive v-if="isAdd && positiveFormVisible"
                :positiveId="positiveId" 
                :positiveName="positiveName"
                @reload="fetchData"
                @closeDialog="positiveFormVisible = false" >
            </Positive>
        </el-dialog>  

    </div>
  </template>
  <script>
  import { BoxCard } from '@/layout/components'
  import {selectUserList,deleteUserByIds} from '@/api/userList'
  import Add from './add'
  import Positive from './positive'
  
  export default {
    name: 'FlowList',
    components: {
      BoxCard,
      Add,
      Positive
    },
    filters: {
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
        
        filters(e){
            switch (e) {
            case 0:
                return '管理岗'
            case 1:
                return '成本岗'
            case 2:
                return '技术岗'
            }
        }
    },
    data() {
      return {
        name:'',
        userId:'',
        status:0,
        positiveId:'',
        positiveName:"",
        form: {
            bizCategory: '',
            accountEmployeeCd: '',
            detailItemCd: '',
            totalAmount: 0,
            theme: '',
            standardExpense: 0
        },
  
        list:[],
        listLoading: false,
        currentPage: 1,
        total: 10,
        pageSize: 10,
        pageNum: 1,
        querydata: {
            // conditionDateString: "",
            // menuType: "",
            pageNum: 1,
            pageSize: 10,
            // userName: "",
            // userPostType:  "",
            // userRankType: "",
            // userSalaryDeptId: "",
        },
        isall: -1,
        isAll: false,
        dialogName: '',
        isAdd: true, //true新增 false修改
        dialogVisible: false,//新增编辑弹窗
        editFormVisible:false,
        positiveFormVisible:false,
        showClose:true,
      }
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
    watch: {
        
    },
    created() {
        var aData = new Date()
        this.datevalue = aData.getFullYear() + '-' + (aData.getMonth() + 1) + '-' + aData.getDate()
        console.log(this.value) // 2019-8-20
    },
    mounted() {
      this.fetchData()
  
    },
    methods: {
        // 关闭弹窗，不可以删这个方法
        handleCloseBindWarnStandard() {
            this.$emit('closeBindWarnStandard')
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
            selectUserList(this.querydata).then(res => {
                // console.log(res)
                this.list = res.data.dataList
                this.total = Number(res.data.total)
                this.listLoading = false
            })
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
        goedit(name, data, status) {
            // this.isAdd = false
            this.status = status;
            this.userId = data.id;
            console.log(this.userId);
            this.dialogName = name
            this.editFormVisible = !this.editFormVisible
        },
        // 修改在职状态
        positive(data){
            this.userId = ''
            this.status = '';
            this.positiveId = data.id;
            this.positiveName = data.userName;
            this.isAdd = true
            this.positiveFormVisible = !this.positiveFormVisible
        },
        goadd(name) { 
            this.userId = ''
            this.status = '';
            this.isAdd = true
            this.dialogName = name
            this.editFormVisible = !this.editFormVisible
        },
        subscribe(e) {
            // if(e.businessTripEndDate > this.datevalue){
            this.dialogFormVisible = true
            this.subscribeRow = e
            this.bookform = e
            // }else{
            //     this.$message.warning('当前出差日期已超出规定时间,请重新选择！');
            // }
        },
        //   删除员工
        delFlow(data) {
            // if (data.approveStatus == 1 || data.approveStatus == 5) {
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const lsdata = { ids: data.id }
                deleteUserByIds(lsdata).then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.$message({
                    showClose: true,
                    message: res.message,
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
            })
            // } else {
            //   this.$message.warning('该单据不可删除！')
            // }
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
  
  