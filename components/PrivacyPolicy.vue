<template>
  <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="max-h-full">
      <client-only>
        <vue-editor v-model="privacy_policy"></vue-editor>
      </client-only>
    </div>
    <div class="mt-32 md:mt-10 text-right">
      <button
        type="button"
        class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
        @click="saveChanges"
      >
        save changes
      </button>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  created() {
    // this.loadCompanyPrivacyPolicy();
  },

  computed: {
    privacy_policy: {
      get() {
        return this.$store.getters["company/getPrivacyPolicy"];
      },

      set(privacy_policy) {
        this.$store.dispatch("company/setPrivacyPolicy", privacy_policy);
      },
    },
  },

  methods: {
    loadCompanyPrivacyPolicy() {
      this.$store.dispatch("company/loadCompanyPrivacyPolicy");
    },

    saveChanges() {
      this.$store
        .dispatch("company/savePrivacyPolicy", { privacy_policy: this.privacy_policy })
        .then((res) => {
          swal("Success!", res.message, "success");
        });
    },
  },
};
</script>

<style scoped>
.about-us-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 2px;
  background-color: darkorange;
}

.quillWrapper {
  height: 25rem;
  max-height: 25rem;
}
</style>
