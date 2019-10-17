import errHandler from './error'
import getService from './config'

const service = getService('categories')


export default {
    searchCategories(filter, skip, limit, sort, populate) {
        return service
            .get('/search', {
                params: {
                    filter: new RegExp(filter, "gi"),
                    skip,
                    limit,
                    sort,
                    populate
                }
            })
            .then(res => res.data)
            .catch(errHandler)
    },

    getCategories(skip, limit, populate) {
        return service
            .get('/', {
                params: {
                    skip,
                    limit,
                    populate
                }
            })
            .then(res => res.data)
            .catch(errHandler)
    },

    addCategory(body) {
        return service
            .post('/', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getCategory(id) {
        return service
            .get(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateCategory(id, body) {
        return service
            .patch(`/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteCategory(id) {
        return service
            .delete(`/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}