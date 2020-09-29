<template>
        <div class="mainconbox">
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="正式员工" name="Official">
                    <Official/>
                </el-tab-pane>
                <el-tab-pane label="上月入职" name="Induction">
                    <Induction/>
                </el-tab-pane>
                <el-tab-pane label="上月转正" name="Positive">
                    <Positive/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </template>
    <script>
   
    import { BoxCard } from '@/layout/components'
    import Official from './Official'
    import Induction from './induction'
    import Positive from './positive'

    export default {
        name:'listDetails',
        components:{
            BoxCard,
            Official,
            Induction,
            Positive
            },
        data () {
            return {
                activeName: 'Official',
            }
        },
        computed:{
        
        },
        watch:{
           
        },
        mounted() {
            
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
        }
    }
    </script>
    
    <style lang="scss" scoped>
        #pageFooter {
            padding-right: 129px;
        }
        
        .form-area{
            padding: 0 !important;
        }
          .modelbox{
            margin-bottom: 10px;
            background: rgba(255,255,255,0.80);
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            border-radius: 4px;
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
                padding-right: 15px;
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
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            .el-button{
              width: 97px;
              height: 32px;
              padding: 0;
              line-height: 32px;
              margin: 0 8px 8px;
            }
          }
          .operationtext{
            color: #409EFF;
            cursor:pointer;
          }
        // .el-dialog__wrapper{
        //     z-index: 3000 !important;
        // }
        .btn-area{
            width: 220px;
            margin: 0 auto;
            margin-top: 15px;
        }
        .redSide {
                width: 4px;
            height: 16px;
            background: #2395f7;
            display: inline-block;
            position: relative;
            left: -6px;
            top: 3px;
            border-radius: 2px;
        
        }
        .ml-10 {
            margin-left: 10px;
        }
        .fw-bd {
            font-weight: 700;
        }
        .ft-14 {
                font-family: PingFangSC-Medium;
            display: inline-block;
            // padding-left: 5px;
            font-size: 14px;
            color: #333333;
            font-weight: 700;
            line-height: 1;
        }
        .el-dialog__header {
            padding: 20px 20px 20px 20px;
        }
        .mainconbox{
        //   padding:0 15px;
          .el-button{
            height: 32px;
            // width: 97px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            padding: 0 26px;
            font-size: 12px;
          }
          .el-form-item {
            // width: 50%;
            margin-right: 0;
            // float: left;
            // display: flex;
            padding-right: 25px;
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
          }
          .topTool{
            min-height: 54px;
            border-radius: 4px;
            background-color: #ffffff;
            overflow: hidden;
        
            // padding: 10px 15px;
            // margin-bottom: 10px;
            .toolform{
              transition: max-height 1s;
              overflow: hidden;
            }
            .btn{
              overflow: hidden;
            //   padding-left: 26px;
              margin-top: 10px;
            //   .searchtext{
            //     padding-right: 16px;
            //     font-size: 12px;
            //     color: #1660A3;
            //   }
            }
          }
          .formbox{
            border-radius: 4px;
            margin:7px 0;
            background-color: #ffffff;
            .btn{
                  overflow: hidden;
            /* height: 83px; */
            padding: 10px 15px;
              .btnwrap{
                float: right;
              }
            }
            // .table-area{
            //   min-height: 500px;
        
            // }
          }
          .pagination{
            padding: 20px;
            overflow: hidden;
            .el-pagination{
              float: right;
              margin-right: 129px;
            }
          }
          .allheight{
            height: auto;
            padding: 10px 15px;
            max-height: 300px;
            font-size: 0;
          }
          .oneheight{
            height:54px;
            overflow: hidden;
            padding: 10px 15px;
            max-height: 60px;
            font-size: 0;
          }
        }
        
        </style>
    
    