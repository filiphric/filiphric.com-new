<template>
  <div>
    <h2 class="text-xl font-bold">
      Let’s keep in touch
    </h2>
    <p class="mt-7">
      From time to I send some useful tips to your inbox and let you know about upcoming events. Sign up if you want to stay in loop.
    </p>
    <form
      @submit.prevent="submit"
    >
      <label for="firstName" class="mt-7 block" :class="errorFirstName && 'text-punch'">First name</label>
      <input
        v-model="firstName"
        type="text"
        name="firstName"
        class="mt-1 h-10 w-full rounded-xl bg-white px-5 text-lg shadow-block-tangerine outline-none transition-all  dark:rounded-md dark:bg-black-light dark:shadow-block-none dark:focus:bg-black-lighter"
        :class="errorEmail && 'dark:border dark:border-punch shadow-block-punch'"
      >
      <label for="email" class="mt-3 block" :class="errorEmail && 'text-punch'">Email</label>
      <input
        v-model="emailAddress"
        name="email"
        type="email"
        class="mt-1 h-10 w-full rounded-xl bg-white px-5 text-lg shadow-block-tangerine outline-none transition-all  dark:rounded-md dark:bg-black-light dark:shadow-block-none dark:focus:bg-black-lighter"
        :class="errorFirstName && 'dark:border dark:border-punch shadow-block-punch'"
      >
      <div class="">
        <p
          :class="errors.length && 'opacity-100'"
          class="mt-5 text-xs text-punch opacity-0"
        >
          {{ errors.join('and ') }} {{ errors.length > 1 ? 'are' : 'is' }} required.
        </p>
      </div>
      <button
        type="submit"
        class="mt-5 rounded-lg bg-white px-7 py-3 font-bold uppercase shadow-block-lime transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-block-hover-lime dark:bg-black-light dark:shadow-block-dark-blueberry dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0 dark:hover:bg-black-lighter dark:hover:shadow-block-dark-hover-blueberry"
      >
        Subscribe
      </button>
      <p class=" mt-6 text-xs sm:text-center md:text-left">
        I treat your email address like I would my own. That means no ads. Just notifications of when I do cool stuff. Unsubscribe anytime. <NuxtLink to="/" class="prettyLink">
          Click here to read about how I handle your data
        </NuxtLink>
      </p>
    </form>
  </div>
</template>
<script setup lang="ts">
import { Ref } from 'vue'

const firstName = ref('')
const emailAddress = ref('')
const errors: Ref<string[]> = ref([])
const errorEmail = ref(false)
const errorFirstName = ref(false)

const submit = () => {
  if (emailAddress.value && firstName.value) {
    useFetch('https://app.convertkit.com/forms/1673359/subscriptions', {
      method: 'POST',
      body: {
        id: 1673359,
        email_address: emailAddress.value,
        first_name: firstName.value
      }
    })
    errorEmail.value = false
    errorFirstName.value = false
  }

  errors.value = []

  if (!emailAddress.value) {
    errorEmail.value = true
    errors.value.push('Email ')
  }
  if (!firstName.value) {
    errorFirstName.value = true
    errors.value.push('name ')
  }
}

// export default {
//   props: {
//     convertKitId: {
//       type: Number,
//       default: 1673359
//     }
//   },
//   data () {
//     return {
//       errors: [],
//       emailAddress: '',
//       firstName: '',
//       firstStep: true,
//       loading: false,
//       success: false,
//       progressBarWidth: 0,
//       progressBarDuration: 10
//     }
//   },
//   methods: {
//     submit ({ target: { action } }) {
//       if (this.emailAddress && this.firstName) {
//         this.sendSubscription(action)
//       }

//       this.errors = []

//       if (!this.emailAddress) {
//         this.errors.push('email ')
//       }
//       if (!this.firstName) {
//         this.errors.push('name ')
//       }
//     },
//     sendSubscription (action) {
//       this.progressBarDuration = 10
//       this.loading = true
//       this.firstStep = false
//       axios.post(action, qs.stringify({
//         id: this.convertKitId,
//         emailAddress: this.emailAddress,
//         firstName: this.firstName
//       })).then(() => {
//         this.progressBarWidth = 100
//         this.loading = false
//         this.success = true
//         setTimeout(() => {
//           this.firstStep = true
//           this.progressBarDuration = 0
//           this.progressBarWidth = 0
//         }, 10000)
//       }).catch(() => {
//         this.progressBarWidth = 100
//         this.loading = false
//         this.success = false
//         setTimeout(() => {
//           this.firstStep = true
//           this.progressBarDuration = 0
//           this.progressBarWidth = 0
//         }, 10000)
//       })
//     }
//   }
// }
</script>
