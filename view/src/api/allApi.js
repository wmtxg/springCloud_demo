import req from './http.js'

let proxy = process.env.apiProxy || ''

export const getOne = params => req('get', proxy + '/api/user/' + params.userId)
export const getList = params => req('get', proxy + '/api/user/list', params)

export const delOne = params => req('delete', proxy + '/api/user/delete/' + params.userId)

export const delBatch = params => req('get', proxy + '/api/getShipLocation', params)

export const addUser = params => req('post', proxy + '/api/user/add', params)
export const updateUser = params => req('post', proxy + '/api/user/update', params)
