import request from '@/utils/request'

export function projectList(tagId,pageSize) {
  const data={
    term:"",
    sort:"minPriceAmt",
    direction:"DESC",
    nationCodes:[],
    projectTypeIds:[0],
    tagIds:[tagId] || [],
    categoryIds:[],
    housePriceType:"",
    housingTypes:"",
    houseType:"",
    homeGoalIds:[],
    housingFeatureIds:[],
    page:1,
    pageSize:pageSize||10
  };
  return request({
    url: '/public/project-list',
    method: 'post',
    data
  })
}

export function newslis() {
  return request({
    url: '/public/getArticleTitleHint',
    method: 'get',
    params:{
      tagId:1,
      page:1,
      pageSize:10
    }
  })
}

