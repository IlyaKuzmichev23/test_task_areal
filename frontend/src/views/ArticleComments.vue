<template>
    <div class="pa-6">
        <h2>Комментарий к статье</h2>

        <p v-if="comments.length === 0">Пока нет комментариев</p>

        <div v-for="comment in comments":key="comment.id" class="mb-4 pa-4 border">
            <p><strong>Комментарий:</strong> {{ comment.text }}</p>
            <p><small>Создан: {{ comment.createdAt }}</small></p>

            <v-btn color="blue" small class="mr-2" @click="editComment(comment)">
                Редактировать
            </v-btn>

            <v-btn color="red" small @click="deleteComment(comment.id)">
                Удалить
            </v-btn>
        </div>

        <div v-if="editingComment" class="mt-6 pa-4 border">
            <h3>Редактировать комментарий</h3>
            <v-textarea v-model="editText" label="Текст комментария" rows="3"></v-textarea>

            <v-btn color="green" class="mr-2" @click="saveEdit">
                Сохранить изменения
            </v-btn>
            <v-btn @click="cancelEdit">Отмена</v-btn>
        </div>

        <div class="mt-8 pa-4 border">
            <h3>Добавить новый комментарий</h3>

            <v-textarea
                 v-model="newCommentText"
                label="Ваш комментарий"
                rows="3"
                class="mt-4"
            ></v-textarea>

            <v-btn color="primary" @click="addComment" class="mt-2">
                Отправить комментарий
            </v-btn>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            comments: [],       
            articleId: null,       
            editingComment: null, 
            editText: '',
            newCommentText: ''          
        }
    },

    created() {
        this.articleId = this.$route.params.id
        this.loadComments()
    },

    methods: {
        async loadComments() {
            try {
                const response = await axios.get(`http://localhost:3000/article/${this.articleId}/comments/`)
                this.comments = response.data
            }
            catch (error) {
                alert('Не удалось загрузить комментарии')
            }
        },

        async deleteComment(commentId) {
            if (confirm('Точно удалить комментарий?')) {
                try {
                    await axios.delete(`http://localhost:3000/article/${this.articleId}/comment/${commentId}`)
                    alert('Комментарий удалён')
                    this.loadComments()  // обновляем список
                } 
                catch (error) {
                    alert('Ошибка при удалении')
                }
            }
        },

        editComment(comment) {
            this.editingComment = comment
            this.editText = comment.text
        },

        cancelEdit() {
            this.editingComment = null
            this.editText = ''
        },
        
        async saveEdit() {
            try {
                await axios.patch(`http://localhost:3000/article/${this.articleId}/comment/${this.editingComment.id}`, {content: this.editText})
                alert('Комментарий обновлён')
                this.cancelEdit()
                this.loadComments()
            } 
            catch (error) {
                alert('Ошибка при сохранении')
            }
        }

        async addComment() {
            if (this.newCommentText.trim()===''){
                alert ('Напишите текст комментария')
                return
            }

            const data = {
                text: this.newCommentText.trim()
            }

            try{
                await axios.post(`http://localhost:3000/article/${this.articleId}/comment/`, data)
                alert ('Комментарий добавлен!')
                this.newCommentText = ''
                this.loadComments()
            }
            catch (error){
                alert('Ошибка при добавлении комментария')
            }
        }
    }
}
</script>

<style scoped>
.border {
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>