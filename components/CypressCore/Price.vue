<template>
  <div class="mx-auto my-14 grid w-full gap-7 rounded-lg bg-ivory-dark p-7 font-bold dark:bg-black-dark md:w-10/12">
    <div>
      <Image src="core_workshop_2_q9fzxv.png" class="mx-auto block w-1/2" alt="Cypress core workshop" />
      <div class="text-center text-3xl font-extrabold">
        Cypress core workshop
      </div>
    </div>
    <div class="self-center">
      <CypressCoreYouWillGet />
      <div>
        <div class="text-center">
          <div>
            <span v-if="discountApplied" class="pr-2 text-2xl text-gray-600 line-through">{{ 499 }} €</span>
            <div class="px-5 text-6xl font-extrabold">
              {{ price?.data?.unit_amount / 100 }} €
            </div>
            <span v-if="discountApplied" class="text-lg font-semibold text-lime"> 🎉 {{ (discount?.data?.amount * 100).toFixed(0) }}% discount applied 🎉</span>
            <div v-if="discountApplied" class="mx-auto w-1/2 pb-5 pt-3 text-xs font-normal text-gray-400">
              <p>Note that discount can only be applied if your payment info matches the recognized country. Mismatched registrations will be automatically cancelled.</p>
              <p class="prettyLink inline-block cursor-pointer pt-3 font-semibold" @click="$emit('remove-discount')">
                Click here if you want to remove discount
              </p>
            </div>
          </div>
        </div>
        <div v-if="discount?.data?.eligible && !discountApplied">
          <WorkshopsParityDiscount :info="discount.data" @apply-discount="$emit('apply-discount')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineEmits(['apply-discount', 'remove-discount'])
defineProps({
  price: {
    type: Object,
    default: () => {
      return {
        data: {
          unit_amount: 49900
        }
      }
    }
  },
  discount: {
    type: Object,
    default: () => {
      return {
        data: {
          country: 'US',
          eligible: false,
          amount: 0
        }
      }
    }
  },
  discountApplied: {
    type: Boolean,
    default: false
  }
})
</script>
