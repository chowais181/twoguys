
export const fetch = async ({ api, params, commit_key }, commit) => {
    try {
      const response = await api.get(params)

      if (response) {
        const value = response.data

        console.info('items', value)

        if (commit_key) commit(commit_key, value);
      }

      return response

    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
}

export const create = async ({ api, data, commit_key }, commit) => {
    try {
      const response = await api.add(data)

      if (response) {
        const value = response.data

        console.info('create', value)

        if (commit_key) commit(commit_key, value);
      }

      return response

    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
}

export const update = async ({ api, data, commit_key }, commit) => {
    try {
      const response = await api.update(data)

      if (response) {
        const value = response.data

        console.info('update', value)

        if (commit_key) commit(commit_key, value);
      }

      return response

    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
}

export const remove = async ({ api, id, commit_key }, commit) => {
    try {
      const response = await api.remove(id)

      if (response) {

        console.info('remove', id)

        if (commit_key) commit(commit_key, id);
      }

      return response

    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
}

export const find = async ({ api, id, commit_key }, commit) => {
    try {
      const response = await api.find(id)

      if (response) {
        const value = response.data

        console.info('find', value)

        if (commit_key) commit(commit_key, value);
      }

      return response

    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
}