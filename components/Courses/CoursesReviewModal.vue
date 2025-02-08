<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 halftone" @click="close"></div>

      <!-- Modal -->
      <div class="relative w-full max-w-md shadow-block-tangerine border-2 border-black bg-ivory p-8 dark:bg-black-lighter">
        <h2 class="mb-6 text-2xl font-bold">
          {{ existingReview ? 'Edit Review' : 'Add Review' }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <!-- Star Rating -->
          <div class="mb-6">
            <label class="mb-2 block font-bold">Rating</label>
            <div class="flex gap-2">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="rating = star"
                class="text-2xl focus:outline-none"
                :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'"
              >
                ★
              </button>
            </div>
          </div>

          <!-- Review Text -->
          <div class="mb-6">
            <label class="mb-2 block font-bold">Review</label>
            <textarea
              v-model="reviewText"
              rows="4"
              class="w-full border-2 border-black p-2 dark:bg-black-dark focus:outline-none"
              placeholder="Write your review here..."
            ></textarea>
          </div>

          <!-- Anonymous Toggle -->
          <div class="mb-6">
            <ToggleSwitch
              v-model="isAnonymous"
              label="Post anonymously"
            />
          </div>

          <!-- Error Message -->
          <p v-if="error" class="mb-4 text-red-500">{{ error }}</p>

          <!-- Buttons -->
          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!rating"
              class="bg-white"
            >
              <ActionButton>
                {{ existingReview ? 'Update' : 'Submit' }}
              </ActionButton>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CourseReview } from '~/types/courses'

const props = defineProps<{
  isOpen: boolean
  courseId: string
  existingReview?: CourseReview | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', review: { rating: number, review_text: string | null, is_anonymous: boolean }): void
}>()

const rating = ref(props.existingReview?.rating || 0)
const reviewText = ref(props.existingReview?.review_text || '')
const isAnonymous = ref(props.existingReview?.is_anonymous || false)
const error = ref('')

watch(() => props.existingReview, (newReview) => {
  if (newReview) {
    rating.value = newReview.rating
    reviewText.value = newReview.review_text || ''
    isAnonymous.value = newReview.is_anonymous
  }
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  if (!rating.value) {
    error.value = 'Please provide a rating'
    return
  }

  emit('submit', {
    rating: rating.value,
    review_text: reviewText.value || null,
    is_anonymous: isAnonymous.value
  })
}
</script> 