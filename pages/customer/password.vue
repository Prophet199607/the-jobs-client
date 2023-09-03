<template>
  <div>
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3 px-6 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-sm text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-600 font-medium text-base">Change Password</p>
    </div>
    <!-- breadcrumbs end -->
    <div class="col-span-9 grid grid-cols-1 md:grid-cols-2 px-6 gap-4">
      <ValidationObserver v-slot="{ handleSubmit }" ref="passwordChangeForm">
        <form @submit.prevent="handleSubmit(changePassword)" class="mt-8">
          <div class="mb-5">
            <label class="text-gray-600 mb-1 block text-base"
              >Current Password<span class="text-primary">*</span></label
            >
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="password"
                v-model="form.current_password"
                class="block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary focus:border-2 placeholder-gray-400"
                placeholder="Enter your current password"
                name="password"
                ref="password"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="mb-5">
            <label class="text-gray-600 mb-1 block text-base"
              >New Password<span class="text-primary">*</span></label
            >
            <ValidationProvider v-slot="{ errors }" rules="required|min:8" vid="password">
              <input
                type="password"
                v-model="form.new_password"
                class="block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary focus:border-2 placeholder-gray-400"
                placeholder="Enter new password"
                name="password"
                ref="password"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="mb-5">
            <label class="text-gray-600 mb-1 block text-base"
              >Confirm Password<span class="text-primary">*</span></label
            >
            <ValidationProvider v-slot="{ errors }" rules="required|confirmed:password">
              <input
                type="password"
                v-model="form.password_confiremed"
                class="block w-full border border-gray-300 px-4 py-2 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary focus:border-2 placeholder-gray-400"
                placeholder="Re-enter password"
                name="password_reset"
                ref="password_reset"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="mt-4">
            <button
              type="submit"
              class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
            >
              save changes
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script scoped>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },

  data() {
    return {
      form: {
        current_password: "",
        new_password: "",
        password_confiremed: "",
      },
    };
  },

  methods: {
    changePassword() {
      this.$store
        .dispatch("customer/changePassword", this.form)
        .then((res) => {
          this.form = {
            current_password: "",
            new_password: "",
            password_confiremed: "",
          };
          this.$refs.passwordChangeForm.reset();
          swal("Success!", res.message, "success");
        })
        .catch((err) => {
          swal("Error!", err.response.data.message, "error");
        });
    },
  },
};
</script>

<style></style>
