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
      <NuxtLink to="/shop" class="text-primary font-medium">Shop</NuxtLink>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <NuxtLink
        :to="`/shop/product/${$route.query.pc_}`"
        class="text-primary font-medium"
        >{{ $route.query.n_ }}</NuxtLink
      >
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-500 font-medium">All Reviews</p>
    </div>
    <!-- breadcrumbs end -->

    <!-- review section start -->
    <div class="space-y-3 md:space-y-6 text-sm md:text-sm my-10">
      <div
        class="flex flex-col gap-y-1 relative shadow px-3 md:px-5 py-2 md:py-4"
        v-for="review in reviews.data"
        :key="review.id"
      >
        <div class="flex justify-between md:justify-start gap-x-5">
          <div class="text-sm text-gray-400">
            <span v-if="review.is_anonymous">*******</span>
            <span v-else>{{ review.user.name }}</span>
            - {{ review.created_at | formattedDate3 }}
          </div>
          <client-only>
            <star-rating
              :rating="review.rating"
              :show-rating="false"
              :padding="5"
              :read-only="true"
              :star-size="15"
              active-color="#ffb303"
              :rounded-corners="true"
            ></star-rating>
          </client-only>
        </div>
        <p class="text-gray-700">
          {{ review.review }}
        </p>
      </div>
      <div class="my-3 flex justify-center">
        <pagination
          align="right"
          :data="reviews"
          :limit="3"
          @pagination-change-page="loadAllReviewsForSelectedProduct"
        ></pagination>
      </div>
    </div>
    <!-- review section end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviews: [],
    };
  },

  created() {
    this.loadAllReviewsForSelectedProduct();
  },

  methods: {
    loadAllReviewsForSelectedProduct(page = 1) {
      this.$store
        .dispatch("products/loadAllReviewsForSelectedProduct", {
          product_code: this.$route.query.pc_,
          page,
        })
        .then((res) => {
          this.reviews = res;
        });
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
