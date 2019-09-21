import { axios } from '@/utils/request'

export const fetchBarData = () => {
  return axios({
    url: '/bar-data',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
