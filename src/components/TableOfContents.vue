<script setup>
import { watch, nextTick } from 'vue'

const props = defineProps({
    headers: {
        type: Array, // [{ id, text, level, slug }]
        default: () => []
    },
    activeId: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['toc-click'])

function scrollToHeader(id) {
    emit('toc-click', id)
}

watch(() => props.activeId, async (newId) => {
    if (newId) {
        await nextTick()

        // Select specifically the active link in THIS component scope
        const container = document.querySelector('.toc-container')
        if (container) {
            const active = container.querySelector('.active')
            if (active) {
                active.scrollIntoView({ block: 'center', behavior: 'smooth' })
            }
        }
    }
})
</script>

<template>
    <nav class="toc-container p-3 border-start h-100 overflow-y-auto">
        <h5 class="fw-bold mb-3 small text-uppercase text-muted">Sur cette page</h5>

        <ul class="list-unstyled mb-0 d-flex flex-column gap-2" v-if="headers.length">
            <li v-for="h in headers" :key="h.slug" :class="['toc-item', `toc-level-${h.level}`]">
                <a href="#" @click.prevent="scrollToHeader(h.slug)" class="text-decoration-none d-block text-truncate"
                    :class="{ 'active': activeId === h.slug }">
                    {{ h.text }}
                </a>
            </li>
        </ul>
        <div v-else class="text-muted small fst-italic">
            Aucune section détectée
        </div>
    </nav>
</template>

<style scoped>
.toc-container {
    font-size: 0.9rem;
    max-width: 250px;
}

.toc-item a {
    color: var(--bs-secondary);
    border-left: 2px solid transparent;
    padding-left: 0.75rem;
    transition: all 0.2s;
}

.toc-item a:hover {
    color: var(--bs-primary);
    border-left-color: var(--bs-primary-border-subtle);
}

.toc-item a.active {
    color: var(--bs-primary);
    border-left-color: var(--bs-primary);
    font-weight: 600;
}

/* Indentation visuelle */
.toc-level-3 {
    padding-left: 0.75rem;
    font-size: 0.85rem;
}

.toc-level-4 {
    padding-left: 1.5rem;
    font-size: 0.8rem;
}
</style>
