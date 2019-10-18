import errHandler from './error'
import getService from './config'

const service = getService()


export default {
    searchCategories(filter, skip, limit, sort, populate) {
        return service
            .get('/api/categories/search', {
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
            .get('/api/categories', {
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
            .post('/api/categories', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getCategory(id) {
        return service
            .get(`/api/categories/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateCategory(id, body) {
        return service
            .patch(`/api/categories/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteCategory(id) {
        return service
            .delete(`/api/categories/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}