/**
 * 
 */
var travel = 'http://test123.tahoecndemo.com:8080/fk-web/';

$(document).ready(function () {
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.init(function (message, responseCallback) {
            console.log('默认接收服务端数据： ' + message);
            var responseData = '默认接收服务端数据，回传数据给页面';
            responseCallback(responseData);
        });
        bridge.registerHandler("MaxrockyKeypadHandler", function (data, responseCallback) {
            console.log('指定接收服务端数据： ' + data);
            log(data);
            var responseData = '指定接收服务端数据，回传数据给页面';
            responseCallback(responseData);
        });
        bridge.registerHandler("MaxrockyRightMarkHandler", function (data, responseCallback) {
            console.log('指定接收服务端数据： ' + data);
            var responseData = '指定接收服务端数据，回传数据给页面';
            responseCallback(responseData);
        });
    });
});

function right1(){
    window.WebViewJavascriptBridge.callHandler(
        'MaxrockyRightMark',
        {'type': 1,'name':'文字','url':'http://api.tahoecn.com:8081/1.html'},
        function (responseData) {
            console.log(responseData);
        }
    );
}

function right2(){
    window.WebViewJavascriptBridge.callHandler(
        'MaxrockyRightMark',
        {'type': 2,'icon':'http://api.tahoecn.com:8081/img.png','url':'http://api.tahoecn.com:8081/1.html'},
        function (responseData) {
            console.log(responseData);
        }
    );
}

function right3(){
    window.WebViewJavascriptBridge.callHandler(
        'MaxrockyRightMark',
        {'type': 3,'name':'改变',
            'list':[{'name':'文字1','url':'http://api.tahoecn.com:8081/1.html'},
                {'name':'文字2','url':'http://api.tahoecn.com:8081/2.html'},
                {'name':'文字3','url':'http://api.tahoecn.com:8081/3.html'}]},
        function (responseData) {
            console.log(responseData);
        }
    );
}

function Keypad(){
    window.WebViewJavascriptBridge.callHandler(
        'MaxrockyKeypad',
        function (responseData) {
            console.log(responseData);
        }
    );
}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge);
        }, false);
    }
}

function log(data) {
    document.getElementById("log").innerHTML = data;
}