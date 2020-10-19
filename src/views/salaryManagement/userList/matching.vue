<template>
    <div>
        <BoxCard title="配比信息" class="modelbox">
            <el-form 
                :inline="true" 
                :model="form" 
                :rules="rules" 
                ref="form"  
                label-position="right" 
                class="form-area" 
                label-width="130px" 
                slot="main">
                <!-- <el-form-item label="业务归属部门" prop="userDeptId">
                    <el-input clearable v-model="form.userDeptName" :disabled="isDisable" placeholder="请选择业务归属部门" @focus="openDialog('业务归属部门选择','deptName',false)"></el-input>
                </el-form-item> -->
                <el-form-item label="角色" prop="roleIds">
                        <el-input :disabled="isDisable"
                        v-model="form.userRoleName" 
                        placeholder="请选择角色"
                        readonly
                        @focus="budgetControl"
                      ></el-input>
                    <!-- <el-input clearable v-model="form.userRoleName" placeholder="请选择角色" @focus="openDialog('角色选择','roleName',true)"></el-input> -->
                </el-form-item>
                
                <el-form-item label="标准薪资" prop="standardSalary">
                    <el-input v-model="form.standardSalary" placeholder="请输入标准薪资" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="薪资发放比" prop="salaryGrantRatio">
                    <currency-input v-model="form.salaryGrantRatio" placeholder="请输入薪资发放比" :disabled="isDisable"></currency-input>
                </el-form-item>
                <el-form-item label="绩效占比" prop="performanceRatio">
                    <currency-input v-model="form.performanceRatio" placeholder="请输入绩效占比" :disabled="isDisable"></currency-input>
                </el-form-item>
                <el-form-item label="银行工资代发金额" prop="bankSalary">
                    <el-input v-model="form.bankSalary" placeholder="请输入银行工资代发金额" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="国家起步纳税金额" prop="stipulationStartTaxMoney">
                    <el-input v-model="form.stipulationStartTaxMoney" placeholder="请输入银行工资代发金额" :disabled="isDisable"></el-input>
                </el-form-item>
                
                <!-- <el-form-item label="岗位工资" prop="postSalary">
                    <el-input v-model="form.postSalary" placeholder="请输入岗位工资" :disabled="isDisable"></el-input>
                </el-form-item> -->
                <el-form-item label="岗位津贴" prop="postSubsidy">
                    <el-input v-model="form.postSubsidy" placeholder="请输入岗位津贴" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="其他津贴" prop="otherSubsidy">
                    <el-input v-model="form.otherSubsidy" placeholder="请输入其他津贴" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="增加项：电脑补">
                    <el-input v-model="form.addComputerSubsidy" placeholder="请输入增加项：电脑补" ></el-input>
                </el-form-item>
                <!-- <el-form-item label="增加项：其他补">
                    <el-input v-model="form.otherSubsidy" placeholder="请输入增加项：其他补" ></el-input>
                </el-form-item>
                <el-form-item label="扣款项：其他">
                    <el-input v-model="form.deductOther" placeholder="请输入扣款项：其他" ></el-input>
                </el-form-item> -->
                
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
        <!-- -->
        <el-dialog
            title="角色选择"
            :visible.sync="BudgetCompany"
            :close-on-click-modal="false"
            width="450px"
            height="300px"
            append-to-body>
            <RoleTree
                :male="male"
                @Treecheckes="Treecheckes"
                v-model="Treecheckes"
                @closeDialog="BudgetCompany = false">
            </RoleTree>
            <el-form>
                <el-form-item class="formbtn">
                    <el-button type="primary" plain @click="BudgetCompany = false">取消</el-button>
                    <el-button type="primary" plain @click="Btnsix">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
          
<script>
    import {BoxCard} from '@/layout/components'
    import {selectDeptList,selectRoleList,selectSalaryDeptList,saveOrUpdateManageUser} from '@/api/userList'
    import myTree from "./myTree"
    
    import RoleTree from "@/layout/components/Tree"
    import { rules,RankTypeOption, } from "./utils";
    export default {
            props: {
                matchingData: {
                    type: Object,
                    default: {},
                    required: true,
                    count: 0
                },
                isEdit: {
                    default: ''
                },
                isDisable: {
                    default: false
                }
            },
            components: {
                BoxCard,
                myTree,
                RoleTree
            },
            created(){
                this.form = this.matchingData
                console.log(this.matchingData.bankSalary)
            },
            computed: {
            
            },
            data() {
                return {
                    userRoleName : '',
                    roleIds: '',
                    BudgetCompany: false,
                    SalaryDeptlist: [],
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
                    form:{
                        userDeptId:'',
                        salaryDeptId:'',
                        roleIds:'',
                        stipulationStartTaxMoney:5000.00,

                    },
                    male:[],
                    rules:rules,
                    RankTypeOption:RankTypeOption,
                    PostTypeOption: [
                        {
                            typeName: '管理岗',
                            id: 0
                        },
                        {
                            typeName: '成本岗',
                            id: 1
                        },
                        {
                            typeName: '技术岗',
                            id: 2
                        }
                    ],
                   
                }
            },
            methods: {

                //预算归属公司
                budgetControl(e) {
                    this.BudgetCompany = !this.BudgetCompany;
                },
                // 预算
                Btnsix(tree) {
                   
                    
                    this.$set(this.form, "userRoleName", this.userRoleName.join());
                    this.$set(this.form, "roleIds", this.roleIds); 
                    console.log(this.form);
                    this.BudgetCompany = false;
                    
                },
                Treecheckes(tree) {
                    this.userRoleName = [];
                    let ids = [];
                    let names = [];
                    if(tree.length > 0){
                        tree.map(k => {
                            ids.push(k.id);
                            names.push(k.roleName);
                        });
                    }
                    this.userRoleName = names;
                    this.roleIds = ids.join();
                },
                Btnthree(data) {
                    this.editVisible = false;
                },


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
                        }else if(this.showName === "roleName"){//角色
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
                getMatching(d) {//获取基本信息 d是否校验
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
        
        
          //查看发票
        
        
            .invoicMain {
                width: 1160px;
                margin: 0 auto;
                font-size: 14px;
                color: #000;
              ul li {
                  list-style: none;
                  margin: 0;
                  padding: 0;
              }
        
              label {
                  color: #9c5223;
              }
            }
        
            .invoiceHeader {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        
            .headerLeft li:nth-child(1) {
                text-indent: 1em;
            }
        
            .headerLeft li img {
                width: 105px;
                height: 105px;
        
            }
            .headerMiddle{
                margin: 0 auto;
                margin-bottom: 24px;
            }
            .headerMiddle h1 {
                font-size: 32px;
                color: #9c5223;
                font-family: 'kaiti';
                margin: 5px 12px;
            }
        
            .line {
                height: 3px;
                border-top: #9c5223 1px solid;
                border-bottom: #9c5223 1px solid;
            }
            .headerRight{
                width: 100%;
                padding: 10px 0;
            }
            .headerRight li {
                float: left;
                width: 20%;
                line-height: 24px;
            }
        
            .invoiceBody {
                border: 1px solid #9c5223;
            }
        
            .userInfo {
                width: 100%;
                display: flex;
                align-items: center;
                height: 96px;
                border-bottom: 1px solid #9c5223;
            }
        
            .userInfo ul {
                width: 65%;
                margin: 0 5px;
                padding: 0;
        
            }
        
            .userInfo ul li {
                line-height: 24px;
            }
        
            .buy {
                width: 20px;
                border-right: 1px solid #9c5223;
                /* padding: 0 10px; */
                text-align: center;
                height: 100%;
                display: flex;
                align-items: center;
                color: #9c5223;
            }
        
            .password {
                width: 20px;
                /* padding: 0 10px; */
                border-right: 1px solid #9c5223;
                border-left: 1px solid #9c5223;
                text-align: center;
                height: 100%;
                display: flex;
                align-items: center;
                color: #9c5223;
            }
        
            .pwdInfo {
                flex: 1;
                padding-left: 5px;
            }
        
            .goodsInfo {
                height: 210px;
                margin: 0;
                padding: 0;
        
            }
        
            .goodsInfo li {
                display: flex;
                color: #9c5223;
                text-align: center;
            }
        
            .name {
                width: 260px;
                border-right: 1px solid #9c5223;
            }
        
            .spec {
                width: 140px;
                border-right: 1px solid #9c5223;
            }
        
            .qty {
                width: 108px;
                border-right: 1px solid #9c5223;
            }
        
            .unit,
            .taxRate {
                width: 65px;
                border-right: 1px solid #9c5223;
            }
        
            .qty,
            .price {
                width: 160px;
                border-right: 1px solid #9c5223;
            }
        
            .money {
                flex: 1;
                border-right: 1px solid #9c5223;
            }
        
            .taxAmount {
                flex: 1;
            }
        
            .GoodsTable {
                height: 210px;
                width: 100%;
                border-collapse: collapse;
            }
        
            .GoodsTable td {
                border-right: 1px solid #9c5223;
                color: #9c5223;
            }
        
            .GoodsTable tr:nth-child(1),
            .GoodsTable tr:nth-last-child(2) {
                height: 24px;
            }
        
            .GoodsTable tr:nth-last-child(1) {
                height: 34px;
            }
        
            .GoodsTable tr:nth-child(1) td {
                text-align: center;
            }
        
            .GoodsTotal {
                border-top: 1px solid #9c5223;
                border-bottom: 1px solid #9c5223;
            }
        
            .total td:nth-child(1) {
                text-align: center;
            }
        
            .invoicetFooter {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: space-between;
            }
        
            .invoicetFooter li {
                width: 25%;
            }
            .customWidth{
              width:80%;
            }
             .traval{
            height: 22px;
            margin-left: 16px;
          }
          .selectCompany{
                width: 180px !important;
            }
        </style>
          