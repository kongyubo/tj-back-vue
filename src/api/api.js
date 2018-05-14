import fetch from './config.js'

export default {

  // 作案方式
  // @param {object} params
  // @returns

   getZafs(params){
      return fetch.fetchGet('/getZafs', params);
   },

  // 作案手段大类
  // @param {object} params
  // @returns

    getZpsdfl(params){
      return fetch.fetchGet('/getZpsdfl', params);
    },

  // 作案手段大类
  // @param {object} params
  // @returns
    getZpsddl(params){
      return fetch.fetchGet('/getZpsddl', params);
    },

  // 作案手段大类
  // @param {object} params
  // @returns
    getZpsdxl(params){
      return fetch.fetchGet('/getZpsdxl', params);
    },

  // 作案手段大类
  // @param {object} params
  // @returns
    dataRegister(params){
      return fetch.fetchPost('/dataRegister', params);
    },

  // 作案手段大类
  // @param {object} params
  // @returns
    dataSearch(params){
      return fetch.fetchPost('/dataSearch', params);
    }
}
