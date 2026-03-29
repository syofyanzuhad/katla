<template>
  <div class="min-h-screen max-w-screen w-full transition-all duration-500 flex flex-col items-center p-2 sm:p-4 selection:bg-blue-500/30" :class="theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'">
    <header class="w-full max-w-2xl flex items-center justify-between mb-6 border-b pb-4 transition-colors duration-300" :class="theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'">
      <div class="flex items-center gap-2">
        <button
          @click="openInfo"
          class="p-2.5 bg-zinc-500/10 hover:bg-zinc-500/20 rounded-xl transition-all active:scale-95 group text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300"
          aria-label="Info & Cara Main"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:rotate-12 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </button>
      </div>

      <div class="flex flex-col items-center">
        <h1 class="text-3xl sm:text-4xl font-black tracking-tighter flex select-none">
          <span class="text-red-500 drop-shadow-sm">K</span>
          <span class="text-red-500 drop-shadow-sm">A</span>
          <span :class="theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'">T</span>
          <span :class="theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'">L</span>
          <span class="text-green-500 drop-shadow-sm">L</span>
          <span class="text-green-500 drop-shadow-sm">A</span>
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="toggleTheme"
          class="p-2.5 bg-zinc-500/10 hover:bg-zinc-500/20 rounded-xl transition-all active:scale-95 group text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300"
          :aria-label="theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'"
        >
          <!-- Sun Icon -->
          <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:rotate-45 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-4.773l1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
          <!-- Moon Icon -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:-rotate-12 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </button>
        <button
          @click="openStats"
          class="p-2.5 bg-zinc-500/10 hover:bg-zinc-500/20 rounded-xl transition-all active:scale-95 group text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300"
          aria-label="Lihat Statistik"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Toolbar / Control Bar -->
    <div class="w-full max-w-md flex items-center justify-center gap-2 mb-8 px-2 sm:gap-3">
      <!-- Offline Indicator -->
      <div v-if="!isOnline" class="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-amber-500 animate-pulse shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M1 1l22 22" />
        </svg>
        <span class="hidden xs:inline">Offline</span>
      </div>

      <!-- Mode Toggle (Pill) -->
      <div class="flex p-1 bg-zinc-500/10 rounded-xl border border-zinc-500/20 backdrop-blur-sm shrink-0">
        <button 
          @click="resetGame('daily')"
          class="px-2.5 py-1.5 sm:px-3 rounded-lg text-[10px] sm:text-xs font-black transition-all uppercase tracking-wider"
          :class="gameMode === 'daily' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-zinc-500 hover:text-zinc-300'"
        >
          {{ currentLanguage === 'id' ? 'Harian' : 'Daily' }}
        </button>
        <button 
          @click="resetGame('random')"
          class="px-2.5 py-1.5 sm:px-3 rounded-lg text-[10px] sm:text-xs font-black transition-all uppercase tracking-wider"
          :class="gameMode === 'random' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-zinc-500 hover:text-zinc-300'"
        >
          Random
        </button>
      </div>

      <!-- Language Toggle -->
      <button
        @click="toggleLanguage"
        class="flex items-center gap-1.5 px-3 py-2.5 bg-zinc-500/10 hover:bg-zinc-500/20 border border-zinc-500/20 rounded-xl text-[10px] sm:text-xs font-black transition-all active:scale-95 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300 shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.996 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <span class="tracking-widest uppercase">{{ currentLanguage }}</span>
      </button>

      <!-- Skip Button -->
      <button
        @click="skipWord"
        class="flex items-center gap-1.5 px-3 py-2.5 bg-zinc-500/10 hover:bg-zinc-500/20 border border-zinc-500/20 rounded-xl text-[10px] sm:text-xs font-black transition-all active:scale-95 group text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300 shrink-0"
        aria-label="Skip kata ini"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500 opacity-70">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span class="hidden sm:inline uppercase tracking-widest">{{ currentLanguage === 'id' ? 'Ganti' : 'Skip' }}</span>
      </button>
    </div>

    <!-- Win Streak Display -->
    <div v-if="userStats.currentStreak > 1" class="mb-6 px-6 py-2 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full shadow-xl shadow-orange-600/20 animate-pulse-subtle">
      <div class="flex items-center justify-center gap-2 text-white text-sm">
        <span class="animate-bounce">🔥</span>
        <span class="font-black italic tracking-widest uppercase">{{ userStats.currentStreak }} Streak!</span>
        <span class="animate-bounce">🔥</span>
      </div>
    </div>

    <!-- Quick Tip Banner (First Visit) -->
    <Transition name="fade">
      <div v-if="showQuickTip" class="w-full max-w-md mb-6 p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 backdrop-blur-sm relative group">
        <button @click="dismissQuickTip" class="absolute top-2 right-2 p-1 text-blue-500/50 hover:text-blue-500 transition-colors" aria-label="Tutup tip">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <div class="flex items-start gap-3">
          <span class="text-xl">💡</span>
          <div class="text-xs leading-relaxed text-blue-400/90 font-medium">
            <template v-if="currentLanguage === 'id'">
              Tebak kata dalam 6 kesempatan. <br>
              <span class="text-green-500">🟩</span> Benar, <span class="text-yellow-500">🟨</span> Salah posisi, <span class="text-zinc-500">⬜</span> Tidak ada.
            </template>
            <template v-else>
              Guess the word in 6 tries. <br>
              <span class="text-green-500">🟩</span> Correct, <span class="text-yellow-500">🟨</span> Wrong spot, <span class="text-zinc-500">⬜</span> Not in word.
            </template>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Compact Visual Legend -->
    <div class="w-full max-w-md flex flex-col items-center gap-3 mb-8 px-2">
      <p class="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 opacity-80 select-none">
        {{ currentLanguage === 'id' ? `Tebak ${WORD_LENGTH} Huruf` : `Guess ${WORD_LENGTH} Letters` }}
      </p>
      
      <div class="flex items-center gap-5 text-[9px] font-black uppercase tracking-widest select-none">
        <div class="flex items-center gap-2 group">
          <div class="w-3.5 h-3.5 bg-green-600 rounded shadow-sm group-hover:scale-110 transition-transform"></div>
          <span class="text-zinc-500 group-hover:text-zinc-400 transition-colors">{{ currentLanguage === 'id' ? 'Benar' : 'Correct' }}</span>
        </div>
        <div class="flex items-center gap-2 group">
          <div class="w-3.5 h-3.5 bg-yellow-500 rounded shadow-sm group-hover:scale-110 transition-transform"></div>
          <span class="text-zinc-500 group-hover:text-zinc-400 transition-colors">{{ currentLanguage === 'id' ? 'Posisi Salah' : 'Present' }}</span>
        </div>
        <div class="flex items-center gap-2 group">
          <div class="w-3.5 h-3.5 bg-zinc-700 rounded shadow-sm group-hover:scale-110 transition-transform" style="background-color: #27272a;"></div>
          <span class="text-zinc-500 group-hover:text-zinc-400 transition-colors">{{ currentLanguage === 'id' ? 'Tidak Ada' : 'Absent' }}</span>
        </div>
      </div>
    </div>

    <!-- Main Game Grid -->
    <div
      class="grid gap-2 mb-8 relative"
      :style="{ gridTemplateRows: `repeat(${MAX_ATTEMPTS}, minmax(0, 1fr))` }"
      role="grid"
      aria-label="Game board"
    >
      <div
        v-for="(guessRow, rowIndex) in MAX_ATTEMPTS"
        :key="rowIndex"
        class="flex items-center gap-2 group/row"
      >
        <div
          class="grid gap-2 transition-transform active:scale-[0.98]"
          :style="{ gridTemplateColumns: `repeat(${WORD_LENGTH}, minmax(0, 1fr))` }"
          role="row"
          :aria-label="`Baris ${rowIndex + 1}`"
          @click="rowIndex < guesses.length && currentLanguage === 'id' && window.open(`https://kbbi.kemendikdasmen.go.id/entri/${guesses[rowIndex].join('')}`, '_blank')"
          :class="{ 'cursor-pointer': rowIndex < guesses.length && currentLanguage === 'id' }"
          :data-testid="`row-${rowIndex}`"
        >
          <div
            v-for="colIndex in WORD_LENGTH"
            :key="colIndex"
            class="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 rounded-lg text-2xl sm:text-3xl flex items-center justify-center font-black uppercase transition-all duration-300 select-none"
            :class="[
              getBoxClass(rowIndex, colIndex - 1),
              getFlipClass(rowIndex, colIndex - 1),
              { 'animate-shake': shakeRowIndex === rowIndex },
              { 'animate-pop': rowIndex === guesses.length && currentGuess.length === colIndex }
            ]"
            role="gridcell"
            :aria-label="getAriaLabel(rowIndex, colIndex - 1)"
            :aria-live="rowIndex === guesses.length ? 'polite' : 'off'"
            :data-testid="`cell-${rowIndex}-${colIndex-1}`"
          >
            {{ getLetterDisplay(rowIndex, colIndex - 1) }}
          </div>
        </div>

        <!-- KBBI Lookup Link - Desktop Only Icon -->
        <div class="hidden sm:flex w-8 justify-center">
          <a
            v-if="rowIndex < guesses.length && currentLanguage === 'id'"
            :href="`https://kbbi.kemendikdasmen.go.id/entri/${guesses[rowIndex].join('')}`"
            target="_blank"
            class="p-1.5 text-zinc-600 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all opacity-0 group-hover/row:opacity-100 focus:opacity-100"
            :title="`Lihat arti kata '${guesses[rowIndex].join('').toUpperCase()}' di KBBI`"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.967 0 016 18c1.097 0 2.16.22 3.136.617a5.995 5.995 0 016.728 0 12.17 12.17 0 013.136-.617c1.052 0 2.062.18 3 .512V4.262a8.967 8.967 0 00-3-.512 8.967 8.967 0 00-6 2.292m0-2.292a12.17 12.17 0 013.136-.617c1.052 0 2.062.18 3 .512v14.25A8.987 8.967 0 0118 18a12.17 12.17 0 01-3.136.617m-6.864-14.713a12.115 12.115 0 016.864 0M9 17.01V4.5m1.875 13.5a11.992 11.992 0 003.75 0" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="toast.show" class="fixed left-1/2 top-1/4 z-50 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300" 
           :class="toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-zinc-800/90 text-white'">
        <span v-if="toast.type === 'error'" class="text-xl">⚠️</span>
        <span v-else class="text-xl">✨</span>
        <div class="font-bold text-sm tracking-wide" v-html="toast.message"></div>
      </div>
    </Transition>

    <!-- Refined Keyboard -->
    <div class="mt-auto mb-4 space-y-2 w-full max-w-xl px-2">
      <div v-for="(row, rIdx) in ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']" :key="rIdx" class="flex justify-center gap-1.5">
        <button v-if="rIdx === 2" 
          class="key action-key" 
          @click="pressEnter" 
          :class="{ 'active': pressedKey === 'enter' }"
          data-testid="key-enter"
        >
          ENTER
        </button>
        
        <button
          v-for="key in row.split('')"
          :key="key"
          class="key"
          :class="[getKeyClass(key.toLowerCase()), { 'active': pressedKey === key.toLowerCase() }]"
          @click="pressKey(key)"
          :data-testid="`key-${key.toLowerCase()}`"
        >
          {{ key }}
        </button>

        <button v-if="rIdx === 2" 
          class="key action-key" 
          @click="pressBackspace" 
          :class="{ 'active': pressedKey === 'backspace' }"
          data-testid="key-backspace"
        >
          <span class="text-xl">⌫</span>
        </button>
      </div>
    </div>

    <!-- footer -->
    <p class="mt-3 text-xs sm:text-sm text-zinc-400">
      Katla by <a href="//syofyanzuhad.dev" target="_blank" class="text-blue-400 hover:text-blue-300 transition duration-200">Syofyan Zuhad</a>
    </p>
  </div>

<!-- Info Modal -->
<InfoModal
  :show="showInfoModal"
  @close="closeInfo"
/>

<!-- Stats Modal -->
<StatsModal
  :show="showStatsModal"
  :stats="userStats"
  :userId="userId"
  :showResetButton="true"
  @close="closeStats"
  @reset-stats="handleResetStats"
/>

<!-- Result Modal Pop Up -->
<Transition name="scale">
<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
  <div class="bg-zinc-900 text-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative border border-zinc-800 scale-in transition-all duration-500 max-h-[90vh] overflow-y-auto">
    <button @click="showModal = false" aria-label="Tutup" class="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-white/10 transition-all rounded-xl focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <div class="mb-6">
      <div v-if="lastResult === 'win'" class="text-5xl mb-4 animate-bounce">🎉</div>
      <div v-else class="text-5xl mb-4 animate-pulse">😢</div>
      
      <h2 class="text-3xl font-black tracking-tighter uppercase mb-2">
        {{ lastResult === 'win' ? (currentLanguage === 'id' ? 'Selamat!' : 'Splendid!') : (currentLanguage === 'id' ? 'Sayang Sekali' : 'Good Try') }}
      </h2>
      
      <div class="inline-block px-4 py-1.5 bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 border border-white/5">
        {{ lastResult === 'win' ? (currentLanguage === 'id' ? 'Kamu Menang' : 'You Won') : (currentLanguage === 'id' ? 'Kamu Kalah' : 'You Lost') }}
      </div>
    </div>

    <div class="bg-zinc-800/50 p-6 rounded-2xl border border-white/5 mb-8">
      <p class="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-2">
        {{ currentLanguage === 'id' ? 'Kata yang benar' : 'The correct word' }}
      </p>
      <div class="text-3xl font-black tracking-widest uppercase text-blue-400 mb-4">{{ targetWord }}</div>
      <a :href="`/kbbi/${targetWord}`" target="_blank" class="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors group">
        <span>{{ currentLanguage === 'id' ? 'Lihat di KBBI' : 'Look up meaning' }}</span>
        <span class="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-6">
      <button @click="shareResult" class="flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-900/20 active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
        <span>{{ currentLanguage === 'id' ? 'Salin Hasil' : 'Copy Result' }}</span>
      </button>
      <button @click="resetGame(gameMode)" class="flex items-center justify-center gap-2 py-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span>{{ currentLanguage === 'id' ? 'Main Lagi' : 'Play Again' }}</span>
      </button>
    </div>

    <div class="space-y-3">
      <p class="text-[9px] uppercase font-black tracking-[0.2em] text-zinc-500">
        {{ currentLanguage === 'id' ? 'Bagikan ke' : 'Share to' }}
      </p>
      <div class="flex justify-center gap-3">
        <button @click="openShare('whatsapp')" class="p-3 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/20 rounded-xl transition-all active:scale-90" aria-label="Share to WhatsApp">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.191-1.624A11.722 11.722 0 0012.044 23.94h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </button>
        <button @click="openShare('twitter')" class="p-3 bg-zinc-500/10 hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black hover:text-white border border-zinc-500/20 rounded-xl transition-all active:scale-90" aria-label="Share to X (Twitter)">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/></svg>
        </button>
        <button @click="openShare('telegram')" class="p-3 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500/20 rounded-xl transition-all active:scale-90" aria-label="Share to Telegram">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.575-.337.767-.541.786-.448.041-.788-.297-1.223-.582-.68-.445-1.064-.722-1.725-1.157-.763-.503-.268-.78.166-1.233.114-.118 2.086-1.914 2.124-2.077.005-.02.009-.096-.03-.129-.039-.033-.097-.022-.139-.012-.06.014-.95.603-2.681 1.771-.254.174-.483.259-.688.253-.226-.006-.66-.129-.982-.232-.396-.126-.711-.19-.683-.401.014-.11.201-.223.562-.339 2.198-.956 3.663-1.587 4.395-1.893 2.09-.874 2.522-1.025 2.805-1.03.062 0 .201.015.291.097.076.069.097.162.105.233.008.074.011.223.001.32z"/></svg>
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showShareMsg" class="mt-4 py-2 px-4 bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-600/30">
        {{ currentLanguage === 'id' ? 'Hasil disalin ke clipboard!' : 'Copied to clipboard!' }}
      </div>
    </Transition>
  </div>
</div>
</Transition>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import confetti from 'canvas-confetti'
  import { 
    getUserId, 
    recordGameResult, 
    addGameToHistory, 
    getUserStats, 
    resetAllStats,
    getDailyState,
    saveDailyState
  } from '../utils/userStats'
  import StatsModal from './StatsModal.vue'
  import InfoModal from './InfoModal.vue'
  import { useGameLogic } from '../composables/useGameLogic'
  import { useAudio } from '../composables/useAudio'
  import { useShare } from '../composables/useShare'
  import { useTheme } from '../composables/useTheme'
  import { WORD_LENGTH, MAX_ATTEMPTS } from '../constants'
  import { getTodaySeed } from '../utils/dateUtils'

  const { theme, toggleTheme } = useTheme()

  const {
    targetWord,
    guesses,
    currentGuess,
    gameOver,
    usedKeys,
    lastResult,
    gameMode,
    currentLanguage,
    loadWords,
    submitGuess: submitGuessLogic,
    getLetterStatuses,
    resetGame: resetGameLogic,
    toggleLanguage,
    loadDailyState
  } = useGameLogic()

  const {
    playKeySound,
    playSuccessSound,
    playErrorSound,
    playFlipSound
  } = useAudio()

  const {
    showShareMsg,
    shareResult: shareResultLogic,
    openShare: openShareLogic
  } = useShare()

  const shakeRowIndex = ref(null)
  const showModal = ref(false)
  const toast = ref({ show: false, message: '', type: 'info' })
  const showStatsModal = ref(false)
  const showInfoModal = ref(false)
  const showQuickTip = ref(false)
  const isOnline = ref(navigator.onLine)
  const userStats = ref(getUserStats())
  const userId = ref(getUserId())
  const pressedKey = ref('')

  async function shareResult() {
    await shareResultLogic({
      lastResult: lastResult.value,
      guesses: guesses.value,
      maxAttempts: MAX_ATTEMPTS,
      targetWord: targetWord.value,
      getLetterStatuses
    })
  }

  function openShare(app) {
    openShareLogic(app, {
      lastResult: lastResult.value,
      guesses: guesses.value,
      maxAttempts: MAX_ATTEMPTS,
      targetWord: targetWord.value,
      getLetterStatuses
    })
  }

  function showToast(message, type = 'info', duration = 3000) {
    toast.value = { show: true, message, type }
    setTimeout(() => {
      toast.value.show = false
    }, duration)
  }

  function submitGuess() {
    submitGuessLogic({
      onInvalid: (msg, type) => {
        showToast(msg, 'error')
        shakeRowIndex.value = guesses.value.length
        resetShake()
        playErrorSound()
        if (navigator.vibrate) navigator.vibrate(150)
      },
      onWin: () => {
        showToast(`🎉 Selamat! Kamu menang! Cek artinya di <a href="/kbbi/${targetWord.value}" class="text-blue-400 hover:text-blue-300 transition duration-200">KBBI</a>`, 'success')
        showModal.value = true
        recordGameResult(true, guesses.value.length, gameMode.value, getTodaySeed())
        
        if (gameMode.value === 'daily') {
          saveDailyState(getTodaySeed(), {
            guesses: guesses.value,
            gameOver: true,
            lastResult: 'win'
          })
        }

        addGameToHistory({
          word: targetWord.value,
          won: true,
          guesses: guesses.value,
          guessCount: guesses.value.length
        })
        userStats.value = getUserStats()
        playSuccessSound()
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      },
      onLoss: () => {
        showToast(`😢 Kamu kalah. Kata: ${targetWord.value.toUpperCase()} - <a href="/kbbi/${targetWord.value}" class="text-blue-400 hover:text-blue-300 transition duration-200">Lihat di KBBI</a>`, 'error')
        showModal.value = true
        recordGameResult(false, guesses.value.length, gameMode.value, getTodaySeed())
        
        if (gameMode.value === 'daily') {
          saveDailyState(getTodaySeed(), {
            guesses: guesses.value,
            gameOver: true,
            lastResult: 'lose'
          })
        }

        addGameToHistory({
          word: targetWord.value,
          won: false,
          guesses: guesses.value,
          guessCount: guesses.value.length
        })
        userStats.value = getUserStats()
      },
      onFlip: () => {
        playFlipSound()
      }
    })
  }

  function pressKey(key) {
    if (gameOver.value || currentGuess.value.length >= WORD_LENGTH || guesses.value.length >= MAX_ATTEMPTS) return
    currentGuess.value += key.toLowerCase()
    playKeySound()
    pressedKey.value = key.toLowerCase()
    setTimeout(() => { pressedKey.value = '' }, 120)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function pressBackspace() {
    if (currentGuess.value.length > 0 && !gameOver.value) {
      currentGuess.value = currentGuess.value.slice(0, -1)
    }
    playKeySound()
    pressedKey.value = 'backspace'
    setTimeout(() => { pressedKey.value = '' }, 120)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function pressEnter() {
    if (!gameOver.value) submitGuess()
    playKeySound()
    pressedKey.value = 'enter'
    setTimeout(() => { pressedKey.value = '' }, 120)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function resetShake() {
    setTimeout(() => {
      shakeRowIndex.value = null
    }, 500)
  }

  function getLetterDisplay(row, col) {
    if (row === guesses.value.length) {
      return currentGuess.value[col]?.toUpperCase() || ''
    }
    return guesses.value[row]?.[col]?.toUpperCase() || ''
  }

  function getAriaLabel(row, col) {
    const letter = getLetterDisplay(row, col)
    if (!letter) return 'Kosong'

    if (row < guesses.value.length) {
      const statuses = getLetterStatuses(guesses.value[row], targetWord.value.split(''))
      const status = statuses[col]
      let statusText = ''
      if (status === 'correct') statusText = 'Benar'
      if (status === 'present') statusText = 'Salah posisi'
      if (status === 'absent') statusText = 'Tidak ada'
      return `${letter}, ${statusText}`
    }

    return letter
  }

  function getBoxClass(row, col) {
    const guessRow = guesses.value[row]
    if (!guessRow) return 'border-zinc-600'

    const statuses = getLetterStatuses(guessRow, targetWord.value.split(''))
    const status = statuses[col]

    return {
      'bg-green-600 border-green-600 text-white': status === 'correct',
      'bg-yellow-500 border-yellow-500 text-white': status === 'present',
      'bg-zinc-700 border-zinc-700 text-white': status === 'absent'
    }
  }

  function getFlipClass(row, col) {
    const guessRow = guesses.value[row]
    if (!guessRow) return ''
    return 'animate-flip'
  }

  function getKeyClass(letter) {
    const status = usedKeys.value[letter]
    return {
      'bg-green-600 text-white': status === 'correct',
      'bg-yellow-500 text-white': status === 'present',
      'bg-zinc-700 text-white': status === 'absent',
      'bg-zinc-600 text-white': !status
    }
  }

  function handlePhysicalKeyboard(e) {
    if (gameOver.value) return

    const key = e.key.toLowerCase()

    if (key === 'enter') {
      pressEnter()
    } else if (key === 'backspace') {
      pressBackspace()
    } else if (/^[a-z]$/.test(key)) {
      pressKey(key)
    }
  }

  const handleOffline = () => { isOnline.value = false }
  const handleOnline = () => { isOnline.value = true }

  onMounted(async () => {
    await loadWords()
    checkDailyState()

    window.addEventListener('keydown', handlePhysicalKeyboard)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    // Show quick tip on first visit
    const visited = localStorage.getItem('katla_visited')
    if (!visited) {
      showQuickTip.value = true
      localStorage.setItem('katla_visited', 'true')
    }

    console.log('%cUser ID: ' + userId.value, 'color: blue; font-weight: bold;')
    console.warn('%cJangan curang!','color: red; font-size: 2em; font-weight: bold;')
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handlePhysicalKeyboard)
    window.removeEventListener('offline', handleOffline)
    window.removeEventListener('online', handleOnline)
  })

  function dismissQuickTip() {
    showQuickTip.value = false
  }

  function checkDailyState() {
    if (gameMode.value === 'daily') {
      const savedState = getDailyState(getTodaySeed())
      if (savedState) {
        loadDailyState(savedState)
        if (savedState.gameOver) {
          setTimeout(() => {
            showModal.value = true
          }, 1000)
        }
      }
    }
  }

  function resetGame(mode = 'random') {
    resetGameLogic(mode)
    toast.value = { show: false, message: '', type: 'info' }
    showModal.value = false
    shakeRowIndex.value = null
    
    // Check for saved state if switching back to daily
    if (mode === 'daily') {
      checkDailyState()
    }
  }

  function openStats() {
    userStats.value = getUserStats()
    showStatsModal.value = true
  }

  function closeStats() {
    showStatsModal.value = false
  }

  function handleResetStats() {
    if (confirm('Yakin ingin reset semua statistik? Aksi ini tidak bisa dibatalkan!')) {
      resetAllStats()
      userStats.value = getUserStats()
      showToast('Statistik berhasil direset!', 'info')
    }
  }

  function openInfo() {
    showInfoModal.value = true
  }

  function closeInfo() {
    showInfoModal.value = false
  }

  function skipWord() {
    const confirmMsg = currentLanguage.value === 'id' 
      ? 'Muat kata baru? (Ini akan beralih ke mode Random)' 
      : 'Load new word? (This will switch to Random mode)'
    const toastMsg = currentLanguage.value === 'id'
      ? 'Kata baru dimuat! 🎯'
      : 'New word loaded! 🎯'

    if (confirm(confirmMsg)) {
      // Record as loss if they already made guesses
      if (guesses.value.length > 0) {
        addGameToHistory({
          word: targetWord.value,
          won: false,
          guesses: guesses.value,
          guessCount: guesses.value.length
        })
      }
      resetGame('random')
      showToast(toastMsg, 'info')
    }
  }
</script>

<style scoped>
  .key.bg-green-600 { background-color: #538d4e !important; }
  .key.bg-yellow-500 { background-color: #b59f3b !important; }
  .key.bg-zinc-700 { background-color: #27272a !important; }
  
  .light .key.bg-zinc-700 { background-color: #3f3f46 !important; }

  .key:hover {
    filter: brightness(1.1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .key.active {
    transform: scale(0.95);
    filter: brightness(0.9);
  }

  /* Box Status Colors */
  .bg-green-600 { background-color: #538d4e !important; border-color: #538d4e !important; }
  .bg-yellow-500 { background-color: #b59f3b !important; border-color: #b59f3b !important; }
  .bg-zinc-700 { background-color: #27272a !important; border-color: #27272a !important; }
  
  .light .bg-zinc-700 { background-color: #3f3f46 !important; border-color: #3f3f46 !important; }
  .light .border-zinc-600 { border-color: #d4d4d8; }
  .dark .border-zinc-600 { border-color: #3f3f46; }

  /* Toast Transition */
  .toast-enter-active, .toast-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .toast-enter-from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  .toast-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
  }

  /* Fade and Scale Transitions */
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }

  .scale-enter-active, .scale-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .scale-enter-from, .scale-leave-to { transform: scale(0.9); opacity: 0; }

  @keyframes scale-in {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .scale-in {
    animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes pulse-subtle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.02); }
  }
  .animate-pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
</style>
