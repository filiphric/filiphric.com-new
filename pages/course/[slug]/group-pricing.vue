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
            <ul class="list-disc list-inside mt-6 space-y-2">
              <li class="flex items-start"><p class="text-md">10% discount for 10 or more licenses</p></li>
              <li class="flex items-start"><p class="text-md">15% discount for 30 or more licenses</p></li>
              <li class="flex items-start"><p class="text-md">20% discount for 50 or more licenses</p></li>
              <li class="flex items-start"><p class="text-md">Non-transferable license</p></li>
              <li class="flex items-start"><p class="text-md">Full course access</p></li>
              <li class="flex items-start"><p class="text-md">Future updates included</p></li>
              <li class="flex items-start"><p class="text-md">GitHub or magic link sign-in</p></li>
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
              <h3 class="font-bold mb-2">How does the magic link sign-in work?</h3>
              <p>Magic link is a great way to sign in if GitHub is not an option for you. To view the course, user assigned with the license will simply enter their email, and a "Magic link" will be sent to their email that will automatically sign them in.</p>
            </div>
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">Can I transfer a license to another user?</h3>
              <p>No, the license is non-transferable. It is only valid for the user it is assigned to.</p>
            </div>
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">How does the payment for multiple licenses work?</h3>
              <p>Once you decide on the number of licenses you need, you can pay for them in one go. No need to pay for each license separately. I'll issue a single invoice for the total amount.</p>
            </div>
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <h3 class="font-bold mb-2">How do people get access to the course?</h3>
              <p>After the invoice is paid, simply send a list of emails to me and I’ll activate the course access.</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="mt-20">
          <h2 class="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div class="max-w-2xl mx-auto">
            <form @submit.prevent="submitInquiry" class="space-y-6 bg-ivory-dark dark:bg-black-dark p-8 rounded-lg">
              <div>
                <label for="name" class="block text-sm font-medium mb-2">Name *</label>
                <input 
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black-dark rounded-none focus:outline-none focus:border-lime"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium mb-2">Email *</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black-dark rounded-none focus:outline-none focus:border-lime"
                />
              </div>

              <div>
                <label for="company" class="block text-sm font-medium mb-2">Company *</label>
                <input 
                  id="company"
                  v-model="form.company"
                  type="text"
                  required
                  class="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black-dark rounded-none focus:outline-none focus:border-lime"
                />
              </div>

              <div>
                <label for="licenses" class="block text-sm font-medium mb-2">Number of Licenses *</label>
                <input 
                  id="licenses"
                  v-model="form.licenses"
                  type="number"
                  required
                  min="1"
                  class="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black-dark rounded-none focus:outline-none focus:border-lime"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium mb-2">Additional Message</label>
                <textarea 
                  id="message"
                  v-model="form.message"
                  rows="4"
                  class="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black-dark rounded-none focus:outline-none focus:border-lime"
                ></textarea>
              </div>

              <div class="flex justify-center">
                <ActionButton>
                  <button 
                    type="submit"
                    :disabled="isSubmitting"
                    class="uppercase"
                  >
                    {{ isSubmitting ? 'Sending...' : 'Send Inquiry' }}
                  </button>
                </ActionButton>
              </div>

              <div v-if="submitStatus" :class="['text-center text-sm', submitStatus.type === 'success' ? 'text-lime' : 'text-red-500']">
                {{ submitStatus.message }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const licenses = ref(10)
const isSubmitting = ref(false)
const submitStatus = ref<{ type: 'success' | 'error', message: string } | null>(null)

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

const form = reactive({
  name: '',
  email: '',
  company: '',
  licenses: licenses.value,
  finalPrice: finalPrice.value,
  message: ''
})

const incrementLicenses = () => {
  licenses.value++
  form.licenses = licenses.value
}

const decrementLicenses = () => {
  if (licenses.value > 1) {
    licenses.value--
    form.licenses = licenses.value
  }
}

const submitInquiry = async () => {
  isSubmitting.value = true
  submitStatus.value = null

  try {
    const response = await fetch('/api/group-pricing-inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        licenses: Number(form.licenses)
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send inquiry')
    }

    submitStatus.value = {
      type: 'success',
      message: 'Your inquiry has been sent successfully. I will get back to you soon!'
    }

    // Reset form
    form.name = ''
    form.email = ''
    form.company = ''
    form.message = ''
    form.licenses = licenses.value
    form.finalPrice = finalPrice.value
  } catch (error: any) {
    submitStatus.value = {
      type: 'error',
      message: 'Failed to send inquiry. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
