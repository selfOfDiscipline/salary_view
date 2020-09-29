<template>
        <div>
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          <el-scrollbar>
            <div style="height: 350px;">
              <el-tree
                class="filter-tree"
                v-loading="loading"
                element-loading-text="加载中"
                :data="options"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                :filter-node-method="filterNode"
                @check-change="getCheckedNodes"
                ref="tree"
              ></el-tree>
            </div>
          </el-scrollbar>
        </div>
      </template>
      <script>
      import {
        selectDeptList,selectRoleList
      } from "@/api/userList";
      
      export default {
        props: {
          label: {
            type: String,
            required: true,
            default: ""
          },
          isMultiple: {
            // 是否支持多选 ,注意： 目前只支持多选 true为多选
            type: Boolean,
            default: true
          }
        },

        name:DepTree,
        data() {
          return {
            loading: false,
            filterText: "",
            defaultProps: {
                children: "childList",
                label: this.label
            },
            parentList: [],
            checkedList: [],
            options: []
          };
        },
        watch: {
          filterText(val) {
            this.$refs.tree.filter(val);
          }
        },
        mounted() {
          // console.log(52,this.label)
          if (this.label === "deptName") {
            // this.defaultProps.label = "deptName"
            this.getBudgetDepartment();
          } else if (this.label === "roleName") {
            this.startDepartment();
          } else if (this.label === "subjectName") {
            this.queryBySubjectType();
          }
        },
        methods: {
          filterNode(value, data) {
            if (!value) return true;
            return data[this.defaultProps.label].indexOf(value) !== -1;
          },
          getCheckedNodes(curObj, checked, children) {
            // 将默认的多选改为单选
            if (checked) {
              if (!this.isMultiple) {
                // 执行下面这段代码为单选，否则多选
                // let arr = [curObj.id];
                // this.$refs.tree.setCheckedKeys(arr);
              }
            }
            let checkdata = this.$refs.tree.getCheckedNodes() || []; //目前被选中的节点所组成的数组
            this.$emit("chekedList", checkdata);
          },
          getBudgetDepartment() {
            // 预算承担部门
            this.loading = true;
            // { marketingFlag: 0 }
            getAllBudgetDepartment().then(res => {
                //   console.log("预算承担部门", res);
                this.loading = false;
                if (res.resultCode === 200) {
                  this.options = res.result;
                } else {
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
              })
              .catch(error => {
                this.loading = false;
              });
          },
          startDepartment() {
            // 业务发起部门
            this.loading = true;
            selectDeptList().then(res => {
                // console.log("业务发起部门",res)
                this.loading = false;
                if (res.code === 200) {
                  this.options = res.data;
                } else {
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
              })
              .catch(error => {
                this.loading = false;
              });
          },
          queryBySubjectType() {
            // 预算科目
            this.loading = true;
            queryTreeBySubjectType({ subjectType: 1 })
              .then(res => {
                // console.log("预算科目",res)
                this.loading = false;
                if (res.resultCode === 200) {
                  this.options = res.result;
                } else {
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
              })
              .catch(error => {
                this.loading = false;
              });
          }
        }
      };
      </script>