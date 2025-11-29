<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
    file: {
        type: String,
        required: true,
    }
})

const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
})

const html = ref('')

// Calcul automatique du chemin vers le MP3
// Transforme "/markdown/Dossier/mon-cours.md" -> "/audio/mon-cours.mp3"
const audioSrc = computed(() => {
    if (!props.file) return null
    // Récupère le nom du fichier sans le chemin
    const filename = props.file.split('/').pop()
    if (!filename) return null

    // Remplace l'extension .md par .mp3
    const mp3Name = filename.replace('.md', '.mp3')

    return `/audio/${mp3Name}`
})

async function load() {
    if (!props.file) return
    try {
        const text = await fetch(props.file).then(res => res.text())
        html.value = md.render(text)
    } catch (e) {
        html.value = "<div class='alert alert-danger'>Erreur de chargement du contenu</div>"
    }
}

// charge au montage
onMounted(load)

// recharge quand le fichier change
watch(() => props.file, load)
</script>

<template>
    <div class="markdown-body position-relative">

        <div v-if="audioSrc" class="card border-0 shadow-sm mb-4 bg-body-tertiary">
            <div class="card-body d-flex align-items-center gap-3 py-2">
                <div class="fs-2">🎧</div>
                <div class="flex-grow-1">
                    <h6 class="mb-1 small text-muted fw-bold text-uppercase" style="letter-spacing: 0.5px;">
                        Version Audio
                    </h6>
                    <audio controls :src="audioSrc" class="w-100" style="height: 32px;"></audio>
                </div>
            </div>
        </div>

        <article v-html="html"></article>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.markdown-body {
    font-family: 'Inter', sans-serif;
    line-height: 1.7;
}

article h1,
article h2,
article h3,
article h4,
article h5,
article h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.3;
}

article h1 {
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--bs-border-color);
}

article h2 {
    padding-bottom: .4rem;
    border-bottom: 1px solid var(--bs-border-color);
}

article p {
    margin-bottom: 1rem;
}

article a {
    color: var(--bs-primary);
    font-weight: 500;
    text-decoration: underline;
    text-decoration-color: var(--bs-primary-border-subtle);
    transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

article a:hover {
    color: var(--bs-primary-text-emphasis);
    text-decoration-color: var(--bs-primary-text-emphasis);
}

article blockquote {
    padding: 0.75rem 1.25rem;
    margin: 0 0 1rem;
    border-left: 0.25rem solid var(--bs-primary-border-subtle);
    color: var(--bs-secondary-color);
    background-color: var(--bs-tertiary-bg);
    border-radius: 0.375rem;
}

article pre {
    background-color: var(--bs-tertiary-bg);
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    overflow-x: auto;
    border: 1px solid var(--bs-border-color);
}

article code {
    background-color: var(--bs-tertiary-bg);
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    border-radius: 6px;
    border: 1px solid var(--bs-border-color-translucent);
}

article pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    background: none;
    border-radius: 0;
    border: none;
}

article table {
    width: 100%;
    margin-bottom: 1rem;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid var(--bs-border-color);
    border-radius: 0.375rem;
}

article th,
article td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid var(--bs-border-color);
    text-align: left;
}

article thead th {
    vertical-align: bottom;
    border-top: none;
    font-weight: 600;
}

article tbody tr:nth-of-type(odd) {
    background-color: var(--bs-tertiary-bg);
}

article tbody tr:first-child td {
    border-top: none;
}

article ul,
article ol {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
}

article li {
    margin-bottom: 0.5rem;
}

article ul {
    list-style: none;
}

article ul li::before {
    content: "–";
    color: var(--bs-primary);
    font-weight: 700;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
}

article ol {
    list-style: none;
    counter-reset: item;
}

article ol li {
    counter-increment: item;
}

article ol li::before {
    content: counter(item) ".";
    color: var(--bs-primary);
    font-weight: 700;
    display: inline-block;
    width: 1.5em;
    margin-left: -1.5em;
}

article hr {
    height: .125rem;
    border: 0;
    background-color: var(--bs-border-color);
    opacity: 0.5;
    margin: 3rem 0;
}

article img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px var(--bs-tertiary-color);
    margin: 1rem 0;
}

.markdown-body article {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}
</style>