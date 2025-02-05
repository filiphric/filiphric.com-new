import { useSupabaseClient } from '#imports'
import { useStore } from '~/stores/useStore'
import type { Profile, Database } from '~/types/supabase'

export const useSupabaseProfile = () => {
  const client = useSupabaseClient<Database>()
  const store = useStore()

  const getProfile = async (userId: string) => {
    const { data: profile, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single() as { data: Profile | null, error: any }

    if (!error && profile) {
      store.setUser(profile)
    }
    
    return { profile, error }
  }

  const updateProfile = async (userId: string, updates: Database['public']['Tables']['profiles']['Update']) => {
    const { data, error } = await client
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single() as { data: Profile | null, error: any }

    if (!error && data) {
      store.setUser(data)
    }

    return { data, error }
  }

  return {
    getProfile,
    updateProfile
  }
} 