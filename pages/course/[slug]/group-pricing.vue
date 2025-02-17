<template>
  <NuxtLayout>
    <div class="py-14 px-4 sm:px-6 lg:px-8">
      <ContentBlock image="/99_tips_improved_imta25.png" alt="99 Cypress Tips">
        <template #heading>Group Licenses</template>
        <template #description>Perfect for teams and organizations. All licenses include full course access and future updates.</template>
      </ContentBlock>


      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-6">Group Pricing Discounts</h2>
        <p class="text-center mb-6">As a company you can choose the amount of flexibility you need. All licenses include full course access and future updates. You can choose a GitHub login or a magic link that will ensure that your license is used by the proper users.</p>
        <!-- Desktop view -->
        <div class="lg:grid lg:grid-cols-3 lg:gap-8 grid grid-cols-1 gap-8">
          <div v-for="plan in plans" :key="plan.name" class="bg-white shadow-block p-6 dark:bg-black-dark">
            <h3 class="text-2xl font-semibold mb-2">{{ plan.name }}</h3>
            <p>{{ plan.description }}</p>
            <p class="mt-4 text-3xl font-bold">{{ plan.price }} € <span v-if="plan.priceDescription" class="text-sm">{{ plan.priceDescription }}</span></p>
            <ul class="mt-6 space-y-2">
              <li v-for="feature in features" class="flex items-start">
                <p class="text-sm">
                  {{ typeof feature[plan.name.toLowerCase() as keyof typeof feature] === 'boolean' ? '' : feature[plan.name.toLowerCase() as keyof typeof feature] }}
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

            <div v-if="plan.name === 'Flexible'">
              <h3 class="text-lg font-bold my-6">Calculate Your Price</h3>
              <div class="flex items-center justify-between gap-4 mb-6">
                <button @click="decrementFlexibleLicenses" class="w-12 h-12 flex items-center justify-center text-2xl border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800" :disabled="flexibleLicenses <= 10">
                  -
                </button>
                <div class="text-center">
                  <div class="text-3xl font-bold">{{ flexibleLicenses }}</div>
                  <div class="text-gray-500">Licenses</div>
                </div>
                <button 
                  @click="incrementFlexibleLicenses"
                  class="w-12 h-12 flex items-center justify-center text-2xl border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +
                </button>
             </div>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span>Base price ({{ flexibleLicenses }} × €179)</span>
                  <span>€{{ flexibleBasePrice }}</span>
                </div>
                <div v-if="flexibleDiscountAmount > 0" class="flex justify-between text-lime">
                  <span>Volume discount ({{ flexibleDiscountPercentage }}% off)</span>
                  <span>-€{{ flexibleDiscountAmount }}</span>
                </div>
                <div class="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>€{{ flexibleFinalPrice }}</span>
                </div>
              </div>
            </div>

            <div v-if="plan.name === 'Enterprise'">
              <h3 class="text-lg font-bold my-6">Calculate Your Price</h3>
              <div class="flex items-center justify-between gap-4 mb-6">
                <button @click="decrementEnterpriseLicenses" class="w-12 h-12 flex items-center justify-center text-2xl border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800" :disabled="enterpriseLicenses <= 30">
                  -
                </button>
                <div class="text-center">
                  <div class="text-3xl font-bold">{{ enterpriseLicenses }}</div>
                  <div class="text-gray-500">Licenses</div>
                </div>
                <button 
                  @click="incrementEnterpriseLicenses"
                  class="w-12 h-12 flex items-center justify-center text-2xl border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +
                </button>
             </div>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span>Base price ({{ enterpriseLicenses }} × €179)</span>
                  <span>€{{ enterpriseBasePrice }} / year</span>
                </div>
                <div v-if="enterpriseDiscountAmount > 0" class="flex justify-between text-lime">
                  <span>Volume discount ({{ enterpriseDiscountPercentage }}% off)</span>
                  <span>-€{{ enterpriseDiscountAmount }} / year</span>
                </div>
                <div class="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>€{{ enterpriseFinalPrice }} / year</span>
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
              <p class="pt-3">Basic licenses are tied to specific GitHub accounts. Once a license is tied to a given account, it cannot be transferred.</p>
              <p class="pt-3">With <span class="font-bold">Flexible plan</span> you are allowed a single transfer of a license to another employee. This is great for situations where an employee leaves the company and you’d like to provide education to a new member of a team. </p> 
              <p class="pt-3">The <span class="font-bold">Enterprise plan</span> allows unlimited transfer license transfers throughout the year. This plan is best suitable for agencies or teams with regular member changes. Please note that the <NuxtLink to="/terms-of-service" class="prettyLink font-bold">Terms of Service</NuxtLink> apply.</p>
            </div>
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">How does the magic link sign-in work?</h3>
              <p>Users can securely access the course by receiving a one-time login link via email, making it easy to get started without password management. Link is generated on the login page and sent to the email address of the user.</p>
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
    flexible: 'GitHub or Magic link login',
    enterprise: 'GitHub or Magic link login'
  },
  {
    basic: 'Great for smaller teams with stable membership',
    flexible: 'Great for teams with occasional member changes',
    enterprise: 'Great for agencies or teams with regular member changes'
  }
]

const licenses = ref(1)
const flexibleLicenses = ref(10) // minimum 10
const enterpriseLicenses = ref(30) // minimum 30

const basePrice = computed(() => licenses.value * 99)
const flexibleBasePrice = computed(() => flexibleLicenses.value * 179)
const enterpriseBasePrice = computed(() => enterpriseLicenses.value * 179)

const discountPercentage = computed(() => {
  if (licenses.value >= 51) return 20
  if (licenses.value >= 31) return 15
  if (licenses.value >= 11) return 10
  return 0
})

const flexibleDiscountPercentage = computed(() => {
  if (flexibleLicenses.value >= 101) return 20
  if (flexibleLicenses.value >= 51) return 15
  if (flexibleLicenses.value >= 31) return 10
  return 0 // starts at 0% since minimum is 10 licenses
})

const enterpriseDiscountPercentage = computed(() => {
  if (enterpriseLicenses.value >= 151) return 25
  if (enterpriseLicenses.value >= 101) return 15
  if (enterpriseLicenses.value >= 51) return 10
  return 0 // starts at 0% since minimum is 30 licenses
})

const discountAmount = computed(() => {
  return Math.round((basePrice.value * discountPercentage.value) / 100)
})

const flexibleDiscountAmount = computed(() => {
  return Math.round((flexibleBasePrice.value * flexibleDiscountPercentage.value) / 100)
})

const enterpriseDiscountAmount = computed(() => {
  return Math.round((enterpriseBasePrice.value * enterpriseDiscountPercentage.value) / 100)
})

const finalPrice = computed(() => {
  return basePrice.value - discountAmount.value
})

const flexibleFinalPrice = computed(() => {
  return flexibleBasePrice.value - flexibleDiscountAmount.value
})

const enterpriseFinalPrice = computed(() => {
  return enterpriseBasePrice.value - enterpriseDiscountAmount.value
})

const incrementLicenses = () => {
  licenses.value++
}

const decrementLicenses = () => {
  if (licenses.value > 1) {
    licenses.value--
  }
}

const incrementFlexibleLicenses = () => {
  flexibleLicenses.value++
}

const decrementFlexibleLicenses = () => {
  if (flexibleLicenses.value > 10) {
    flexibleLicenses.value--
  }
}

const incrementEnterpriseLicenses = () => {
  enterpriseLicenses.value++
}

const decrementEnterpriseLicenses = () => {
  if (enterpriseLicenses.value > 30) {
    enterpriseLicenses.value--
  }
}
</script>
