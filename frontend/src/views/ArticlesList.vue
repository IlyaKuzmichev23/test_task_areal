<template>
  <div class="pa-6">
    <h2>Список статей</h2>

    <v-btn color="primary" class="mb-6" @click="goToAdd">
      Добавить новую статью
    </v-btn>

    <v-btn color="success" class="mb-6 ml-2" @click="goToAnalytic">
      Фильтр комментариев
    </v-btn>

    <v-table>
      <thead>
        <tr>
          <th>Заголовок</th>
          <th>Дата создания</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ formatDate(article.createdAt) }}</td>
          <td>
            <v-btn color="blue" small class="mr-2" @click="viewArticle(article.id)">
              Просмотр
            </v-btn>
            <v-btn color="orange" small class="mr-2" @click="editArticle(article.id)">
              Редактировать
            </v-btn>
            <v-btn color="red" small @click="deleteArticle(article.id)">
              Удалить
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <p v-if="articles.length === 0" class="mt-4">Статьи не найдены</p>
  </div>
</template>

<script>

export default {
  
  created() {
    this.$store.dispatch('articles/loadArticles')
  },

  computed: {
    articles() {
      return this.$store.state.articles.list
    }
  },

  methods: {

    formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
    
      return `${day}.${month.toString().padStart(2, '0')}.${year} ${hours}:${minutes}`
    },

    goToAnalytic() {
      this.$router.push('/analytic')
    },

    goToAdd() {
      this.$router.push('/article/add')
    },

    viewArticle(id) {
      this.$router.push(`/article/${id}`)
    },

    editArticle(id) {
      this.$router.push(`/article/${id}/edit`)
    },

    async deleteArticle(id) {
      if (confirm('Точно удалить статью?')) {
        this.$store.dispatch('articles/deleteArticle', id)
      }
    }
  }
}
</script>