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
    </div>

    <div class="mt-8">
      <div v-for="group in groupedComments" :key="group.article.id" class="mb-8">
        <h3>{{ group.article.title }} (id: {{ group.article.id }})</h3>

        <div v-if="group.comments.length === 0">
          <p>Нет комментариев за этот период</p>
        </div>

        <div v-else>
          <div v-for="comment in group.comments" :key="comment.id" class="mb-4 pa-4 border">
            <p>{{ comment.text }}</p>
            <p><small>Создан: {{ comment.createdAt }}</small></p>
          </div>
        </div>
      </div>

      <p v-if="groupedComments.length === 0 && loaded">
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
      groupedComments: [],  
      loaded: false     
    }
  },

  methods: {
    async loadComments() {
      if (this.dateFrom === '' || this.dateTo === '') {
        alert('Введите обе даты')
        return
      }

      const from = new Date(this.dateFrom).getTime()
      const to = new Date(this.dateTo).getTime() + 86399999  

      if (isNaN(from) || isNaN(to)) {
        alert('Неверный формат даты. Используйте гггг-мм-дд')
        return
      }

      try {
        const data = await this.$store.dispatch('articles/fetchAnalyticComments', { from, to })
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