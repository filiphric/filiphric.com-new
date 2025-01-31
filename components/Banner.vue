<script setup>
const timeLeft = ref('')
const isOfferExpired = ref(false)
const isOfferStarted = ref(false)

const calculateTimeLeft = () => {
  const startDate = new Date('2025-02-03T00:00:00+01:00') // CET timezone
  const endDate = new Date('2025-02-09T23:59:59+01:00') // CET timezone
  const now = new Date()

  // Check if offer hasn't started yet
  if (now < startDate) {
    isOfferStarted.value = false
    return
  }

  // Check if offer has ended
  if (now > endDate) {
    isOfferExpired.value = true
    return
  }

  isOfferStarted.value = true
  const difference = endDate - now

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  timeLeft.value = `${days}d ${hours}h ${minutes}m ${seconds}s`
}

// Update every second
let timer
onMounted(() => {
  calculateTimeLeft()
  timer = setInterval(calculateTimeLeft, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <NuxtLink to="/course/99-cypress-tips">
    <div v-if="isOfferStarted && !isOfferExpired" class="bg-tangerine dark:bg-gray-800 p-4 sticky top-0 z-40">
      <div to="/course/99-cypress-tips" class="text-lg md:text-xl lg:text-xl font-extrabold">
        <p class="text-center">
          Check out my newly released course <span class="text-white">99 Cypress.io Tips</span> for just 49 € 
          <span class="text-sm block">Limited time offer (Ends in: {{ timeLeft }})</span>
        </p>
      </div>
    </div>
  </NuxtLink>
</template>