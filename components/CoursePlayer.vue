<script setup lang="ts">
  import "@mux/mux-player";
  import "@mux/mux-player/themes/minimal";
  import { useSupabaseUser } from '#imports'
  import { useSupabaseWatchedLessons } from '~/composables/useSupabaseWatchedLessons'
  import { useStore } from '#imports'

  const props = defineProps({
    playbackId: {
      type: String,
      required: true
    },
    lessonId: {
      type: String,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['ended', 'lessonWatched'])
  const user = useSupabaseUser()
  const store = useStore()
  const { markLessonAsWatched, getWatchedLessons } = useSupabaseWatchedLessons()
  const playerRef = ref<HTMLElement | null>(null)
  const shouldAutoplay = ref(false)

  const onPlay = async () => {
    try {
      if (user.value?.id && store.user?.stripe_customer) {
        // First check if lesson is already watched
        const { lessons: watchedLessons, error } = await getWatchedLessons(user.value.id)
        if (error) throw error
        
        if (watchedLessons.includes(props.lessonId)) {
          // If already watched, just emit the event
          emit('lessonWatched', props.lessonId)
        } else {
          // If not watched, mark it as watched
          const { watchedLesson } = await markLessonAsWatched(user.value.id, props.lessonId)
          if (watchedLesson) {
            emit('lessonWatched', props.lessonId)
          }
        }
      }
    } catch (err) {
      console.debug('Error marking lesson as watched:', err)
    }
  }

  const onEnded = () => {
    emit('ended')
  }

  const onLoadedMetadata = () => {
    if (shouldAutoplay.value) {
      // @ts-ignore - mux-player has play() method
      playerRef.value?.play()
      shouldAutoplay.value = false
    }
  }

  // Watch for playbackId changes to handle autoplay
  watch(() => props.playbackId, () => {
    if (props.autoplay) {
      shouldAutoplay.value = true
    }
  })
</script>

<template>
  <mux-player
    ref="playerRef"
    :playback-id="props.playbackId"
    theme="minimal"
    @play="onPlay"
    @ended="onEnded"
    @loadedmetadata="onLoadedMetadata"
  />
</template>

<style>
mux-player {
  aspect-ratio: 16 / 9;
}
</style>