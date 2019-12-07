const getters = {
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  showLogin:state=>state.commn.showLogin,
  hideReg:state=>state.commn.hideReg,
  isLogin:state=>state.commn.isLogin,
  uuid:state=>state.user.uuid
};
export default getters
