import axios from 'axios'

const state = {
    list: []
}

const mutations = {
    SET_ARTICLES(state, articles) {
        state.list = articles
    },

    ADD_ARTICLE(state, article) {
        state.list.push(article)
    },

    UPDATE_ARTICLE(state, updatedArticle) {
        const index = state.list.findIndex(a => a.id === updatedArticle.id)
        if (index !== -1) {
            state.list[index] = updatedArticle
        }
    },

    DELETE_ARTICLE(state, id) {
        state.list = state.list.filter(a => a.id !== id)
    }
}

const actions = {
    async loadArticles({ commit }) {
        try {
            const response = await axios.get('http://localhost:3000/articles')
            commit('SET_ARTICLES', response.data)
        } catch (error) {
            console.log('Не удалось загрузить статьи')
        }
    },

    async createArticle({ commit }, articleData) {
        try {
            const response = await axios.post('http://localhost:3000/article/', articleData)
            commit('ADD_ARTICLE', response.data)
        } catch (error) {
            console.log('Не удалось создать статью')
        }
    },

    async updateArticle({ commit }, article) {
        try {
            const response = await axios.patch(`http://localhost:3000/article/${article.id}`, article)
            commit('UPDATE_ARTICLE', response.data)
        } catch (error) {
            console.log('Не удалось обновить статью')
        }
    },

    async deleteArticle({ commit }, id) {
        try {
            await axios.delete(`http://localhost:3000/article/${id}`)
            commit('DELETE_ARTICLE', id)
        } catch (error) {
            console.log('Не удалось удалить статью')
        }
    },

    async fetchAnalyticComments({ commit }, { from, to }) {
        try {
            const response = await axios.get('http://localhost:3000/analytic/comments', {
                params: {
                    dateFrom: from,
                    dateTo: to
                }
            })
            return response.data  // возвращаем данные, не кладём в state (это разовая аналитика)
        } catch (error) {
            console.log('Ошибка аналитики')
            return []
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}