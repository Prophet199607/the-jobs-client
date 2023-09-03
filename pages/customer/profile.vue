<template>
  <div class="col-span-12 md:col-span-9 shadow rounded px-6 pt-5 pb-7 w-full">
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-sm text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-600 font-medium">Profile</p>
    </div>
    <!-- breadcrumbs end -->
    <h4 class="text-lg font-medium capitalize mb-4">Profile information</h4>
    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(saveProduct)">
        <div class="space-y-4 text-sm md:text-base">
          <!-- form row start -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">First name</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  v-model="profile.first_name"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter first name"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Last name</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  v-model="profile.last_name"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter last name"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
          </div>
          <!-- form row end -->
          <!-- form row start -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Birthday</label>
              <input
                type="date"
                v-model="profile.birthday"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              />
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Gender</label>
              <select
                v-model="profile.gender"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <!-- single input end -->
          </div>
          <!-- form row end -->
          <!-- form row start -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- single input start -->
            <div class="relative">
              <label for="" class="text-gray-600 mb-2 block">Email Address</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="email"
                  v-model="profile.email"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter email address"
                />
                <i
                  v-if="$auth.user.is_email_verified == 1"
                  class="fa fa-check-circle text-green-500 absolute text-xl right-3 top-9 md:top-10"
                  aria-hidden="true"
                ></i>

                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
              <div
                class="text-red-500 text-sm mt-2 mx-2"
                v-if="
                  $auth.user.is_email_verified == 0 && !verification_email_sent_status
                "
              >
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                You haven't verified your email! Click here to
                <a href="#" class="underline" @click.prevent="resendVerificationEmail"
                  >resend</a
                >.
              </div>
              <!-- verification email sent alert start -->
              <div
                v-if="verification_email_sent_status"
                class="flex p-4 my-2 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
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
                  <span class="font-medium text-base">Note! </span> Please check your
                  email. We have sent you a verification link to your email.
                </div>
              </div>
              <!-- verification email sent alert end -->
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Phone number</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  v-model="profile.phone_number"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter phone number"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
          </div>
          <!-- form row end -->
          <div class="mt-4">
            <button
              type="button"
              @click="saveProfileData"
              class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
            >
              save changes
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },

  data() {
    return {
      profile: {
        id: "",
        first_name: "",
        last_name: "",
        birthday: "",
        gender: "",
        email: "",
        phone_number: "",
      },
    };
  },

  created() {
    this.loadUserDetails();
  },

  computed: {
    verification_email_sent_status() {
      return this.$store.getters["settings/getVerifiedEmailSendStatus"];
    },
  },

  methods: {
    loadUserDetails() {
      this.$store.dispatch("customer/loadCustomerData").then((res) => {
        this.profile = { ...res };
      });
    },

    saveProfileData() {
      this.$store.dispatch("customer/saveProfileData", this.profile).then((res) => {
        this.profile = { ...res.customer };
        swal("Success!", res.message, "success");
      });
    },

    resendVerificationEmail() {
      const user_id = this.$route.query.id_;
      this.$store
        .dispatch("customer/resendVerificationEmail", this.$auth.user.id)
        .then((res) => {
          this.$store.dispatch("settings/changVerifiedEmailSentStatus", true);
        });
    },
  },
};
</script>

<style></style>
