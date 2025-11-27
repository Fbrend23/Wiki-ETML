<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownViewer from './components/MarkdownViewer.vue'
import { BApp } from 'bootstrap-vue-next'
// Liste dynamique des catégories + fichiers
const categories = {
  DevOps: [
    { name: 'Lean', file: '/markdown/DevOps-324/1-lean.md' },
    { name: 'DevOps', file: '/markdown/DevOps-324/2-devops.md' },
    { name: 'Git', file: '/markdown/DevOps-324/3-git.md' },
  ],
  Web: [],
  POO: [],
}

// fiche sélectionnée
const selected = ref(null)

// menus
const mobileMenu = ref(false)

// Thème sombre
const dark = ref(false)

onMounted(() => {
  dark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.setAttribute('data-bs-theme', dark.value ? 'dark' : 'light')
})

function toggleTheme() {
  dark.value = !dark.value
  const theme = dark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme)
  localStorage.setItem('theme', theme)
}
</script>

<template>
  <BApp>
    <div class="d-flex flex-column vh-100">

      <!-- Mobile top-bar -->
      <nav class="navbar d-md-none border-bottom">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" @click="mobileMenu = true">
            <span class="navbar-toggler-icon"></span>
          </button>
          <span class="navbar-brand mb-0 h1">Révisions</span>
          <button @click="toggleTheme" class="btn fs-5">
            {{ dark ? '☀️' : '🌙' }}
          </button>
        </div>
      </nav>

      <!-- SIDEBAR MOBILE (overlay) -->
      <transition name="fade">
        <aside v-if="mobileMenu" class="position-fixed top-0 start-0 w-100 h-100 d-md-none"
          @click.self="mobileMenu = false" style="z-index: 1040;">
          <div class="h-100 p-3 shadow-lg overflow-y-auto bg-body w-100">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="h4 fw-bold">Révisions</h2>
              <button @click="mobileMenu = false" class="btn-close"></button>
            </div>

            <button class="mb-4 w-100 btn btn-secondary py-2 rounded" @click="toggleTheme">
              {{ dark ? '☀️ Mode clair' : '🌙 Mode sombre' }}
            </button>

            <div v-for="(files, category) in categories" :key="category" class="mb-4">
              <h3 class="fw-semibold fs-5 mb-2">{{ category }}</h3>
              <ul class="list-unstyled">
                <li v-for="f in files" :key="f.file">
                  <button class="w-100 text-start px-2 py-1 rounded text-decoration-none"
                    :class="{ 'btn btn-primary': selected === f.file, 'btn btn-link text-body': selected !== f.file }"
                    @click="selected = f.file; mobileMenu = false">
                    {{ f.name }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </transition>

      <div class="d-flex flex-grow-1 overflow-hidden">
        <!-- SIDEBAR DESKTOP -->
        <aside class="d-none d-md-flex flex-column border-end p-3 overflow-y-auto" style="width: 16rem;">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="h4 fw-bold">Révisions</h2>
            <button @click="toggleTheme" class="btn fs-5">
              {{ dark ? '☀️' : '🌙' }}
            </button>
          </div>

          <div v-for="(files, category) in categories" :key="category" class="mb-4">
            <h3 class="fw-semibold fs-5 mb-2">{{ category }}</h3>
            <ul class="list-unstyled">
              <li v-for="f in files" :key="f.file">
                <button class="w-100 text-start px-2 py-1 rounded text-decoration-none"
                  :class="{ 'btn btn-primary': selected === f.file, 'btn btn-link text-body': selected !== f.file }"
                  @click="selected = f.file">
                  {{ f.name }}
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <!-- CONTENT -->
        <main class="flex-grow-1 p-4 overflow-y-auto">
          <MarkdownViewer v-if="selected" :file="selected" />
          <p v-else class="text-muted text-center mt-5">Sélectionne une fiche dans la liste</p>
        </main>
      </div>
    </div>
  </BApp>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
