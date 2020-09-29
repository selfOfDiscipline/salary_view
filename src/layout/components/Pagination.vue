<template>
  <div id="pageFooter">
    <el-pagination
      @current-change="searchData"
      @size-change="SizeChange"
      :current-page.sync="curPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout=" prev, pager, next, total, sizes,jumper"
      :total="total">
    </el-pagination>
    <div class="goButton" style="">GO</div>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      pageSize: {//每页显示数据
        default: 10
      },
      pageSizes: {
        default: ()=>{
          return [10,20,30,50]
        }
      },
      currentPage: {//当前页数
        default: 1
      },
      total: {//总条数
        default: 0
      }
    },
    watch: {
      'currentPage' (o, v) {
        this.curPage = o
      }
    },
    data() {
      return ({
        curPage: 1
      })
    },
    methods: {
      searchData(e) {
        this.$emit('handleCurrentChange', e)
      },
      SizeChange(e){
        this.$emit('handleSizeChange', e)
      }
    }
  }
</script>
<style lang="scss" scoped></style>
