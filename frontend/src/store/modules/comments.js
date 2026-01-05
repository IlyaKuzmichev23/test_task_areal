import axios from 'axios'

const state = {
    list: []  
}

const mutations = {
    SET_COMMENTS(state, comments) {
        state.list = comments
    },

    ADD_COMMENT(state, comment) {
        state.list.push(comment)
    },

    UPDATE_COMMENT(state, updatedComment) {
        const index = state.list.findIndex(c => c.id === updatedComment.id)
        if (index !== -1) {
            state.list[index] = updatedComment
        }
    },

    DELETE_COMMENT(state, id) {
        state.list = state.list.filter(c => c.id !== id)
    }
}

const actions = {
    async loadComments({ commit }, articleId) {
        try {
            const response = await axios.get(`http://localhost:3000/article/${articleId}/comments/`)
            commit('SET_COMMENTS', response.data)
        } 
        catch (error) {
            console.log('Не удалось загрузить комментарии')
        }
    },

    async createComment({ commit }, { articleId, commentData }) {
        try {
            const response = await axios.post(`http://localhost:3000/article/${articleId}/comment/`, commentData)
            commit('ADD_COMMENT', response.data)
        }
        catch (error) {
            console.log('Не удалось добавить комментарий')
        }
    },

    async updateComment({ commit }, { articleId, comment }) {
        try {
            const response = await axios.patch(`http://localhost:3000/article/${articleId}/comment/${comment.id}`, comment)
            commit('UPDATE_COMMENT', response.data)
        }
        catch (error) {
            console.log('Не удалось обновить комментарий')
        }
    },

    async deleteComment({ commit }, { articleId, commentId }) {
        try {
            await axios.delete(`http://localhost:3000/article/${articleId}/comment/${commentId}`)
            commit('DELETE_COMMENT', commentId)
        } 
        catch (error) {
            console.log('Не удалось удалить комментарий')
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}