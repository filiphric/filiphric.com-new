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
    }
  })

  const emit = defineEmits(['ended', 'lessonWatched'])
  const user = useSupabaseUser()
  const store = useStore()
  const { markLessonAsWatched } = useSupabaseWatchedLessons()

  const onPlay = async () => {
    if (user.value?.id && store.user?.stripe_customer) {
      const { watchedLesson } = await markLessonAsWatched(user.value.id, props.lessonId)
      if (watchedLesson) {
        emit('lessonWatched', props.lessonId)
      }
    }
  }

  const onEnded = () => {
    emit('ended')
  }
</script>

<template>
  <mux-player
    :playback-id="props.playbackId"
    theme="minimal"
    @play="onPlay"
    @ended="onEnded"
  />
</template>

<style>
mux-player {
  aspect-ratio: 16 / 9;
}
</style>