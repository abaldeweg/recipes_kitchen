import request from '~b/api'

export const show = function (year, week) {
  return request().get('/api/plan/find', { params: { year, week } })
}

export const create = function (data) {
  return request().post('/api/plan/new', data)
}

export default { show, create }
