<template>
  <div class="class-name">
    <h1>Customer Dashboard</h1>
    <button
      type="button"
      class="bg-red-500 text-white rounded py-2 px-4 my-5 mx-5 text-base font-semibold"
      @click="logout"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  middleware: ["auth", "customer"],
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
