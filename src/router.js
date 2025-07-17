import { createRouter, createWebHistory } from 'vue-router'
import GameBoard from './components/GameBoard.vue'

const KbbiRedirect = {
  template: '<div>Mengalihkan ke KBBI...</div>',
  created() {
    const word = this.$route.params.word
    window.location.href = `https://kbbi.kemdikbud.go.id/entri/${word}`
  }
}

const routes = [
  { path: '/', component: GameBoard },
  { path: '/kbbi/:word', component: KbbiRedirect },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 