<template>
  <div class="flex items-center justify-center gap-1">
      <h3 class="flex-1">{{ entity.title }}</h3>
      <p class="flex-1" v-html="entity.description"></p>
      <p class="flex-1">Опубликовано: {{ entity.published ? 'Да' : 'Нет' }}</p>
      <p class="flex-1">Дата публикации: {{ entity.published_from || 'Не указана' }}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="$emit('edit', entity)">Редактировать</button>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="$emit('delete', entity)">Удалить</button>
  </div>
</template>
  <script>
  export default {
    props: {
      entity: Object,
    },
  };
  </script>