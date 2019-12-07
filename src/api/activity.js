import request from '@/utils/request'

export function activityList(data) {
  return request({
    url: '/public/activity-list',
    method: 'post',
    data
  })
}

//是否收藏

export function hasCollect(activityId) {
  return request({
    url: '/user/has-favorite-activity',
    method: 'get',
    params:{activityId}
  })
}

//收藏
export function Collect(activityId) {
  return request({
    url: '/user/fav-activity',
    method: 'get',
    params:{activityId}
  })
}
//取消收藏

export function cancelCollect(activityId) {
  return request({
    url: '/user/cancel-fav-activity',
    method: 'get',
    params:{activityId}
  })
}

//收藏列表
export function collectList(page) {
  return request({
    url: '/user/my-favorite-activity',
    method: 'get',
    params:{page,pageSize:10}
  })
}

//报名
export function applyActivity(params) {
  return request({
    url: '/user/apply-activity',
    method: 'post',
    data:params
  })
}
