<template>
  <div class="pa-6">
    <h2>Список статей</h2>

    <v-btn color="primary" class="mb-6" @click="goToAdd">
      Добавить новую статью
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
          <td>{{ article.createdAt }}</td>
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
import axios from 'axios'

export default {
  data() {
    return {
      articles: []
    }
  },

  created() {
    this.loadArticles()
  },

  methods: {
    async loadArticles() {
      try {
        const response = await axios.get('http://localhost:3000/articles')
        this.articles = response.data
      } catch (error) {
        alert('Не удалось загрузить статьи')
      }
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
        try {
          await axios.delete(`http://localhost:3000/article/${id}`)
          alert('Статья удалена')
          this.loadArticles()  // обновляем список
        } catch (error) {
          alert('Ошибка при удалении')
        }
      }
    }
  }
}
</script>