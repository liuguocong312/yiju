import request from '@/utils/request'

export function activityDetail(aid) {

  return request({
    url: '/public/activity-details',
    method: 'get',
    params:{
      id:aid
    }
  })
}



