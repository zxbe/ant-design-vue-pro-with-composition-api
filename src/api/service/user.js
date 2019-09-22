import { axios } from '@/utils/request'

export function getInfo () {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function fetchUserAccountApp () {
  return axios({
    url: '/user/account/app',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function fetchUserAccountArticle () {
  return axios({
    url: '/user/account/article',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
