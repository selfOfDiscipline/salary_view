/**
 * 注册jsbridge
 */
function initJsBridge() {
  connectWebViewJavascriptBridge(function (bridge) {
    // bridge.init(function (message, responseCallback) {
    //   console.log('message: ' + message)
    //   responseCallback(message)
    // })
  })
}

initJsBridge()

function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}

/**
 * js调用native方法
 * @param {String} name 方法名
 * @param {Object} data 参数
 * @param {*} callback 回调
 */
function callhandler(name, data, callback) {
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler(name, data, callback)
  })
}

/**
 * native调用js监听
 * @param {String} name 回调监听名
 * @param {*} callback 回调
 */
function registerhandler(name, callback) {
  connectWebViewJavascriptBridge(function (bridge) {
    bridge.registerHandler(name, function (data, responseCallback) {
      callback(data, responseCallback)
    })
  })
}

var Bridge = {
  /**
   * 文件上传
   */
  fileUpload(url) {
    return new Promise(function (resolve, reject) {
      callhandler('MaxrockySelectFile', { Url: url }, function (data) {
      })

      registerhandler('MaxrockySelectFileHandler', function (data, responseCallback) {
        resolve(data)
        responseCallback(data)
      })
    })
  },
  /**
   * 扫一扫
   * @param {int} 类型 0.打开扫描结果；1.返回扫描结果
   */
  scanQRCode(type) {
    return new Promise(function (resolve, reject) {
      callhandler('scanQRCode', { scan_type: type }, function (data) {
      })

      registerhandler('scanQRCodeHandler', function (data, responseCallback) {
        resolve(data)
        responseCallback(data)
      })
    })
  },
  /**
   * 获取定位
   */
  currentLocation() {
    return new Promise(function (resolve, reject) {
      callhandler('currentLocation', null, function (data) {
      })

      registerhandler('currentLocationHandler', function (data, responseCallback) {
        resolve(data)
        responseCallback(data)
      })
    })
  },
  /**
   * 获取手机类型
   */
  phoneModel() {
    return new Promise(function (resolve, reject) {
      callhandler('phone_model', null, function (data) {
      })

      registerhandler('phone_modelHandler', function (data, responseCallback) {
        resolve(data)
        responseCallback(data)
      })
    })
  },
  /**
   * 通讯录
   * @param {int} 类型 0.单选；1.多选
   */
  selectContacts(type) {
    return new Promise(function (resolve, reject) {
      callhandler('selectContacts', { select_contacts_type: type }, function (data) {
      })

      registerhandler('selectContactsHandler', function (data, responseCallback) {
        resolve(data)
        responseCallback(data)
      })
    })
  },
  /**
   * goto协议跳转界面
   * @param {Strinng} 地址
   */
  goTo(url,close=0) {
    return new Promise(function (resolve, reject) {
      callhandler('MaxrockyGoto', { url: url ,close:close}, function (data) {
      })

      registerhandler('MaxrockyGotoHandler', function (data, responseCallback) {
        resolve(data)
        responseCallback(data)
      })
    })
  },
  /**
   * 密码键盘
   */
  keyPad() {
    return new Promise(function (resolve, reject) {
      callhandler('MaxrockyKeypad', null, function (data) {
      })

      registerhandler('MaxrockyKeypadHandler', function (data, responseCallback) {
        resolve(data)
        responseCallback(data)
      })
    })
  },
  /**
   * 个人详情
   * @param {String} 用户名
   */
  contactDetails(mdm) {
    callhandler('MaxrockyGetPersonInfo', { personIdMdm: mdm }, function (data) {
    })
  },
  /**
   * 是否显示原生导航栏
   * @param {int} 类型 0.显示；1.隐藏
   */
  nativeHeadShow(type) {
    callhandler('MaxrockyHeadNavigateShow', { showType: type }, function (data) {
    })
  },
  /**
   * 本地图片预览
   */
  previewPic() {
    callhandler('previewpic', null, function (data) {
    })
  },
  /**
   * 网络图片预览
   * @param {String} 图片地址
   */
  previewImage(url) {
    callhandler('previewImage', { current: url }, function (data) {
    })
  },
  /**
   * 右上角按钮协议(文本)
   * @param {String} name 文本名
   * @param {String} url 地址
   */
  rightMarkText(name, url) {
    callhandler('MaxrockyRightMark', { type: 1, name: name, url: url }, function (data) {
    })
  },
  /**
   * 右上角按钮协议(图标)
   * @param {String} icon icon地址
   * @param {String} url 地址
   */
  rightMarkIcon(icon, url) {
    callhandler('MaxrockyRightMark', { type: 2, icon: icon, url: url }, function (data) {
    })
  },
  /**
   * 右上角按钮协议(list) —— 文本名和icon不可同时为空，首选文本名
   * @param {String} name 文本名
   * @param {String} icon icon地址
   * @param {Array} list [{"name": "asdasdasd", "url": "2shjdfkjsdkfl"}, {"name": "asdasdasd", "url": "2shjdfkjsdkfl"}]
   */
  rightMarkList(name, icon, list) {
    var listData = {};
    if (name) {
      listData = { type: 3, name: name, icon: icon, list: list };
    } else {
      listData = { type: 3, icon: icon, list: list };
    }
    callhandler('MaxrockyRightMark', listData, function (data) {
    })
  },

  /**
   * 强制用户下线
   */
  forceUserLogout() {
    callhandler('forceUserLogout', {}, function (data) {
    })
  },

  /**
   * 关闭当前页面
   */
  closeCurrentPage() {
    callhandler('closeCurrentPage', {}, function (data) {
    })
  },

  /**
   * 调用原生吐司
   */
  toast(content) {
    callhandler('toast', {content:content}, function (data) {
    })
  }
}
