<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownViewer from './components/MarkdownViewer.vue'
import { BApp } from 'bootstrap-vue-next'
// Liste dynamique des catégories + fichiers
const categories = ref<Record<string, any[]>>({})

// fiche sélectionnée
const selected = ref(null)

// menus
const mobileMenu = ref(false)
const desktopMenu = ref(true)

// Thème sombre
const dark = ref(false)

onMounted(async () => {
  dark.value = localStorage.getItem('theme') !== 'light'
  document.documentElement.setAttribute('data-bs-theme', dark.value ? 'dark' : 'light')

  // Gestion dynamique du contenu
  try {
    const response = await fetch('/content.json')
    if (response.ok) {
      categories.value = await response.json()
    }
  } catch (e) {
    console.error("Impossible de charger le sommaire", e)
  }
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
        <div class="container-fluid justify-content-between">
          <button class="navbar-toggler" type="button" @click="mobileMenu = true">
            <span class="navbar-toggler-icon"></span>
          </button>
          <h1 class="mb-0 h1 mx-auto">ETML Wiki</h1>
          <button @click="toggleTheme" class="btn fs-5" style="width: 42px;">
            {{ dark ? '☀️' : '🌙' }}
          </button>
        </div>
      </nav>

      <!-- Desktop top-bar -->
      <nav class="navbar d-none d-md-flex border-bottom">
        <div class="container-fluid justify-content-between">
          <button class="navbar-toggler" type="button" @click="desktopMenu = !desktopMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <h1 class="mb-0 h1 mx-auto">ETML Wiki</h1>
          <button @click="toggleTheme" class="btn fs-5" style="width: 42px;">
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
              <div style="width: 40px;"></div> <!-- Placeholder for centering -->
              <h1 class="mb-0 h1 mx-auto">ETML Wiki</h1>
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
        <aside v-if="desktopMenu" class="d-none d-md-flex flex-column border-end p-3 overflow-y-auto"
          style="width: 16rem;">

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
