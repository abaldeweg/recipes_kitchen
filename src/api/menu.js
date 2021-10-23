import request from '~b/api'

export const show = function (plan) {
  return request().get('/api/menu/find/', { params: { plan } })
}

export const create = function (data) {
  return request().post('/api/menu/new', data)
}

export const update = function (id, data) {
  return request().put('/api/menu/' + id, data)
}

export const remove = function (id) {
  return request().delete('/api/menu/' + id)
}

export default { show, create, update, remove }
