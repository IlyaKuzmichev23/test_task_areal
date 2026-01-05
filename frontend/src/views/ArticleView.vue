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
export default {
  data() {
    return {
      article: null,
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

  computed: {
    comments() {
      return this.$store.state.comments.list
    }
  },

  methods: {
    async loadArticle() {
      const article = await this.$store.dispatch('articles/loadSingleArticle', this.articleId)
      this.article = article
      this.loading = false
    },

    async loadComments() {
      await this.$store.dispatch('comments/loadComments', this.articleId)
    },

    editArticle() {
      this.$router.push(`/article/${this.articleId}/edit`)
    },

    async deleteArticle() {
      if (confirm('Точно удалить?')) {
        await this.$store.dispatch('articles/deleteArticle', this.articleId)
        this.$router.push('/articles')
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
    },

    async addComment() {
      if (this.newCommentText.trim() === '') return

      await this.$store.dispatch('comments/createComment', {
        articleId: this.articleId,
        commentData: { text: this.newCommentText.trim() }
      })
      this.newCommentText = ''
    },

    async deleteComment(commentId) {
      if (confirm('Удалить?')) {
        await this.$store.dispatch('comments/deleteComment', {
          articleId: this.articleId,
          commentId: id
        })
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