<template>
  <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div class="max-h-full">
      <client-only>
        <vue-editor v-model="return_policy"></vue-editor>
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
    this.loadCompanyReturnPolicy();
  },

  computed: {
    return_policy: {
      get() {
        return this.$store.getters["company/getReturnPolicy"];
      },

      set(return_policy) {
        this.$store.dispatch("company/setReturnPolicy", return_policy);
      },
    },
  },

  methods: {
    loadCompanyReturnPolicy() {
      this.$store.dispatch("company/loadCompanyReturnPolicy");
    },

    saveChanges() {
      this.$store
        .dispatch("company/saveReturnPolicy", { return_policy: this.return_policy })
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
