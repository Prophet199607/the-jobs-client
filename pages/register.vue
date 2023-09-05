<template>
  <div class="px-5 md:px-24 py-16">
    <div class="max-w-xl mx-auto shadow px-3 py-7 rounded overflow-hidden">
      <h2 class="text-2xl uppercase font-medium mb-1">Create an account</h2>
      <p class="text-gray-600 mb-6 text-sm">Register here if you don't have account</p>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(registerJobSeeker)">
          <div class="space-y-4">
            <!-- registration form start -->
            <div class="col-span-12 row-span-2 md:col-span-8 rounded">
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >First Name <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="job_seeker.firstName"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter first name"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Last Name <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="job_seeker.lastName"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter last name"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Phone Number <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="job_seeker.contactNumber"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter phone number"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm">Email</label>
                    <ValidationProvider v-slot="{ errors }" rules="required|email">
                      <input
                        type="email"
                        name="Email"
                        v-model="job_seeker.email"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter email address"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </div>
            <!-- registration form end -->
            <div>
              <label class="text-gray-600 mb-2 block text-sm"
                >User Name <span class="text-primary">*</span></label
              >
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  v-model="job_seeker.user.userName"
                  class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter user name"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div>
              <label class="text-gray-600 mb-2 block"
                >Password<span class="text-primary">*</span></label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:4"
                vid="password"
              >
                <input
                  type="password"
                  v-model="job_seeker.user.password"
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary focus:border-2 placeholder-gray-400"
                  placeholder="Enter your password"
                  name="password"
                  ref="password"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div>
              <label class="text-gray-600 mb-2 block"
                >Confirm Password<span class="text-primary">*</span></label
              >
              <ValidationProvider v-slot="{ errors }" rules="required|confirmed:password">
                <input
                  type="password"
                  v-model="job_seeker.user.passwordConfirmation"
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary focus:border-2 placeholder-gray-400"
                  placeholder="Enter your password"
                  name="password_reset"
                  ref="password_reset"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
          </div>
          <div class="flex items-start mb-4 mt-2">
            <input
              id="agreement"
              type="checkbox"
              v-model="agreement"
              class="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3 mt-1.5"
            />
            <label for="agreement" class="text-gray-600 ml-3 cursor-pointer text-sm"
              >I have read and agree to the
              <a href="/privacy-policy" target="_blank" class="text-primary"
                >privacy policy</a
              >
              and
              <a href="/terms-and-conditions" target="_blank" class="text-primary"
                >terms & conditions</a
              ></label
            >
          </div>
          <div class="mt-4">
            <button
              type="submit"
              class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary"
            >
              Sign Up
            </button>
          </div>
        </form>
      </ValidationObserver>
      <!-- login with start -->
      <!-- <div class="mt-6 flex justify-center relative">
        <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">
          or sign up with
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
        Already have an account?
        <NuxtLink to="/login" class="text-primary">Login now</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
import { ModelSelect } from "vue-search-select";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  middleware: "guest",

  components: {
    ModelSelect,
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },

  data() {
    return {
      job_seeker: {
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        isActive: true,
        user: {
          userName: "",
          password: "",
          passwordConfirmation: "",
        },
      },
      agreement: false,
    };
  },

  methods: {
    registerJobSeeker() {
      if (this.agreement) {
        this.job_seeker.user.email = this.job_seeker.email;
        this.job_seeker.user.fullName =
          this.job_seeker.firstName + " " + this.job_seeker.lastName;

        this.$store
          .dispatch("job-seeker/register", { job_seeker: this.job_seeker })
          .then((res) => {
            this.clearForm();
            swal("Success!", "You have successfully registered", "success");
            this.$router.push({
              path: "/login",
            });
          });
      }
    },

    clearForm() {
      this.$refs.form.reset();
      this.job_seeker = {
        jobSeekerId: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        isActive: true,
        user: {
          userName: "",
          password: "",
          passwordConfirmation: "",
        },
      };
    },
  },
};
</script>

<style></style>
