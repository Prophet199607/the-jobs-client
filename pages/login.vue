<template>
  <div class="px-5 md:px-24 py-16">
    <div class="max-w-lg mx-auto shadow px-3 py-7 rounded overflow-hidden">
      <!-- verification email sent alert start -->
      <div
        v-if="verification_email_sent_status"
        class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
        role="alert"
      >
        <svg
          class="inline flex-shrink-0 mr-3 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div>
          <span class="font-medium">Note! </span> Please check your email. We have sent
          you a verification link to your email.
        </div>
      </div>
      <!-- verification email sent alert end -->
      <h2 class="text-2xl uppercase font-medium mb-1">Login</h2>
      <p class="text-gray-600 mb-6 text-sm">Login if you are a returning customer</p>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(login)">
          <div class="space-y-4">
            <div>
              <label class="text-gray-600 mb-2 block">Email address</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  v-model="email"
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary focus:border-2 placeholder-gray-400"
                  :class="{ 'border-2 border-red-500': logginError }"
                  placeholder="Enter your email address"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">Password</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="password"
                  v-model="password"
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary focus:border-2 placeholder-gray-400"
                  :class="{ 'border-2 border-red-500': logginError }"
                  placeholder="Enter your password"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
          </div>
          <div class="flex items-center justify-between mt-6">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                v-model="isRememberMe"
                class="text-primary focus::ring-0 rounded-sm cursor-pointer"
              />
              <label for="agreement" class="text-gray-600 ml-3 cursor-pointer"
                >Remember me</label
              >
            </div>
            <a href="#" class="text-primary">Forgot password?</a>
          </div>
          <div class="mt-4">
            <button
              type="submit"
              class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary"
            >
              Login
            </button>
          </div>
        </form>
      </ValidationObserver>
      <!-- login with start -->
      <!-- <div class="mt-6 flex justify-center relative">
        <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">
          or login with
        </div>
        <div class="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
      </div>
      <div class="flex mt-4 gap-4">
        <a
          href="#"
          class="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-inter font-medium text-sm hover:bg-blue-700"
          >Facebook</a
        >
        <a
          href="#"
          class="w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-inter font-medium text-sm hover:bg-yellow-500"
          >Google</a
        >
      </div> -->
      <!-- login with end -->
      <p class="mt-4 text-gray-600 text-center">
        Don't have an account?
        <NuxtLink to="/register" class="text-primary">Register now</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  middleware: ["guest"],

  components: {
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },

  data() {
    return {
      email: "",
      password: "",
      isRememberMe: false,
      logginError: false,
    };
  },

  computed: {
    verification_email_sent_status() {
      return this.$store.getters["settings/getVerifiedEmailSendStatus"];
    },
  },

  methods: {
    async login() {
      this.logginError = false;
      this.$store
        .dispatch("auth-api/login", {
          username: this.email,
          password: this.password,
        })
        .then((res) => {
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          this.logginError = true;
        });
    },
  },
};
</script>

<style></style>
