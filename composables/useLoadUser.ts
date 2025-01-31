import type { Profile } from '~/types/supabase'

export const useLoadUser = async () => {
  const client = useSupabaseClient()
  const store = useStore()
  
  try {
    const { data: { user } } = await client.auth.getUser()
    
    if (user) {
      const { data: profile } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as { data: Profile | null }

      store.setUser({
        id: user.id,
        email: user.email as string,
        first_name: user.user_metadata?.first_name || null,
        last_name: user.user_metadata?.last_name || null,
        created_at: user.created_at,
        updated_at: user.last_sign_in_at || user.created_at,
        stripe_customer: profile?.stripe_customer || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        full_name: user.user_metadata?.full_name || null
      })
    } else {
      store.setUser(null)
    }
  } catch (error) {
    console.error('Error loading user:', error)
    store.setUser(null)
  }
} 