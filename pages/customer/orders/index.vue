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
      <p class="text-gray-600 font-medium">My Orders</p>
    </div>
    <!-- breadcrumbs end -->
    <div class="w-full" v-if="!orders.data">
      <PuSkeleton class="w-full" height="100px" />
      <PuSkeleton class="w-full mt-10" height="100px" />
      <PuSkeleton class="w-full mt-10" height="100px" />
    </div>
    <div v-else>
      <div
        class="text-gray-500 text-sm text-center my-52"
        v-if="orders && orders.data && orders.data.length == 0"
      >
        You haven't place an order yet!
      </div>
      <div
        v-else
        class="col-span-12 md:col-span-9 shadow rounded px-6 pt-5 pb-5 w-full cursor-pointer text-xs md:text-base"
        v-for="order in orders.data"
        :key="order.id"
        @click="navigateToPage('/customer/orders/order-details', order.order_code)"
      >
        <div class="mt-0 mb-4">
          <div class="flex flex-col md:flex-row justify-between mt-0 mb-4 shadow_sm">
            <div class="w-16 md:w-20 relative">
              <img
                class="absolute md:block"
                loading="lazy"
                v-for="(product, index) in order.details.slice(0, 2)"
                :key="product.id"
                :src="getProductImage(product.image)"
                :class="getImageClass(index)"
                alt="product"
              />
              <!-- <div
              class="absolute w-16 md:w-20 h-16 md:h-20 rounded-full bg-gray-800 left-5 bg-opacity-50"
              v-if="order.details.length > 1"
            > -->
              <div
                class="absolute text-gray-800 w-16 md:w-20 h-16 md:h-20 bg-opacity-50"
                v-if="order.details.length > 1"
              >
                <span
                  class="relative left-16 md:left-20 text-xs top-6 md:top-8 text-gray-800"
                  >1+</span
                >
              </div>
            </div>
            <div class="space-x-0 md:space-y-2 flex md:block gap-x-2 ml-22 md:ml-0">
              <h5 class="font-medium">Order Number</h5>
              <span class="block md:hidden">-</span>
              <p>{{ order.order_code }}</p>
            </div>
            <div class="space-x-0 md:space-y-2 flex md:block gap-x-2 ml-22 md:ml-0">
              <h5 class="font-medium">Purchased</h5>
              <span class="block md:hidden">-</span>
              <p>{{ order.created_at | formattedDate2 }}</p>
            </div>
            <div class="space-x-0 md:space-y-2 flex md:block gap-x-2 ml-22 md:ml-0">
              <h5 class="font-medium">Total</h5>
              <span class="block md:hidden">-</span>
              <p>{{ order.total_amount | currency }}</p>
            </div>
            <div class="space-x-0 md:space-y-2 flex md:block gap-x-2 ml-22 md:ml-0">
              <h5 class="d-none d-md-block">Status</h5>
              <span class="block md:hidden">-</span>
              <p class="font-medium" :class="getOrderStatusTxtColor(order.status)">
                {{ getOrderStatus(order.status) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="my-3 float-right">
        <pagination
          align="right"
          :data="orders"
          :limit="3"
          @pagination-change-page="loadCustomerOrders"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.getters["order/getCustomerOrders"];
    },
  },

  mounted() {
    this.loadCustomerOrders();
    if (!this.orders || !this.orders.data) {
    }
  },

  methods: {
    loadCustomerOrders(page = 1) {
      this.$store.dispatch("order/loadCustomerOrders", page);
    },

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    getImageClass(index) {
      if (index != 0) {
        // return `left-${index * 5}`;
      }
    },

    getOrderStatus(status) {
      switch (status) {
        case 3:
          return "Pending";
        case 4:
          return "Preparing";
        case 5:
          return "On Delivery";
        case 6:
          return "Delivered";
        case 7:
          return "Cancelled";
        case 8:
          return "Rejected";

        default:
          break;
      }
    },

    getOrderStatusTxtColor(status) {
      switch (status) {
        case 3:
          return "text-gray-500";
        case 4:
          return "text-yellow-500";
        case 5:
          return "text-blue-500";
        case 6:
          return "text-green-500";
        case 7:
          return "text-orange-500";
        case 8:
          return "text-red-500";

        default:
          break;
      }
    },

    navigateToPage(path, order_code) {
      this.$router.push({ path, query: { no: order_code, c: false } });
    },
  },
};
</script>

<style scoped>
/* pagination styles start */
::v-deep .pagination {
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}
::v-deep .page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #fd3d57;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
::v-deep .page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #fd3d57;
  border-color: #fd3d57;
}
::v-deep a:hover {
  color: #fd3d57;
  text-decoration: none;
  background-color: #adadad83;
  color: #fff;
}
/* pagination styles end */
</style>
