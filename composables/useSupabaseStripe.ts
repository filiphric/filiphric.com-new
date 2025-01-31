import { useSupabaseClient } from '#imports'
import type { Profile } from '~/types/supabase'

export const useSupabaseStripe = () => {
  const client = useSupabaseClient()

  const updateStripeCustomer = async (userId: string, stripeCustomerId: string) => {
    const { data, error } = await client
      .from('profiles')
      .update({
        stripe_customer: stripeCustomerId
      })
      .eq('id', userId)
      .select()
      .single()

    return { data: data as Profile | null, error }
  }

  const getStripeCustomer = async (userId: string) => {
    const { data, error } = await client
      .from('profiles')
      .select('stripe_customer')
      .eq('id', userId)
      .single()

    return { stripeCustomerId: data?.stripe_customer, error }
  }

  return {
    updateStripeCustomer,
    getStripeCustomer
  }
} 