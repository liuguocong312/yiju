import request from '@/utils/request'

export function recommend() {
  return request({
    url: '/commons/nation-list-type',
    method: 'get',
    params: {
      projectType:1
    }
  })
}
//精选
export function choicenessList() {
  const data= {
    projectTypeIds:[1],
    tagIds:[1],
    page:1,
    pageSize:10,
    projectStatus:3
  };
  return request({
    url: '/public/project-list',
    method: 'post',
    data
  })
}

//其他国家
export function sateList(id) {
  const data={
    nationId:id,
    projectTypeIds:[1],
    page:1,
    pageSize:10
  }
  return request({
    url: '/public/project-list',
    method: 'post',
    data
  })
}
