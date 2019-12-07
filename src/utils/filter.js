const vFilter={
  sellState(value) {
    if(value==3){
      return '在售'
    }else if(value==5){
      return '售罄'
    }
  },

  applyState(val){
    if(val=='CLOSED'){
      return '报名结束'
    }else if(val=='AUDIT('){
      return '审核中'
    }else if(val=='APPLYING'){
      return '报名中'
    }else if(val=='FINISHED'){
      return '已结束'
    }else if(val=='CANCELED'){
      return '已取消'
    }else{
      return '草稿'
    }}
  ,

  disTag(val){//val就是以获取的msg的值
    if(val){
      return val.replace(/<[^>]*>/g,' ');//去除文字的<...></...>标签
    }else{
      return val
    }

  },

  currency(val){
    if(val='USD'){
      return '美元'
    }else if(val='CNY'){
      return '人民币'
    }else if(val='EUR'){
      return '欧元'
    }else if(val='GBP'){
      return '英镑'
    }else if(val='DEM'){
      return '马克'
    }
  },

  orderStatus(val){
    switch(val){
      case 0:return "待付款";break;
      case 1:return "已付款";break;
      case 2:return "服务中";break;
      case 3:return "已完成";break;
      case 4:return "退款中";break;
      case 5:return "已关闭";break;
      default:return val;
    }
  },

  houseState(val){
    if(val==0){
      return '移民'
    }else if(val==1){
      return '房产'
    }else if(val==2){
      return '投资'
    }
  },

  cut(val){
    return val.slice(0,val.length-4)
  },




}

export default vFilter
