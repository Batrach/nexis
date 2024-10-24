import type { RouteRecordRaw } from 'vue-router';
import EntityList from '../EntityList.vue';
import EntityForm from '../EntityForm.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: EntityList },
  { path: '/create', component: EntityForm },
  { path: '/edit/:id', component: EntityForm },
];

export default routes;