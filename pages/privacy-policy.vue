<template>
  <div class="mx-4 md:mx-24">
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-500 font-medium">Privacy Policy</p>
    </div>
    <!-- breadcrumbs end -->

    <!-- privacy policy content start -->
    <div class="p-1 md:p-5 my-10">
      <div v-html="privacy_policy"></div>
    </div>
    <!-- privacy policy content end -->
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Privacy Policy",
    };
  },

  computed: {
    privacy_policy() {
      return this.$store.getters["company/getPrivacyPolicy"];
    },
  },

  created() {
    this.loadCompanyPrivacyPolicy();
  },

  methods: {
    loadCompanyPrivacyPolicy() {
      this.$store.dispatch("company/loadCompanyPrivacyPolicy");
    },
  },
};
</script>

<style scoped>
::v-deep h1 {
  font-size: 2em;
}
::v-deep h2 {
  font-size: 1.5em;
}
::v-deep h3 {
  font-size: 1.17em;
}

::v-deep .ql-align-center {
  text-align: center !important;
}

::v-deep .ql-align-right {
  text-align: right;
}

::v-deep ul li:not(.ql-direction-rtl) {
  padding-left: 3em;
}

::v-deep .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 3em;
}

::v-deep li:not(.ql-direction-rtl)::before {
  margin-left: -1.5em;
  margin-right: 0.3em;
  text-align: right;
}

::v-deep ul > li::before {
  content: "\2022";
}

::v-deep li::before {
  display: inline-block;
  white-space: nowrap;
  width: 1.2em;
}

::v-deep a {
  text-decoration: underline;
  color: #06c;
}

/* ol */

::v-deep ol,
ul {
  padding-left: 4em;
}

::v-deep ol li:before {
  content: counter(list-0, decimal) ". ";
}

::v-deep ol li {
  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
  counter-increment: list-0;
}
</style>
