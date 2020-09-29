<template>
  <el-dialog
    :title="title"
    :visible.sync="showTreeDialog"
    :width="width"
    lock-scroll
    append-to-body
    :top="top"
    @closed="closeDialog"
    :close-on-click-modal="false"
  >
    <!--<el-tree v-loading="loading"-->
             <!--ref="tree"-->
             <!--:props="props"-->
             <!--:show-checkbox="showCheckBox"-->
             <!--:load="loadNode"-->
             <!--lazy node-key="id" :data="AdjustLists" :default-expanded-keys="expandKeys" class="ztree">-->
      <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
        <!--<span>{{ node.label }}</span>-->
        <!--<span style="margin-left: 50px;">-->
          <!--{{data.approveStatusStr}}-->
        <!--</span>-->
      <!--</span>-->
    <!--</el-tree>-->
    <el-tree v-loading="loading"
             ref="tree"
             :props="props"
             :show-checkbox="showCheckBox"
             :default-checked-keys="payment.adjustTreeChecked"
              node-key="id" :data="AdjustLists" :default-expanded-keys="expandKeys" class="ztree">
    </el-tree>
    <el-form>
      <el-form-item class="formbtn">
        <el-button type="primary" plain @click="closeDialog">关闭</el-button>
        <el-button type="primary" plain @click="sureOrg">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import {queryBootsByParentId, queryBootsByYear, getAllExamineBudgetDeparmtent} from '@/api/budget'
  import {mapState} from 'vuex'
  export default {
    name: 'AdjustTree',
    props: {
      showTreeDialog: {//是否显示树弹窗
        type: Boolean,
        default: false,
        required: true
      },
      title: {//弹窗标题
        type: String,
        default: '选择预算主体',
        required: false
      },
      subjectType: {
        type: Number,
        default: 0,//0:管理预算调整 1:营销预算调整
        required: false
      },
      width: {//弹窗宽度
        type: String,
        default: '500px',
        required: false
      },
      top: {//弹窗距离顶部高度
        type: String,
        default: '10vh',
        required: false
      },
      showCheckBox: {//是否显示树弹窗
        type: Boolean,
        default: false,
        required: false
      },
      year: {
        default: new Date().getFullYear()
      },
    },
    created() {//获取预算主体树
      const self = this
      self.getAllExamineBudgetDeparmtent()
    },
    computed: {
      ...mapState([
        'payment'
      ])
    },
    data: function() {
      return {
        loading: false,//树结构加载中
        curCompany: {},//当前选中的组织
        AdjustLists: [],
        expandKeys: [],
        props: {
          label: 'budgetDepartmentName',
          children: 'children',
          isLeaf: 'hasChildren'
        },
      }
    },
    methods: {
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve(this.AdjustLists);
        } else if (node.level === 1) {
          resolve(node.data.children)
        } else if (node.level > 1) {
          if (node.data.leafFlag === 0) {
            queryBootsByParentId({
              parentId: node.data.id,//坑在这里  直接用id时  乱序
              yearValue: node.data.yearValue,
              caliberType: 1,// this.subjectType
            }).then(res => {
              const { resultCode, result } = res
              if (resultCode === 200) {
                result.map(k => {
                  k.hasChildren = k.leafFlag === 1
                })
                resolve(result)
              }
            })
          }
        }
      },
      setDatas(data) {//最终子节点添加调整预算备用值
        data.map(k => {
          if (Array.isArray(k.children)) {
            k.hasChildren = false
            if (k.level < 4) {//默认展开第二级菜单
              this.expandKeys.push(k.id)
            }
            this.setDatas(k.children)
          } else {
            k.hasChildren = true
          }
        })
        return data
      },
      getAllExamineBudgetDeparmtent() {//获取组织机构树 最新的接口数据
        this.loading = true
        const {year, subjectType} = this.$store.state.budget.headSearch
        const yearValue = year || this.year
        getAllExamineBudgetDeparmtent({yearValue, isMarketingFlag: subjectType || 0, caliberType: 1}).then(res => {
          const {resultCode, result} = res
          if (resultCode === 200) {//如果请求成功
            this.AdjustLists = this.setDatas(result)
            this.loading = false
          }
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },
      queryBootsByYear() {//获取组织机构树
        this.loading = true
        const {year, subjectType} = this.$store.state.budget.headSearch
        queryBootsByYear({yearValue: year, ismarketingFlag: subjectType}).then(res => {
          const { resultCode, result } = res
          if (resultCode === 200) {//如果请求成功
            let parents = result.root;//所有的父节点
            if (parents.length > 0) {
              parents.map(k => {
                this.expandKeys.push(k.id)
                result[k.id].map(d => {
                  this.expandKeys.push(d.id)
                })
                k.children = result[k.id]
                k.hasChildren = k.leafFlag === 1
              })
            }
            this.AdjustLists = parents
            this.loading = false
          }
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
        // queryBootsByParentId(obj).then(res => {
        //   const { resultCode, result } = res
        //   if (resultCode === 200) {//如果请求成功
        //     result.map(k => {
        //       this.expandKeys.push(k.id)
        //       k.hasChildren = k.leafFlag === 1
        //     })
        //     // let parents = result.root;//所有的父节点
        //     // if (parents.length > 0) {
        //     //   parents.map(k => {
        //     //     if (result[k.orgCode]) {
        //     //       this.expandKeys.push(k.orgCode)
        //     //       result[k.orgCode].map(d => {
        //     //         this.expandKeys.push(d.orgCode)
        //     //       })
        //     //     }
        //     //     k.children = result[k.orgCode]
        //     //     k.hasChildren = k.leafFlag === 1
        //     //   })
        //     // }
        //     this.AdjustLists = result
        //   }
        //   this.loading = false
        // }).catch(err => {
        //   this.loading = false
        // })
      },
      sureOrg () {//双击tree上的节点, 设置预算主体
        const curCompany = this.showCheckBox ? this.$refs.tree.getCheckedNodes() : [this.$refs.tree.getCurrentNode()]
        const children = curCompany.filter(k => !k.children)
        // const limit = curCompany.filter(k => k.approveStatus !== 3)
        if (children.length === 0) {
          this.$message.warning('请选择预算主体')
          return false
        } else {
          this.$emit('setBudgetName', children)
          this.$emit('closeDialog')
        }
      },
      closeDialog () {
        this.$refs.tree.setCheckedKeys([]);
        this.$emit('closeDialog')
      },
    }
  }
</script>
<style lang="scss" scoped>
  .ztree {
    max-height: calc(100vh - 350px);
    margin-bottom: 26px;
    overflow: auto;
    min-width: 200px;
    .custom-tree-node {
      width: 100%;
      display: flex;
      span {
        &:first-child {
          flex: 1;
        }
        &:last-child {
          width: 90px;
          text-align: center;
        }
      }
    }
  }
  .status {
    font-family: PingFangSC-Menus;
    position: absolute;
    top: 20px;
    width: calc(100% - 140px);
    font-size: 12px;
    font-weight: 700;
    left: 85px;
    color: #333;
    text-align: right;
  }
</style>
