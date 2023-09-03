export const state = () => ({
  customerOrders: [],
  customerCancelledOrders: [],
  allSelectedTypeOrders: [],
  orderCount: {},
  orderComplete: false,
});

export const getters = {
  getCustomerOrders: (state) => state.customerOrders,
  getCustomerCancelledOrders: (state) => state.customerCancelledOrders,
  getAllSelectedOrders: (state) => state.allSelectedTypeOrders,
  getOrderCount: (state) => state.orderCount,
  getOrderCompleteStatus: (state) => state.orderComplete,
};

export const mutations = {
  SET_CUSTOMER_ORDERS(state, order_data) {
    state.customerOrders = order_data;
  },

  SET_CUSTOMER_CANCELLED_ORDERS(state, cancelled_orders) {
    state.customerCancelledOrders = cancelled_orders;
  },

  SET_SELECTED_TYPE_ORDERS(state, order_data) {
    state.allSelectedTypeOrders = order_data;
  },

  SET_ORDER_COUNT_DATA(state, order_count_data) {
    state.orderCount = order_count_data;
  },

  SET_ORDER_COMPLETE_STATUS(state, status) {
    state.orderComplete = status;
  },
};

export const actions = {
  saveOrder({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/transactions/order", payload);
      // if (!payload.is_buy_now) {
      //   commit("cart/SET_CART_DATA", null, { root: true });
      // }
      commit("SET_ORDER_COMPLETE_STATUS", true);
      resolve(data);
    });
  },

  removeOrderData({ commit }, order_no) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        `/transactions/order/remove/${order_no}`
      );
      resolve(data);
    });
  },

  webxPayEncrypt({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/transactions/order/pg/webxpay/encrypt",
        payload
      );
      resolve(data);
    });
  },

  webxpay_pay({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      var mapForm = document.createElement("form");
      // mapForm.target = "_blank";
      mapForm.method = "POST";
      mapForm.action = process.env.WEBX_PAY_PAYMENT_GATEWAY;
      Object.keys(payload).forEach(function (param) {
        var mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = param;
        mapInput.setAttribute("value", payload[param]);
        mapForm.appendChild(mapInput);
      });
      document.body.appendChild(mapForm);
      mapForm.submit();
    });
  },

  changeOrderStatus({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/transactions/order/change",
        payload
      );
      resolve(data);
    });
  },

  loadCustomerOrders({ commit }, page) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$get(
          `/transactions/order/customer?page=${page}`
        );
        commit("SET_CUSTOMER_ORDERS", data.orders);
        resolve(data.orders);
      } catch (error) {
        console.log(document.cookie);
      }
    });
  },

  loadCustomerCancelledOrders({ commit }, page) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$get(
          `/transactions/order/customer/cancelled?page=${page}`
        );
        commit("SET_CUSTOMER_CANCELLED_ORDERS", data.orders);
        resolve(data.orders);
      } catch (error) {
        console.log(document.cookie);
      }
    });
  },

  loadSelectedTypeOrders({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$get(
          `/transactions/order/merchant/${payload.type}?page=${payload.page}`
        );
        commit("SET_SELECTED_TYPE_ORDERS", data.orders);
        commit("SET_ORDER_COUNT_DATA", data.order_count);
        resolve(data.orders);
      } catch (error) {
        console.log(document.cookie);
      }
    });
  },

  loadOrderDetails({ commit }, order_code) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        `/transactions/order/customer/${order_code}`
      );
      resolve(data.order);
    });
  },

  loadSelectedProductOrderDetails({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        `/transactions/order/customer/${payload.order_code}/product/${payload.product_id}`
      );
      resolve(data.order);
    });
  },

  cancelOrder({ commit }, order_code) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        `/transactions/order/cancel/${order_code}`
      );
      resolve(data.order);
    });
  },
};
