<template>
  <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="max-h-full">
      <client-only>
        <vue-editor v-model="terms_and_conditions"></vue-editor>
      </client-only>
    </div>
    <div class="mt-32 md:mt-10 text-right">
      <button
        type="button"
        class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
        @click="saveChanges"
      >
        save changesss
      </button>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  created() {
    // this.loadCompanyTermsAndConditions();
  },

  computed: {
    terms_and_conditions: {
      get() {
        return this.$store.getters["company/getTermsAndConditions"];
      },

      set(terms_and_conditions) {
        this.$store.dispatch("company/setTermsAndConditions", terms_and_conditions);
      },
    },
  },

  methods: {
    loadCompanyTermsAndConditions() {
      this.$store.dispatch("company/loadCompanyTermsAndConditions");
    },

    saveChanges() {
      this.$store
        .dispatch("company/saveTermsAndConditions", {
          terms_and_conditions: this.terms_and_conditions,
        })
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
