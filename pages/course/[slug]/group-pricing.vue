<template>
  <NuxtLayout>
    <div class="py-14 px-4 sm:px-6 lg:px-8">
      <ContentBlock image="/99_tips_improved_imta25.png" alt="99 Cypress Tips">
        <template #heading>Group Licenses</template>
        <template #description>Perfect for teams and organizations. All licenses include full course access and future updates.</template>
      </ContentBlock>


      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-6">Group Pricing Discounts</h2>

        <!-- Desktop view -->
        <div class="lg:grid lg:grid-cols-3 lg:gap-8 grid grid-cols-1 gap-8">
          <div v-for="plan in plans" :key="plan.name" class="bg-white shadow-block p-6">
            <h3 class="text-2xl font-semibold text-gray-900 mb-2">{{ plan.name }}</h3>
            <p class="text-gray-600">{{ plan.description }}</p>
            <p class="mt-4 text-3xl font-bold text-gray-900">{{ plan.price }} € <span v-if="plan.priceDescription" class="text-sm text-gray-500">{{ plan.priceDescription }}</span></p>
            <ul class="mt-6 space-y-2">
              <li v-for="feature in features" :key="feature.name" class="flex items-start">
                <p class="text-sm text-gray-700">
                  {{ typeof feature[plan.name.toLowerCase()] === 'boolean' ? '' : feature[plan.name.toLowerCase()] }}
                </p>
              </li>
            </ul>
            <div v-if="plan.name === 'Basic'">
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
        </div>

        <div class="mt-20">
          <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div class="max-w-3xl mx-auto space-y-6">
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">What's the difference between license types?</h3>
              <p class="text-gray-600">Non-transferable licenses are tied to specific GitHub accounts. Limited transfer allows one transfer per license, while unlimited transfer licenses can be reassigned as needed throughout the year.</p>
            </div>
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">How does the magic link sign-in work?</h3>
              <p class="text-gray-600">Users can securely access the course by receiving a one-time login link via email, making it easy to get started without password management.</p>
            </div>
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">Can I mix different license types?</h3>
              <p class="text-gray-600">Yes, you can purchase different license types to best suit your team's needs. Contact our sales team for a custom quote.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const plans = ref([
  {
    name: 'Basic',
    description: 'Discounted price for teams with stable membership',
    price: 99,
  },
  {
    name: 'Flexible',
    description: 'Flexibility for occasional changes in team',
    price: 179,
    priceDescription: 'one seat switch available',
  },
  {
    name: 'Enterprise',
    description: 'Best for agencies and enterprise-level teams',
    price: 179,
    priceDescription: 'per year',
  },
])

const selectedPlan = ref('basic')

const features = [
  {
    basic: 'Discounts for 10+ licenses',
    flexible: 'Minimum order: 10 licenses',
    enterprise: 'Minimum order: 30 licenses'
  },
  {
    basic: 'Non-transferable license',
    flexible: 'One transfer allowed per license',
    enterprise: 'Unlimited transfers'
  },
  {
    basic: 'GitHub account required',
    flexible: 'GitHub or Magic link',
    enterprise: 'GitHub or Magic link'
  },
  {
    basic: 'Great for teams with stable membership',
    flexible: 'Great for teams with occasional member changes',
    enterprise: 'Great for agencies or teams with regular member changes'
  }
]

const licenses = ref(1)
const basePrice = computed(() => licenses.value * 99)

const discountPercentage = computed(() => {
  if (licenses.value >= 51) return 20
  if (licenses.value >= 31) return 15
  if (licenses.value >= 11) return 10
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
