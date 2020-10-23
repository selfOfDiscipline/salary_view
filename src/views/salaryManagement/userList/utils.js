export const rules = {//单据类型
    userName:[
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    userCard:[
        { required: true, message: '请输入证件号', trigger: 'blur' },
    ],
    userTel:[
        { required: true, message: '请输入手机号', trigger: 'blur' },
    ],
    userAccount:[
        { required: true, message: '请输入用户账号', trigger: 'blur' },
    ],
    // userEmail:[
    //     { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    // ],
    userSex:[
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    // originalAddress:[
    //     { required: true, message: '请输入户籍所在地', trigger: 'blur' },
    // ],
    // nowAddress:[
    //     { required: true, message: '请输入现居住地', trigger: 'blur' },
    // ],
    userEntryDate:[
        { required: true, message: '请选择入职日期', trigger: 'blur' },
    ],
    // planblurFormalDate:[
    //     { required: true, message: '请选择预计转正日期', trigger: 'blur' },
    // ],
    // realityblurFormalDate:[
    //     { required: true, message: '请选择实际转正日期', trigger: 'blur' },
    // ],
    // userLeaveDate:[
    //     { required: true, message: '请选择离职日期', trigger: 'blur' },
    // ],
    socialSecurityStartDate:[
        { required: true, message: '请选择社保缴纳日期', trigger: 'blur' },
    ],
    householdType:[
        { required: true, message: '请选择户口类型', trigger: 'blur' },
    ],
    salaryBankCard:[
        { required: true, message: '请输入代发银行卡号 ', trigger: 'blur' },
    ],
    salaryBankOpen:[
        { required: true, message: '请输入代发银行开户行 ', trigger: 'blur' },
    ],
    salaryBankOpenName:[
        { required: true, message: '请输入代发银行开户行名称 ', trigger: 'blur' },
    ],
    salaryBankOpenProvince:[
        { required: true, message: '请输入代发银行开户行省份 ', trigger: 'blur' },
    ],
    salaryBankOpenCity:[
        { required: true, message: '请输入代发银行开户行城市 ', trigger: 'blur' },
    ],
    // otherBankCard:[
    //     { required: true, message: '请输入他行卡号 ', trigger: 'blur' },
    // ],
    // otherBankOpen:[
    //     { required: true, message: '请输入他行开户行 ', trigger: 'blur' },
    // ],
    // otherBankOpenName:[
    //     { required: true, message: '请输入他行开户行名称 ', trigger: 'blur' },
    // ],
    // otherBankOpenProvince:[
    //     { required: true, message: '请输入他行开户行省份 ', trigger: 'blur' },
    // ],
    // otherBankOpenCity:[
    //     { required: true, message: '请输入他行开户行城市 ', trigger: 'blur' },
    // ],
    socialSecurityCard:[
        { required: true, message: '请输入社保卡号 ', trigger: 'blur' },
    ],
    // remark:[
    //     { required: true, message: '请输入备注', trigger: 'blur' },
    // ],
    


    userDeptId:[
        { required: true, message: '请输入业务归属部门', trigger: 'change' },
    ],
    salaryDeptId:[
        { required: true, message: '请输入薪资归属部门', trigger: 'blur' },
    ],
    userRoleIds:[
        { required: true, message: '请输入岗位', trigger: '' },
    ],
    userPostType:[
        { required: true, message: '请输入岗位类型', trigger: 'blur' },
    ],
    userRankType:[
        { required: true, message: '请输入在职状态', trigger: 'blur' },
    ],
    standardSalary:[
        { required: true, message: '请输入标准薪资', trigger: 'blur' },
    ],
    salaryGrantRatio:[
        { required: true, message: '请输入薪资发放比', trigger: 'blur' },
    ],
    // performanceRatio:[
    //     { required: true, message: '请输入绩效占比', trigger: 'blur' },
    // ],
    bankSalary:[
        { required: true, message: '请输入税前工资', trigger: 'blur' },
    ],
    postSalary:[
        { required: true, message: '请输入岗位工资', trigger: 'blur' },
    ],
    postSubsidy:[
        { required: true, message: '请输入岗位津贴', trigger: 'blur' },
    ],
    otherSubsidy:[
        { required: true, message: '请输入 基本工资', trigger: 'blur' },
    ],
    

    yilBaseMoney:[
        { required: true, message: '请输入医疗基数', trigger: 'blur' },
    ],
    gongsBaseMoney:[
        { required: true, message: '请输入工伤基数', trigger: 'blur' },
    ],
    shengyBaseMoney:[
        { required: true, message: '请输入生育基数', trigger: 'blur' },
    ],
    yilPersonRatio:[
        { required: true, message: '请输入医疗个人系数', trigger: 'blur' },
    ],
    yilCompanyRatio:[
        { required: true, message: '请输入医疗公司系数', trigger: 'blur' },
    ],
    yilPersonAddMoney:[
        { required: true, message: '请输入医疗个人另缴金额', trigger: 'blur' },
    ],
    yilCompanyAddMoney:[
        { required: true, message: '请输入医疗公司另缴金额', trigger: 'blur' },
    ],

    gongsPersonRatio:[
        { required: true, message: '请输入工伤个人系数', trigger: 'blur' },
    ],
    gongsCompanyRatio:[
        { required: true, message: '请输入工伤公司系数', trigger: 'blur' },
    ],
    shengyPersonRatio:[
        { required: true, message: '请输入生育个人系数', trigger: 'blur' },
    ],
    shengyCompanyRatio:[
        { required: true, message: '请输入生育公司系数', trigger: 'blur' },
    ],
    yanglBaseMoney:[
        { required: true, message: '请输入养老基数', trigger: 'blur' },
    ],
    shiyBaseMoney:[
        { required: true, message: '请输入失业基数', trigger: 'blur' },
    ],
    yanglPersonRatio:[
        { required: true, message: '请输入养老个人系数', trigger: 'blur' },
    ],
    yanglCompanyRatio:[
        { required: true, message: '请输入养老公司系数', trigger: 'blur' },
    ],
    shiyPersonRatio:[
        { required: true, message: '请输入失业个人系数', trigger: 'blur' },
    ],
    shiyCompanyRatio:[
        { required: true, message: '请输入失业公司系数', trigger: 'blur' },
    ],

    otherBaseMoney:[
        { required: true, message: '请输入其他险基数', trigger: 'blur' },
    ],
    otherPersonRatio:[
        { required: true, message: '请输入其他险个人系数', trigger: 'blur' },
    ],
    otherCompanyRatio:[
        { required: true, message: '请输入其他险公司系数', trigger: 'blur' },
    ],
    
    housingFundBaseMoney:[
        { required: true, message: '请输入公积金基数', trigger: 'blur' },
    ],
    housingFundPersonRatio:[
        { required: true, message: ' 请输入公积金个人系数', trigger: 'blur' },
    ],
    housingFundCompanyRatio:[
        { required: true, message: ' 请输入公积金公司系数', trigger: 'blur' },
    ],
    stipulationStartTaxMoney:[
        { required: true, message: ' 请输入国家规定纳税起步金额', trigger: 'blur' },
    ],
    childEducation:[
        { required: true, message: '请输入子女教育', trigger: 'blur' },
    ],
    continueEducation:[
        { required: true, message: '请输入继续教育', trigger: 'blur' },
    ],
    homeLoanInterest:[
        { required: true, message: '请输入住房贷款利息', trigger: 'blur' },
    ],
    homeRents:[
        { required: true, message: '请输入住房租金', trigger: 'blur' },
    ],
    supportParents:[
        { required: true, message: '请输入赡养老人', trigger: 'blur' },
    ],
    otherDeduct:[
        { required: true, message: '请输入其他扣除', trigger: 'blur' },
    ],



    totalIncomeMoney:[
        { required: true, message: '请输入累计收入金额', trigger: 'blur' },
    ],
    totalTaxableSelfMoney:[
        { required: true, message: '请输入累计应纳税所得额', trigger: 'blur' },
    ],
    totalAlreadyTaxableMoney:[
        { required: true, message: '请输入累计已纳税额', trigger: 'blur' },
    ],
    totalDeductMoney:[
        { required: true, message: '请输入累计减除费用金额', trigger: 'blur' },
    ],
    totalSpecialDeductMoney:[
        { required: true, message: '请输入累计专项附加扣除金额', trigger: 'blur' },
    ],
    totalChildEducation:[
        { required: true, message: '请输入累计子女教育扣除', trigger: 'blur' },
    ],
    totalContinueEducation:[
        { required: true, message: '请输入累计继续教育扣除', trigger: 'blur' },
    ],
    totalHomeLoanInterest:[
        { required: true, message: '请输入累计住房贷款利息扣除', trigger: 'blur' },
    ],
    totalHomeRents:[
        { required: true, message: '请输入累计住房租金扣除', trigger: 'blur' },
    ],
    totalHomeRents:[
        { required: true, message: '请输入累计赡养老人扣除', trigger: 'blur' },
    ],
    totalOtherDeduct:[
        { required: true, message: '请输入累计专项扣除（个人年度社保+公积金）', trigger: 'blur' },
    ]
//     <!-- /**
//     * 累计继续教育扣除
//     */
//    private BigDecimal totalContinueEducation;
//    /**
//     * 累计住房贷款利息扣除
//     */
//    private BigDecimal totalHomeLoanInterest;
//    /**
//     * 累计住房租金扣除
//     */
//    private BigDecimal totalHomeRents;
//    /**
//     * 累计赡养老人扣除
//     */
//    private BigDecimal totalSupportParents;
//    /**
//     * 累计专项扣除（个人年度社保+公积金）
//     */
//    private BigDecimal totalOtherDeduct; -->
}
export const RankTypeOption= [
    {
        typeName: '试用期',
        id: 0
    },
    {
        typeName: '正式',
        id: 1
    },
    {
        typeName: '离职',
        id: 2
    }
]

export const PostTypeOption= [
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
]