<template>
  <div>
    <div v-if="firstStep" class="pr-20">
      <h2 class="text-xl font-bold">
        Let’s keep in touch
      </h2>
      <p class="mt-7">
        From time to time I send some useful tips to your inbox and let you know about upcoming events. Sign up if you want to stay in loop.
      </p>
      <form @submit.prevent="submit">
        <label for="firstName" class="mt-7 block" :class="errorFirstName && 'text-punch'">First name</label>
        <input
          v-model="firstName"
          type="text"
          name="firstName"
          class="mt-1 h-10 w-full bg-white px-5 text-lg border-2 border-black dark:border-black-lightest outline-none transition-all   dark:bg-black-light dark:shadow-block-none dark:focus:bg-black-lighter"
          :class="errorEmail && 'border border-punch'"
        >
        <label for="email" class="mt-3 block" :class="errorEmail && 'text-punch'">Email</label>
        <input
          v-model="emailAddress"
          name="email"
          type="email"
          class="mt-1 h-10 w-full bg-white px-5 text-lg border-2 border-black dark:border-black-lightest  outline-none transition-all dark:bg-black-light dark:shadow-block-none dark:focus:bg-black-lighter"
          :class="errorFirstName && 'border border-punch'"
        >
        <div>
          <p
            :class="errors.length && 'opacity-100'"
            class="mt-5 text-xs text-punch opacity-0"
          >
            {{ errors.join('and ') }} {{ errors.length > 1 ? 'are' : 'is' }} required.
          </p>
        </div>
        <button
          type="submit"
          class="mt-5 border-black border-2 bg-white px-7 py-3 font-bold uppercase transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-block-hover-lime dark:bg-black-lighter dark:duration-300"
        >
          Subscribe
        </button>
        <p class=" mt-6 text-left text-xs">
          I treat your email address like I would my own. That means no ads. Just notifications of when I do cool stuff. Unsubscribe anytime. <NuxtLink to="/" class="prettyLink">
            Click here to read about how I handle your data
          </NuxtLink>
        </p>
      </form>
    </div>
    <div v-else-if="!firstStep && !errorPage">
      <p class="mt-7 mb-3 text-xl font-bold">
        🎉 Awesome {{ firstName }}! 🎉
      </p>
      <div class="font-normal">
        An email was sent to {{ emailAddress }}. Please confirm it and you are good to go.
      </div>
    </div>
    <div v-else>
      <p class="mt-7 mb-3 text-xl font-bold">
        💩 Oh no!
      </p>
      <div class="font-normal">
        Weeeeell what do you know. A tester with a bug on his page. If you feel like writing another bug report today, contact me on filip@filiphric.com or through the social networks.
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Ref } from 'vue'

const firstStep = ref(true)
const errorPage = ref(false)
const firstName = ref('')
const emailAddress = ref('')
const errors: Ref<string[]> = ref([])
const errorEmail = ref(false)
const errorFirstName = ref(false)
const config = useRuntimeConfig()

const submit = async () => {
  if (emailAddress.value && firstName.value) {
    try {
      const { data, error } = await useFetch('/api/subscribe', {
        method: 'POST',
        body: {
          email: emailAddress.value,
          firstName: firstName.value
        }
      })

      if (error.value || !data.value?.subscription) {
        errorPage.value = true
      } else {
        firstStep.value = false
      }
    } catch {
      errorPage.value = true
    }
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
</script>
