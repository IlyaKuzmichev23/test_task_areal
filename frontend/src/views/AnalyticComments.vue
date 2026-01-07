<template>
  <div class="pa-6">
    <h2>Комментарии за период</h2>

    <div class="mt-6">
      <v-text-field
        v-model="dateFrom"
        label="Дата от (гггг-мм-дд)"
        placeholder="2026-01-01"
        class="mr-4"
        style="display: inline-block; width: 200px;"
      ></v-text-field>

      <v-text-field
        v-model="dateTo"
        label="Дата до (гггг-мм-дд)"
        placeholder="2026-01-31"
        style="display: inline-block; width: 200px;"
      ></v-text-field>

      <v-btn color="primary" class="ml-4" @click="loadComments">
        Показать
      </v-btn>

      <v-btn color="green" class="ml-2" @click="goToList">
        Назад
      </v-btn>
    </div>

    <div class="mt-8">
      <div v-for="group in analyticData" :key="group.article.id" class="mb-8">
        <h3>{{ group.article.title }}</h3>

        <div v-if="group.comments.length === 0">
          <p>Нет комментариев за этот период</p>
        </div>

        <div v-else>
          <div v-for="comment in group.comments" :key="comment.id" class="mb-4 pa-4 border">
            <p>{{ comment.text }}</p>
            <p><small>Создан: {{ formatDate(comment.createdAt) }}</small></p>
          </div>
        </div>
      </div>

      <p v-if="analyticData.length === 0 && loaded">
        Нет комментариев за выбранный период
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      dateFrom: '',
      dateTo: '',
      analyticData: [],  
      loaded: false     
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

    goToList() {
      this.$router.push('/articles')
    },

    async loadComments() {
      if (this.dateFrom === '' || this.dateTo === '') {
        alert('Введите обе даты')
        return
      }

      const fromDate = new Date(this.dateFrom)
      fromDate.setHours(0, 0, 0, 0)
      const from = fromDate.getTime()

      const toDate = new Date(this.dateTo)
      toDate.setHours(0, 0, 0, 0)
      toDate.setDate(toDate.getDate() + 1) 
      const to = toDate.getTime() - 1  

      if (isNaN(from) || isNaN(to)) {
        alert('Неверный формат даты. Используйте гггг-мм-дд')
        return
      }

      try {
        const data = await this.$store.dispatch('analytics/fetchCommentsByPeriod', { from, to })
        this.analyticData = data
        this.loaded = true
      } 
      catch (error) {
        alert('Ошибка загрузки')
        this.analyticData = []
        this.loaded = true
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