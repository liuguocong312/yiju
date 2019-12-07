import request from '@/utils/request'

export function getCountry(type) {
  return request({
    url: '/commons/nationListByContinentId-type',
    method: 'get',
    params: {
      continentId:type,
      projectType:1,
    }
  })
}

export function nationList() {
  return request({
    url: '/commons/nation-list-type',
    method: 'get',
    params:{
      projectType:1
    }
  })
}

export function getCitys(id) {
  return request({
    url: '/commons/nationCityListByPid',
    method: 'get',
    params: {
      pid:id
    }
  })
}


