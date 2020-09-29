export default {
  /*
    * 封装公共金额转化大小写验证
    * @author
    * @date     2019-06-15
    *
    */

  proof: function check(n) {
    if (n == '') {
      return '输入不能为空'
    } else if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
      return '只能输入阿拉伯数字'
    }
  },
  /*
    * 封装公共金额转化大小写文件
    * @author   王天瑜
    * @date     2019-06-14
    *
    */
  required: function money(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
      return ''
    }

    var unit = '仟佰拾亿仟佰拾万仟佰拾圆角分'; var str = ''
    n += '00'
    var p = n.indexOf('.')
    if (p >= 0) { n = n.substring(0, p) + n.substr(p + 1, 2) }

    unit = unit.substr(unit.length - n.length)

    for (var i = 0; i < n.length; i++) { str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i) }
    return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|圆)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^圆零?|零分/g, '').replace(/圆$/g, '圆整')
  }
}
