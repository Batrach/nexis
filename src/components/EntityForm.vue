<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded shadow-md">
     <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Редактировать' : 'Создать' }} сущность</h1>
     <form @submit.prevent="submitForm">
         <input class="w-full border border-gray-300 rounded px-3 py-2 mb-3" v-model="entity.title" placeholder="Заголовок" maxlength="50" required />
         <textarea class="w-full border border-gray-300 rounded px-3 py-2 mb-3" v-model="entity.description" placeholder="Описание (Markdown)"></textarea>
         <label class="flex items-center mb-3">
             <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" v-model="entity.published" />
             <span class="ml-2">Опубликовано</span>
         </label>
         <input type="date" class="w-full border border-gray-300 rounded px-3 py-2 mb-3" v-model="entity.published_from" placeholder="Дата публикации (nullable)" />
         <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{{ isEdit ? 'Сохранить' : 'Создать' }}</button>
     </form>
 </div>
 </template>
 
 <script lang="ts">
 import { defineComponent } from 'vue';
 import axios from 'axios';
 
 interface Entity {
   id: string;
   title: string;
   description: string;
   published: boolean;
   published_from: string | null;
 }
 
 export default defineComponent({
   data() {
     return {
       entity: {
         id: '0',
         title: '',
         description: '',
         published: false,
         published_from: null,
       } as Entity,
       entities: [] as Entity[],
     };
   },
   computed: {
     isEdit(): boolean {
       return !!this.$route.params.id;
     },
   },
   methods: {
     async fetchEntities() {
       try {
         if (this.isEdit) {
           // Получаем id из параметров маршрута
           const entityId = this.$route.params.id;
 
           // Получаем сущность по id
           const response = await axios.get<Entity>(`http://localhost:3000/entities/${entityId}`);
           this.entity = response.data; // Заполняем данные сущности для редактирования
         }
       } catch (error) {
         console.error('Ошибка при получении сущности:', error);
       }
     },
     async submitForm() {
       try {
         const isCreating = !this.isEdit;
         if (isCreating) {
           // Получаем текущие сущности для определения нового id
           const response = await axios.get<Entity[]>('http://localhost:3000/entities');
           const existingEntities = response.data;
           const newId = existingEntities.length > 0 ? Math.max(...existingEntities.map(entity => parseInt(entity.id))) + 1 : 0;
           this.entity.id = newId.toString(); // Присваиваем новый уникальный id
         }
 
         if (isCreating) {
           const response = await axios.post('http://localhost:3000/entities', this.entity);
           console.log('Сущность создана:', response.data);
         } else if (this.isEdit) {
           const response = await axios.put(`http://localhost:3000/entities/${this.entity.id}`, this.entity);
           console.log('Сущность обновлена:', response.data);
         }
         // Перенаправление на главную страницу после создания или обновления
         this.$router.push('/');
       } catch (error) {
         console.error('Ошибка при отправке формы:', error);
       }
     }
   },
   created() {
     this.fetchEntities();
   },
 });
 </script>