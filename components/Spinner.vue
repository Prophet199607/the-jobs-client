<template>
  <div class="main">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #ffffff;
}
.main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
}
.loader {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  border-top: 2px solid #7cff01;
  border-radius: 50%;
  animation: 2s deg linear infinite;
  box-shadow: 0px 0px 3.5px 0.5px #7cff01;
}

.loader::after {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background-color: #ffffff;
  border-bottom: 2px solid #3cb9ff;
  box-shadow: 0px 0px 3.5px 0.5px #3cb9fc;
}
@keyframes deg {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
