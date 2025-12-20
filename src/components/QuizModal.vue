<script setup>
import { ref, computed, watch } from 'vue'
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

const shuffledQuestions = ref([])

const currentQuestion = computed(() => {
  return shuffledQuestions.value[currentQuestionIndex.value]
})

function shuffleArray(questions) {
  // Deep copy first
  const shuffledQs = JSON.parse(JSON.stringify(questions));

  // 1. Shuffle the order of questions
  for (let i = shuffledQs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQs[i], shuffledQs[j]] = [shuffledQs[j], shuffledQs[i]];
  }

  // 2. Shuffle options within each question
  shuffledQs.forEach(q => {
    // Pair options with their original index to track the correct answer
    const optionsWithIndex = q.options.map((opt, idx) => ({ opt, originalIdx: idx }));

    // Shuffle the options
    for (let i = optionsWithIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
    }

    // Update the question's options with the shuffled text
    q.options = optionsWithIndex.map(o => o.opt);

    // Create a map: originalIndex -> newIndex
    const indexMap = {};
    optionsWithIndex.forEach((item, newIdx) => {
      indexMap[item.originalIdx] = newIdx;
    });

    // Remap the correctAnswer(s) to the new positions
    if (Array.isArray(q.correctAnswer)) {
      q.correctAnswer = q.correctAnswer.map(oldIdx => indexMap[oldIdx]);
    } else {
      q.correctAnswer = indexMap[q.correctAnswer];
    }
  });

  return shuffledQs;
}

// Initial shuffle when quiz changes or modal opens
watch(() => props.quiz, (newQuiz) => {
  if (newQuiz && newQuiz.questions) {
    shuffledQuestions.value = shuffleArray(newQuiz.questions)
  }
}, { immediate: true })

// Also shuffle when modal opens via v-model
watch(isOpen, (val) => {
  if (val) {
    shuffledQuestions.value = shuffleArray(props.quiz.questions)
    resetQuizState()
  }
})

const progress = computed(() => {
  return ((currentQuestionIndex.value) / shuffledQuestions.value.length) * 100
})


function selectOption(index) {
  if (isAnswered.value) return

  const correct = currentQuestion.value.correctAnswer
  const isMulti = Array.isArray(correct)

  if (isMulti) {
    // Toggle selection
    if (!selectedOption.value) selectedOption.value = []
    // Ensure it's an array (legacy check)
    if (!Array.isArray(selectedOption.value)) selectedOption.value = []

    const idx = selectedOption.value.indexOf(index)
    if (idx === -1) {
      selectedOption.value = [...selectedOption.value, index]
    } else {
      selectedOption.value = selectedOption.value.filter(i => i !== index)
    }
  } else {
    // Single select
    selectedOption.value = index
  }
}

function validateAnswer() {
  if (selectedOption.value === null) return
  const correct = currentQuestion.value.correctAnswer
  const isMulti = Array.isArray(correct)

  isAnswered.value = true

  if (isMulti) {
    // Compare arrays (sort both to be sure)
    const sortedSelected = [...selectedOption.value].sort()
    const sortedCorrect = [...correct].sort()

    const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)
    if (isCorrect) score.value++
  } else {
    // Single compare
    if (selectedOption.value === correct) {
      score.value++
    }
  }
}

function nextQuestion() {
  selectedOption.value = null
  isAnswered.value = false

  if (currentQuestionIndex.value < shuffledQuestions.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    showResult.value = true
  }
}

function resetQuizState() {
  currentQuestionIndex.value = 0
  selectedOption.value = null
  isAnswered.value = false
  score.value = 0
  showResult.value = false
}

function resetQuiz() {
  shuffledQuestions.value = shuffleArray(props.quiz.questions)
  resetQuizState()
}

function close() {
  isOpen.value = false
  resetQuiz()
}

function reportIssue() {
  const q = currentQuestion.value
  const title = encodeURIComponent(`Problème Quiz: ${props.quiz.title}`)
  const body = encodeURIComponent(`Question ID: ${q.id}\nTexte: ${q.text}\n\nDescription du problème: \n`)
  window.open(`https://github.com/Fbrend23/Wiki-ETML/issues/new?title=${title}&body=${body}`, '_blank')
}
</script>

<template>
  <BModal v-model="isOpen" :title="quiz.title" size="lg" footer-class="d-none" @hide="resetQuiz" centered>
    <div v-if="!showResult" class="quiz-container">
      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="d-flex justify-content-between text-muted small mb-1">
          <span>Question {{ currentQuestionIndex + 1 }} / {{ shuffledQuestions.length }}</span>
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
            // Selection state
            'btn-outline-primary': !isAnswered && (Array.isArray(selectedOption) ? !selectedOption.includes(index) : selectedOption !== index),
            'btn-primary': !isAnswered && (Array.isArray(selectedOption) ? selectedOption.includes(index) : selectedOption === index),

            // Result state
            'btn-success': isAnswered && (Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.includes(index) : index === currentQuestion.correctAnswer),
            'btn-danger': isAnswered &&
              (Array.isArray(selectedOption) ? selectedOption.includes(index) && !currentQuestion.correctAnswer.includes(index) : selectedOption === index && index !== currentQuestion.correctAnswer),
            'btn-light text-muted': isAnswered &&
              (Array.isArray(currentQuestion.correctAnswer) ? !currentQuestion.correctAnswer.includes(index) && !selectedOption.includes(index) : index !== currentQuestion.correctAnswer && selectedOption !== index)
          }" :disabled="isAnswered">
          <span class="fw-bold me-2">
            <template v-if="Array.isArray(currentQuestion.correctAnswer)">
              {{ (Array.isArray(selectedOption) && selectedOption.includes(index)) ? '☑' : '☐' }}
            </template>
            <template v-else>
              {{ ['A', 'B', 'C', 'D'][index] }}.
            </template>
          </span>
          {{ option }}

          <!-- Feedback Icons -->
          <span
            v-if="isAnswered && (Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.includes(index) : index === currentQuestion.correctAnswer)"
            class="position-absolute top-50 end-0 translate-middle-y me-3">
            ✅
          </span>
          <span
            v-if="isAnswered && (Array.isArray(selectedOption) ? selectedOption.includes(index) && !currentQuestion.correctAnswer.includes(index) : selectedOption === index && index !== currentQuestion.correctAnswer)"
            class="position-absolute top-50 end-0 translate-middle-y me-3">
            ❌
          </span>
        </button>
      </div>

      <!-- Explanation & Next Button -->
      <transition name="fade">
        <div v-if="isAnswered" class="bg-body-tertiary p-3 rounded mb-3 border">
          <div class="fw-bold mb-1" :class="(Array.isArray(currentQuestion.correctAnswer) ?
            (JSON.stringify([...selectedOption].sort()) === JSON.stringify([...currentQuestion.correctAnswer].sort())) :
            selectedOption === currentQuestion.correctAnswer) ? 'text-success' : 'text-danger'">
            {{ (Array.isArray(currentQuestion.correctAnswer) ?
              (JSON.stringify([...selectedOption].sort()) === JSON.stringify([...currentQuestion.correctAnswer].sort()))
              :
              selectedOption === currentQuestion.correctAnswer) ? 'Bonne réponse !' : 'Mauvaise réponse...' }}
          </div>
          <p class="mb-0 small text-muted">{{ currentQuestion.explanation }}</p>
        </div>
      </transition>

      <div class="d-flex justify-content-center mt-4">
        <BButton v-if="!isAnswered" variant="primary" size="lg"
          :disabled="selectedOption === null || (Array.isArray(selectedOption) && selectedOption.length === 0)"
          @click="validateAnswer">
          Valider
        </BButton>
        <BButton v-else variant="primary" size="lg" @click="nextQuestion">
          {{ currentQuestionIndex < shuffledQuestions.length - 1 ? 'Question Suivante' : 'Voir les Résultats' }}
            </BButton>
      </div>

      <div class="mt-2 text-center">
        <button @click="reportIssue" class="btn btn-link link-secondary text-decoration-none small text-muted">
          ⚠️ Signaler une erreur dans cette question
        </button>
      </div>
    </div>

    <!-- Results Screen -->
    <div v-else class="text-center py-4">
      <div class="mb-4 display-1">
        {{ score >= shuffledQuestions.length / 2 ? '🎉' : '📚' }}
      </div>
      <h3 class="fw-bold mb-3">Quiz Terminé !</h3>
      <p class="lead mb-4">
        Votre score : <span class="fw-bold"
          :class="score === shuffledQuestions.length ? 'text-success' : 'text-primary'">{{
            score }} / {{
            shuffledQuestions.length }}</span>
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

.quiz-container {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.explanation-box {
  min-height: 100px;
}
</style>
