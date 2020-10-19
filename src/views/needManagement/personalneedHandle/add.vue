<template>
        <div class="app-container">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-position="right" label-width="100px">
                <el-form-item label="岗位类型" prop="userPostType">
                    <el-select v-model="form.userPostType" filterable placeholder="请选择在职状态" @change="RankChange"> 
                        <el-option v-for="item in PostTypeOption"
                            :key="item.id"
                            :label="item.typeName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="薪资归属部门"  v-if="showDate">
                    <el-select v-model="form.salaryDeptId" filterable placeholder="请选择薪资归属部门" :disabled="isDisable">
                        <el-option v-for="item in SalaryDeptlist"
                            :key="item.id"
                            :label="item.salaryDeptName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                
                
            </el-form>
            <div class="formbtn" style="width:100%;margin-top: 50px;text-align: center;">
                    <el-button type="primary" plain @click="callBack">取消</el-button>
                    <el-button type="primary" plain @click="onSubmit">确定</el-button>
                </div>
        </div>
    </template>
<script>
import { BoxCard } from '@/layout/components'
import {startSalaryFlow} from '@/api/personalneed'
import {selectDeptList,selectRoleList,selectSalaryDeptList,saveOrUpdateManageUser} from '@/api/userList'
export default {
    props: {
        positiveId:'',
        positiveName:"",
    },
    name: 'Add',
    components: {
        BoxCard,
    },
    data(){
        return{
            SalaryDeptlist:[],
            showDate:false,
            form: {
            },
            PostTypeOption:[
                {
                    typeName: '管理岗',
                    id: 0
                },
                {
                    typeName: '技术岗',
                    id: 1
                }
            ],
            rules:{//单据类型
                userName:[
                    { required: true, message: '请选择岗位类型', trigger: 'blur' },
                ],
            },
            selectRoletlist:[],
            selectDeptlist:[],
        }
    },
    computed:{
    },
    created(){
        this.form.id = this.positiveId
        this.form.userName = this.positiveName;
        console.log( this.form)
    },
    mounted() {
        this.SalaryDeptList()
    },
    methods: {
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
        RankChange(){
            if(this.form.userPostType == 1){
                this.showDate = true;
            }else{
                this.showDate = false;
            }
            // for (const iterator of this.RankTypeOption) {
            //     if(iterator.id == e){
            //         this.form.salaryDeptName = iterator.salaryDeptName
            //     }
            // }
            // for
            // RankTypeOption
        },
        callBack() {
            this.$emit('closeDialog');
            this.handleCloseBindWarnStandard()
        },
        handleCloseBindWarnStandard() {
            this.$emit("closeBindWarnStandard");
        },
        
        depChange(e){
            for (const iterator of this.selectDeptlist) {
                if(iterator.id == e){
                    this.form.salaryDeptName = iterator.salaryDeptName
                }
            }
        },
        
        roleChange(e){
            for (const iterator of this.selectRoletlist) {
                if(iterator.id == e){
                    this.form.userName = iterator.userName
                    this.form.userAccount = iterator.userAccount
                }
            }
        },
        onSubmit(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let salaryDeptId = ''
                    if(this.form.userPostType == 1){
                        salaryDeptId = Number(this.form.salaryDeptId)
                        if(!this.form.salaryDeptId){
                            this.$message({
                                type: 'warning',
                                message: '请选择薪资部门!'
                            })
                            return false;
                        }
                    }else{
                        salaryDeptId =null;
                    }
                   
                    let par = {
                        salaryDeptId:salaryDeptId,
                        userPostType:this.form.userPostType,
                    }
                    // let par ={...this.form};
                    console.log(par)
                    
                    startSalaryFlow(par).then(res =>{
                        console.log(res);
                        this.$emit('reload')
                        this.callBack()
                        
                    })
                } else {
                    return false;
                }
            });
        }
        
    }
    
    }
</script>
<style lang="scss" scoped>
    .el-form-item__content{
        width: 220px;
    }
</style>
