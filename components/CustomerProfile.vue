<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(saveData)">
      <!-- form row start -->
      <div class="grid grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4">
        <!-- single input start -->
        <!-- <div class="row-span-4 flex flex-col items-center justify-start gap-2">
          <label for="" class="text-gray-600 block">Customer Image</label>
          <img
            :src="image_prev"
            class="cursor-pointer pb-3 customer-image"
            alt=""
            for="company_image"
          />
        </div> -->
        <!-- single input end -->
        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-1 block text-xs">First name</label>
          {{ customer.first_name }}
        </div>
        <!-- single input end -->
        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-1 block text-xs">Last Name</label>
          {{ customer.last_name }}
        </div>
        <!-- single input end -->

        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-1 block text-xs">Email</label>
          {{ customer.email }}
        </div>
        <!-- single input end -->
        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-1 block text-xs">Contact No</label>
          <div>
            {{ customer.phone_number }}
          </div>
        </div>
        <!-- single input end -->
        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-2 block text-xs">Registered Date</label>
          <div>{{ customer.created_at | formattedDate }}</div>
        </div>
        <!-- single input end -->
      </div>
      <!-- form row end -->
    </form>
  </ValidationObserver>
</template>

<script>
import swal from "sweetalert";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },

  data() {
    return {
      customer: {},
      image_prev: `${process.env.API_IMAGE_BASE_URL}customer/default.png`,
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loadSelectedCustomerDetails();
  },

  methods: {
    loadSelectedCustomerDetails() {
      this.$store
        .dispatch("customer/loadSelectedCustomerDetails", this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.customer = res;
          // if (res.company_image) {
          //   this.image_prev = process.env.API_IMAGE_BASE_URL + res.company_image;
          // }
        });
    },

    changeImage(e) {
      const file = e.target.files[0];
      this.image_prev = URL.createObjectURL(file);
      this.customer.company_image = file;
    },

    clearForm() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.customer-image {
  width: 300px;
  height: 300px;
}
</style>
