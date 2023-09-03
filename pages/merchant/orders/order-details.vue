<template>
  <div class="w-full">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <NuxtLink to="/merchant/orders" class="text-primary font-medium">Orders</NuxtLink>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-500 font-medium">{{ this.$route.query.no }}</p>
    </div>
    <!-- breadcrumbs end -->
    <!-- remark add modal start -->
    <div
      v-if="showCategoryModal"
      class="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-30"
    >
      <div class="relative p-4 mt-3 w-full max-w-xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header start -->
          <div class="flex px-2 py-2">
            <!-- <h2 class="px-3 py-3 uppercase font-medium text-gray-600">
              Create new category
            </h2> -->
            <button
              type="button"
              class="text-gray-400 bg-transparent float-right px-3 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="clearForm"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal header end -->

          <!-- Modal body start-->
          <div class="px-6 pb-6">
            <ValidationObserver v-slot="{ handleSubmit }" ref="categoryForm">
              <form @submit.prevent="handleSubmit(changeOrderStatus(8))">
                <!-- form row start -->
                <div class="grid grid-rows-1 grid-cols-1">
                  <!-- single input start -->
                  <div>
                    <label for="" class="text-gray-600 mb-2 block">Add Remark</label>
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Please add short remark for this action"
                        v-model="remark"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <!-- single input end -->
                </div>
                <!-- form row end -->
                <div class="text-right mt-2">
                  <button
                    type="submit"
                    class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
                  >
                    save changes
                  </button>
                  <button
                    type="button"
                    class="text-center bg-gray-400 border border-gray-400 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
                    @click="clearForm"
                  >
                    cancel
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <!-- Modal body end-->
          <!-- Modal footer -->
        </div>
      </div>
    </div>
    <!-- remark add modal end -->
    <h4 class="text-lg font-medium my-5 mx-3 md:mx-5">Order Details</h4>
    <div class="">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between flex-wrap px-3 md:px-8"
        v-if="order.total_amount"
      >
        <div class="flex justify-between md:block text-sm md:text-base">
          <h5 class="font-medium">Order Number</h5>
          <p>{{ this.$route.query.no }}</p>
        </div>
        <div class="flex justify-between md:block text-sm md:text-base">
          <h5 class="font-medium">Created Date</h5>
          <p>{{ order.created_at | formattedDate2 }}</p>
        </div>
        <div class="mt-3 md:mt-0">
          <button
            class="bg-green-500 text-sm md:text-base text-white px-2 md:px-3 py-1 md:py-2 rounded-lg shadow-md"
            @click="changeOrderStatus(4)"
            v-if="order.status == 3"
          >
            Preparing
          </button>
          <button
            class="bg-red-500 text-sm md:text-base text-white px-2 md:px-3 py-1 md:py-2 rounded-lg shadow-md"
            @click="showAddRemarkModal"
            v-if="order.status == 3"
          >
            Reject
          </button>
          <button
            class="bg-blue-500 text-sm md:text-base text-white px-2 md:px-3 py-1 md:py-2 rounded-lg shadow-md"
            @click="changeOrderStatus(5)"
            v-if="order.status == 4"
          >
            On Delivery
          </button>
          <button
            class="bg-blue-500 text-sm md:text-base text-white px-2 md:px-3 py-1 md:py-2 rounded-lg shadow-md"
            @click="changeOrderStatus(6)"
            v-if="order.status == 5"
            div
          >
            Delivered
          </button>
        </div>
      </div>
      <div class="w-full" v-else>
        <PuSkeleton class="w-full" height="100px" />
      </div>
    </div>
    <!--cart content-->
    <div class="grid grid-cols-12 mb-8 gap-8 mt-8">
      <!-- cart-list -->
      <div class="col-span-12 md:col-span-12 bg-white shadow-xl rounded overflow-hidden">
        <div v-if="order.total_amount">
          <!-- order items list -->
          <div v-if="order" class="p-4 pb-6">
            <div
              class="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 border border-gray-200 rounded my-2"
              v-for="product in order.details"
              :key="product.product_id"
            >
              <!-- cartlist-image -->
              <div class="w-20 flex-shrink-0 text-center">
                <img :src="getProductImage(product.image)" class="w-full" alt="image" />
              </div>
              <!-- cartlist-image end -->
              <!-- cartlist-content -->
              <div class="w-60">
                <h2 class="text-sm font-medium uppercase text-gray-800">
                  {{ product.product_name }}
                </h2>
                <h2 class="text-sm font-medium text-gray-800">
                  {{ product.price | currency }}
                </h2>
              </div>
              <!-- cartlist-content end-->
              <!-- quantity start -->

              <div class="flex w-full justify-between items-center">
                <div class="text-sm font-medium text-gray-800">
                  Qty: {{ product.qty }}
                </div>
                <!-- quantity end -->

                <div class="text-base font-medium text-primary">
                  {{ (product.price * product.qty) | currency }}
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex md:items-center justify-center gap-6 p-4 my-2">
              <div class="flex flex-col gap-12 justify-center items-center">
                <span class="text-base text-gray-500">No products found!</span>
                <NuxtLink to="/shop">
                  <a
                    href="#"
                    class="px-6 py-2 text-center text-sm text-primary bg-white border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                    >Shop Now</a
                  ></NuxtLink
                >
              </div>
            </div>
          </div>
          <!-- order items list end-->
        </div>
        <div class="w-full" v-else>
          <PuSkeleton class="w-full" height="200px" />
        </div>
      </div>
      <!-- cart-list-end -->
    </div>
    <!--cart content end-->
    <div class="grid grid-cols-12 gap-5">
      <!-- single card start -->
      <div class="col-span-12 md:col-span-6 shadow rounded bg-white text-sm md:text-base">
        <div v-if="order.total_amount" class="px-4 pt-6 pb-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-medium text-gray-800 text-lg">Shipping Address</h3>
          </div>
          <div class="space-y-1">
            <h4 class="text-gray-700 font-medium">
              {{ order.first_name }} {{ order.last_name }}
            </h4>
            <p class="text-gray-800">{{ order.street_address }}</p>
            <p class="text-gray-800">{{ order.city }}</p>
            <p class="text-gray-800">{{ order.phone_number }}</p>
          </div>
        </div>
        <div class="w-full" v-else>
          <PuSkeleton class="w-full" height="200px" />
        </div>
      </div>
      <!-- single card end -->
      <!-- sidebar start -->
      <div class="col-span-12 md:col-span-6 shadow-lg rounded text-sm md:text-base">
        <div class="p-4" v-if="order.total_amount">
          <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
          <div class="space-y-2"></div>
          <div
            class="flex justify-between border-b border-gray-200 mt-3 text-gray-800 font-medium my-3"
          >
            <p>Subtotal</p>
            <p>{{ order.amount | currency }}</p>
          </div>
          <div
            class="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium my-3"
          >
            <p>Delivery Charges</p>
            <p>{{ order.delivery_charge | currency }}</p>
          </div>
          <div class="flex justify-between mt-1 text-gray-800 font-medium my-3">
            <p class="font-medium">Total</p>
            <p>{{ order.total_amount | currency }}</p>
          </div>
          <div class="flex justify-between mt-1 text-gray-800 font-medium my-3">
            <p class="font-medium">Payment Method</p>
            <p class="capitalize" v-if="order.payment_method == 2">cash on delivery</p>
            <p class="capitalize" v-else>debit/credit card</p>
          </div>
          <div class="justify-between mt-1 text-gray-800 font-medium my-3">
            <p class="font-medium">Special Note</p>
            <p class="capitalize font-normal text-sm mt-4">
              {{ order.special_note ? order.special_note : "N/A" }}
            </p>
          </div>
        </div>
        <div class="w-full" v-else>
          <PuSkeleton class="w-full" height="200px" />
        </div>
      </div>
      <!-- sidebar end -->
    </div>
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
      showCategoryModal: false,
      remark: "",
      order: {},
    };
  },

  created() {
    const order_code = this.$route.query.no;
    if (order_code) {
      this.loadOrderDetails(order_code);
    }
  },

  methods: {
    loadOrderDetails(order_code) {
      this.$store
        .dispatch("order/loadOrderDetails", order_code)
        .then((res) => {
          this.order = res;
        })
        .catch((err) => {});
    },

    changeOrderStatus(status) {
      this.$store
        .dispatch("order/changeOrderStatus", {
          order_id: this.order.id,
          status,
          remark: this.remark,
        })
        .then((res) => {
          this.order = res;
          this.$router.push({ path: "/merchant/orders" });
        })
        .catch((err) => {});
    },

    showAddRemarkModal() {
      this.showCategoryModal = true;
    },

    clearForm() {
      this.showCategoryModal = false;
    },

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },
  },
};
</script>

<style></style>
