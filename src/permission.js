import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken,getUUID} from '@/utils/auth' // 验权

//const blackList = ['/user/profile'] // 重定向白名单  
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (getToken() && getUUID()) {
      if (store.getters.name==="" && store.getters.avatar==="") {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          store.dispatch('ToggleLogin',true);
          next()
        }).catch((err) => {
            store.dispatch('ToggleLogin',false);
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || '认证失败,请重新登录');
              next({ path: '/' })
            });
        })
      } else {
        next()
      }
    NProgress.done()

  } else {

    if(to.path.indexOf('/user')==0){
      Message.error('请先登录!');
      NProgress.done();
      next({ path: '/' });

    }else{
      store.dispatch('ToggleLogin',false);
      NProgress.done()
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
