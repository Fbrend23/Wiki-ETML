<script setup>
import { ref, onMounted, computed } from 'vue'
import MarkdownViewer from './components/MarkdownViewer.vue'
import { BApp } from 'bootstrap-vue-next'
// Import du logo
import logoSrc from './assets/livres.png'

const categories = ref({})
const selected = ref(null)

// Menus
const mobileMenu = ref(false)
const desktopMenu = ref(true)

// Thème sombre
const dark = ref(false)

// Regroupement hiérarchique + Tri "Général" en premier
const groupedCategories = computed(() => {
  const groups = {}

  // 1. Groupement
  for (const [fullKey, files] of Object.entries(categories.value)) {
    const parts = fullKey.split(' > ')
    const mainCat = parts[0]
    const subCat = parts[1] || 'Général'

    if (!groups[mainCat]) {
      groups[mainCat] = {}
    }
    groups[mainCat][subCat] = files
  }

  // 2. Tri
  const sortedGroups = {}

  // On trie les catégories principales
  Object.keys(groups).sort().forEach(mainCat => {
    const subCats = groups[mainCat]
    const sortedSubCats = {}

    // Force 'Général' en premier
    if (subCats['Général']) {
      sortedSubCats['Général'] = subCats['Général']
    }

    // Les autres sous-catégories par ordre alphabétique
    Object.keys(subCats)
      .filter(k => k !== 'Général')
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .forEach(k => {
        sortedSubCats[k] = subCats[k]
      })

    sortedGroups[mainCat] = sortedSubCats
  })

  return sortedGroups
})

onMounted(async () => {
  dark.value = localStorage.getItem('theme') !== 'light'
  document.documentElement.setAttribute('data-bs-theme', dark.value ? 'dark' : 'light')

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
    <div class="d-flex flex-column vh-100 bg-body">
      <a href="https://github.com/Fbrend23/Wiki-ETML" target="_blank"
        class="github-float d-flex align-items-center justify-content-center text-decoration-none shadow-lg"
        title="Voir le code source">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-github"
          viewBox="0 0 16 16">
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </a>
      <nav class="navbar d-md-none border-bottom bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler border-0" type="button" @click="mobileMenu = true">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="d-flex align-items-center gap-2 mx-auto">
            <img :src="logoSrc" alt="Logo" width="30" height="30">
            <h1 class="mb-0 h5 fw-bold">Wiki ETML</h1>
          </div>
          <button @click="toggleTheme" class="btn btn-link text-decoration-none fs-5 p-0">
            {{ dark ? '🌙' : '☀️' }}
          </button>
        </div>
      </nav>

      <nav class="navbar d-none d-md-flex border-bottom bg-body-tertiary px-3 position-relative justify-content-between"
        style="height: 64px;">

        <button class="btn btn-outline-secondary fs-4 py-0 px-3" @click="desktopMenu = !desktopMenu">
          ☰
        </button>

        <div class="position-absolute start-50 translate-middle-x d-flex align-items-center gap-2">
          <img :src="logoSrc" alt="Logo" width="32" height="32">
          <h1 class="mb-0 h5 fw-bold">ETML Wiki</h1>
        </div>

        <button @click="toggleTheme" class="btn btn-link text-decoration-none fs-5">
          {{ dark ? '🌙' : '☀️' }}
        </button>
      </nav>

      <transition name="fade">
        <aside v-if="mobileMenu" class="position-fixed top-0 start-0 w-100 h-100 d-md-none" style="z-index: 1040;">
          <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" @click="mobileMenu = false"></div>
          <div class="h-100 bg-body shadow-lg position-relative d-flex flex-column"
            style="width: 85%; max-width: 320px;">
            <div class="p-3 border-bottom d-flex justify-content-between align-items-center bg-body-tertiary">
              <span class="fw-bold">Menu</span>
              <button @click="mobileMenu = false" class="btn-close"></button>
            </div>
            <div class="p-3 overflow-y-auto flex-grow-1">
              <div v-for="(subCats, mainCat) in groupedCategories" :key="mainCat" class="mb-4">
                <div class="d-flex align-items-center gap-2 mb-2 text-primary">
                  <h3 class="fw-bold fs-5 mb-0">{{ mainCat }}</h3>
                </div>

                <div v-for="(files, subCat) in subCats" :key="subCat" class="mb-3 ps-2 border-start ms-2">
                  <h4 v-if="subCat !== 'Général' || Object.keys(subCats).length > 1"
                    class="fw-bold mb-2 text-body-secondary ps-2" style="font-size: 1.15rem;">
                    {{ subCat }}
                  </h4>

                  <ul class="list-unstyled mb-0">
                    <li v-for="f in files" :key="f.file">
                      <button
                        class="nav-link-custom w-100 text-start px-3 py-2 rounded mb-1 d-flex align-items-center gap-2"
                        :class="{ 'active': selected === f.file }" @click="selected = f.file; mobileMenu = false">
                        <span class="text-truncate" style="font-size: 0.95rem;">{{ f.name }}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </transition>

      <div class="d-flex flex-grow-1 overflow-hidden">

        <aside v-if="desktopMenu" class="d-none d-md-flex flex-column border-end bg-body-tertiary overflow-y-auto"
          style="width: 320px; transition: width 0.3s;">
          <div class="p-3">
            <div v-for="(subCats, mainCat) in groupedCategories" :key="mainCat" class="mb-4">
              <div class="d-flex align-items-center gap-2 mb-2 px-2 text-primary">
                <h3 class="fw-bold fs-5 mb-0">{{ mainCat }}</h3>
              </div>

              <div v-for="(files, subCat) in subCats" :key="subCat" class="mb-3 ps-2 border-start ms-3">
                <h4 v-if="subCat !== 'Général' || Object.keys(subCats).length > 1"
                  class="fw-bold mb-1 mt-2 text-body-secondary px-2" style="font-size: 1.15rem; padding-left: 0.5rem;">
                  {{ subCat }}
                </h4>

                <ul class="list-unstyled mb-0">
                  <li v-for="f in files" :key="f.file">
                    <button
                      class="nav-link-custom w-100 text-start px-2 py-1 rounded mb-1 d-flex align-items-center gap-2"
                      style="margin-left: 0.5rem;" :class="{ 'active': selected === f.file }"
                      @click="selected = f.file">
                      <span class="text-truncate fw-medium" style="font-size: 0.95rem;">{{ f.name }}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        <main class="flex-grow-1 p-0 overflow-y-auto bg-body position-relative">
          <div class="container-md py-5" style="max-width: 900px;">
            <MarkdownViewer v-if="selected" :file="selected" />

            <div v-else class="text-center mt-5 pt-5 text-muted">
              <div class="fs-1 mb-3">📚</div>
              <h2 class="h4">Bienvenue sur le Wiki ETML</h2>
              <p>Sélectionnez un cours dans le menu pour commencer.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </BApp>
</template>

<style>
/* --- PERSONNALISATION DU THEME --- */
:root {
  /* Mode CLAIR : Blanc pur et Bleu Nuit */
  --bs-primary: #2c3e50;
  --bs-primary-rgb: 44, 62, 80;

  /* Fond BLANC PUR (plus de gris clair) */
  --bs-body-bg: #ffffff;

  /* Sidebar en gris très très léger pour détacher */
  --bs-tertiary-bg: #f8f9fa;

  --bs-link-color: #2c3e50;
  --bs-link-hover-color: #34495e;
}

[data-bs-theme="dark"] {
  /* Mode SOMBRE : Bleu Moderne et Fond Sombre Profond */
  --bs-primary: #60a5fa;
  /* Bleu plus vif */
  --bs-primary-rgb: 96, 165, 250;

  /* Fond "Slate" foncé (Bleu nuit très sombre) au lieu de gris moche */
  --bs-body-bg: #0f172a;
  --bs-body-color: #e2e8f0;

  /* Sidebar légèrement plus claire */
  --bs-tertiary-bg: #1e293b;

  --bs-link-color: #60a5fa;
  --bs-link-hover-color: #93c5fd;
  --bs-border-color: #334155;
  /* Bordures plus douces */
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Boutons de navigation */
.nav-link-custom {
  background: transparent;
  border: none;
  color: var(--bs-body-color);
  transition: all 0.2s ease;
  opacity: 0.9;
}

.nav-link-custom:hover {
  background-color: var(--bs-secondary-bg);
  opacity: 1;
  color: var(--bs-primary);
}

.nav-link-custom.active {
  /* Fond subtil au lieu d'un bloc solide, plus élégant */
  background-color: var(--bs-primary-bg-subtle);
  color: var(--bs-primary-text-emphasis);
  font-weight: 600;
  opacity: 1;
  border-right: 3px solid var(--bs-primary);
  /* Petit indicateur à droite */
}

/* Scrollbar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background-color: var(--bs-secondary-bg);
  border-radius: 10px;
}

.github-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: var(--bs-body-color);
  color: var(--bs-body-bg);
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1050;
}

.github-float:hover {
  transform: scale(1.15) rotate(10deg);
  background-color: var(--bs-primary);
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}


@media (max-width: 768px) {
  .github-float {
    bottom: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
  }
}
</style>