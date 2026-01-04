<template>
  <div class="pa-6">
    <div v-if="loading">Загрузка статьи...</div>

    <div v-else-if="article">
      <h1>{{ article.title }}</h1>
      <p class="mt-4">{{ article.content }}</p>

      <v-btn color="blue" class="mt-4 mr-2" @click="editArticle">
        Редактировать статью
      </v-btn>

      <v-btn color="red" class="mt-4" @click="deleteArticle">
        Удалить статью
      </v-btn>

      <div class="mt-8">
        <h2>Комментарии</h2>

        <p v-if="comments.length === 0">Пока нет комментариев</p>

        <div v-for="comment in comments" :key="comment.id" class="mb-4 pa-4 border">
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
          <v-textarea v-model="editText" rows="3"></v-textarea>

          <v-btn color="green" class="mr-2" @click="saveEdit">Сохранить</v-btn>
          <v-btn @click="cancelEdit">Отмена</v-btn>
        </div>

        <div class="mt-8 pa-4 border">
          <h3>Добавить новый комментарий</h3>
          <v-textarea v-model="newCommentText" rows="3" class="mt-4"></v-textarea>
          <v-btn color="primary" @click="addComment" class="mt-2">Отправить</v-btn>
        </div>
      </div>
    </div>

    <div v-else>
      <h2>Статья не найдена</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      article: null,
      comments: [],
      articleId: null,
      loading: true,
      editingComment: null,
      editText: '',
      newCommentText: ''
    }
  },

  created() {
    this.articleId = this.$route.params.id
    this.loadArticle()
    this.loadComments()
  },

  methods: {
    async loadArticle() {
      try {
        const response = await axios.get(`http://localhost:3000/article/${this.articleId}`)
        this.article = response.data
      } catch (error) {
        this.article = null
      } finally {
        this.loading = false
      }
    },

    async loadComments() {
      try {
        const response = await axios.get(`http://localhost:3000/article/${this.articleId}/comments/`)
        this.comments = response.data
      } catch (error) {
        this.comments = []
      }
    },

    editArticle() {
      this.$router.push(`/article/${this.articleId}/edit`)
    },

    async deleteArticle() {
      if (confirm('Точно удалить статью? Все комментарии тоже удалятся')) {
        try {
          await axios.delete(`http://localhost:3000/article/${this.articleId}`)
          alert('Статья удалена')
          this.$router.push('/articles')
        } catch (error) {
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
        await axios.patch(`http://localhost:3000/article/${this.articleId}/comment/${this.editingComment.id}`, {
          text: this.editText
        })
        alert('Комментарий обновлён')
        this.cancelEdit()
        this.loadComments()
      } catch (error) {
        alert('Ошибка')
      }
    },

    async addComment() {
      if (this.newCommentText.trim() === '') {
        alert('Напишите текст')
        return
      }

      try {
        await axios.post(`http://localhost:3000/article/${this.articleId}/comment/`, {
          text: this.newCommentText.trim()
        })
        alert('Комментарий добавлен')
        this.newCommentText = ''
        this.loadComments()
      } catch (error) {
        alert('Ошибка')
      }
    },

    async deleteComment(commentId) {
      if (confirm('Точно удалить комментарий?')) {
        try {
          await axios.delete(`http://localhost:3000/article/${this.articleId}/comment/${commentId}`)
          alert('Комментарий удалён')
          this.loadComments()
        } catch (error) {
          alert('Ошибка')
        }
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