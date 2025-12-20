<script setup>
import { ref, computed } from 'vue'
import { BModal, BButton, BProgress } from 'bootstrap-vue-next'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  quiz: {
    type: Object,
    required: true,
    default: () => ({ title: 'Quiz', questions: [] })
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const currentQuestionIndex = ref(0)
const selectedOption = ref(null)
const isAnswered = ref(false)
const score = ref(0)
const showResult = ref(false)

const currentQuestion = computed(() => {
  return props.quiz.questions[currentQuestionIndex.value]
})

const progress = computed(() => {
  return ((currentQuestionIndex.value) / props.quiz.questions.length) * 100
})

function selectOption(index) {
  if (isAnswered.value) return
  selectedOption.value = index
}

function validateAnswer() {
  if (selectedOption.value === null) return

  isAnswered.value = true
  if (selectedOption.value === currentQuestion.value.correctAnswer) {
    score.value++
  }
}

function nextQuestion() {
  selectedOption.value = null
  isAnswered.value = false

  if (currentQuestionIndex.value < props.quiz.questions.length - 1) {
    currentQuestionIndex.value++
  } else {
    showResult.value = true
  }
}

function resetQuiz() {
  currentQuestionIndex.value = 0
  selectedOption.value = null
  isAnswered.value = false
  score.value = 0
  showResult.value = false
}

function close() {
  isOpen.value = false
  resetQuiz()
}
</script>

<template>
  <BModal v-model="isOpen" :title="quiz.title" size="lg" footer-class="d-none" @hide="resetQuiz" centered>
    <div v-if="!showResult">
      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="d-flex justify-content-between text-muted small mb-1">
          <span>Question {{ currentQuestionIndex + 1 }} / {{ quiz.questions.length }}</span>
          <span>{{ Math.round(progress) }}%</span>
        </div>
        <BProgress :value="progress" height="8px" variant="primary" />
      </div>

      <!-- Question -->
      <h4 class="mb-4 fw-bold">{{ currentQuestion.text }}</h4>

      <!-- Options -->
      <div class="d-grid gap-3 mb-4">
        <button v-for="(option, index) in currentQuestion.options" :key="index" @click="selectOption(index)"
          class="btn text-start p-3 position-relative border" :class="{
            'btn-outline-primary': !isAnswered && selectedOption !== index,
            'btn-primary': !isAnswered && selectedOption === index,
            'btn-success': isAnswered && index === currentQuestion.correctAnswer,
            'btn-danger': isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer,
            'btn-light text-muted': isAnswered && index !== currentQuestion.correctAnswer && selectedOption !== index
          }" :disabled="isAnswered">
          <span class="fw-bold me-2">{{ ['A', 'B', 'C', 'D'][index] }}.</span> {{ option }}

          <!-- Feedback Icons -->
          <span v-if="isAnswered && index === currentQuestion.correctAnswer"
            class="position-absolute top-50 end-0 translate-middle-y me-3">
            ✅
          </span>
          <span v-if="isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer"
            class="position-absolute top-50 end-0 translate-middle-y me-3">
            ❌
          </span>
        </button>
      </div>

      <!-- Explanation & Next Button -->
      <transition name="fade">
        <div v-if="isAnswered" class="bg-body-tertiary p-3 rounded mb-3 border">
          <div class="fw-bold mb-1"
            :class="selectedOption === currentQuestion.correctAnswer ? 'text-success' : 'text-danger'">
            {{ selectedOption === currentQuestion.correctAnswer ? 'Bonne réponse !' : 'Mauvaise réponse...' }}
          </div>
          <p class="mb-0 small text-muted">{{ currentQuestion.explanation }}</p>
        </div>
      </transition>

      <div class="d-flex justify-content-center mt-4">
        <BButton v-if="!isAnswered" variant="primary" size="lg" :disabled="selectedOption === null"
          @click="validateAnswer">
          Valider
        </BButton>
        <BButton v-else variant="primary" size="lg" @click="nextQuestion">
          {{ currentQuestionIndex < quiz.questions.length - 1 ? 'Question Suivante' : 'Voir les Résultats' }} </BButton>
      </div>
    </div>

    <!-- Results Screen -->
    <div v-else class="text-center py-4">
      <div class="mb-4 display-1">
        {{ score >= quiz.questions.length / 2 ? '🎉' : '📚' }}
      </div>
      <h3 class="fw-bold mb-3">Quiz Terminé !</h3>
      <p class="lead mb-4">
        Votre score : <span class="fw-bold"
          :class="score === quiz.questions.length ? 'text-success' : 'text-primary'">{{ score }} / {{
            quiz.questions.length }}</span>
      </p>

      <div class="d-flex justify-content-center gap-3">
        <BButton variant="outline-secondary" @click="close">Fermer</BButton>
        <BButton variant="primary" @click="resetQuiz">Recommencer</BButton>
      </div>
    </div>




  </BModal>
</template>

<style scoped>
.btn {
  transition: all 0.2s ease;
}
</style>
