<template>
  <div class="col-span-12 md:col-span-9 shadow rounded w-full p-5">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>

      <p class="text-gray-500 font-medium">My Profile</p>
    </div>
    <!-- breadcrumbs end -->
    <div class="container mx-auto mt-8 bg-white grid grid-cols-5 gap-4">
      <!-- First Column: Personal Information -->
      <div class="col-span-2">
        <h2 class="text-xl font-normal">Personal Information</h2>
        <!-- Add your text fields or other elements here -->
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="johndoe@example.com"
          />
        </div>
        <!-- Add more text fields as needed -->
      </div>
      <!-- Second Column: Profile Card (from your previous code) -->
      <div class="relative col-span-3 p-4 bg-white rounded-lg shadow-md">
        <div class="profile-image w-32 h-32 rounded-full overflow-hidden bg-gray-300">
          <img
            src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg"
            alt="My Profile"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="md:w-3/4 mt-4 md:mt-0">
          <h2 class="text-xl font-semibold">Sara John</h2>
          <p class="text-gray-600">Web Developer</p>
          <p class="mt-4 text-gray-700 text-base">
            Hi! I'm John Doe, a passionate web developer with experience in building
            modern and responsive websites. I love coding, learning new technologies, and
            creating user-friendly web applications.
          </p>
          <div class="mt-6">
            <h3 class="text-lg font-semibold">Connect with Me</h3>
            <div class="flex mt-2">
              <a
                href="https://twitter.com/johndoe"
                target="_blank"
                class="mr-4 text-blue-500 hover:underline text-base"
              >
                <i class="fab fa-twitter"></i> Twitter
              </a>
              <a
                href="https://linkedin.com/in/johndoe"
                target="_blank"
                class="mr-4 text-blue-500 hover:underline text-base"
              >
                <i class="fab fa-linkedin"></i> LinkedIn
              </a>
              <a
                href="https://github.com/johndoe"
                target="_blank"
                class="text-blue-500 hover:underline text-base"
              >
                <i class="fab fa-github"></i> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected_tab: 1,
    };
  },
  mounted() {
    const evt = new Event("DOMContentLoaded", { bubbles: true, cancelable: false });
    document.dispatchEvent(evt);
  },

  methods: {
    tabChange(tab) {
      this.selected_tab = tab;
    },
  },
};
</script>

<style>
.profile-image {
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
