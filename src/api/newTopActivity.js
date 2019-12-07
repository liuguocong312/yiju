import request from '@/utils/request'


export function getTopNews() {
  const config = {
    page: 1,
    pageSize: 10
  };
  return request({
    url: '/public/article-list',
    method: 'post',
    data:config
  })
}


