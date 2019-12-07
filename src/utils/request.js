import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from '../router'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
});

axios.defaults.headers = {
  // "Content-Type": "application/x-www-form-urlencoded"
  "Content-Type": "application/json"
};

// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
// Do whatever you want to transform the data
  let newData = ''
  for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}];


// request拦截器
service.interceptors.request.use(config => {
  //拦截器
  if(store.getters.token)
    config.headers['Authorization']=store.getters.token;
  // if(config.method=="get" && store.getters.token){
  //     if(config.params){
  //       config.params.cookie= getToken();
  //     }else config.params={cookie:getToken()};
  // }
  //
  // if(config.method=="post" && store.getters.token){
  //   if(config.data){
  //     config.data.cookie=getToken();
  //   }else config.data={cookie:getToken()};
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */

    const res = response.data;


  if (res.header.code !== "000") {
      Message({
        message: res.header.error,
        type: 'error',
        duration: 5 * 1000
      });

      /*
      if(res.errorInf.code==-1){
          MessageBox.confirm('你的登陆状态已超时，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          })
      }*/
  
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return Promise.reject((res.header.error));
    } else {
      return response.data;
    }

  },
  error => {

    if(error.message==="Request failed with status code 401"){
      Message({
        message: "请先登录!",
        type: 'error',
        duration: 5 * 1000
      });
    }else{
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      });
    }


    // router.push('/500');
    return Promise.reject(error)
  }
);

export default service
