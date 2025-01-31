<template>
  <div class="loader-container flex justify-center items-center w-20 h-20 mx-auto">
    <div class="flex gap-3">
      <div class="w-3 h-3 rounded-full bg-[#ff657a] animate-bounce-1"></div>
      <div class="w-3 h-3 rounded-full bg-[#ffd76d] animate-bounce-2"></div>
      <div class="w-3 h-3 rounded-full bg-[#9cd1bb] animate-bounce-3"></div>
      <div class="w-3 h-3 rounded-full bg-[#bada55] animate-bounce-4"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
}

.animate-bounce-1 {
  animation: bounce 1s infinite;
}

.animate-bounce-2 {
  animation: bounce 1s infinite;
  animation-delay: -0.2s;
}

.animate-bounce-3 {
  animation: bounce 1s infinite;
  animation-delay: -0.4s;
}

.animate-bounce-4 {
  animation: bounce 1s infinite;
  animation-delay: -0.6s;
}
</style>
