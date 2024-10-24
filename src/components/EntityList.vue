<template>
  <div>
    <input v-model="filter" placeholder="Фильтр по заголовку" class="p-2 border border-gray-300 rounded-md mb-4" />
<button @click="goToCreate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Создать</button>
<div v-if="isLoading" class="text-gray-600">Загрузка...</div>
    <ul v-else class="flex flex-col items-center">
      <li v-for="entity in filteredEntities" :key="entity.id" class="w-full flex justify-center">
    <div class="w-3/4">
      <EntityItem :entity="entity" @edit="goToEdit" @delete="confirmDelete" />
    </div>
  </li>
</ul>
    <ConfirmationPopup v-if="showPopup" @confirm="deleteEntity" @cancel="showPopup = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import EntityItem from './EntityItem.vue';
import ConfirmationPopup from './ConfirmationPopup.vue';

interface Entity {
  id: number;
  title: string;
  description: string;
  published: boolean;
  published_from: string | null;
}

export default defineComponent({
  components: { EntityItem, ConfirmationPopup },
  data() {
    return {
      filter: '',
      showPopup: false,
      entityToDelete: null as Entity | null, // Указываем, что это может быть Entity или null
      entities: [] as Entity[],
      isLoading: true,
    };
  },
  computed: {
    filteredEntities() {
      return this.entities.filter(entity => entity.title.includes(this.filter));
    },
  },
  methods: {
    async fetchEntities() {
      try {
        const response = await axios.get<Entity[]>('http://localhost:3000/entities');
        this.entities = response.data;
      } catch (error) {
        console.error('Ошибка при получении сущностей:', error);
      } finally {
        this.isLoading = false;
      }
    },
    goToCreate() {
      this.$router.push('/create');
    },
    goToEdit(entity: Entity) {
      this.$router.push(`/edit/${entity.id}`);
    },
    confirmDelete(entity: Entity) {
      this.entityToDelete = entity;
      this.showPopup = true;
    },
    async deleteEntity() {
  try {
    await axios.delete(`http://localhost:3000/entities/${this.entityToDelete!.id}`); // Удаляем сущность из json-server
    this.entities = this.entities.filter(entity => entity.id !== this.entityToDelete!.id); // Удаляем из локального списка
  } catch (error) {
    console.error('Ошибка при удалении сущности:', error);
  } finally {
    this.showPopup = false;
  }
}
  },
  mounted() {
    this.fetchEntities();
  },
});
</script>