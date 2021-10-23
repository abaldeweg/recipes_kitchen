import request from '@/api'

export const list = function () {
  return request().get('/api/meal/')
}

export const show = function (meal) {
  return request().get('/api/meal/' + meal)
}

export const create = function (data) {
  return request().post('/api/meal/new', data)
}

export const update = function (meal, data) {
  return request().put('/api/meal/' + meal, data)
}

export default { list, show, create, update }
