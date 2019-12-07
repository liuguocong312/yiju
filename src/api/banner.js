import request from '@/utils/request'

export function banner(type) {
  return request({
    url: '/public/banner/'+type,
    method: 'get',
    params: {}
  })
}

export function botSwiper(pno) {
  const data={
    term:"",
    sort:"publishTime",
    direction:"DESC",
    page:pno ,
    pageSize:10
  };
  return request({
    url: '/public/successCase-list',
    method: 'post',
    data,
  })
}
