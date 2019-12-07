import request from '@/utils/request'

export function protocol() {
  return request({
    url: '/commons/immigrantAgreement',
    method: 'get',
  })
}
