<template>
  <div class="col-span-12 md:col-span-9 shadow rounded px-6 w-full">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>

      <p class="text-gray-500 font-medium">Orders</p>
    </div>
    <!-- breadcrumbs end -->
    <h4 class="text-lg font-medium capitalize mb-4">Orders</h4>

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="order-status"
        data-tabs-toggle="#orderStatuses"
        role="tablist"
      >
        <li class="mr-2" role="presentation">
          <button
            class="relative inline-block p-4 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
            id="pending-tab"
            data-tabs-target="#pending"
            type="button"
            role="tab"
            aria-controls="pending"
            aria-selected="true"
            @click="tabChange(3)"
          >
            Pending
            <span
              class="absolute -right-2 top-4 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs font-medium"
              v-if="getOrderCount(3)"
              >{{ getOrderCount(3) }}</span
            >
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="relative inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="preparing-tab"
            data-tabs-target="#preparing"
            type="button"
            role="tab"
            aria-controls="preparing"
            aria-selected="false"
            @click="tabChange(4)"
          >
            Preparing
            <span
              class="absolute -right-2 top-4 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs font-medium"
              v-if="getOrderCount(4)"
              >{{ getOrderCount(4) }}</span
            >
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="relative inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="on-delivery-tab"
            data-tabs-target="#on-delivery"
            type="button"
            role="tab"
            aria-controls="on-delivery"
            aria-selected="false"
            @click="tabChange(5)"
          >
            On Delivery
            <span
              class="absolute -right-2 top-4 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs font-medium"
              v-if="getOrderCount(5)"
              >{{ getOrderCount(5) }}</span
            >
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="relative inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="delivered-tab"
            data-tabs-target="#delivered"
            type="button"
            role="tab"
            aria-controls="delivered"
            aria-selected="false"
            @click="tabChange(6)"
          >
            Delivered
            <span
              class="absolute -right-2 top-4 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs font-medium"
              v-if="getOrderCount(6)"
              >{{ getOrderCount(6) }}</span
            >
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="relative inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="cancelled-tab"
            data-tabs-target="#cancelled"
            type="button"
            role="tab"
            aria-controls="cancelled"
            aria-selected="false"
            @click="tabChange(7)"
          >
            Cancelled
            <span
              class="absolute -right-2 top-4 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs font-medium"
              v-if="getOrderCount(7)"
              >{{ getOrderCount(7) }}</span
            >
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="relative inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="rejected-tab"
            data-tabs-target="#rejected"
            type="button"
            role="tab"
            aria-controls="rejected"
            aria-selected="false"
            @click="tabChange(8)"
          >
            Rejected
            <span
              class="absolute -right-2 top-4 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs font-medium"
              v-if="getOrderCount(8)"
              >{{ getOrderCount(8) }}</span
            >
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="relative inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="finished-tab"
            data-tabs-target="#finished"
            type="button"
            role="tab"
            aria-controls="finished"
            aria-selected="false"
            @click="tabChange(9)"
          >
            Finished
            <span
              class="absolute -right-2 top-4 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs font-medium"
              v-if="getOrderCount(9)"
              >{{ getOrderCount(9) }}</span
            >
          </button>
        </li>
      </ul>
    </div>
    <div id="orderStatuses">
      <div
        class="p-4 rounded-lg"
        id="pending"
        role="tabpanel"
        aria-labelledby="pending-tab"
      >
        <div
          class="col-span-12 text-xs md:text-base md:col-span-9 shadow rounded px-3 md:px-6 pt-3 md:pt-5 pb-3 md:pb-5 w-full mb-3 cursor-pointer"
          v-for="order in orders.data"
          :key="order.id"
          @click="navigateToPage('/merchant/orders/order-details', order.order_code)"
        >
          <div class="mt-0 mb-0">
            <div class="flex flex-col md:flex-row justify-between mt-0 mb-0 md:mb-4">
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
                <div
                  class="absolute text-gray-800 w-16 md:w-20 h-16 md:h-20 bg-opacity-50"
                  v-if="order.details.length > 1"
                >
                  <span class="relative left-20 text-xs top-6 md:top-8 text-gray-800"
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
                <h5 class="font-medium">Customer</h5>
                <span class="block md:hidden">-</span>
                <p>{{ order.first_name }} {{ order.last_name }}</p>
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
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg"
        id="preparing"
        role="tabpanel"
        aria-labelledby="preparing-tab"
      >
        <div
          class="col-span-12 text-xs md:text-base md:col-span-9 shadow rounded px-3 md:px-6 pt-3 md:pt-5 pb-3 md:pb-5 w-full mb-3 cursor-pointer"
          v-for="order in orders.data"
          :key="order.id"
          @click="navigateToPage('/merchant/orders/order-details', order.order_code)"
        >
          <div class="mt-0 mb-0">
            <div class="flex flex-col md:flex-row justify-between mt-0 mb-0 md:mb-4">
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
                <div
                  class="absolute text-gray-800 w-16 md:w-20 h-16 md:h-20 bg-opacity-50"
                  v-if="order.details.length > 1"
                >
                  <span class="relative left-20 text-xs top-6 md:top-8 text-gray-800"
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
                <h5 class="font-medium">Customer</h5>
                <span class="block md:hidden">-</span>
                <p>{{ order.first_name }} {{ order.last_name }}</p>
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
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg"
        id="on-delivery"
        role="tabpanel"
        aria-labelledby="on-delivery-tab"
      >
        <div
          class="col-span-12 text-xs md:text-base md:col-span-9 shadow rounded px-3 md:px-6 pt-3 md:pt-5 pb-3 md:pb-5 w-full mb-3 cursor-pointer"
          v-for="order in orders.data"
          :key="order.id"
          @click="navigateToPage('/merchant/orders/order-details', order.order_code)"
        >
          <div class="mt-0 mb-0">
            <div class="flex flex-col md:flex-row justify-between mt-0 mb-0 md:mb-4">
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
                <div
                  class="absolute text-gray-800 w-16 md:w-20 h-16 md:h-20 bg-opacity-50"
                  v-if="order.details.length > 1"
                >
                  <span class="relative left-20 text-xs top-6 md:top-8 text-gray-800"
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
                <h5 class="font-medium">Customer</h5>
                <span class="block md:hidden">-</span>
                <p>{{ order.first_name }} {{ order.last_name }}</p>
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
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg"
        id="delivered"
        role="tabpanel"
        aria-labelledby="delivered-tab"
      >
        <div
          class="col-span-12 text-xs md:text-base md:col-span-9 shadow rounded px-3 md:px-6 pt-3 md:pt-5 pb-3 md:pb-5 w-full mb-3 cursor-pointer"
          v-for="order in orders.data"
          :key="order.id"
          @click="navigateToPage('/merchant/orders/order-details', order.order_code)"
        >
          <div class="mt-0 mb-0">
            <div class="flex flex-col md:flex-row justify-between mt-0 mb-0 md:mb-4">
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
                <div
                  class="absolute text-gray-800 w-16 md:w-20 h-16 md:h-20 bg-opacity-50"
                  v-if="order.details.length > 1"
                >
                  <span class="relative left-20 text-xs top-6 md:top-8 text-gray-800"
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
                <h5 class="font-medium">Customer</h5>
                <span class="block md:hidden">-</span>
                <p>{{ order.first_name }} {{ order.last_name }}</p>
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
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg"
        id="cancelled"
        role="tabpanel"
        aria-labelledby="cancelled-tab"
      >
        <div
          class="col-span-12 text-xs md:text-base md:col-span-9 shadow rounded px-3 md:px-6 pt-3 md:pt-5 pb-3 md:pb-5 w-full mb-3 cursor-pointer"
          v-for="order in orders.data"
          :key="order.id"
          @click="navigateToPage('/merchant/orders/order-details', order.order_code)"
        >
          <div class="mt-0 mb-0">
            <div class="flex flex-col md:flex-row justify-between mt-0 mb-0 md:mb-4">
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
                <div
                  class="absolute text-gray-800 w-16 md:w-20 h-16 md:h-20 bg-opacity-50"
                  v-if="order.details.length > 1"
                >
                  <span class="relative left-20 text-xs top-6 md:top-8 text-gray-800"
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
                <h5 class="font-medium">Customer</h5>
                <span class="block md:hidden">-</span>
                <p>{{ order.first_name }} {{ order.last_name }}</p>
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
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg"
        id="rejected"
        role="tabpanel"
        aria-labelledby="rejected-tab"
      >
        <div
          class="col-span-12 text-xs md:text-base md:col-span-9 shadow rounded px-3 md:px-6 pt-3 md:pt-5 pb-3 md:pb-5 w-full mb-3 cursor-pointer"
          v-for="order in orders.data"
          :key="order.id"
          @click="navigateToPage('/merchant/orders/order-details', order.order_code)"
        >
          <div class="mt-0 mb-0">
            <div class="flex flex-col md:flex-row justify-between mt-0 mb-0 md:mb-4">
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
                <div
                  class="absolute text-gray-800 w-16 md:w-20 h-16 md:h-20 bg-opacity-50"
                  v-if="order.details.length > 1"
                >
                  <span class="relative left-20 text-xs top-6 md:top-8 text-gray-800"
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
                <h5 class="font-medium">Customer</h5>
                <span class="block md:hidden">-</span>
                <p>{{ order.first_name }} {{ order.last_name }}</p>
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
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg"
        id="finished"
        role="tabpanel"
        aria-labelledby="finished-tab"
      >
        <div
          class="col-span-12 text-xs md:text-base md:col-span-9 shadow rounded px-3 md:px-6 pt-3 md:pt-5 pb-3 md:pb-5 w-full mb-3 cursor-pointer"
          v-for="order in orders.data"
          :key="order.id"
          @click="navigateToPage('/merchant/orders/order-details', order.order_code)"
        >
          <div class="mt-0 mb-0">
            <div class="flex flex-col md:flex-row justify-between mt-0 mb-0 md:mb-4">
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
                <div
                  class="absolute text-gray-800 w-16 md:w-20 h-16 md:h-20 bg-opacity-50"
                  v-if="order.details.length > 1"
                >
                  <span class="relative left-20 text-xs top-6 md:top-8 text-gray-800"
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
                <h5 class="font-medium">Customer</h5>
                <span class="block md:hidden">-</span>
                <p>{{ order.first_name }} {{ order.last_name }}</p>
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
  data() {
    return {
      selected_type: 3,
      orders: {},
    };
  },

  computed: {
    // orders() {
    //   return this.$store.getters["order/getAllSelectedOrders"];
    // },

    orders_count() {
      return this.$store.getters["order/getOrderCount"];
    },
  },

  mounted() {
    const evt = new Event("DOMContentLoaded", { bubbles: true, cancelable: false });
    document.dispatchEvent(evt);

    this.loadCustomerOrders();

    if (!this.orders || !this.orders.data) {
    }
  },

  methods: {
    loadCustomerOrders(page = 1) {
      this.$store
        .dispatch("order/loadSelectedTypeOrders", {
          type: this.selected_type,
          page,
        })
        .then((res) => {
          this.orders = res;
        });
    },

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    tabChange(status) {
      this.selected_type = status;
      this.loadCustomerOrders();
    },

    getOrderCount(type) {
      if (this.orders_count.length != undefined) {
        let x = this.orders_count.find((el) => el.status == type);
        if (x) {
          return x.count;
        }
        return 0;
      }
      return 0;
    },

    getImageClass(index) {
      if (index != 0) {
        // return `left-${index * 5}`;
      }
    },

    navigateToPage(path, order_code) {
      this.$router.push({ path, query: { no: order_code } });
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
