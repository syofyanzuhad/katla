<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="info-title">
    <div ref="modalRef" class="bg-zinc-900 text-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto border border-zinc-800 scale-in transition-all duration-500">
      <button
        @click="$emit('close')"
        aria-label="Tutup"
        class="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-white/10 transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 id="info-title" class="text-3xl font-black mb-8 text-center tracking-tighter uppercase">Cara Bermain</h2>

      <div class="space-y-8 text-sm">
        <!-- Objective -->
        <section>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">🎯</span>
            <h3 class="font-black uppercase tracking-widest text-zinc-400">Tujuan</h3>
          </div>
          <p class="text-zinc-300 leading-relaxed pl-10">Tebak kata bahasa Indonesia yang terdiri dari <strong class="text-white">5 huruf</strong> dalam maksimal <strong class="text-white">6 percobaan</strong>.</p>
        </section>

        <!-- How to Play -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">🎮</span>
            <h3 class="font-black uppercase tracking-widest text-zinc-400">Cara Main</h3>
          </div>
          <ul class="space-y-3 pl-10">
            <li v-for="(step, i) in [
              'Ketik kata 5 huruf menggunakan keyboard',
              'Tekan ENTER untuk submit tebakan',
              'Warna kotak akan berubah sebagai petunjuk',
              'Menang jika semua kotak berwarna hijau!'
            ]" :key="i" class="flex items-start gap-3 text-zinc-300">
              <span class="w-5 h-5 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{{ i+1 }}</span>
              <span>{{ step }}</span>
            </li>
          </ul>
        </section>

        <!-- Color Guide -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">🎨</span>
            <h3 class="font-black uppercase tracking-widest text-zinc-400">Arti Warna</h3>
          </div>
          <div class="space-y-4 pl-10">
            <div v-for="color in [
              { label: 'Hijau', text: 'Huruf benar dan di posisi yang tepat', bg: 'bg-green-600', icon: '✅' },
              { label: 'Kuning', text: 'Huruf benar tapi di posisi yang salah', bg: 'bg-yellow-500', icon: '⚠️' },
              { label: 'Abu-abu', text: 'Huruf tidak ada dalam kata', bg: 'bg-zinc-700', icon: '❌' }
            ]" :key="color.label" class="flex items-center gap-4 group">
              <div :class="`w-12 h-12 ${color.bg} rounded-xl flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-110` shadow-${color.label === 'Hijau' ? 'green' : (color.label === 'Kuning' ? 'yellow' : 'zinc')}-900/20">K</div>
              <div class="flex-1">
                <div class="font-black uppercase text-[10px] tracking-widest mb-0.5" :class="color.label === 'Hijau' ? 'text-green-500' : (color.label === 'Kuning' ? 'text-yellow-500' : 'text-zinc-500')">{{ color.label }}</div>
                <div class="text-zinc-400 text-xs leading-snug">{{ color.text }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Examples -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">💡</span>
            <h3 class="font-black uppercase tracking-widest text-zinc-400">Contoh</h3>
          </div>
          <div class="bg-zinc-800/50 border border-white/5 p-5 rounded-2xl space-y-4 ml-10">
            <div class="flex gap-2">
              <div v-for="(l, i) in 'BAJUN'" :key="i" 
                   :class="`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm ${i === 4 ? 'bg-green-600' : (i === 1 ? 'bg-yellow-500' : 'bg-zinc-700')}`">
                {{ l }}
              </div>
            </div>
            <p class="text-xs text-zinc-400 leading-relaxed italic">
              Huruf <strong class="text-yellow-500">A</strong> ada tapi posisi salah. <br>
              Huruf <strong class="text-green-500">N</strong> sudah di posisi yang tepat.
            </p>
          </div>
        </section>
      </div>

      <div class="mt-10">
        <button
          @click="$emit('close')"
          class="w-full py-4 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 text-white rounded-2xl transition-all font-black uppercase tracking-[0.2em] text-xs active:scale-[0.98]"
        >
          Mulai Main
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { useFocusTrap } from '../composables/useFocusTrap'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])

const modalRef = ref(null)
useFocusTrap(modalRef, toRef(props, 'show'))
</script>

<style scoped>
@keyframes scale-in {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.scale-in {
  animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
</style>
