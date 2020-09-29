
<template>
    <!-- 审批--对公--修改--预算归属公司 -->
    <div>
      <el-input style="width: 390px" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        class="cards"
        v-loading="loading"
        element-loading-text="加载中"
        check-strictly
        ref="tree"
        show-checkbox
        :data="data"
        :props="defaultProps"
        @check-change="checkChange"
        @node-click="getCheckedNodes"
        :filter-node-method="filterNode"
        node-key="id"
        :default-checked-keys="expandKeys"
      ></el-tree>
    </div>
  </template>
  <script>
  
  import {
    selectDeptList,selectRoleList
  } from "@/api/userList";
  export default {
    name: "corporateBusines",
    props: ["male"],
    getCheckedNodes: "",
  
    watch: {
      filterText(val) {
        console.log(val, "jsiudb");
        this.$refs.tree.filter(val);
      }
    },
    data: function() {
      return {
        filterText: "",
        loading: false,
        defaultProps: {
          children: "childList",
          label: "roleName"
        },
        data: [],
        rowList: [],//根据子级找到所有的父级节点集合
        Treecheckes: [],
        expandKeys: []
      };
    },
    created() {
      this.BudgetOwnershiptwo();
      this.treechanges();
    },
    methods: {
      //模糊搜索
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      //模糊搜索
      filterNode(value, data) {
        if (!value) return true;
        return data.budgetDepartmentName.indexOf(value) !== -1;
      },
      // tree的回显
      treechanges() {
        this.expandKeys = this.male.budgetCompanyId.split(",");
        //  this.$nextTick不可删.否则this.$refs为undefined
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.expandKeys);
        });
      },
      checkChange(data) {
        let datas = this.$refs.tree.getCheckedNodes();
        this.Treecheckes.push(data);
        this.$emit("Treecheckes", datas);
        //stat edit by linxiaofei
        this.uncheckEventu();
        //end
      },
       //根据选中的节点获取父节点直到顶级节点
      getParent(node) {
        // 判断当前节点是否有父节点，并且父节点上的data不能是数组
        if (node && node.parentId) {
          // 将父节点上data的menuid存储在 `rowList` 里
          this.$refs.tree.getNode(node.parentId) instanceof Object && this.rowList.push(this.$refs.tree.getNode(node.parentId).data.id)
          // 递归调用 父节点上有父节点
          this.getParent(this.$refs.tree.getNode(node.parentId).data)
        }else{
          this.$refs.tree.getNode(node.parentId) instanceof Object && this.rowList.push(this.$refs.tree.getNode(node.parentId).data.id)
        }
      },
       // 设置半选状态
      setHalfCheckedNodes (key) {
        // ;
        const node = this.$refs.tree.getNode(key)
        if (node && !node.checked) { // 此处应判断当前节点的checked属性是否为true，是则不必半选
          node.indeterminate = true;
        }else if(node && node.checked){
          node.indeterminate = false;
        }
      },
      //取消选中后的半选中状态处理
      uncheckEventu(){
        ;
        //获取当前的选中节点
        let checkdata = [];
        this.$nextTick(() => {
          checkdata = this.$refs.tree.getCheckedNodes();
           //获取当前的半选中节点
          let halfdata = this.$refs.tree.getHalfCheckedNodes();
          //首先循环半选中状态节点
          for(let j=0;j<halfdata.length;j++){
            const halfnode = this.$refs.tree.getNode(halfdata[j].id);
            // this.setHalfCheckedNodes(halfnode.id,true);
            //将所有半选中的状态节点通通取消选中
            halfnode.indeterminate = false;
          }
          //然后循环当前的被选中的节点
          this.rowList = [];
          for(let k=0;k<checkdata.length;k++){
            //根据选中节点重新寻找父级节点放到rowList数组中
            this.getParent(checkdata[k]);
            //设置当前选中节点
            this.setHalfCheckedNodes(checkdata[k]);
          }
          //获取所有选中节点的父级节点集合
          let res = this.rowList;
          res = [...new Set(res)]//去重
          //循环父级节点集合
          for(let i=0;i<res.length;i++){
            //设置父级节点半选中状态
            this.setHalfCheckedNodes(res[i]);
          }
        });
       
      },
      BudgetOwnershiptwo() {
        //获取列表
        this.loading = true;
        this.zIndexOptions = [];
        selectRoleList().then(res => {
          this.data = res.result;
          this.loading = false;
          this.uncheckEventu();
        });
      }
    }
  };
  </script>
  <style lang="scss" scoped>
  .cards {
    height: 350px;
    overflow: auto;
  }
  >>> .el-loading-spinner {
    margin-top: 100px;
  }
  </style>
  


  <!-- //预算归属公司
  budgetControl(e) {
    this.BudgetCompany = !this.BudgetCompany;
  }, -->
  <!-- // 预算
    Btnsix(tree) {
      this.$set(this.form, "budgetCompanyName", this.budgetCompanyName.join());
      this.$set(this.form, "budgetCompanyId", this.budgetCompanyId);
      this.BudgetCompany = false;
    },
    Treecheckes(tree) {
      this.budgetCompanyName = [];
      let ids = [];
      let names = [];
      if(tree.length > 0){
        tree.map(k => {
          ids.push(k.id);
          names.push(k.budgetDepartmentFullName);
        });
      }
      this.budgetCompanyName = names;
      this.budgetCompanyId = ids.join();
    },
    Btnthree(data) {
      this.editVisible = false;
    }, -->