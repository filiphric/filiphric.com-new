<template>
  <NuxtLayout>
    <div class="max-w-6xl mx-auto px-4">
      <!-- Hero Section -->
      <div class="mt-14 md:mt-28 flex flex-col-reverse md:flex-row items-center gap-7 md:gap-14 sm:mx-7">
        <div class="w-full md:w-1/2 text-center md:text-left">
          <h1 class="text-4xl md:text-4xl lg:text-6xl font-bold mb-5 md:mb-7">
            99 Cypress.io Tips
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
            Level up your Cypress skills with bite-sized, practical tips that you can immediately apply to your testing workflow.
          </p>
          <!-- oarity coupon -->
          <div v-if="parityCoupon?.eligible" class="flex flex-col gap-2 bg-ivory-dark dark:bg-black-dark p-5 mb-5">
            <p class="text-md font-bold">
              {{ countryEmoji }} Hello to {{ countryName }} 👋
            </p>
            <p class="text-sm">
              To make this course more accessible I am offering purchasing power parity pricing.
            </p>
            <span v-if="!couponApplied" class="text-md text-lime font-bold cursor-pointer my-4" @click="applyDiscount">
              Click here to activate {{ (parityCoupon.amount * 100).toFixed(0) }}% discount
            </span>
            <span v-else class="text-md text-lime font-bold my-4">
              Discount activated 🎉
              <span class="ml-2 text-sm cursor-pointer text-gray-400 font-normal" @click="cancelDiscount">
                (Click here to deactivate)
              </span>
            </span>
          </div>
          <div class="flex md:flex-col flex-row justify-center md:items-start">
            <div class="relative">
              <CoursesPaymentButton 
                v-if="courseInfo && !hasPurchased"
                :info="courseInfo" 
                :price-id="courseInfo.price_id || ''"
                :coupon-id="couponId"
                :discount="discount"
                class="cursor-pointer"
              />
              <ConfettiExplosion v-if="couponApplied" :colors="['#9CD1BB', '#C39AC9', '#BAD761', '#FF9B5E', '#FF657A', '#FFD76D']" class="absolute -top-1/2 left-1/2" />
            </div>
            <ActionButton 
              v-if="courseInfo && hasPurchased"
              :to="`${courseInfo.url}/lesson`"
              class="h-14 w-64 text-lg text-center"
            >
              Go to course
            </ActionButton>
          </div>
          <p v-if="courseInfo && !hasPurchased" class="text-xs mt-2 text-gray-400">By purchasing this course, you agree to the <NuxtLink to="/terms-of-service" class="font-extrabold prettyLink">Terms of Service</NuxtLink>.</p>
          <p class="text-md mt-4">Buying for a group? <a href="mailto:filip@filiphric.sk" class="font-extrabold prettyLink">Contact me for a discount!</a></p>
        </div> 
        <div class="w-full md:w-1/2 overflow-hidden rotate-1">
          <Image :src="courseInfo?.image_url" alt="99 Cypress Tips Course" class="w-full h-auto" />
        </div>
      </div>

      <div class="mt-14 wrapper">
        <div class="mb-4 placeholder mx-auto flex flex-col items-center justify-center border-2 border-solid border-black">
          <LoaderAnimation />
          <p class="text-xl text-center mt-4">Loading video...</p>
        </div>
        <mux-player
          playback-id="4aZqc4EvP5464v9vBvULOTlRYrs9SwkGR8fFG018izD00"
          thumbnail-time="107"
          primary-color="black"
          secondary-color="white"
          accent-color="#bada55"
          style="border: 2px solid black;"
        />
      </div>

      <!-- Course Modules -->
      <div class="mt-28">
        <h2 class="text-4xl font-bold mb-14 text-center">What You'll Learn</h2>
        <div class="grid gap-7">
          <div class="flex justify-center bg-white p-7 py-4 font-bold shadow-block dark:bg-black-dark ">
            <div class="w-full p-7 grid grid-cols-1 gap-3">
              <div class="mb-2 flex">
                <div class="w-1/12 flex justify-center items-center">
                  <span class="mt-2 block h-3 w-3 rounded-full bg-punch" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">Advanced Patterns</span>
                  <span class="text-md font-normal">Learn professional testing patterns and best practices</span>
                </div>
              </div>
              <div class="mb-2 flex">
                <div class="w-1/12 flex justify-center items-center">
                  <span class="mt-2 block h-3 w-3 rounded-full bg-blueberry" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">Network Tricks</span>
                  <span class="text-md font-normal">Practical examples of how to test challenging network scenarios</span>
                </div>
              </div>
              <div class="mb-2 flex">
                <div class="w-1/12 flex justify-center items-center">
                  <span class="mt-2 block h-3 w-3 rounded-full bg-cheese" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">Flakiness prevention</span>
                  <span class="text-md font-normal">Tips on how to write stable tests that pass both on CI and locally</span>
                </div>
              </div>
              <div class="mb-2 flex">
                <div class="w-1/12 flex justify-center items-center">
                  <span class="mt-2 block h-3 w-3 rounded-full bg-lime" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">Undocumented Cypress features</span>
                  <span class="text-md font-normal">Learn about Cypress secrets and how to use them to your advantage</span>
                </div>
              </div>
              <div class="mb-2 flex">
                <div class="w-1/12 flex justify-center items-center">
                  <span class="mt-2 block h-3 w-3 rounded-full bg-tangerine" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">API testing</span>
                  <span class="text-md font-normal">Learn how to test APIs with Cypress</span>
                </div>
              </div>
              <div class="mb-2 flex">
                <div class="w-1/12 flex justify-center items-center">
                  <span class="mt-2 block h-3 w-3 rounded-full bg-mint" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">Customizing Cypress</span>
                  <span class="text-md font-normal">Learn how to customize Cypress to your needs</span>
                </div>
              </div>
              <div class="mb-2 flex">
                <div class="w-1/12 flex justify-center items-center">
                  <span class="mt-2 block h-3 w-3 rounded-full bg-transparent" />
                </div>
                <div class="w-11/12">
                  <span class="text-lg font-normal">...and much more!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-28">
        <h2 class="text-4xl font-bold mb-14 text-center">About the Course</h2>
        <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
          Ever bought a course and never finished it?
        </p>
        <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
          I've been there too.
        </p>
        <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
          Sometimes you just want to <span class="font-extrabold">get to the point quickly</span> and learn what you need. Well good news! You can go through this course in no particular order and still learn a lot.
        </p>
        <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">Lessons span from 30 seconds to 7 minutes (I said no longer than 5 minutes in the video, oops) but are designed to be as information dense as possible.</p>
      </div>
      <div class="mt-28">
        <h2 class="text-4xl font-bold mb-14 text-center">
          What People Say
        </h2>
        <Carousel
          :itemsToShow="1"
          :wrap-around="true"
          :autoplay="10000"
          :breakpoints="{
            1024: {
              itemsToShow: 3
            }
          }"
          class="max-w-6xl mx-auto"
        >
          <Slide 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
          >
            <div class="mx-4 mb-7" :class="{ 'shadow-block-tangerine': index === 0, 'shadow-block-blueberry': index === 1,
            'shadow-block-mint': index === 2,
            'shadow-block-cheese': index === 3,
            'shadow-block-lime': index === 4,
            'shadow-block-punch': index === 5
             }">
              <div class="bg-white dark:bg-black-lighter p-7 border-2 border-black h-full">
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-yellow-400 text-2xl">★★★★★</span>
                </div>
                <p class="text-lg mb-4">
                  {{ testimonial.text }}
                </p>
                <hr class="my-4 border-black dark:border-white w-1/4 opacity-20">
                <div class="text-gray-500 dark:text-gray-300 flex gap-3 justify-start items-center">
                  <img :src="testimonial.avatar" class="w-10 h-10 rounded-full" />
                  <div class="flex flex-col">
                    <p class="font-bold">{{ testimonial.name }}</p>
                    <p class="text-sm">{{ testimonial.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

        </Carousel>
      </div>
      
      <div class="mt-28">
        <h2 class="text-4xl font-bold mb-14 text-center">Translated into 23 languages</h2>
        <p class="text-lg mb-5 md:mb-7 text-center">
            Course main language is english, but contains subtitles for these languages:
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <span class="flag-tooltip" data-tooltip="Bosnian">🇧🇦</span>
            <span class="flag-tooltip" data-tooltip="Brazilian Portuguese">🇧🇷</span>
            <span class="flag-tooltip" data-tooltip="Croatian">🇭🇷</span>
            <span class="flag-tooltip" data-tooltip="Czech">🇨🇿</span>
            <span class="flag-tooltip" data-tooltip="Dutch (Belgium)">🇧🇪</span>
            <span class="flag-tooltip" data-tooltip="Dutch (Netherlands)">🇳🇱</span>
            <span class="flag-tooltip" data-tooltip="Filipino">🇵🇭</span>
            <span class="flag-tooltip" data-tooltip="French">🇫🇷</span>
            <span class="flag-tooltip" data-tooltip="German">🇩🇪</span>
            <span class="flag-tooltip" data-tooltip="Hindi and Telugu">🇮🇳</span>
            <span class="flag-tooltip" data-tooltip="Indonesian">🇮🇩</span>
            <span class="flag-tooltip" data-tooltip="Macedonian">🇲🇰</span>
            <span class="flag-tooltip" data-tooltip="Polish">🇵🇱</span>
            <span class="flag-tooltip" data-tooltip="Portuguese">🇵🇹</span>
            <span class="flag-tooltip" data-tooltip="Russian">🇷🇺</span>
            <span class="flag-tooltip" data-tooltip="Serbian">🇷🇸</span>
            <span class="flag-tooltip" data-tooltip="Slovak">🇸🇰</span>
            <span class="flag-tooltip" data-tooltip="Spanish">🇪🇸</span>
            <span class="flag-tooltip" data-tooltip="Swedish">🇸🇪</span>
            <span class="flag-tooltip" data-tooltip="Ukrainian">🇺🇦</span>
            <span class="flag-tooltip" data-tooltip="Urdu and Punjabi">🇵🇰</span>
          </div>
          <p class="my-5 md:my-7 text-center text-sm">(Some of these languages are still being reviewed.)</p>
      </div>

      <!-- Course Stats -->
      <div class="mt-28 grid md:grid-cols-4 gap-7">
        <div class="bg-white p-7 shadow-block dark:bg-black-lighter text-center">
          <div class="text-4xl font-bold mb-2">99</div>
          <div>Practical Tips</div>
        </div>
        <div class="bg-white p-7 shadow-block dark:bg-black-lighter text-center">
          <div class="text-4xl font-bold mb-2">2+</div>
          <div>Hours of laser-focused content</div>
        </div>
        <div class="bg-white p-7 shadow-block dark:bg-black-lighter text-center">
          <div class="text-4xl font-bold mb-2">∞</div>
          <div>Lifetime Access</div>
        </div>
        <div class="bg-white p-7 shadow-block dark:bg-black-lighter text-center">
          <div class="text-4xl font-bold mb-2">1€</div>
          <div>per lesson</div>
        </div>
      </div>

      <div class="mt-28">
        <h2 class="text-4xl font-bold mb-14 text-center">Certificate of completion</h2>
        <div class="flex flex-col md:flex-row gap-20 justify-center items-center">
          <Image src="/certificate_r3pka2.png" alt="Certificate of completion" class="max-h-72 mt-7 -rotate-1 shadow-white/10 dark:shadow-black/10 shadow-lg drop-shadow-md" />
          <div class="flex flex-col gap-5 justify-center rotate-1">
            <p class="text-lg md:text-xl lg:text-2xl">
              Brag to your friends and colleagues about your new Cypress skills!
            </p>
            <p class="text-lg md:text-xl lg:text-2xl">
              Impress your boss or a hiring manager!
            </p>
            <p class="text-lg md:text-xl lg:text-2xl">
              Hang it on your wall! 
            </p>
            <p class="text-lg md:text-xl lg:text-2xl">Put it on a fridge!</p>
            <p class="text-lg md:text-xl lg:text-2xl">Or LinkedIn!</p>
          </div>
        </div>
      </div>

      <!-- About Me Section -->
      <div class="mt-28 flex flex-col-reverse md:flex-row items-center gap-7 md:gap-14 sm:mx-7">
        <div class="w-full md:w-1/2 text-center md:text-left">
          <h2 class="text-4xl font-bold mb-5 md:mb-7">About Me</h2>
          <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
            I have a close to a decade of experience with teaching hundreds of developers and testers. I specialize in helping people level up their testing practices. Whether you are starting with test automation or you are looking to level up, I'm ready to help.
          </p>
          <!-- <div class="flex flex-wrap gap-4">
            <NuxtLink 
              to="/about" 
              class="prettyLink max-w-fit"
            >
              More about me
            </NuxtLink>
            <NuxtLink 
              to="/talks-webinars" 
              class="prettyLink max-w-fit"
            >
              Talks & webinars
            </NuxtLink>
          </div> -->
        </div>
        <div class="shadow-block w-full md:w-1/2 overflow-hidden bg-white dark:bg-transparent rotate-1">
          <Image src="/small_square_kdhln0.png" alt="Filip Hric" class="w-full h-auto" />
        </div>
      </div>
    </div>

    <div class="mt-14 md:mt-28 flex sm:mx-7">
      <div class="w-full text-center">
        <h2 class="text-4xl font-bold mb-5 md:mb-7">
          Example lessons
        </h2>
        <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
          Still not sure? Check out some example lessons from the course.
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-bold mt-4">Cookies are set automatically</h3>
            <div class="mt-7 wrapper shadow-block-blueberry">
              <div class="mb-4 placeholder mx-auto flex flex-col items-center justify-center border-2 border-solid border-black">
                <LoaderAnimation />
                <p class="text-xl text-center mt-4">Loading video...</p>
              </div>
              <mux-player
                playback-id="nYZRh6VqK3NcFeD6VB02d2M602H02momd7xsHJrZcq3KTU"
                primary-color="black"
                secondary-color="white"
                accent-color="#bada55"
                style="border: 2px solid black;"
              />
            </div>
            
          </div>
          <div>
            <h3 class="text-lg font-bold mt-4">Automatically open console when running Cypress</h3>
            <div class="mt-7 wrapper shadow-block-mint">
              <div class="mb-4 placeholder mx-auto flex flex-col items-center justify-center border-2 border-solid border-black">
                <LoaderAnimation />
                <p class="text-xl text-center mt-4">Loading video...</p>
              </div>
              <mux-player
                playback-id="ot84pHtV8zbyq1bvk1LDmvSioj01CXR9n6uozhw7uOXo"
                primary-color="black"
                secondary-color="white"
                accent-color="#bada55"
                style="border: 2px solid black;"
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <div class="my-14 md:my-28 flex sm:mx-7">
      <div class="w-full text-center">
        <h2 class="text-4xl font-bold mb-5 md:mb-7">
          Ready to start learning?
        </h2>
          <!-- oarity coupon -->
        <div v-if="parityCoupon?.eligible" class="flex flex-col gap-2 bg-ivory-dark dark:bg-black-dark p-5 mb-5">
          <p class="text-md font-bold">
            {{ countryEmoji }} Hello to {{ countryName }} 👋
          </p>
          <p class="text-sm">
            To make this course more accessible I am offering purchasing power parity pricing.
          </p>
          <span v-if="!couponApplied" class="text-md text-lime font-bold cursor-pointer my-4" @click="applyDiscount">
            Click here to activate {{ (parityCoupon.amount * 100).toFixed(0) }}% discount
          </span>
          <span v-else class="text-md text-lime font-bold my-4">
            Discount activated 🎉
            <span class="ml-2 text-sm cursor-pointer text-gray-400 font-normal" @click="cancelDiscount">
              (Click here to deactivate)
            </span>
          </span>
        </div>
        <div class="flex flex-row gap-4 justify-center">
          <div class="relative">
            <CoursesPaymentButton 
              v-if="courseInfo && !hasPurchased"
              :info="courseInfo" 
              :price-id="courseInfo.price_id || ''"
              :coupon-id="couponId"
              :discount="discount"
              class="cursor-pointer"
            />
            <ConfettiExplosion v-if="couponApplied" :colors="['#9CD1BB', '#C39AC9', '#BAD761', '#FF9B5E', '#FF657A', '#FFD76D']" class="absolute -top-1/2 left-1/2" />
          </div>
          <ActionButton 
            v-if="courseInfo && hasPurchased"
            :to="`${courseInfo.url}/lesson`"
            class="h-14 w-64 text-lg text-center"
          >
            Go to course
          </ActionButton>
        </div>
        <p v-if="courseInfo && !hasPurchased" class="text-xs mt-2 text-gray-400">By purchasing this course, you agree to the <NuxtLink to="/terms-of-service" class="font-extrabold prettyLink">Terms of Service</NuxtLink>.</p>
        <p class="text-sm mt-4">Buying for a group? <a href="mailto:filip@filiphric.sk" class="font-extrabold prettyLink">Contact me for a discount!</a></p>
      </div> 
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Course } from '~/types/courses';
import "@mux/mux-player";
import countries from '@/constants/countries.json'
import ConfettiExplosion from "vue-confetti-explosion";

const { getCourseById } = useSupabaseCourses()
const store = useStore()
const user = useSupabaseUser()
const { getUserCourses } = useSupabaseCourses()
const route = useRoute()
const couponId = ref('')
const discount = ref(0)
const couponApplied = ref(false)
// Load purchased courses if user is logged in
onMounted(async () => {
  if (user.value) {
    const { courses: coursesData, error: coursesError } = await getUserCourses(user.value.id)
    if (coursesError) {
      console.error('Error fetching user courses:', coursesError)
    }
  }
})

const { data } = await useFetch('/api/parity-coupon', { server: false })
const parityCoupon = computed(() => data.value)

const applyDiscount = () => {
  couponId.value = parityCoupon.value.couponId
  discount.value = parityCoupon.value.amount
  couponApplied.value = true
}

const cancelDiscount = () => {
  couponId.value = ''
  discount.value = 0
  couponApplied.value = false
}

const countryName = computed(() => {
  return countries.find(country => country.code === parityCoupon.value.country)?.name
})

const countryEmoji = computed(() => {
  return countries.find(country => country.code === parityCoupon.value.country)?.emoji
})

const { data: courseInfo } = await useAsyncData<Course | null>('course-info', async () => {
  const { course, error } = await getCourseById('a3906bd2-744c-4b13-95ca-6bc2ad60e307')
  
  if (error) {
    console.error('Error fetching course:', error)
    return null
  }
  
  return course
})

const hasPurchased = computed(() => {
  return store.purchasedCourses.some(course => course.id === courseInfo.value?.id)
})

const testimonials = [
  {
    text: "Awesome tips, lot of the stuff was something new to me or opened up new perspectives of thinking when trying to solve a problem. Thank you Filip for the effort and covering great tips in this course.",
    name: "Vane Terziski",
    title: "Senior Software Development Engineer in Test",
    avatar: "https://avatars.githubusercontent.com/u/12384232"
  },
  {
    text: "99 short, practical and to the point tips which are immediately applicable and fit perfectly into a busy workday. The excellent video and audio quality made the learning easy and enjoyable. I definitely recommend the course.",
    name: "Daniel Neuhaus",
    title: "QA Lead",
    avatar: "https://media.licdn.com/dms/image/v2/C5603AQGpSkTwBX8ynw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1645030555378?e=1745452800&v=beta&t=NANKVpHYBN89M0yaq5hhJOMRHIM9WM2x5XXWWEBEM7g"
  },
  {
    text: "A really nice course. It has something for everyone.",
    name: "Ioan Solderea",
    title: "QA Lead",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQGar3ofNLdmuA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1659504952723?e=1745452800&v=beta&t=phTqkO5UnKSwbKxwVgyDxIdK6deKwFNpfgCgC0SHqaw"
  }
]

useHead({
  meta: [
    {
      name: 'image',
      content: `https://og.filiphric.com/api/og?image=${courseInfo.value?.image_url}&title=${courseInfo.value?.title}&description=Bite-sized tips for your Cypress testing!`
    },
    {
      property: 'og:url',
      content: `https://filiphric.com${route.path}`
    },
    {
      property: 'og:image',
      content: `https://og.filiphric.com/api/og?image=${courseInfo.value?.image_url}&title=${courseInfo.value?.title}&description=Bite-sized tips for your Cypress testing!`
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'twitter:creator',
      content: '@filip_hric'
    },
    {
      property: 'twitter:image',
      content: `https://og.filiphric.com/api/og?image=${courseInfo.value?.image_url}&title=${courseInfo.value?.title}&description=Bite-sized tips for your Cypress testing!`
    },
    {
      property: 'og:title',
      content: courseInfo.value?.title
    },
    {
      property: 'og:description',
      content: courseInfo.value?.description
    },
    {
      hid: 'description',
      name: 'description',
      content: courseInfo.value?.description
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://filiphric.com${route.path}`
    }
  ]
})

</script>

<style scoped>
.wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
  position: relative;
}
mux-player, .placeholder {
  position: absolute;
  inset: 0;
}
.placeholder {
  background-size: contain;
  background-repeat: no-repeat;
}
.flag-tooltip {
  @apply text-2xl relative cursor-default;
}

.flag-tooltip::after {
  content: attr(data-tooltip);
  @apply absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1
         bg-white text-sm rounded-sm border-2 border-black
         opacity-0 invisible transition-all duration-200
         whitespace-nowrap text-black;
}

.flag-tooltip:hover::after {
  @apply opacity-100 visible mb-3;
}
</style>