import request from '@/utils/request'

export function info() {
  return request({
    url: '/commons/article-tag-list',
    method: 'get',
    params: {}
  })
}

export function infoList(tagId,page=1) {
  const data = {
    term:"",
    sort:"createTime",
    direction:"DESC",
    tagIds:[tagId],
    page:page,
    pageSize:10
  }
  return request({
    url: '/public/article-list',
    method: 'post',
    data
  })
}

export function activityList() {
  const data = {
    term:"",
    sort:"activityTime",
    direction:"DESC",
    tagIds:[1],
    page:1,
    pageSize:10
  }
  return request({
    url: '/public/activity-list',
    method: 'post',
    data
  })
}

export function getArticleDetail(articleId,tagId) {
  return request({
    url: '/public/getArticleDetailPage',
    method: 'get',
    params:{
      articleId,tagId
    }
  })
}

//获取成功案例详情

export function getSuccessCaseDetail(id) {
  return request({
    url: '/public/getSuccessCaseDetail',
    method: 'get',
    params:{
      caseId:id
    }
  })
}





export function projectdetails(id) {
  return request({
    url: '/public/project-details',
    method: 'get',
    params:{
      id
    }
  })
}

export function getProjectCondition() {
  return request({
    url: '/commons/getProjectCondition',
    method: 'get',
  })
}

//收藏文章与取消

export function farticle(articleId) {
  return request({
    url: '/user/favorite-article',
    method: 'get',
    params:{articleId}
  })
}


//收藏文章列表

export function farticlelist(page) {
  return request({
    url: '/user/my-favorite-article',
    method: 'get',
    params:{
      page,
      pageSize:10
    }
  })
}
