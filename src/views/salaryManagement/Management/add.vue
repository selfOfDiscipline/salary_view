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
                      <el-input v-model="querydata.accountEmployee" placeholder="请输入部门名称" clearable />
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
          <BoxCard title="薪资计算列表">
            <template #btnarea>
              <el-button type="primary" plain>计算</el-button>
              <!-- <el-button v-permission="'003.01.01.fkbutton01'" type="primary" plain @click="goadd('add')">新增</el-button> -->
            </template>
            <el-table
              slot="main"
              v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              fit
              stripe
              highlight-current-row
              :height="tableheight"
            >
              <el-table-column label="序号" width="55">
                <template slot-scope="scope">
                  {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="员工姓名" prop="bizCategoryName" />
      
              <el-table-column label="部门" show-overflow-tooltip min-width="120" prop="theme">
                <template slot-scope="scope">
                  <span>{{ scope.row.theme }}</span>
                </template>
              </el-table-column>
              <el-table-column label="岗位名称" prop="bizCategoryName">
                
              </el-table-column>
              <el-table-column label="工作性质" prop="bizCategoryName"></el-table-column>
              <el-table-column label="基本工资" prop="bizCategoryName" min-width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="薪资发放比" prop="bizCategoryName" min-width="120"></el-table-column>
              <el-table-column label="出勤" prop="bizCategoryName">
                  <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.bizCategoryName"></el-input>
                  </template>
              </el-table-column>
              <el-table-column label="缺勤" prop="bizCategoryName">
                  <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.bizCategoryName"></el-input>
                  </template>
              </el-table-column>
              <el-table-column label="个税" prop="bizCategoryName"></el-table-column>
              <el-table-column label="社保" prop="bizCategoryName"></el-table-column>
              <el-table-column label="应发工资" prop="businessTripMoney" width="100">
                <template slot-scope="scope">
                  {{ scope.row.businessTripMoney | moneyFormit }}
                </template>
              </el-table-column>
              <el-table-column label="实付工资" prop="businessTripMoney" width="100" fixed="right">
                <template slot-scope="scope">
                  {{ scope.row.businessTripMoney | moneyFormit }}
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
      
        </div>
      </template>
      <script>
      import { BoxCard } from '@/layout/components'
      export default {
        name: 'FlowList',
        components: {
          BoxCard
        },
        filters: {
          statusfilter(e) {
            switch (e) {
              case 0:
                return '作废'
              case 1:
                return '未提交'
              case 2:
                return '审批中'
              case 3:
                return '审批通过'
              case 4:
                return '审批不通过'
              case 5:
                return '驳回'
            }
          }
        },
        data() {
          return {
      name:'',
            form: {
              bizCategory: '',
              accountEmployeeCd: '',
              detailItemCd: '',
              totalAmount: 0,
              theme: '',
              standardExpense: 0
            },
      
            list:[{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1}],
            listLoading: false,
            currentPage: 1,
            total: 10,
            pageSize: 10,
            pageNum: 1,
            querydata: {},
            isall: -1,
            isAll: false
          }
        },
        computed: {
          tableheight() {
            if (this.isAll) {
              return 'calc(100vh - 314px)'
            } else {
              return 'calc(100vh - 194px)'
            }
          }
        },
        watch: {
          createTime(val) {
            if (val === null) {
              this.querydata.startCreateTime = ''
              this.querydata.endCreateTime = ''
            } else {
              this.querydata.startCreateTime = val[0]
              this.querydata.endCreateTime = val[1]
            }
          }
        },
        created() {
          var aData = new Date()
          this.datevalue = aData.getFullYear() + '-' + (aData.getMonth() + 1) + '-' + aData.getDate()
          console.log(this.value) // 2019-8-20
        },
        mounted() {
          // this.fetchData()
          // this.getProjectList();
      
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
          // 行内编辑选中的数据
          selectRow(val) {
            this.selectlistRow = val
          },
          // 行内编辑添加一行
          addRow() {
            var list = {
              createId: '',
              createTime: '',
              creator: '',
              deleteFlag: '0',
              deliveryDay: '',
              editTime: '',
              editor: '',
              editorId: '',
              id: '',
              inTestDay: '',
              isRemark: '',
              isRequired: '',
              level: 4,
              order: '',
              parentId: '',
              projectId: '',
              standardName: '',
              type: 1
            }
            this.tableData.unshift(list)
          },
          // 行内编辑的删除
          delData() {
            if (this.selectlistRow != '') {
              for (let i = 0; i < this.selectlistRow.length; i++) {
                const val = this.selectlistRow
                // 获取选中行的索引的方法
                // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
                val.forEach((val, index) => {
                  this.tableData.forEach((v, i) => {
                    if (val.id === v.id) {
                      // i 为选中的索引
                      this.tableData.splice(i, 1)
                    }
                  })
                })
              }
            } else {
              this.$message({
                message: '请选择要删除的问题描述',
                type: 'warning'
              })
            }
            // this.$refs.tableData.clearSelection()
          },
          // // 行内编辑
          // handleCurrentChange(row, event, column) {
          // },
          handleDelete(index, row) {
          },
          //   明细新增
          addcost() {
            console.log(this.costtable)
            this.nextkey += 1
            this.costtable.push({
              keyid: this.nextkey,
              bizInvoiceId: ''
            })
          },
          // 明细删除
          delcost() {
            if (this.selectkey.length == 0) {
              this.$message({
                type: 'error',
                message: '未选择删除项'
              })
              return
            }
            for (let i = 0; i < this.costtable.length; i++) {
              const element = this.costtable[i]
              for (let j = 0; j < this.selectkey.length; j++) {
                const element2 = this.selectkey[j]
                if (element.keyid === element2.keyid) {
                  this.costtable.splice(i, 1)
                  i--
                }
              }
            }
          },
          fetchData() {
            this.listLoading = true
            this.querydata.pageNum = this.pageNum
            this.querydata.pageSize = this.pageSize
            travelList(this.querydata).then(res => {
              // console.log(res)
              this.list = res.result.res
              this.total = res.result.total
              this.listLoading = false
            })
          },
          search() {
            this.pageNum = 1
            // this.pageSize=10
            this.fetchData()
          },
          changetime(e) {
            console.log(e)
            this.querydata.startCreateTime = e[0]
            this.querydata.endCreateTime = e[1]
          },
          showall() {
            this.isAll = !this.isAll
          },
          resetform() {
            this.querydata = {}
            this.createTime = ''
          },
          getProjectList() {
            queryProject({}).then(res => {
              this.options = res.result
              // console.log(this.options)
            })
          },
          goedit(name, data) {
            // if(name == 'check'){
            //     data.approveStatus = 6
            // }
            console.log(data)
            this.isAdd = false
            // this.travelId = data.id;
            this.travelCode = data.annexUuid
            this.travelStatus = data.approveStatus
            this.travelData = data
            this.dialogName = name
            this.editFormVisible = !this.editFormVisible
          },
      
          goadd(name) {
            showRule({ codetypeId: 14 }).then(res => {
              if (res.resultCode == 0) {
                this.travelCode = res.result
                this.isAdd = true
                this.dialogName = name
                this.editFormVisible = !this.editFormVisible
              }
            })
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
          subscribedefine() {
            console.log(this.subscribeRow)
            if (this.radioType == 1) {
              setApprovalWithXieCheng(this.subscribeRow).then(res => {
                if (res.resultCode == 200) {
                  window.open(this.actionXiecheng + '?employeeId=' + this.subscribeRow.businessTripPersonId + '&searchType=1&applicationCode=' + this.subscribeRow.applicationCode)
                } else {
                  this.$message.error(res.message)
                }
              })
            } else if (this.radioType == 3) {
              getFeeBusinessHintMessageById(this.subscribeRow).then(res => {
                if (res.resultCode == 200) {
                  if (res.result == true) {
                    this.$alert(res.message, '温馨提示', {
                      confirmButtonText: '知道了',
                      type: 'warning',
                      callback: action => {
                        setApprovalWithXieCheng(this.subscribeRow).then(res => {
                          if (res.resultCode == 200) {
                            this.$emit('closeDialog')
                            window.open(this.actionXiecheng + '?employeeId=' + this.subscribeRow.businessTripPersonId + '&searchType=3&applicationCode=' + this.subscribeRow.applicationCode)
                          } else {
                            this.$message.error(res.message)
                          }
                        })
                      }
                    })
                  } else {
                    setApprovalWithXieCheng(this.subscribeRow).then(res => {
                      if (res.resultCode == 200) {
                        this.$emit('closeDialog')
                        window.open(this.actionXiecheng + '?employeeId=' + this.subscribeRow.businessTripPersonId + '&searchType=3&applicationCode=' + this.subscribeRow.applicationCode)
                      } else {
                        this.$message.error(res.message)
                      }
                    })
                  }
                }
              })
            }
            // this.dialogFormVisible = false;
          },
          delFlow(data) {
            if (data.approveStatus == 1 || data.approveStatus == 5) {
              this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const lsdata = { ids: data.id }
                deleteIds(lsdata).then(res => {
                  console.log(res)
                  if (res.resultCode == 200) {
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
            } else {
              this.$message.warning('该状态的出差单据不可删除！')
            }
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
      
      