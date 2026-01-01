<template>
    <div class="pa-6">
        <h2>{{isEdit ? 'Редактировать статью' : 'Добавить новую статью'}}</h2>

        <v-text-field
            v-model="title"
            lable="Заголовок"
            class="mt-6"
        ></v-text-field>

        <v-textarea
            v-model="content"
            lable="Текст статьи"
            rows="10"
            class="mt-4"
        ></v-textarea>

        <v-btn color="primary" class="mt-4" @click="save">
            Сохранить
        </v-btn>

        <v-btn class="mt-4 ml-4" @clicl="goToList">
            Отмена
        </v-btn>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            title: '',
            content: '',
            articleId: null
        }
    },
    
    computed: {
        isEdit() {
            return this.$route.params.id !== undefined
        }
    },

    created() {
        if (this.isEdit) {
            this.articleId = this.$route.params.id
            this.loadArticle()
        }
    },

    methods: {
        async loadArticle() {
            try{
                const response = await axios.get(`http://localhost:3000/article/${this.articleId}`)
                this.title = response.data.title
                this.content = response.data.content
            }
            catch (error){
                alert('Не удалось загрузить статью')
            }
        },

        async save() {
            if (this.title === '' || this.content === '') {
                alert('Заполните заголовок и текст')
                return
            }

            const data = {
                title: this.title,
                content: this.content
            }

            try {
                if (this.isEdit) {
                    await axios.patch(`http://localhost:3000/article/${this.articleId}`, data)
                    alert('Статья обновлена')
                } 
                else {
                    await axios.post('http://localhost:3000/article/', data)
                    alert('Статья добавлена')
                }

                this.goToList()
            } 
            catch (error) {
            alert('Ошибка при сохранении')
            }
        },
        goToList() {
            this.$router.push('/articles')
        }
    }
}
</script>