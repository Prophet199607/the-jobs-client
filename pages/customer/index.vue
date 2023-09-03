<template>
  <div>
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-sm text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-600 font-medium">Dashboard</p>
    </div>
    <!-- breadcrumbs end -->
    <div class="col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- single card start -->
      <div class="shadow rounded bg-white px-4 pt-6 pb-8 text-base">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium text-gray-800 text-base">Personal Profile</h3>
          <NuxtLink to="/customer/profile" class="text-primary">Edit</NuxtLink>
        </div>
        <div class="space-y-1 text-base">
          <h4 class="text-gray-700 font-medium">{{ $auth.user.name }}</h4>
          <p class="text-gray-800">{{ $auth.user.email }}</p>
          <p class="text-gray-800">{{ $auth.user.customer.phone_number }}</p>
        </div>
      </div>
      <!-- single card end -->
      <!-- single card start -->
      <div class="shadow rounded bg-white px-4 pt-6 pb-8 text-base">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium text-gray-800 text-base">Shipping Address</h3>
          <a href="#" class="text-primary">Edit</a>
        </div>
        <div class="space-y-1 text-base">
          <h4 class="text-gray-700 font-medium">{{ $auth.user.name }}</h4>
          <p class="text-gray-800">{{ $auth.user.customer.street_address }}</p>
          <p class="text-gray-800">{{ $auth.user.customer.city }}</p>
          <p class="text-gray-800">{{ $auth.user.customer.phone_number }}</p>
        </div>
      </div>
      <!-- single card end -->
      <!-- single card start -->
      <div class="shadow rounded bg-white px-4 pt-6 pb-8 text-base">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium text-gray-800 text-base">Billing Address</h3>
          <a href="#" class="text-primary">Edit</a>
        </div>
        <div class="space-y-1 text-base">
          <h4 class="text-gray-700 font-medium">{{ $auth.user.name }}</h4>
          <p class="text-gray-800">{{ $auth.user.customer.street_address }}</p>
          <p class="text-gray-800">{{ $auth.user.customer.city }}</p>
          <p class="text-gray-800">{{ $auth.user.customer.phone_number }}</p>
        </div>
      </div>
      <!-- single card end -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
