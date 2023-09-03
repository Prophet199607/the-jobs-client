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
      <NuxtLink to="/cart" class="text-primary font-medium">Cart</NuxtLink>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-500 font-medium">Checkout</p>
    </div>
    <!-- breadcrumbs end -->

    <!-- delivery address modal start -->
    <div
      v-if="showAddressModal"
      class="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-30"
    >
      <div class="relative p-4 mt-3 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header start -->
          <div class="flex px-2 py-2">
            <div v-if="modalType == 'delivery'">
              <h2 class="px-3 py-3 uppercase font-medium text-gray-600" v-if="!editMode">
                Add new delivery address
              </h2>
              <h2 class="px-3 py-3 uppercase font-medium text-gray-600" v-else>
                Edit delivery address
              </h2>
            </div>
            <div v-else>
              <h2 class="px-3 py-3 uppercase font-medium text-gray-600" v-if="!editMode">
                Add new billing address
              </h2>
              <h2 class="px-3 py-3 uppercase font-medium text-gray-600" v-else>
                Edit billing address
              </h2>
            </div>
            <button
              type="button"
              class="text-gray-400 bg-transparent float-right px-3 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <ValidationObserver v-slot="{ handleSubmit }" ref="addressForm">
              <form @submit.prevent="handleSubmit(setBillingAddress)">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >First Name <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="new_address.first_name"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter first name"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Last Name <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="new_address.last_name"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter last name"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block text-sm"
                    >Street Address <span class="text-primary">*</span></label
                  >
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <input
                      type="text"
                      v-model="new_address.street_address"
                      class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                      placeholder="Enter street address"
                    />
                    <span class="input-invalid-message text-red-500 text-xs">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block text-sm"
                    >Province<span class="text-primary">*</span></label
                  >
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <model-select
                      class="block w-full border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                      :options="provinces"
                      v-model="new_address.province"
                      @input="loadDistricts(new_address.province)"
                      placeholder="Select your province"
                    >
                    </model-select>
                    <span class="input-invalid-message text-red-500 text-xs">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block text-sm"
                    >District<span class="text-primary">*</span></label
                  >
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <model-select
                      class="block w-full border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                      :options="districts"
                      v-model="new_address.district"
                      @input="loadCities(new_address.district)"
                      placeholder="Select your district"
                    >
                    </model-select>
                    <span class="input-invalid-message text-red-500 text-xs">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block text-sm"
                    >City<span class="text-primary">*</span></label
                  >
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <model-select
                      class="block w-full border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                      :options="cities"
                      v-model="new_address.city"
                      placeholder="Select your city"
                    >
                    </model-select>
                    <span class="input-invalid-message text-red-500 text-xs">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4"
                  v-if="form.delivery_method == 2"
                >
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Zip Code <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="new_address.zip_code"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter zip code"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Phone Number <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="new_address.phone_number"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter phone number"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <!-- <div>
                  <label class="text-gray-600 mb-2 block text-sm">Email</label>
                  <input
                    type="email"
                    v-model="form.email"
                    class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                    placeholder="Enter email address"
                  />
                </div> -->
                </div>
                <div class="flex justify-end mt-5">
                  <div>
                    <button
                      type="submit"
                      class="bg-primary text-white text-sm px-4 py-1 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      class="bg-transparent ml-1 text-gray-500 border border-gray-500 text-sm px-4 py-1 rounded-md"
                      @click="clearForm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <!-- Modal body end-->
          <!-- Modal footer -->
        </div>
      </div>
    </div>
    <!-- delivery address modal end -->

    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(saveOrder)">
        <div class="grid grid-rows-2 grid-cols-12 gap-6 mb-10">
          <!-- login or sign up links start -->
          <div
            class="col-span-12 md:col-span-8 p-4 rounded shadow-lg flex justify-center items-center"
            v-if="!$auth.loggedIn"
          >
            <div class="text-center">
              Please <NuxtLink to="/login" class="text-primary">login</NuxtLink> to you're
              account. <br />
              If you don't have an account
              <NuxtLink to="/register" class="text-primary">sign up</NuxtLink> here
            </div>
          </div>
          <!-- login or sign up links end -->

          <!-- checkout form start -->
          <div class="col-span-12 row-span-2 md:col-span-8 p-4 rounded shadow-lg" v-else>
            <div>
              <label class="text-gray-600 mb-2 block text-sm"
                >Delivery Method <span class="text-primary">*</span></label
              >

              <div class="flex gap-10">
                <div class="flex items-center mb-4">
                  <input
                    id="delivery-option-2"
                    name="delivery-options"
                    type="radio"
                    value="2"
                    v-model="form.delivery_method"
                    class="w-4 h-4 border-gray-600 focus:ring-2 text-primary focus:ring-primary focus:bg-primary focus:text-primary cursor-pointer"
                  />
                  <label for="delivery-option-2" class="block ml-2 text-sm text-gray-600">
                    Delivery
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="delivery-option-1"
                    name="delivery-options"
                    type="radio"
                    value="1"
                    v-model="form.delivery_method"
                    class="w-4 h-4 border-gray-600 focus:ring-2 text-primary focus:ring-primary focus:bg-primary focus:text-primary cursor-pointer"
                  />
                  <label for="delivery-option-1" class="block ml-2 text-sm text-gray-600">
                    Pick up
                  </label>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                v-if="form.delivery_method == 2"
              >
                <div v-if="form.delivery_method == 2">
                  <div
                    class="border border-gray-400 rounded-lg px-3 py-3"
                    v-if="delivery_address.first_name"
                  >
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-base md:text-lg font-medium capitalize">
                        <i
                          class="fa-solid fa-location-dot text-sm"
                          aria-hidden="true"
                        ></i>
                        Delivery Address
                      </h3>
                      <span
                        class="text-blue-600 text-sm cursor-pointer"
                        @click="editDeliveryAddress"
                        >Edit</span
                      >
                    </div>
                    <div class="ml-5" style="font-size: 14px">
                      <div>
                        {{ delivery_address.first_name }} {{ delivery_address.last_name }}
                      </div>
                      <div>{{ delivery_address.street_address }},</div>
                      <div>
                        {{ delivery_address.city_name }},
                        {{ delivery_address.district_name }},
                      </div>
                      <div>
                        {{ delivery_address.province_name }},
                        {{ delivery_address.zip_code }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="border border-gray-400 rounded-lg px-3 py-3"
                    :class="{ 'border-red-500 border-2': !delivery_address.first_name }"
                    v-else
                  >
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-base md:text-lg font-medium capitalize">
                        <i
                          class="fa-solid fa-location-dot text-sm"
                          aria-hidden="true"
                        ></i>
                        Delivery Address
                      </h3>
                    </div>
                    <div class="ml-5" style="font-size: 14px">
                      <div
                        class="text-gray-500 pt-7 pb-9 text-center cursor-pointer hover:text-gray-800"
                        @click="showAddressModal = true"
                      >
                        <i class="fa fa-plus" aria-hidden="true"></i> Add address
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="form.delivery_method == 2">
                  <div
                    class="border border-gray-400 rounded-lg px-3 py-3"
                    v-if="billing_address.first_name"
                  >
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-base md:text-lg font-medium capitalize">
                        <i
                          class="fa-solid fa-location-dot text-sm"
                          aria-hidden="true"
                        ></i>
                        Billing Address
                      </h3>
                      <span
                        class="text-blue-600 text-sm cursor-pointer"
                        @click="editBillingAddress"
                        >Edit</span
                      >
                    </div>
                    <div class="ml-5" style="font-size: 14px">
                      <div>
                        {{ billing_address.first_name }} {{ billing_address.last_name }}
                      </div>
                      <div>{{ billing_address.street_address }},</div>
                      <div>
                        {{ billing_address.city_name }},
                        {{ billing_address.district_name }},
                      </div>
                      <div>
                        {{ billing_address.province_name }},
                        {{ billing_address.zip_code }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                v-if="form.delivery_method == 2"
              >
                <div>
                  <label class="text-gray-600 mb-2 block text-sm"
                    >Delivery Area <span class="text-primary">*</span></label
                  >
                  <ValidationProvider
                    v-slot="{ errors }"
                    :rules="{ required: form.delivery_method == 2 }"
                  >
                    <input type="text" hidden v-model="form.delivery_area" />
                    <model-select
                      :options="delivery_areas"
                      v-model="form.delivery_area"
                      placeholder="select item"
                      type="select"
                      @input="changeDeliveryCharge"
                    >
                    </model-select>
                    <span class="input-invalid-message text-red-500 text-xs">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block text-sm"
                    >Delivery Date <span class="text-primary">*</span></label
                  >
                  <ValidationProvider
                    v-slot="{ errors }"
                    :rules="{ required: form.delivery_method == 2 }"
                  >
                    <input type="text" hidden v-model="form.delivery_datetime" />
                    <datetime
                      v-model="form.delivery_datetime"
                      input-class="w-100 text-gray-600"
                      :format="{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      }"
                      :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                      use12-hour
                      auto
                      type="datetime"
                      class="w-100 text-gray-600 mb-2 block text-sm"
                    ></datetime>
                    <span class="input-invalid-message text-red-500 text-xs">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
              </div> -->
            </div>
            <div class="mt-3">
              <label class="text-gray-600 mb-2 block text-sm"
                >Payment Method <span class="text-primary">*</span></label
              >
              <div class="flex mt-5 gap-5">
                <div
                  class="flex flex-col items-center rounded-md px-8 py-4 cursor-pointer relative"
                  :class="
                    form.payment_method == 1
                      ? 'border-primary border-2'
                      : 'border-gray-500 border'
                  "
                  @click="changePaymentMethod(1)"
                  data-target=".credit_card"
                >
                  <span
                    v-if="form.payment_method == 1"
                    class="absolute -top-2 -right-2 text-white bg-primary w-5 h-5 rounded-full flex justify-center items-center"
                    ><i class="text-xs fa fa-check text-white z-10" aria-hidden="true"></i
                  ></span>
                  <div class="sp_img">
                    <img
                      loading="lazy"
                      src="../assets/images/credit-card.png"
                      alt="credit card"
                    />
                  </div>
                  <p class="text-sm mt-2">Credit Card</p>
                </div>
                <div
                  class="flex flex-col items-center rounded-md border px-4 py-4 cursor-pointer relative"
                  :class="
                    form.payment_method == 2
                      ? 'border-primary border-2'
                      : 'border-gray-500 border'
                  "
                  data-target=".credit_card"
                  @click="changePaymentMethod(2)"
                >
                  <span
                    v-if="form.payment_method == 2"
                    class="absolute -top-2 -right-2 text-white bg-primary w-5 h-5 rounded-full flex justify-center items-center"
                    ><i class="text-xs fa fa-check text-white z-10" aria-hidden="true"></i
                  ></span>
                  <div class="sp_img">
                    <img
                      loading="lazy"
                      src="../assets/images/cash-on.png"
                      alt="credit card"
                    />
                  </div>
                  <p class="text-sm mt-3">Cash on Delivery</p>
                </div>
              </div>
            </div>
          </div>
          <!-- checkout form end -->

          <!-- order summary start -->
          <div class="col-span-12 md:col-span-4 shadow-lg p-4 rounded">
            <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">
              order summary
            </h4>
            <div class="space-y-2" v-if="cart">
              <div v-for="product in cart.products" :key="product.product_id">
                <!-- if product's name length longer than 15 characters -->
                <div v-if="product.product_name.length > 15">
                  <div>
                    <div
                      class="font-medium"
                      :class="[
                        product.out_of_stock == 1 ? 'text-gray-400' : 'text-gray-800',
                      ]"
                    >
                      <h5 :class="resizeProductTitle(product.product_name)">
                        {{ product.product_name }}
                      </h5>
                    </div>
                    <!-- <p class="text-sm text-gray-600">Size: M</p> -->
                  </div>
                  <div class="flex justify-between items-end">
                    <div>
                      <p
                        class="text-sm"
                        :class="[
                          product.out_of_stock == 1 ? 'text-gray-400' : 'text-gray-600',
                        ]"
                      >
                        {{ product.qty }} x {{ product.price | currency }}
                        <span class="text-xs" v-if="product.filter"
                          >({{ product.filter }})</span
                        >
                      </p>
                      <p>
                        <span
                          class="text-xs font-medium text-red-600"
                          v-if="product.out_of_stock == 1"
                          >Out Of Stock</span
                        >
                      </p>
                    </div>

                    <p
                      class="font-medium"
                      :class="[
                        product.out_of_stock == 1 ? 'text-gray-400' : 'text-gray-800',
                      ]"
                    >
                      {{ (product.qty * product.price) | currency }}
                    </p>
                  </div>
                </div>
                <!-- if product's name length less than 15 characters -->
                <div class="flex justify-between items-end" v-else>
                  <div>
                    <div
                      class="font-medium"
                      :class="[
                        product.out_of_stock == 1 ? 'text-gray-400' : 'text-gray-800',
                      ]"
                    >
                      <h5 :class="resizeProductTitle(product.product_name)">
                        {{ product.product_name }}
                      </h5>
                    </div>
                    <!-- <p class="text-sm text-gray-600">Size: M</p> -->
                    <p
                      class="text-sm"
                      :class="[
                        product.out_of_stock == 1 ? 'text-gray-400' : 'text-gray-600',
                      ]"
                    >
                      {{ product.qty }} x {{ product.price | currency }}
                      <span class="text-xs" v-if="product.filter"
                        >({{ product.filter }})</span
                      >
                    </p>
                    <p>
                      <span
                        class="text-xs font-medium text-red-600"
                        v-if="product.out_of_stock == 1"
                        >Out Of Stock</span
                      >
                    </p>
                  </div>
                  <p
                    class="font-medium"
                    :class="[
                      product.out_of_stock == 1 ? 'text-gray-400' : 'text-gray-800',
                    ]"
                  >
                    {{ (product.qty * product.price) | currency }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="flex justify-between border-b border-gray-200 mt-3 text-gray-800 font-medium my-3"
            >
              <p>Subtotal</p>
              <p v-if="cart">
                {{ !cart.total_amount ? 0 : cart.total_amount | currency }}
              </p>
            </div>
            <div v-if="form.delivery_method == 2">
              <div
                class="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium my-3"
                v-if="!noDeliveryAvailable"
              >
                <p>Delivery Charges</p>
                <p>{{ delivery_charge | currency }}</p>
              </div>
              <div v-else class="text-sm text-red-500 font-medium">
                No delivery available for {{ delivery_address.city_name }}. You can
                collect the package from our nearest warehouse.
              </div>
            </div>
            <div class="flex justify-between mt-1 text-gray-800 font-medium my-3">
              <p class="font-medium">Total</p>
              <p v-if="cart">
                {{
                  !cart.total_amount
                    ? 0
                    : (cart.total_amount +
                        (form.delivery_method == 2 ? delivery_charge : 0))
                      | currency
                }}
              </p>
            </div>
            <div class="mt-10">
              <label class="text-gray-600 mb-2 block text-sm" for="special_note"
                >Special Note
              </label>
              <ValidationProvider v-slot="{ errors }" rules="max:350">
                <textarea
                  type="text"
                  id="special_note"
                  cols="5"
                  rows="4"
                  v-model="form.special_note"
                  placeholder="Enter special note for the merchant"
                  class="border-gray-300 focus:border-primary rounded w-full text-gray-600 placeholder-gray-400 focus:border-2 focus:ring-0 text-sm"
                ></textarea>
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="flex items-start mb-4 mt-2">
              <input
                id="agreement"
                type="checkbox"
                v-model="isAgreedToTermsAndConditions"
                class="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3 mt-1.5"
              />
              <label for="agreement" class="text-gray-600 ml-3 cursor-pointer text-sm"
                >I have read and agree to the
                <a href="/privacy-policy" target="_blank" class="text-primary"
                  >privacy policy</a
                >
                and
                <a href="/terms-and-conditions" target="_blank" class="text-primary"
                  >terms & conditions</a
                ></label
              >
            </div>

            <div class="mt-5 text-center mb-2">
              <button
                v-if="
                  $auth.loggedIn && !noDeliveryAvailable && hasOutOfStockItems.length == 0
                "
                type="submit"
                class="w-full block text-center bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-sm"
              >
                {{ form.payment_method == 1 ? "Pay Now" : "Place the order" }}
              </button>

              <button
                v-else
                class="w-full block px-6 py-2 text-center text-sm text-white cursor-not-allowed bg-red-400 border-red-400 rounded transition uppercase font-roboto font-medium"
                disabled
              >
                {{ form.payment_method == 1 ? "Pay Now" : "Place the order" }}
              </button>
            </div>

            <div v-if="hasOutOfStockItems.length != 0">
              <div class="text-sm text-red-600 font-medium">
                Please remove out of stock products form your cart to proceed
              </div>
            </div>
          </div>
          <!-- order summary end -->
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

import { ModelSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  components: {
    ModelSelect,
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },
  middleware: ["auth"],
  data() {
    return {
      provinces: [],
      districts: [],
      cities: [],
      cities_original: [],
      sameAsRegDetails: false,
      noDeliveryAvailable: false,
      showAddressModal: false,
      isAgreedToTermsAndConditions: false,
      editMode: false,
      form: {
        // email: "",
        delivery_method: "2",
        delivery_area: "",
        delivery_datetime: "",
        payment_method: 1,
        special_note: "",
      },
      billing_address: {},
      delivery_address: {},
      hasDeliveryAddress: false,
      delivery_charge: 0,
      new_address: {
        first_name: "",
        last_name: "",
        street_address: "",
        province: "",
        district: "",
        city: "",
        zip_code: "",
        phone_number: "",
      },
      modalType: "",
      // date: moment(new Date()).toISOString(),
      // delivery_areas: [
      //   { value: "1", text: "Colombo 01 - LKR 350", charge: 350 },
      //   { value: "2", text: "Colombo 02 / 03 / 04 / 05 - LKR 300", charge: 300 },
      //   { value: "3", text: "Colombo 06 - LKR 450", charge: 450 },
      //   { value: "4", text: "Colombo 07 - LKR 0", charge: 0 },
      //   { value: "5", text: "Colombo 08 - LKR 400", charge: 400 },
      //   { value: "6", text: "Colombo 09 - LKR 450", charge: 450 },
      //   { value: "7", text: "Colombo 10 - LKR 300", charge: 300 },
      // ],
    };
  },

  watch: {
    "form.delivery_method"(newVal) {
      if (newVal == 1) {
        this.delivery_charge = 0;
        this.noDeliveryAvailable = false;
      }
      this.sameAsRegDetails = false;
    },

    // async sameAsRegDetails(newVal) {
    //   if (newVal) {
    //     this.form.first_name = this.billing_address.first_name;
    //     this.form.last_name = this.billing_address.last_name;
    //     this.form.street_address = this.billing_address.street_address;
    //     this.form.province = this.billing_address.province;
    //     this.form.district = this.billing_address.district;
    //     await this.billing_loadDistricts();
    //     await this.billing_loadCities();
    //     this.form.city = this.billing_address.city;
    //     this.form.zip_code = this.billing_address.zip_code;
    //     this.form.phone_number = this.billing_address.phone_number;
    //   } else {
    //     this.clearAddressDetails();
    //   }
    // },
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartData"];
    },

    hasOutOfStockItems() {
      if (this.cart && this.cart.products) {
        return this.cart.products.filter((el) => {
          if (el.out_of_stock == 1) {
            return el;
          }
        });
      } else {
        return [];
      }
    },
  },

  async created() {
    await this.loadCustomerAddresses();
    await this.loadProvinces();
  },

  methods: {
    loadCustomerAddresses() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("customer/loadCustomerAddresses").then((res) => {
          res.forEach((address) => {
            if (address.address_type == 1) {
              this.billing_address = { ...address };
            } else if (address.address_type == 2) {
              this.delivery_address = { ...address };
              this.hasDeliveryAddress = true;
              // this.form.first_name = address.first_name;
              // this.form.last_name = address.last_name;
              // this.form.street_address = address.street_address;
              // this.form.province = address.province;
              // this.form.district = address.district;
              // this.form.city = address.city;
              // this.form.zip_code = address.zip_code;
              // this.form.phone_number = address.phone_number;
              this.loadCities(this.delivery_address.district);
            }
          });
          resolve();
        });
      });
    },

    changeDeliveryCharge(city_) {
      this.delivery_charge = 0;
      this.noDeliveryAvailable = false;
      let city = this.cities_original.find((el) => el.id == city_);

      if (city.delivery_charge) {
        this.delivery_charge = city.delivery_charge;
      } else {
        this.noDeliveryAvailable = true;
      }
    },

    saveOrder() {
      if (!this.delivery_address.first_name || !this.isAgreedToTermsAndConditions) {
        return;
      }

      this.form.delivery_charge = this.delivery_charge;
      this.$store
        .dispatch("order/saveOrder", {
          is_buy_now: false,
          delivery_details: this.form,
          billing_address: this.billing_address,
          delivery_address: this.delivery_address,
          cart: this.cart,
        })
        .then((res) => {
          if (this.form.payment_method == 1) {
            this.paymentGatewayProcess(res.order);
          } else {
            this.$router.push({
              path: "/order-complete",
            });
          }
        });
    },

    paymentGatewayProcess(order) {
      // this.webxPay(order);
      this.paycorp(order); // Sampath bank
    },

    webxPay(order) {
      const payment = `${order.order_code}|${order.amount}`;

      this.$store
        .dispatch("order/webxPayEncrypt", {
          payment,
        })
        .then((res) => {
          this.$store.dispatch("order/webxpay_pay", {
            first_name: order.first_name,
            last_name: order.last_name,
            email: order.email,
            contact_number: order.phone_number,
            address_line_one: order.street_address,
            secret_key: "09071932-4395-4407-b602-14b6fb805493",
            payment: res.encryption,
            cms: "Javascript",
            process_currency: "LKR",
            custom_fields: `${order.amount || 0}`,
          });
        });
    },

    paycorp(order) {
      let payment = {
        clientId: 14005000,
        paymentAmount: order.amount * 100,
        currency: "LKR",
        returnUrl: process.env.PAYCORP_RETURN_URL,
        clientRef: order.order_code,
        comment: "This is a demo payment",

        expiryInMins: 0,
        transactionType: "PURCHASE",
        redirect: {
          returnUrl: process.env.PAYCORP_RETURN_URL,
          returnMethod: "SIMPLE_GET",
        },
        transactionAmount: {
          paymentAmount: order.amount * 100,
          currency: "LKR",
        },
        extraData: {
          is_buy_now: false,
        },
      };

      this.validate(payment);

      this.initPaycorpHosted(this.b64EncodeUnicode(JSON.stringify(payment)));
    },

    validate(payment) {
      const errorPrefix = "failed to load Paycorp Payment -";
      if (!payment) {
        throw new Error(` payment object is required.`);
      }
      if (!payment.clientId || !Number.isInteger(payment.clientId)) {
        throw new Error(` clientId is required and must be an integer.`);
      }
      if (!payment.paymentAmount || !Number.isInteger(payment.paymentAmount)) {
        throw new Error(` paymentAmount is required and must be an integer.`);
      }
      if (!payment.returnUrl) {
        throw new Error(`returnUrl is required.`);
      }
    },

    b64EncodeUnicode(str) {
      return window.btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
          let h_ = "0x" + p1;
          return String.fromCharCode(parseInt(h_));
        })
      );
    },

    initPaycorpHosted(base64) {
      window.location.replace(
        "https://paycorp-smp.prod.aws.paycorp.lk/webinterface/app/payment/simple?jZCI6mTYwMi=" +
          base64
      );
    },

    changePaymentMethod(type) {
      this.form.payment_method = type;
    },

    // async clearAddressDetails() {
    //   if (this.hasDeliveryAddress) {
    //     this.form.first_name = this.delivery_address.first_name;
    //     this.form.last_name = this.delivery_address.last_name;
    //     this.form.street_address = this.delivery_address.street_address;
    //     this.form.province = this.delivery_address.province;
    //     this.form.district = this.delivery_address.district;
    //     this.form.city = this.delivery_address.city;
    //     this.form.zip_code = this.delivery_address.zip_code;
    //     this.form.phone_number = this.delivery_address.phone_number;
    //   } else {
    //     this.form = {
    //       first_name: "",
    //       last_name: "",
    //       street_address: "",
    //       province: "",
    //       district: "",
    //       city: "",
    //       zip_code: "",
    //       phone_number: "",
    //       // email: "",
    //       delivery_method: "2",
    //       delivery_area: "",
    //       delivery_datetime: "",
    //       payment_method: 1,
    //       special_note: "",
    //     };
    //   }
    // },

    loadProvinces() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("customer/loadProvinces").then((res) => {
          this.provinces = res.map((province) => {
            return {
              value: province.id,
              text: province.name_en,
            };
          });
          resolve();
        });
      });
    },

    loadDistricts(province) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("customer/loadDistricts", province).then((res) => {
          this.districts = res.map((district) => {
            return {
              value: district.id,
              text: district.name_en,
            };
          });
          resolve();
        });
      });
    },

    loadCities(district) {
      this.delivery_charge = 0;
      this.noDeliveryAvailable = false;
      return new Promise((resolve, reject) => {
        this.$store.dispatch("customer/loadCities", district).then((res) => {
          this.cities_original = res;
          this.cities = res.map((city) => {
            return {
              value: city.id,
              text: city.name_en,
            };
          });

          // set delivery charges according to the city
          let city = res.find((el) => el.id == this.delivery_address.city);
          if (city.delivery_charge) {
            this.delivery_charge = city.delivery_charge;
          } else {
            this.noDeliveryAvailable = true;
          }

          return resolve();
        });
      });
    },

    editDeliveryAddress() {
      this.modalType = "delivery";
      this.showAddressModal = true;
      this.editMode = true;
      this.new_address = { ...this.delivery_address };
      this.loadDistricts(this.new_address.province);
      this.loadCities(this.new_address.district);
    },

    editBillingAddress() {
      this.modalType = "billing";
      this.showAddressModal = true;
      this.editMode = true;
      this.new_address = { ...this.billing_address };
      this.loadDistricts(this.new_address.province);
      this.loadCities(this.new_address.district);
    },

    setBillingAddress() {
      let province = this.provinces.find((el) => el.value == this.new_address.province)
        .text;
      let district = this.districts.find((el) => el.value == this.new_address.district)
        .text;
      let city = this.cities.find((el) => el.value == this.new_address.city).text;
      let address = { ...this.new_address };
      address.province_name = province;
      address.district_name = district;
      address.city_name = city;
      if (this.modalType == "billing") {
        this.billing_address = address;
      } else {
        this.delivery_address = address;
      }

      this.changeDeliveryCharge(this.new_address.city);

      let confirmationMessage =
        "Do you want to save this address as your default delivery address?";
      if (this.editMode) {
        confirmationMessage = "Do you want to update your default billing address?";
      }
      swal({
        title: "Are you sure?",
        text: `${confirmationMessage}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((yes) => {
        if (yes) {
          this.saveAddresses();
        }
      });
      this.clearForm();
    },

    saveAddresses() {
      this.$store
        .dispatch("customer/saveCustomerAddresses", {
          billing_address: this.billing_address,
          delivery_address: this.delivery_address,
        })
        .then((res) => {
          swal("Success!", res.message, "success");
        });
    },

    clearForm() {
      this.new_address = {
        first_name: "",
        last_name: "",
        street_address: "",
        province: "",
        district: "",
        city: "",
        zip_code: "",
        phone_number: "",
      };
      this.showAddressModal = false;
      this.editMode = false;
      this.$refs.addressForm.reset();
    },

    resizeProductTitle(title) {
      if (title.length > 15) {
        return "text-xs md:text-sm";
      }
      return "text-base";
    },
  },
};
</script>

<style scoped>
.single_payment_method::after {
  content: "\f00c";
  position: absolute;
  right: -8px;
  top: -8px;
  font-family: "Line Awesome Free";
  font-weight: 900;
  color: #fff;
  font-size: 10px;
  z-index: 2;
  background: #fd3d57;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
</style>
