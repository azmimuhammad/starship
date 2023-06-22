import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import StarshipList from "./views/starship/StarshipList.vue"
import StarshipDetail from "./views/starship/StarshipDetail.vue"

const routes = [
  {path: '/', component: StarshipList},
  {path: '/starship/:id', component: StarshipDetail},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
