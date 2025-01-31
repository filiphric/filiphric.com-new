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
    @play="onPlay"
    @ended="onEnded"
    @loadedmetadata="onLoadedMetadata"
    primary-color="black"
    secondary-color="white"
    accent-color="#bada55"
  />
</template>

<style>

mux-player {
  aspect-ratio: 16 / 9;
  --live-button: none;
  --seek-backward-button: none;
  --seek-forward-button: none;
  --airplay-button: none;
  --pip-button: none;
  --rendition-menu-button: none;
}

/* play button when video is stopped */
mux-player::part(center button pre-play) {
  @apply bg-white border-2 border-solid border-black rounded-none w-[90px] h-[90px];
}

mux-player::part(center button pre-play):hover {
  @apply bg-white shadow-block-lime border-black border-solid border-2 w-[94px] h-[94px] -translate-x-2 -translate-y-2 transition-all;
}

mux-player::part(top) {
  @apply bg-transparent rounded-none;
}

/* controls */
mux-player::part(control-bar bottom) {
  @apply bg-white rounded-none m-0 p-0 border-t-2 border-x-0 border-b-0 border-black border-solid;
}

mux-player::part(bottom) {
  @apply bg-white rounded-none;
}

mux-player::part(time range) {
  @apply bg-white rounded-none border-b-[3px] border-black border-solid border-t-0 border-x-0 py-2;
}


mux-player::part(mute button),
mux-player::part(time display),
mux-player::part(captions button) {
  @apply bg-white rounded-none border-black border-solid border-x border-y-0;
}

mux-player::part(volume range) {
  @apply bg-white rounded-none border-black border-solid border-y-0 border-l border-r-2;
}

mux-player::part(play button) {
  @apply bg-white rounded-none border-black border-solid border-y-0 border-l-0 border-r;
}

mux-player::part(playback-rate button) {
  @apply bg-white rounded-none border-black border-solid border-y-0 border-l-2 border-r;
}

mux-player::part(fullscreen button) {
  @apply bg-white rounded-none border-black border-solid border-y-0 border-l border-r-0;
}

mux-player::part(mute button):hover,
mux-player::part(time display):hover,
mux-player::part(captions button):hover,
mux-player::part(volume range):hover,
mux-player::part(bottom play button):hover,
mux-player::part(playback-rate button):hover,
mux-player::part(fullscreen button):hover {
  box-shadow: inset 2px 2px 5px rgba(0,0,0,0.2);
  transition: box-shadow 0.1s ease-in-out;
}


</style>
