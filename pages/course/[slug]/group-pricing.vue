<template>
  <NuxtLayout>
    <div class="py-14 px-4 sm:px-6 lg:px-8">
      <ContentBlock image="/99_tips_improved_imta25.png" alt="99 Cypress Tips">
        <template #heading>Group Licenses</template>
        <template #description>Perfect for teams and organizations. All licenses include full course access and future updates.</template>
      </ContentBlock>

      <div class="max-w-7xl mx-auto">
       

        <!-- Single plan centered view -->
        <div class="max-w-md mx-auto">
          
          <div class="bg-white shadow-block p-6 dark:bg-black-dark">
            <h2 class="text-2xl sm:text-3xl font-bold text-center mb-6">Pricing Discounts</h2>
            <ul class="mt-6 space-y-2">
              <li class="flex items-start"><p class="text-sm">Discounts for 10+ licenses</p></li>
              <li class="flex items-start"><p class="text-sm">Non-transferable license</p></li>
              <li class="flex items-start"><p class="text-sm">GitHub or magic link sign-in</p></li>
              <li class="flex items-start"><p class="text-sm">Great for teams with stable membership</p></li>
            </ul>
            <h3 class="text-lg font-bold my-6">Calculate Your Price</h3>
            <div class="flex items-center justify-between gap-4 mb-6">
              <button @click="decrementLicenses" class="w-12 h-12 flex items-center justify-center text-2xl border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800" :disabled="licenses <= 1">
                -
              </button>
              <div class="text-center">
                <div class="text-3xl font-bold">{{ licenses }}</div>
                <div class="text-gray-500">Licenses</div>
              </div>
              <button 
                @click="incrementLicenses"
                class="w-12 h-12 flex items-center justify-center text-2xl border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                +
              </button>
            </div>
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span>Base price ({{ licenses }} × €99)</span>
                <span>€{{ basePrice }}</span>
              </div>
              <div v-if="discountAmount > 0" class="flex justify-between text-lime">
                <span>Volume discount ({{ discountPercentage }}% off)</span>
                <span>-€{{ discountAmount }}</span>
              </div>
              <div class="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span>€{{ finalPrice }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-20">
          <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div class="max-w-3xl mx-auto space-y-6">
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">What's the difference between license types?</h3>
              <p class="pt-3">Basic licenses are tied to specific GitHub accounts. Once a license is tied to a given account, it cannot be transferred.</p>
              <p class="pt-3">With <span class="font-bold">Flexible plan</span> you are allowed a single transfer of a license to another employee. This is great for situations where an employee leaves the company and you'd like to provide education to a new member of a team. </p> 
              <p class="pt-3">The <span class="font-bold">Enterprise plan</span> allows unlimited transfer license transfers throughout the year. This plan is best suitable for agencies or teams with regular member changes. Please note that the <NuxtLink to="/terms-of-service" class="prettyLink font-bold">Terms of Service</NuxtLink> apply.</p>
            </div>
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">How does the magic link sign-in work?</h3>
              <p>Users can securely access the course by receiving a one-time login link via email, making it easy to get started without password management.</p>
            </div>
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">Can I mix different license types?</h3>
              <p>Yes, you can purchase different license types to best suit your team's needs. Contact me for a custom quote.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const licenses = ref(10)
const basePrice = computed(() => licenses.value * 99)

const discountPercentage = computed(() => {
  if (licenses.value >= 50) return 20
  if (licenses.value >= 30) return 15
  if (licenses.value >= 10) return 10
  return 0
})

const discountAmount = computed(() => {
  return Math.round((basePrice.value * discountPercentage.value) / 100)
})

const finalPrice = computed(() => {
  return basePrice.value - discountAmount.value
})

const incrementLicenses = () => {
  licenses.value++
}

const decrementLicenses = () => {
  if (licenses.value > 1) {
    licenses.value--
  }
}
</script>
