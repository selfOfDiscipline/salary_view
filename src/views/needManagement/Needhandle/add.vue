<template>
        <div>
            <BoxCard title="基本信息" class="modelbox">
                <el-form :inline="true" :model="form" :rules="rules" ref="form" label-position="right" 
                    class="form-area" 
                    label-width="130px" 
                    slot="main"
                    >
                    <el-form-item label="姓名" prop="userName">
                        <el-input v-model="form.userName" placeholder="请输入姓名" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="OA账号" prop="userAccount">
                        <el-input v-model="form.userAccount" placeholder="请输入OA账号" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="userSex">
                        <el-radio-group v-model="form.userSex" :disabled="isDisable">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="userCard">
                        <el-input v-model="form.userCard" placeholder="请输入身份证号" maxlength="18" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="userTel">
                        <el-input v-model="form.userTel" placeholder="请输入手机号" maxlength="11" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="userEmail">
                        <el-input v-model="form.userEmail" placeholder="请输入邮箱" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="社保卡号">
                        <el-input v-model="form.socialSecurityCard" placeholder="请输入社保卡号" maxlength="18" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="薪资归属部门" prop="salaryDeptId">
                        <el-select v-model="form.salaryDeptId" filterable placeholder="请选择薪资归属部门" :disabled="isDisable">
                            <el-option v-for="item in SalaryDeptlist"
                                :key="item.id"
                                :label="item.salaryDeptName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务归属部门" prop="userDeptId">
                        <el-input clearable v-model="form.userDeptName" :disabled="isDisable" placeholder="请选择业务归属部门" @focus="openDialog('业务归属部门选择','deptName',false)"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位类型" prop="userPostType">
                        <el-select v-model="form.userPostType" filterable placeholder="请选择岗位类型" :disabled="isDisable">
                            <el-option v-for="item in PostTypeOption"
                                :key="item.id"
                                :label="item.typeName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="在职状态" prop="userRankType">
                        <el-select v-model="form.userRankType" filterable placeholder="请选择在职状态" :disabled="isDisable">
                            <el-option v-for="item in RankTypeOption"
                                :key="item.id"
                                :label="item.typeName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入职日期" prop="userEntryDate">
                        <el-date-picker :disabled="isDisable"
                            v-model="form.userEntryDate"
                            type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择入职日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计转正日期" prop="planChangeFormalDate">
                        <el-date-picker :disabled="isDisable"
                            v-model="form.planChangeFormalDate"
                                type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择预计转正日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="实际转正日期" prop="realityChangeFormalDate">
                        <el-date-picker :disabled="isDisable"
                            v-model="form.realityChangeFormalDate"
                                type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择实际转正日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="离职日期" prop="userLeaveDate">
                        <el-date-picker :disabled="isDisable"
                            v-model="form.userLeaveDate"
                                type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择离职日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="社保开始缴纳日期" prop="socialSecurityStartDate">
                        <el-date-picker :disabled="isDisable"
                            v-model="form.socialSecurityStartDate"
                                type="date"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择社保开始缴纳日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="户籍所在地" prop="originalAddress">
                        <el-input v-model="form.originalAddress" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="现居住地" prop="nowAddress">
                        <el-input v-model="form.nowAddress" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="户口类型" prop="householdType">
                            <el-radio-group v-model="form.householdType" :disabled="isDisable">
                                <el-radio :label="0">城镇</el-radio>
                                <el-radio :label="1">农业</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    <el-form-item label="工作城市" prop="workCity">
                        <el-input v-model="form.workCity" :disabled="isDisable"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" style="width:100%" prop="remark" >
                        <el-input
                            :disabled="isDisable"
                            type="textarea"
                            placeholder="请输入备注"
                            v-model="form.remark"
                            maxlength="200"
                            show-word-limit>
                        </el-input>
                    </el-form-item>
                </el-form>
            </BoxCard>
            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                modal-append-to-body  
                append-to-body
                width="300px"
                height="450px"
                :before-close="handleClose">
                <my-tree v-if="dialogVisible" :isMultiple="isMultiple" @chekedList="chekedList" :label="showName"></my-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="confirmClose">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
    import {BoxCard} from '@/layout/components'
    export default {
        props: {
            userId:'',
        },
        components: {
            BoxCard,
        },
        created(){
            console.log(this.userId)
        },
        data() {
            return {
                // isDisable:false,
                form:{
                    userName:'',
                    userAccount:'',
                    userDeptId:'',
                    userSex:0,
                    userCard:'',
                    userTel:'',
                    userEmail:'',
                    socialSecurityCard:'',
                    salaryDeptId:'',
                    userEntryDate:'',
                    planChangeFormalDate:'',
                    realityChangeFormalDate:'',
                    userLeaveDate:'',
                    socialSecurityStartDate:'',
                    originalAddress:'',
                    nowAddress:'',
                    householdType:0,
                    workCity:'',
                    remark:'',
                },
                rules:rules,
                SalaryDeptlist:[],
                RankTypeOption:RankTypeOption,
                PostTypeOption:PostTypeOption,
                cascaderList: [], // 弹窗树
                showName: '', //弹窗树显示的字段名
                expandedKeys: [],//弹窗树默认显示
                checkedTreeData: [],
                dialogVisible: false,
                dialogTitle: '',
                selectDeptlist:null,
                selectRolelist:null,
                defaultProps: {
                    children: 'childList',
                    label: 'roleName'
                },
            }
        },
        mounted(){
            this.SalaryDeptList()
        },
        methods: {
            handleClose(){
                this.dialogVisible = false
            },
            chekedList(data){
                this.checkedTreeData = data;//保存用户选择的的树
            },
            confirmClose(){
            // 点击弹窗确定，重新负值
                this.dialogVisible = false
                if(this.checkedTreeData.length){
                    let leng = this.checkedTreeData.length
                    if(this.showName === "deptName"){//部门
                        let arrId = []
                        let depName = []
                        for(let i=0;i<leng;i++){
                            arrId.push(this.checkedTreeData[i].id)
                            depName.push(this.checkedTreeData[i].deptName)
                        }
                        this.form.userDeptName = depName.join("，")
                        this.form.userDeptId = arrId.join(",")
                    }else if(this.showName === "roleName"){//岗位
                        let arrId = []
                        let roleName = []
                        for(let i=0;i<leng;i++){
                            arrId.push(this.checkedTreeData[i].id)
                            roleName.push(this.checkedTreeData[i].roleName)
                        }
                        console.log(roleName)
                        // 
                        this.form.userRoleName = roleName.join("，")
                        this.form.roleIds = arrId.join(",")
                    }
                }else{
                    if(this.showName === "deptName"){
                        this.form.userDeptName = ''
                        this.form.userDeptId = ''
                    }else if(this.showName === "roleName"){
                        this.userRoleName = ''
                        this.roleIds = ''
                    }
                }
            },
            openDialog(title,showName,bool){
            // 注：bool为true则多选，为false则单选
                this.isMultiple = bool //暂无多选接口
                this.checkedTreeData = [] //重新选择的时候清空原来的数据
                this.dialogTitle = title
                this.dialogVisible = true
                this.cascaderList = this.depOptions
                // this.showName = "departmentName"
                this.showName = showName
            },
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
            getBaseInfo(d) {//获取基本信息 d是否校验
                // const self = this
                let isAll = false
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        isAll = true
                    } else {
                        return false;
                    }
                });
                return isAll ? this.form : false
            }
        }
    }
</script>
<style lang="scss" scoped>
    .pro-tree{
            /* width: 100%; */
            height: 24px;
        }
        .pro-tree .filter-tree{
            width: 100%;
            min-width: 280px;
            position: relative;
            max-height: 300px;
            overflow: auto;
            z-index: 9;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
        }
    .tevBtn{
        height: 32px !important;
        line-height: 32px !important;
    
    }
    .app-container{
    
    //   padding: 20px;
      padding-bottom: 65px;
      position: relative;
      margin-bottom: 15px;
    }
      .modelbox{
        margin-bottom: 10px;
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
            padding-right: 25px;
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
.form-area{
margin: 20px 0;
padding: 0 20px;
width: 100%;
.el-form-item {
    width: 50%;
    margin-right: 0;
    float: left;
    display: flex;
    padding-right: 30px;
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
    .el-date-editor.el-input__inner{
    width: 100%;
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
    margin: 20px 0;
// position: absolute;
// bottom: 0;
// left: 50%;
// transform: translateX(-50%);
.el-button{
    width: 97px;
    height: 32px;
    padding: 0;
//   line-height: 32px;
    margin: 0 8px 8px;
}
}
.operationtext{
color: #409EFF;
cursor:pointer;
}

</style>
          