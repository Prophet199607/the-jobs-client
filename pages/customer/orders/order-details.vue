<template>
  <div>
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <NuxtLink
        to="/customer/orders/cancellations"
        class="text-primary font-medium"
        v-if="$route.query.c && $route.query.c == 'true'"
        >Cancelled Orders</NuxtLink
      >
      <NuxtLink to="/customer/orders" class="text-primary font-medium" v-else
        >Orders</NuxtLink
      >
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-500 font-medium">{{ this.$route.query.no }}</p>
    </div>
    <!-- breadcrumbs end -->
    <h4 class="text-lg font-medium my-5 mx-3 md:mx-5">Order Details</h4>
    <!-- remark start -->
    <div
      v-if="order.status == 8"
      class="flex p-4 mb-4 my-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
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
      <div><span class="font-medium">Rejected</span> This order has been rejected</div>
    </div>
    <!-- remark end -->
    <div class="">
      <div
        class="flex flex-col md:flex-row md:items-center md:divide-x-2 divide-gray-300 gap-1 justify-start gap-x-3 flex-wrap px-8"
        v-if="order.total_amount"
      >
        <div class="flex justify-between md:block text-sm md:text-base md:pr-5">
          <h5 class="font-medium">Order Number</h5>
          <p>{{ order.order_code }}</p>
        </div>
        <div class="flex justify-between md:block text-sm md:text-base md:px-5">
          <h5 class="font-medium">Ordered Date</h5>
          <p>{{ order.created_at | formattedDate2 }}</p>
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
                <div class="text-right text-xs md:text-sm" v-if="order.status == 6">
                  <button
                    class="text-blue-500 underline"
                    @click="navigateToReviewPage(order.order_code, product)"
                  >
                    Write a review
                  </button>
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
          <!-- order items end-->
        </div>
        <div class="w-full" v-else>
          <PuSkeleton class="w-full" height="200px" />
        </div>
      </div>
      <!-- cart-list-end -->
      <!--order summery-->
      <!-- <div class="col-span-12 md:col-span-3 bg-white pb-6 rounded overflow-hidden mt-5">
        <div
          class="border border-gray-100 shadow-xl rounded mb-2 p-4 font-medium font-poppins"
        >
          <h1 class="text-lg text-left text-gray-800 font-bold">ORDER SUMMARY</h1>
          <div class="mt-5 text-base">
            <div class="flex justify-between">
              <h3>Sub Total</h3>
              <h3 v-if="cart">{{ cart.total_amount | currency }}</h3>
              <h3 v-else>{{ 0 | currency }}</h3>
            </div>
            <div class="flex justify-between">
              <h3>No of items</h3>
              <h3>{{ cart.item_count }}</h3>
            </div>
            <div class="flex justify-between">
              <h3>Tax</h3>
              <h3>Free</h3>
            </div>
            <div class="mt-5 ml-5 mr-5">
              <hr class="grey-800" />
            </div>
          </div>

          <div class="flex justify-between text-lg mt-5">
            <h3>Total</h3>
            <h3 v-if="cart">{{ cart.total_amount | currency }}</h3>
            <h3 v-else>{{ 0 | currency }}</h3>
          </div>
          <div class="mt-14 text-center mb-8">
            <NuxtLink to="/checkout" v-if="cart">
              <a
                href="#"
                class="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >Proceed to checkout</a
              ></NuxtLink
            >
            <button
              v-else
              class="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              disabled
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div> -->
      <!--order summery end-->
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
            <p class="capitalize font-normal text-sm">
              {{ order.special_note }}
            </p>
          </div>
        </div>
        <div class="w-full" v-else>
          <PuSkeleton class="w-full" height="200px" />
        </div>
      </div>
      <!-- sidebar end -->
      <div
        class="col-span-12 p-4 text-sm md:text-base text-right"
        v-if="order.status == 3"
      >
        <button
          class="bg-red-500 text-white rounded-md px-3 py-2"
          @click="cancelOrder(order.order_code)"
        >
          Cancel Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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

    cancelOrder(order_code) {
      swal({
        title: "Are you sure?",
        text: "Do you want to cancel this order!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store
            .dispatch("order/cancelOrder", order_code)
            .then((res) => {
              swal("Success!", "Order Cancelled successfully", "success");
              this.order = res;
            })
            .catch((err) => {});
        }
      });
    },

    navigateToReviewPage(order_code, product) {
      this.$router.push({
        path: "/customer/orders/review",
        query: { no: order_code, p_id: product.product_id },
      });
    },

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },
  },
};
</script>

<style></style>
