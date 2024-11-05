<template>
  <NuxtLayout>
    <div class="max-w-2xl mx-auto mt-14 p-7">
      <div v-if="loading" class="text-center">
        Loading...
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
const profile = ref<any>(null)
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
      const { data: profileData } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()

      // Get GitHub profile data from auth.users metadata
      const { data: { user: userData } } = await client.auth.getUser()
      
      profile.value = {
        ...profileData,
        avatar_url: userData?.user_metadata?.avatar_url,
        full_name: userData?.user_metadata?.full_name
      }

      // Get purchased courses
      const { data: coursesData } = await client
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

      purchasedCourses.value = coursesData?.map(item => item.courses) || []
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
  } finally {
    loading.value = false
  }
})
</script> 