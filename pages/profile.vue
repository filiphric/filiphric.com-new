<template>
  <NuxtLayout>
    <div class="max-w-2xl mx-auto mt-14 p-7">
      <div v-if="loading" class="text-center">
        <div class="mb-4">
          <svg class="animate-spin h-8 w-8 text-gray-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-xl">Loading profile...</p>
      </div>
      
      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>
      
      <div v-else class="space-y-7">
        <div class="flex items-center gap-5">
          <img 
            :src="profile?.avatar_url" 
            :alt="profile?.full_name" 
            class="w-20 h-20 rounded-full"
          >
          <div>
            <h1 class="text-4xl font-bold">{{ profile?.full_name }}</h1>
            <p class="text-gray-500">{{ profile?.email }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold">Your Courses</h2>
          <div v-if="purchasedCourses?.length" class="grid gap-4">
            <div 
              v-for="course in purchasedCourses" 
              :key="course.id"
              class="p-4 bg-white dark:bg-black-light shadow-block"
            >
              <h3 class="text-xl font-bold">{{ course.title }}</h3>
              <NuxtLink 
                :to="`/course/${course.slug}/content`"
                class="prettyLink mt-2 inline-block"
              >
                Continue Learning
              </NuxtLink>
            </div>
          </div>
          <div v-else class="text-gray-500">
            You haven't purchased any courses yet.
            <NuxtLink to="/courses" class="prettyLink ml-2">
              Browse Courses
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(true)
const error = ref('')

interface ProfileData {
  id: string
  updated_at?: string
  username?: string
  full_name?: string
  avatar_url?: string
  email?: string
}

const profile = ref<ProfileData | null>(null)
const purchasedCourses = ref<any[]>([])

// Redirect if not logged in
watchEffect(() => {
  if (!user.value) {
    navigateTo('/auth')
  }
})

onMounted(async () => {
  try {
    if (user.value) {
      // Get profile data
      const { data: profileData, error: profileError } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()
      
      if (profileError) throw profileError

      // Get GitHub profile data
      const { data: { user: userData }, error: userError } = await client.auth.getUser()
      if (userError) throw userError
      
      profile.value = {
        ...(profileData as ProfileData),
        avatar_url: userData?.user_metadata?.avatar_url,
        full_name: userData?.user_metadata?.full_name,
        email: userData?.email
      }

      // Get purchased courses
      const { data: coursesData, error: coursesError } = await client
        .from('user_courses')
        .select(`
          course_id,
          courses (
            id,
            title,
            slug
          )
        `)
        .eq('user_id', user.value.id)
      
      if (coursesError) throw coursesError

      purchasedCourses.value = coursesData?.map(item => item.courses) || []
    }
  } catch (err) {
    console.error('Error fetching profile:', err)
    error.value = 'Error loading profile data. Please try refreshing the page.'
  } finally {
    loading.value = false
  }
})
</script> 