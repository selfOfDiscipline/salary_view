export const rules = {//单据类型
    
    flowEnCode:[
        { required: true, message: '请输入流程编号', trigger: 'blur' },
    ],
    flowName:[
        { required: true, message: '请输入流程名称', trigger: 'blur' },
    ],
    flowType:[
        { required: true, message: '请输入流程类型', trigger: 'blur' },
    ],
    flowSalaryDeptId:[
        { required: true, message: '请选择薪资归属部门', trigger: 'blur' },
    ],
    flowRoleId:[
        { required: true, message: '请选择适用角色', trigger: 'blur' },
    ],
    flowRoleName:[
        { required: true, message: '请选择状态', trigger: 'blur' },
    ]
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