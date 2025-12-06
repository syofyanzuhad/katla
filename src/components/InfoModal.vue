<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-zinc-800 text-white rounded-lg shadow-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
      <button
        @click="$emit('close')"
        aria-label="Tutup"
        class="absolute top-3 right-3 text-2xl text-zinc-400 hover:text-white transition p-1 rounded-full focus:outline-none"
      >
        &times;
      </button>

      <h2 class="text-2xl font-bold mb-4 text-center">Cara Bermain Katla</h2>

      <div class="space-y-4 text-sm">
        <!-- Objective -->
        <div>
          <h3 class="font-bold text-lg mb-2 text-yellow-400">🎯 Tujuan</h3>
          <p class="text-zinc-300">Tebak kata bahasa Indonesia yang terdiri dari <strong>5 huruf</strong> dalam maksimal <strong>6 percobaan</strong>.</p>
        </div>

        <!-- How to Play -->
        <div>
          <h3 class="font-bold text-lg mb-2 text-green-400">🎮 Cara Main</h3>
          <ol class="list-decimal list-inside space-y-2 text-zinc-300">
            <li>Ketik kata 5 huruf menggunakan keyboard atau klik tombol di layar</li>
            <li>Tekan <kbd class="bg-zinc-700 px-2 py-1 rounded">ENTER</kbd> untuk submit tebakan</li>
            <li>Warna kotak akan berubah menunjukkan seberapa dekat tebakanmu</li>
            <li>Gunakan petunjuk warna untuk tebakan berikutnya</li>
            <li>Menang jika berhasil menebak kata dalam 6 percobaan!</li>
          </ol>
        </div>

        <!-- Color Guide -->
        <div>
          <h3 class="font-bold text-lg mb-2 text-blue-400">🎨 Arti Warna</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-green-600 rounded flex items-center justify-center font-bold">K</div>
              <div class="flex-1 text-zinc-300">
                <strong class="text-green-400">Hijau:</strong> Huruf benar dan di posisi yang tepat
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-yellow-500 rounded flex items-center justify-center font-bold">A</div>
              <div class="flex-1 text-zinc-300">
                <strong class="text-yellow-400">Kuning:</strong> Huruf benar tapi di posisi yang salah
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-zinc-700 rounded flex items-center justify-center font-bold">X</div>
              <div class="flex-1 text-zinc-300">
                <strong class="text-zinc-400">Abu-abu:</strong> Huruf tidak ada dalam kata
              </div>
            </div>
          </div>
        </div>

        <!-- Example -->
        <div>
          <h3 class="font-bold text-lg mb-2 text-purple-400">💡 Contoh</h3>
          <div class="bg-zinc-900 p-3 rounded space-y-2">
            <p class="text-xs text-zinc-400 mb-2">Kata yang benar: <strong>MAKAN</strong></p>

            <div class="flex gap-1">
              <div class="w-10 h-10 bg-zinc-700 rounded flex items-center justify-center font-bold text-sm">B</div>
              <div class="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center font-bold text-sm">A</div>
              <div class="w-10 h-10 bg-zinc-700 rounded flex items-center justify-center font-bold text-sm">J</div>
              <div class="w-10 h-10 bg-zinc-700 rounded flex items-center justify-center font-bold text-sm">U</div>
              <div class="w-10 h-10 bg-green-600 rounded flex items-center justify-center font-bold text-sm">N</div>
            </div>
            <p class="text-xs text-zinc-400">
              <strong>A</strong> ada dalam kata tapi posisi salah,<br>
              <strong>N</strong> benar dan di posisi tepat
            </p>

            <div class="flex gap-1 mt-3">
              <div class="w-10 h-10 bg-green-600 rounded flex items-center justify-center font-bold text-sm">M</div>
              <div class="w-10 h-10 bg-green-600 rounded flex items-center justify-center font-bold text-sm">A</div>
              <div class="w-10 h-10 bg-green-600 rounded flex items-center justify-center font-bold text-sm">K</div>
              <div class="w-10 h-10 bg-green-600 rounded flex items-center justify-center font-bold text-sm">A</div>
              <div class="w-10 h-10 bg-green-600 rounded flex items-center justify-center font-bold text-sm">N</div>
            </div>
            <p class="text-xs text-green-400">✅ Benar! Semua huruf dan posisi tepat!</p>
          </div>
        </div>

        <!-- Tips -->
        <div>
          <h3 class="font-bold text-lg mb-2 text-orange-400">💪 Tips</h3>
          <ul class="list-disc list-inside space-y-1 text-zinc-300">
            <li>Mulai dengan kata yang punya banyak vokal (A, E, I, O, U)</li>
            <li>Perhatikan keyboard - warna berubah sesuai huruf yang sudah dicoba</li>
            <li>Kata harus ada dalam kamus bahasa Indonesia</li>
            <li>Gunakan petunjuk kuning untuk cari posisi yang tepat</li>
          </ul>
        </div>

        <!-- Features -->
        <div>
          <h3 class="font-bold text-lg mb-2 text-pink-400">✨ Fitur</h3>
          <ul class="list-disc list-inside space-y-1 text-zinc-300">
            <li><strong>Statistik:</strong> Klik tombol 📊 untuk lihat progress kamu</li>
            <li><strong>Win Streak:</strong> Menang berturut-turut untuk unlock streak banner! 🔥</li>
            <li><strong>Sharing:</strong> Bagikan hasil ke WhatsApp, Twitter, atau Telegram</li>
            <li><strong>KBBI:</strong> Cek arti kata di Kamus Besar Bahasa Indonesia</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 text-center">
        <button
          @click="$emit('close')"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold"
        >
          Mulai Main!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])
</script>

<style scoped>
kbd {
  font-family: monospace;
}
</style>
