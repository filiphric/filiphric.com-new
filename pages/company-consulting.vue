<template>
  <NuxtLayout>
    <!-- Hero Section -->
    <ContentBlock image="/small_square_kdhln0.png" alt="Filip Hric consulting a testing project">
      <template #heading>
        Company Consulting
      </template>
      <template #description>
        I help companies deliver high-quality software by setting up a healthy testing culture, providing product feedback, and helping you reach your ideal customers.
      </template>
      <template #paragraph>
        <div class="mt-7">
          <ActionButton to="https://cal.com/filiphric/consulting-intro" class="-rotate-1">
            Book a call
          </ActionButton>
        </div>
      </template>
    </ContentBlock>

    <!-- Company Logos Section -->
    <section class="my-20">
      <h2 class="text-3xl font-bold text-center mb-7">Companies I've helped as a consultant</h2>
      <div class="flex flex-wrap justify-center gap-8 items-center dark:bg-black-lighter bg-ivory-dark p-4">
        <Image src="vestberry_logo_c2ir9y.png" alt="Vestberry" class="w-[150px]" />
        <Image src="GymBeam_lb2baw.png" alt="GymBeam" class="w-[150px]" />
        <Image src="carvolution_srrafi.png" alt="Carvolution" class="w-[150px]" />
        <Image src="octomind_cr4ylo.png" alt="Octomind" class="w-[150px]" />
        <Image src="metabase_logo_icon_168103_rf0roi.png" alt="Metabase" class="w-[150px]" />
      </div>
    </section>

    <!-- How it Works Section -->
    <section id="how-it-works" class="my-20">
      <ContentBlock alt="How consulting works" image="/how-it-works_pnwtmi.png">
        <template #heading>
          How it works
        </template>
        <template #description>
          My consulting process is simple and effective:
        </template>
        <template #paragraph>
          <ol class="mt-7 space-y-5 text-lg">
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span><b>Introductory Call:</b> We discuss your needs, challenges, and goals.</span>
            </li>
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span><b>Proposal:</b> I prepare a tailored proposal with actionable steps and outcomes.</span>
            </li>
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span><b>Agreement:</b> We agree on the scope, timeline, and start working together.</span>
            </li>
          </ol>
        </template>
      </ContentBlock>
    </section>

    <!-- Early Product Feedback Section -->
    <section class="my-20">
      <ContentBlock alt="Early product feedback for startups" image="early-product-feedback_ruchqv" rtl="true">
        <template #heading>
          Early Product Feedback
        </template>
        <template #description>
          Are you a startup? I can help you with early product feedback and finding your ideal customer.
        </template>
        <template #paragraph>
          <ul class="mt-7 space-y-3 text-lg">
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span>Get actionable feedback on your MVP or new features.</span>
            </li>
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span>Identify your ideal customer profile and how to reach them.</span>
            </li>
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span>Improve your product-market fit with expert advice.</span>
            </li>
          </ul>
        </template>
      </ContentBlock>
    </section>

    <!-- Community Research & Conference Tips Section -->
    <section class="my-20">
      <ContentBlock alt="Community research and conference tips" image="conferences_wxzgys">
        <template #heading>
          Community Research & Conference Tips
        </template>
        <template #description>
          I help you understand your community and choose the best conferences for your product.
        </template>
        <template #paragraph>
          <ul class="mt-7 space-y-3 text-lg">
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span>Community research to find where your users are and what they need.</span>
            </li>
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span>Personalized tips on which conferences to attend for maximum impact.</span>
            </li>
            <li class="flex items-start gap-3">
              <IconCheckmarkRound class="fill-lime w-7 h-7 flex-shrink-0" />
              <span>Strategies for building your product's presence in the right communities.</span>
            </li>
          </ul>
        </template>
      </ContentBlock>
    </section>

    <!-- Book a Call Button at the End -->
    <div class="flex justify-center my-20">
      <ActionButton to="https://cal.com/filiphric/consulting-intro" class="-rotate-1 text-4xl ">
        Book a call
      </ActionButton>
    </div>
  </NuxtLayout>
</template>

<script setup>
import ContentBlock from '~/components/ContentBlock.vue'
import ActionButton from '~/components/ActionButton.vue'
import IconCheckmarkRound from '~/components/icon/CheckmarkRound.vue'
</script>
