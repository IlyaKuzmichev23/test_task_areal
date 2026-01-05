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

    computed: {
        comments() {
            return this.$store.state.comments.list
        }
    },

    methods: {
        async loadComments() {
            await this.$store.dispatch('comments/loadComments', this.articleId)
        },

        async deleteComment(id) {
            if (confirm('Точно удалить комментарий?')) {
                await this.$store.dispatch('comments/deleteComment', {
                articleId: this.articleId,
                commentId: id
                })
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
            await this.$store.dispatch('comments/updateComment', {
                articleId: this.articleId,
                comment: { id: this.editingComment.id, text: this.editText }
            })
            this.cancelEdit()
        }

        async addComment() {
            if (this.newCommentText.trim() === '') {
                alert('Напишите текст')
                return
            }

            await this.$store.dispatch('comments/createComment', {
                articleId: this.articleId,
                commentData: { text: this.newCommentText.trim() }
            })
            this.newCommentText = ''
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