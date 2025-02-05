<script setup lang="ts">
  import "@mux/mux-player";
  import "@mux/mux-player/themes/minimal";
  import { useSupabaseUser } from '#imports'
  import { useSupabaseWatchedLessons } from '~/composables/useSupabaseWatchedLessons'
  import { useStore } from '#imports'

  // Media controller event constants
  const SET_SUBTITLES_EVENT = "mediashowsubtitlesrequest"
  const DISABLE_SUBTITLES_EVENT = "mediadisablesubtitlesrequest"

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
  const mediaController = ref<any>(null)

  const setupMediaController = () => {
    if (!playerRef.value) return

    mediaController.value = playerRef.value
      .shadowRoot?.querySelector("media-theme")
      ?.shadowRoot?.querySelector("media-controller")

    if (mediaController.value) {
      mediaController.value.addEventListener(SET_SUBTITLES_EVENT, (event: CustomEvent) => {
        localStorage.setItem('subtitles', event.detail)
      })
    }
  }

  const setSubtitles = () => {
    const value = localStorage.getItem('subtitles')
    if (!value || !mediaController.value) return

    const currentValue = mediaController.value.getAttribute("mediaSubtitlesShowing")
    if (currentValue) {
      const elements = currentValue.split(":")
      mediaController.value.dispatchEvent(new CustomEvent(DISABLE_SUBTITLES_EVENT, {
        detail: [{
          kind: "subtitles",
          language: elements[1],
          label: elements[2],
        }],
        composed: true,
        bubbles: true,
      }))
    }

    mediaController.value.dispatchEvent(new CustomEvent(SET_SUBTITLES_EVENT, {
      detail: value,
      composed: true,
      bubbles: true,
    }))
  }

  const onPlay = async () => {
    try {
      if (user.value?.id && store.user?.stripe_customer) {
        const { lessons: watchedLessons, error } = await getWatchedLessons(user.value.id)
        if (error) throw error
        
        if (watchedLessons.includes(props.lessonId)) {
          emit('lessonWatched', props.lessonId)
        } else {
          const { watchedLesson } = await markLessonAsWatched(user.value.id, props.lessonId)
          if (watchedLesson) {
            emit('lessonWatched', props.lessonId)
          }
        }
      }
      setSubtitles()
    } catch (err) {
      console.debug('Error marking lesson as watched:', err)
    }
  }

  const onEnded = () => {
    emit('ended')
  }

  const onLoadedMetadata = () => {
    setupMediaController()
    const savedRate = localStorage.getItem('playbackrate')
    if (savedRate && playerRef.value) {
      // @ts-ignore - mux-player has playbackRate property
      playerRef.value.playbackRate = parseFloat(savedRate)
    }
    if (shouldAutoplay.value) {
      // @ts-ignore - mux-player has play() method
      playerRef.value?.play()
      shouldAutoplay.value = false
    }
  }

  const onRateChange = (event: Event) => {
    // @ts-ignore - mux-player has playbackRate property
    const rate = (event.target as HTMLElement).playbackRate
    localStorage.setItem('playbackrate', rate.toString())
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
    @ratechange="onRateChange"
    primary-color="black"
    secondary-color="white"
    accent-color="#bada55"
  />
</template>
