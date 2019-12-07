import request from '@/utils/request'

export function inviteCode() {
  return request({
    url: '/user/inviteCode',
    method: 'get',
  })
}

export function InvitationList(pno) {
  return request({
    url: '/user/myInvitationList/3',
    method: 'get',
    params:{
      page:pno,
      pageSize:5
    },
  })
}








