let base = 'http://new-fkdev.seedland.cc:8081'
function axiosPostRequst(url,data) {
  let result = axios({
    method: 'post',
    url:base+ url,
    data: data,
    // transformRequest:[function(data){
    //   let ret = '';
    //   for(let i in data){
    //     ret += encodeURIComponent(i)+'='+encodeURIComponent(data[i])+"&";
    //   }
    //   return ret;
    // }],
    header:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    xhrFields: {
      withCredentials: true // 前端设置是否带cookie
    },

  }).then(resp=> {
    return resp.data;
  }).catch(error=>{
    return "exception="+error;
  });
  return result;
}

//get请求
function axiosGetRequst(url,params) {
  var result = axios({
    method: 'get',
    url:base+ url,
    params: params,
    xhrFields: {
        withCredentials: true // 前端设置是否带cookie
    },
  }).then(function (resp) {
    return resp.data;
  }).catch(function (error) {
    return "exception=" + error;
  });
  return result;
}
function axiosGetRequstpar(url, params) {
    // return new Promise((resolve, reject) => {
    //     axios.post(url, {
    //         params: params
    //     },
        
    //     ).then(res => {
    //         resolve(res.data)
    //     }).catch(err => {
    //         reject(err.data)
    //     })
    // })
    let result = axios({
        method: 'post',
        url: base+url,
        params: params,
        transformRequest:[function(params){
          let ret = '';
          for(let i in params){
            ret += encodeURIComponent(i)+'='+encodeURIComponent(data[i])+"&";
          }
          return ret;
        }],
        header:{
          'Content-Type':'application/x-www-form-urlencoded'
        },
        xhrFields: {
          withCredentials: true // 前端设置是否带cookie
        },
    
      }).then(resp=> {
        return resp.data;
      }).catch(error=>{
        return "exception="+error;
      });
      return result;
}