import request from '@/utils/request'

export function getProjectCondition() {
  return request({
    url: '/commons/getProjectCondition',
    method: 'get',
    params: {}
  })
}



export function getNation(id) {
  return request({
    url: '/commons/nation-list-type',
    method: 'get',
    params: {
      projectType:id
    }
  })
}

export function getCityByPid(pid) {
  return request({
    url: '/commons/nationCityListByPid',
    method: 'get',
    params: {pid}
  })
}



export function list(data) {
  return request({
    url: '/public/project-list',
    method: 'post',
    data
  })
}


export function priceList() {
  return request({
    url: '/commons/getHousePriceType',
    method: 'get',
  })
}

export function typeList() {
  return request({
    url: '/commons/getProjectCategory',
    method: 'get',
    params:{
      projectType:0
    }
  })
}





