<template>
  <div class="invoicMain">
        <div class="invoiceHeader">
          <div class="headerMiddle">
            <h1>{{invoiceDetailsData.invoiceTypeName}}</h1>
            <div class="line"></div>
          </div>
        </div>
        <div class="invoiceHeader">
          <ul class="headerRight">
            <li style="width:16%">
              <label> 发票代码： </label><span>{{invoiceDetailsData.invoiceDataCode}}</span>
            </li>
            <li style="width:16%">
              <label> 发票号码： </label><span>{{invoiceDetailsData.invoiceNumber}}</span>
            </li>
            <li style="width:16%">
              <label> 开票日期： </label><span>{{invoiceDetailsData.billingTime}}</span>
            </li>
            <li style="width:26%">
              <label> 校&nbsp;&nbsp;验&nbsp;&nbsp;码： </label><span>{{invoiceDetailsData.checkCode}}</span>
            </li>
            <li style="width:26%">
              <label>机器编号：</label><span>{{invoiceDetailsData.taxDiskCode}}</span>
            </li>
          </ul>
        </div>
        <div class="invoiceBody">
          <div class="userInfo">
            <div class="buy">购买方</div>
            <ul>
              <li>
                <label>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>
                <span>{{invoiceDetailsData.purchaserName}}</span>
              </li>
              <li>
                <label>纳税人识别号：</label><span>{{invoiceDetailsData.taxpayerNumber}}</span>
              </li>
              <li>
                <label>地址、&nbsp;&nbsp;&nbsp;电话：</label><span>{{invoiceDetailsData.taxpayerAddressOrId}}</span>
              </li>
              <li>
                <label>开户行及账号：</label><span>{{invoiceDetailsData.taxpayerBankAccount}}</span>
              </li>
            </ul>
            <div class="password">密码区</div>
            <div class="pwdInfo"></div>
          </div>
          <div>
            <table class="GoodsTable" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width: 24%">货物或应税劳务、服务名称</td>
                <td style="width: 10%">规格型号</td>
                <td style="width: 7%">单位</td>
                <td style="width: 10%">数量</td>
                <td style="width: 10%">单价</td>
                <td style="width: 16%">金额</td>
                <td style="width: 7%">税率</td>
                <td style="width: 16%; border-right: none;">税额</td>
              </tr>
              <tr v-for="item in invoiceDetailsData.invoiceDetailData" :key="item.id">
                <td style="color:#000">{{item.goodserviceName}}</td>
                <td style="color:#000">{{item.model}}</td>
                <td style="color:#000">{{item.unit}}</td>
                <td style="color:#000">{{item.number}}</td>
                <td style="color:#000">{{item.price}}</td>
                <td style="color:#000">{{item.sum}}</td>
                <td style="color:#000">{{item.taxRate}}</td>
                <td style="color:#000">{{item.tax}}</td>
              </tr>
              <tr class="total">
                <td>合计</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{invoiceDetailsData.totalAmount}}</td>
                <td></td>
                <td>{{invoiceDetailsData.totalTaxNum}}</td>
              </tr>
              <tr class="GoodsTotal">
                <td>价税合计(大写)</td>
                <td colspan="7">
                    <div style="width: 100%;display:flex">
                        <div type="text" style="width: 60%">&nbsp; ⓧ{{invoiceDetailsData.totalTaxSum | UppercaseMoney}}</div>

                        <div type="text" style="width: 30%"> （小写） ￥{{invoiceDetailsData.totalTaxSum | moneyFormit }}</div>
                    </div>
                </td>
              </tr>
            </table>
            <div class="userInfo">
              <div class="buy">销售方</div>
              <ul>
                <li>
                  <label>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>
                  <span>{{invoiceDetailsData.salesName}}</span>
                </li>
                <li>
                  <label>纳税人识别号：</label><span>{{invoiceDetailsData.salesTaxpayerNum}}</span>
                </li>
                <li>
                  <label>地址、&nbsp;&nbsp;&nbsp;电话：</label><span>{{invoiceDetailsData.salesTaxpayerAddress}}</span>
                </li>
                <li>
                  <label>开户行及账号：</label><span>{{invoiceDetailsData.salesTaxpayerBankAccount}}</span>
                </li>
              </ul>
              <div class="password">备注</div>
              <div class="pwdInfo"></div>
            </div>
          </div>
          <!-- <ul class="goodsInfo">
              <li>
                  <div class="name">货物或应税劳务、服务名称 </div>
                  <div class="spec"> 规格型号 </div>
                  <div class="unit"> 单位 </div>
                  <div class="qty"> 数量</div>
                  <div class="price"> 单价 </div>
                  <div class="money"> 金额 </div>
                  <div class="taxRate">税率 </div>
                  <div class="taxAmount">税额 </div>
              </li>
          </ul> -->
        </div>
        <ul class="invoicetFooter">
          <li>
            <label>收款人：</label>
          </li>
          <li>
            <label>复核：</label>
          </li>
          <li>
            <label>开票人：</label>
          </li>
          <li>
            <label>销售方：（章）</label>
          </li>
        </ul>
      </div>
</template>

<script>
  import {BoxCard, Pagination} from '@/layout/components'
  import {InvoiceInfo} from '@/api/payment'
  export default {
    props: {
        ids:'',
    },
    created() {
     this.invoiceDetails()
    },

    data() {
      return {
        invoiceDetailsData: {
          invoiceDetailData: []
        }
      }
    },
    components: {
      BoxCard,
      Pagination
    },
    methods: {
      // 发票详情
      invoiceDetails() {
        InvoiceInfo({
          id: this.ids
        }).then(res => {
          this.invoiceDetailsData = res.result
        })
      }

    }
  }
</script>
<style lang="scss" scoped>

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

  .headerMiddle {
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

  .headerRight {
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

  .customWidth {
    width: 80%;
  }

</style>
