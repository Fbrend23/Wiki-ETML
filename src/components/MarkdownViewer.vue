<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
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

async function load() {
    if (!props.file) return
    const text = await fetch(props.file).then(res => res.text())
    html.value = md.render(text)
}

// charge au montage
onMounted(load)

// recharge quand le fichier change
watch(() => props.file, load)
</script>

<template>
    <article v-html="html"></article>
</template>
