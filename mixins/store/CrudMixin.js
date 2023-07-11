
export const fetch = async(params, commit) => {
  try {
    const response = _.has(params, 'data') ? await params.api.get(params.data.query) : await params.api.get()

    if(response){
      const value = _.has(params, 'data.item_key') ? response.data[params.data.item_key] : response.data

      console.info('items', response)

      _.has(params, 'data.commit_key') ? commit(params.data.commit_key, value) : commit('SET_ITEMS', value)

      return response
    }

    return null
    
  } catch (e) {
    console.error(e)
    return e
  }
}

export const create = async (params, commit) => {
  try {
    const response = _.has(params, 'data') ? await params.api.add(params.data.query, params.data.item) : await params.api.add(params.data.item)

    if(_.has(params, 'data.unset_item')){
      return response
    }

    if(response.success){
      commit('SET_ITEM', response.item)
    }

    return response
    
  } catch (e) {
    console.error(e)
    return e
  }
}

export const update = async (api, data, commit) => {
  try {
    const response = await api.update(data)

    if(response){
      commit('UPDATE_ITEM', response.data)
    }

    return response
    
  } catch (e) {
    console.error(e)
    return error
  }
}

export const remove = async (api, id, commit) => {
  try {
    const response = await api.remove(id)

    if(response.data.success){
      commit('REMOVE_ITEM', id)
    }

    return response
    
  } catch (e) {
    console.error(e)
    return error
  }
}

export const find = async (api, id, isSetValue, commit) => {
  try {
    const response = await api.find(id)

    if(response){
      if(isSetValue){
        commit('SET_FIND', response.data);
      }
      return response.data
    }

    return null
    
  } catch (e) {
    console.error(e)
    return e
  }
}