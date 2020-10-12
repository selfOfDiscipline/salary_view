<template>
    <div class="app-container">
        <el-form :inline="true" :model="form" :rules="rules" ref="form" label-position="right" label-width="100px">
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="form.userName" placeholder="请输入姓名" disabled></el-input>
            </el-form-item>
            <el-form-item label="在职状态" prop="userRankType">
                <el-select v-model="form.userRankType" filterable placeholder="请选择在职状态" @change="RankChange"> 
                    <el-option v-for="item in RankTypeOption"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="薪资发放比" prop="salaryGrantRatio">
                <currency-input v-model="form.salaryGrantRatio" placeholder="请输入薪资发放比" ></currency-input>
            </el-form-item>
            <el-form-item label="实际转正日期" prop="realityChangeFormalDate" v-if="showDate">
                    <el-date-picker
                        v-model="form.realityChangeFormalDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="请选择实际转正日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="离职日期" prop="userLeaveDate" v-if="!showDate">
                    <el-date-picker
                        v-model="form.userLeaveDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="请选择离职日期">
                    </el-date-picker>
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
    import { updateUserRankByCondition } from '@/api/userList'
    import { rules} from "./utils";
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
                showDate:true,
                form: {
                    salaryGrantRatio:1,
                },
                RankTypeOption:[
                    {
                        typeName: '正式',
                        id: 1
                    },
                    {
                        typeName: '离职',
                        id: 2
                    }
                ],
                rules:rules,
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
            
        },
        methods: {
            RankChange(){
                if(this.form.userRankType == 1){
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
                        
                        if(this.form.RankTypeOption == 1){
                            console.log(this.form.realityChangeFormalDate);
                            
                            if(!this.form.realityChangeFormalDate){
                                this.$message({
                                    type: 'warning',
                                    message: '请选择实际转正日期!'
                                })
                                return false;
                            }
                        }else if(this.form.RankTypeOption == 2){
                            if(!this.form.userLeaveDate){
                                this.$message({
                                    type: 'warning',
                                    message: '请选择离职日期!'
                                })
                                return false;
                            }
                        }
                        let par ={...this.form}
                        delete par.userName 
                        updateUserRankByCondition(par).then(res =>{
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
            