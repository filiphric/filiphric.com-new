<template>
  <div class="loader-container flex justify-center items-center w-20 h-20 mx-auto">
    <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <circle fill="#ff657a" stroke="none" cx="6" cy="50" r="6">
      <animateTransform attributeType="xml"
          attributeName="transform" type="translate"
          values="0 0; 0 20; 0 0"
          begin="0" dur="1s" repeatCount="indefinite" />
    </circle>
    <circle fill="#ffd76d" stroke="none" cx="30" cy="50" r="6">
      <animateTransform attributeType="xml"
          attributeName="transform" type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.2s" dur="1s" repeatCount="indefinite" />
    </circle>
    <circle fill="#9cd1bb" stroke="none" cx="54" cy="50" r="6">
      <animateTransform attributeType="xml"
          attributeName="transform" type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.4s" dur="1s" repeatCount="indefinite" />
    </circle>
    <circle fill="#bada55" stroke="none" cx="78" cy="50" r="6">
      <animateTransform attributeType="xml"
          attributeName="transform" type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.6s" dur="1s" repeatCount="indefinite" />
    </circle>
    </svg>
  </div>
</template>
<style lang="css" scoped>
@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 16px, 0)
  }
  100% {
    transform: translate3d(0, 0, 0)
  }
}

.bounce-1 {
  animation: bounce 1s 0s infinite;
  transition: animation 1s;
}

.bounce-2 {
  animation: bounce 1s 0.2s infinite;
  transition: animation 1s;
}

.bounce-3 {
  animation: bounce 1s 0.4s infinite;
  transition: animation 1s;
}

.bounce-4 {
  animation: bounce 1s 0.6s infinite;
  transition: animation 1s;
}

@keyframes fading {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

.fade-1 {
  animation: fading 1s 0.1s infinite;
}

.fade-2 {
  animation: fading 1s 0.2s infinite;
}

.fade-3 {
  animation: fading 1s 0.3s infinite;
}

.fade-4 {
  animation: fading 1s 0.4s infinite;
}

</style>
