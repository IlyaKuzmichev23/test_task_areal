import axios from 'axios'

const actions = {
    async fetchCommentsByPeriod({ commit }, { from, to }) {
        try {
            const response = await axios.get('http://localhost:3000/analytic/comments', {
                params: {
                    dateFrom: from,
                    dateTo: to
                }
            })
            return response.data
        } catch (error) {
            console.log('Ошибка аналитики:', error)
            return []
        }
    }
}

export default {
    namespaced: true,
    actions
}