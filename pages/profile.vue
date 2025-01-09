<template>
  <NuxtLayout>
    <div class="mx-auto mt-14 p-7">
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
            class="w-24 h-24 rounded-full"
          >
          <div class="flex flex-col gap-1 justify-center">
            <h1 class="text-4xl font-bold">{{ profile?.full_name }}</h1>
            <div class="flex items-center gap-1">
              <p class="text-gray-500">{{ profile?.email }}</p>
              <p class="text-gray-500 mx-2">|</p>
              <IconGithub class="w-4 h-4" />
              <a href="https://github.com/{{ profile?.github_username }}" target="_blank" class="text-gray-500">{{ profile?.github_username }}</a>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold">Your Courses</h2>
          <div v-if="purchasedCourses?.length" class="grid gap-4">
            <div 
              v-for="course in purchasedCourses" 
              :key="course.id"
            >
              <div class="flex items-center justify-between bg-ivory-dark p-4 gap-7">
                <Image 
                  :src="course.image_url" 
                  :alt="course.title"
                  class="w-40 h-40"
                />
                <div class="flex-1">
                  <h3 class="text-2xl font-bold">{{ course.title }}</h3>
                  <p class="text-gray-500">{{ course.description }}</p>
                </div>
                  <ActionButton 
                    :to="`/course/${course.slug}/content`"
                  class="font-md"
                >
                  Continue Learning
                </ActionButton>
              </div>
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
  github_username?: string
}

interface UserCourse {
  course_id: string
  courses: {
    id: string
    title: string
    slug: string
    image_url: string
    description: string
  }
}

const profile = ref<ProfileData | null>(null)
const purchasedCourses = ref<UserCourse['courses'][]>([])

// Redirect if not logged in
watchEffect(() => {
  if (!user.value) {
    navigateTo('/login')
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
            slug,
            image_url,
            description
          )
        `)
        .eq('user_id', user.value.id) as { data: UserCourse[] | null, error: any }
      
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