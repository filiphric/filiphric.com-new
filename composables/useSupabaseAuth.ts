import { useSupabaseClient } from '#imports'
import { useStore } from '~/stores/useStore'
import type { Provider } from '@supabase/supabase-js'

export const useSupabaseAuth = () => {
  const client = useSupabaseClient()
  const store = useStore()

  const signInWithProvider = async (provider: Provider) => {
    const { error } = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { error }
  }

  const signInWithOtp = async ({ email, options }: { email: string, options?: { emailRedirectTo?: string } }) => {
    const { error } = await client.auth.signInWithOtp({
      email,
      options
    })
    return { error }
  }

  const signOut = async () => {
    const { error } = await client.auth.signOut()
    if (!error) {
      store.setUser(null)
      store.setPurchasedCourses([])
    }
    return { error }
  }

  const getCurrentUser = async () => {
    const { data: { user }, error } = await client.auth.getUser()
    return { user, error }
  }

  return {
    signInWithProvider,
    signInWithOtp,
    signOut,
    getCurrentUser
  }
} 