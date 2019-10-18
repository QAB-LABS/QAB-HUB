import errHandler from './error'
import getService from './config'

const service = getService()


export default {
    searchCategories(filter, skip, limit, sort, populate) {
        return service
            .get('/categories/search', {
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
            .get('/categories', {
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
            .post('/categories', body)
            .then(res => res.data)
            .catch(errHandler)
    },

    getCategory(id) {
        return service
            .get(`/categories/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },

    updateCategory(id, body) {
        return service
            .patch(`/categories/${id}`, body)
            .then(res => res.data)
            .catch(errHandler)
    },

    deleteCategory(id) {
        return service
            .delete(`/categories/${id}`)
            .then(res => res.data)
            .catch(errHandler)
    },
}