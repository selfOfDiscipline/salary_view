<template>
<div>
  <BoxCard title="附件信息" :hasBorder="true">
    <div slot="btnarea">
      <el-button type="primary" plain @click="delFiles" v-if="canedit">删除</el-button>
      <!-- <el-button type="primary" plain @click="filePreview">预览</el-button> -->
      <el-button type="primary" plain @click="fileDownload">下载</el-button>
      <el-button type="primary" plain @click="fileDownloadZip">打包下载</el-button>
      <template v-if="iscontract">
        <el-button type="primary" plain @click="submitload" v-if="showSubmit">提交附件</el-button>
        <!-- showSubmit -->
      </template>
      
      <el-upload
        v-if="canedit||iscontract"
        style="display: inline-block; margin-left: 12px;"
        :action="action"
        with-credentials
        :show-file-list='false'
        :data='uploadData'
        :before-upload="beforeAvatarUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
      >
        <el-button type="primary" plain :disabled="docLoading">上传</el-button>
      </el-upload>
    </div>
    <el-table
      slot="main"
      class="table-setting"
      :data="documentList"
      v-loading="docLoading"
      row-key="id"
      stripe
      @selection-change="rowSelect"
      highlight-current-row
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="文件名称"
        prop="fileRealName"
        show-overflow-tooltip min-width="450"
      >
        <template slot-scope="{row}">
          <span v-if="isPreview(row)" class="link" @click="filePreview(row)">{{row.fileRealName}}</span>
          <span v-else>{{row.fileRealName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="creator"
        label="提交人"
        show-overflow-tooltip min-width="150">
      </el-table-column>
      <el-table-column
        prop="fileSize"
        label="大小"
        show-overflow-tooltip min-width="150">
      </el-table-column>
      <el-table-column
        label="上传时间"
        min-width="150"
        show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.annexTime.substr(0, 10) }}</template>
      </el-table-column>
    </el-table>
  </BoxCard>
  <el-dialog
    title="文件预览"
    :visible.sync="dialogVisible"
    top="5vh"
    width="90%"
    append-to-body
    :before-close="handleClose">
    <div class="imgBox" v-loading="previewLoading">
      <template v-if="isPdf">
        <div v-if="dialogVisible" ref="pdf" class="pdfView"></div>
      </template>
      <img v-else :src="previewUrl">
    </div>
  </el-dialog>
</div>
</template>

<script>
  import {BoxCard} from '@/layout/components'
  import {ticketlist, filedeleteByIds,previewFile} from '@/api/expenditureFlow'
  import PDFJS from 'pdfjs-dist'

  export default {
    name: 'FileLists',
    components: {
      BoxCard
    },
    props: {
      uuid: {
        require: false,
        type: String
      },
      canedit:{
        type: Boolean,
        default: true
      },
      iscontract:{
        type: Boolean,
        default: false
      },
      isShow:{
        type: Boolean,
        require:false,
        default: true
      }
    },
    created() {
      if (this.uuid) {
        this.uploadData.uuid = this.uuid
        this.ticketlist()
      }
    },
    watch:{
      uuid:{
        handler(val){
          console.log(val)
          this.uploadData.uuid = this.uuid
          this.ticketlist()
        },
        deep:true
      },
      "isShow":{
        handler(val){
          console.log(113,val)
          this.showSubmit = val
        },
        deep:true
      }
    },
    data: function () {
      return {
        uploadData: {
          uuid: ''
        },
        docLoading: false,
        action: process.env.VUE_APP_BASE_API + 'file/upload',
        documentList: [],//下载列表
        curSelectFileRow: [],//当前选中的文件列表行
        showSubmit:true, //是否显示提交附件按钮，合同页面：未提交1、驳回5状态的详情页面没有按钮“提交附件”
        previewUrl: "", //文件预览地址
        dialogVisible: false, // 文件预览弹窗
        previewLoading: false,
        isPdf: false,
        previewFileType: ["pdf","jpg","jpeg","png","gif","webp"]
      }
    },
    methods: {
      ticketlist() {//获取文件列表
        this.documentList = []
        if(!this.uploadData.uuid){
          return
        }
        this.docLoading = true
        ticketlist(this.uploadData.uuid).then(res => {
          this.documentList = res.result || []
          this.docLoading = false
        }).catch(err => {
          this.docLoading = false
        })
      },
      beforeAvatarUpload(file) {
        const isLt50M = file.size / 1024 / 1024 < 50;
        if (!isLt50M) {
          this.$message.error('附件大小请控制在50M以内!');
        } else {
          this.docLoading = true
        }
        return isLt50M
      },
      uploadSuccess(e) {//上传文件
        this.documentList = e.result
        const uuid = e.result[0].annexUuid
        this.docLoading = false
        if(!this.uploadData.uuid) {//新增时传出uuid
          this.uploadData.uuid = uuid
          this.$emit('setUuid', uuid)
        }
      },
      uploadError(err) {
        this.$message.warning('上传失败')
        this.docLoading = false
      },
      rowSelect(rows) {//选中file行
        this.curSelectFileRow = rows
      },
      delFiles() {//删除文件行
        if (this.curSelectFileRow.length === 0) {
          this.$message.warning('请选择需要删除的附件')
          return false
        }
        let delIds = []
        this.curSelectFileRow.map(k => {
          delIds.push(k.id)
        })
        filedeleteByIds(delIds).then(res => {
          const { resultCode, message} = res
          if (resultCode === 200) {
            this.ticketlist()
            this.curSelectFileRow = []
            this.$message.success(message)
          } else {
            this.$message.warning(message)
          }
        })
      },
      handleClose(){
        this.dialogVisible = false
      },
      isIE() { //ie?
        if (!!window.ActiveXObject || "ActiveXObject" in window)
          return true;
        else
          return false;
      },
      isPreview(row){
        let index = row.fileRealName.includes(".")?row.fileRealName.lastIndexOf("."):''
        let suffix = index?row.fileRealName.slice(index+1):''
        if(this.previewFileType.indexOf(suffix)===-1){
          return false
        }else{
          return true
        }
      },
      filePreview(row){
        // 预览
        this.dialogVisible = true
        this.previewLoading = true
        previewFile({
          id: row.id
        }).then(res=>{
          this.previewLoading = false
          if(res.resultCode===200){
            let suffix = res.result.extensionName.split(".")[1]
            if(suffix === "pdf"){
              this.isPdf = true
              this.$nextTick(()=>{
                this.loadPdf({el:".pdfView",fileSrc:res.result.bytes})
              })
            }else{
              this.isPdf = false
              this.previewUrl = "data:image/"+suffix+";base64,"+res.result.bytes
            }
          }
        })
      },
      async loadPdf({el,fileSrc,scale=1.5}) {
        const CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/';
        // PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        let pdfCol = document.querySelector(el)
        let pdf = await PDFJS.getDocument({
          data: atob(fileSrc),
          cMapUrl: CMAP_URL,
          cMapPacked: true
        })
        let pages = pdf.numPages
        for (let i = 1; i <= pages; i++) {
          let canvas = document.createElement('canvas')
          let page = await pdf.getPage(i)
          let viewport = page.getViewport(scale)
          let context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width
          let renderContext = {
              canvasContext: context,
              viewport: viewport
          }
          await page.render(renderContext)
          canvas.className = 'canvas'
          pdfCol.appendChild(canvas)
        }
      },
      fileDownload() {
        const fileLists = this.curSelectFileRow
        if (fileLists.length > 0) {
          if (fileLists.length === 1) {
            window.open(process.env.VUE_APP_BASE_API + 'file/download?id=' + fileLists[0].id)
          } else {
            this.$message.warning('多文件不能同时下载')
          }
        } else {
          this.$message.warning('请选择要下载的文件')
        }
      },
      fileDownloadZip() {
        const fileLists = this.curSelectFileRow
        if (fileLists.length > 0) {
          const ids = fileLists.map(k => k.id)
          let applicationCode = +new Date();//获取当前时间戳
          let moduleName = "费控系统";//系统名称
          window.open(process.env.VUE_APP_BASE_API + 'file/downloadZipFile?ids=' + ids.join(',')+'&moduleName='+moduleName+'&applicationCode='+applicationCode)
        } else {
          this.$message.warning('请选择要打包下载的文件')
        }
      },
      submitload(){
        this.$emit('submitload')
      }
    }
  }
</script>
<style lang="scss" scoped>
  >>> .el-table thead .cell{
    &:first-child{
      padding-left: 14px!important;
    }
  }
  .imgBox{
    width: 100%;
    height: 80vh;
    text-align: center;
    overflow-y: scroll;
    position: relative;
    img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      max-width: 100%;
    }
  }
</style>
