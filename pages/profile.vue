<template>
  <NuxtLayout>
    <div class="mx-auto mt-14 p-7">
      <div v-if="loading" class="text-center">
        <div class="mb-4">
          <LoaderAnimation />
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
              <NuxtLink href="https://github.com/{{ profile?.github_username }}" target="_blank" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
                <IconGithub class="w-4 h-4" />
                <p>{{ profile?.github_username }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold">Your Courses</h2>
          <div v-if="purchasedCourses?.length" class="grid gap-4">
            <div 
              v-for="{courses: course} in purchasedCourses" 
              :key="course.id"
            >
              <div class="flex items-center justify-between bg-ivory-dark dark:bg-black-dark p-4 gap-7">
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
                    :to="`/course/${course.slug}/lesson`"
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
const user = useSupabaseUser()
const loading = ref(true)
const error = ref('')
const store = useStore()
const { getCurrentUser } = useSupabaseAuth()
const { getProfile } = useSupabaseProfile()
const { getUserCourses } = useSupabaseCourses()

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
const purchasedCourses = ref<UserCourse[]>([])

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
      const { profile: profileData, error: profileError } = await getProfile(user.value.id)
      if (profileError) throw profileError

      // Get GitHub profile data
      const { user: userData, error: userError } = await getCurrentUser()
      if (userError) throw userError
      
      profile.value = {
        ...(profileData as ProfileData),
        avatar_url: userData?.user_metadata?.avatar_url,
        full_name: userData?.user_metadata?.full_name,
        email: userData?.email
      }

      // Get purchased courses
      const { courses: coursesData, error: coursesError } = await  getUserCourses(user.value.id)
      if (coursesError) throw coursesError

      purchasedCourses.value = coursesData || []
      store.setPurchasedCourses(coursesData?.map(item => item.courses) || []) // Save to store
    }
  } catch (err) {
    console.error('Error fetching profile:', err)
    error.value = 'Error loading profile data. Please try refreshing the page.'
  } finally {
    loading.value = false
  }
})
</script> 