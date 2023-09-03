<template>
  <div class="grid grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(saveData)">
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block">Location Title</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter location title"
                v-model="location.title"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2"
              >Location Address Line 1</label
            >
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter main location address line 1"
                v-model="location.address_line_1"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2"
              >Location Address Line 2</label
            >
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter main location address line 2"
                v-model="location.address_line_2"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2">Contact No</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter main location contact no"
                v-model="location.contact_no"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2">Email</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter main location email"
                v-model="location.email"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <div class="flex items-center mt-2">
            <input
              type="checkbox"
              id="Dominik"
              class="text-primary focus:ring-0 rounded-sm cursor-pointer"
              v-model="location.status"
            />
            <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer">Active</label>
          </div>
          <div class="mt-4 text-right">
            <button
              type="submit"
              class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
              v-if="!editMode"
            >
              save changes
            </button>
            <button
              type="submit"
              class="text-center bg-green-500 border border-green-500 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-green-500 transition uppercase text-xs md:text-sm"
              v-else
            >
              update location
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
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3"></th>
            <th scope="col" class="px-6 py-3">Location</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(location, index) in locations"
            :key="location.id"
          >
            <td class="px-6 py-4">{{ ++index }}</td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ location.title }}
            </th>
            <td class="px-6 py-4">{{ location.status == 1 ? "Active" : "Inactive" }}</td>
            <td class="px-6 py-4 text-center">
              <a
                href="#"
                class="text-blue-500 underline mr-3"
                @click.prevent="updateLocationData(location)"
                >Edit</a
              >
              <i
                class="fa fa-trash cursor-pointer text-red-500"
                aria-hidden="true"
                @click="deleteLocation(location)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
      editMode: false,
      location: {
        id: "",
        title: "",
        address_line_1: "",
        address_line_2: "",
        contact_no: "",
        email: "",
        status: true,
      },
    };
  },

  computed: {
    locations() {
      return this.$store.getters["company/getAllLocations"];
    },
  },

  created() {},

  mounted() {
    this.loadAllLocationData();
  },

  methods: {
    loadAllLocationData() {
      this.$store.dispatch("company/loadAllLocationData");
    },

    saveData() {
      let storeAction = "company/saveLocationData";

      this.$store.dispatch(storeAction, this.location).then((res) => {
        swal("Success!", res.message, "success");
        this.clearForm();
      });
    },

    updateLocationData(location) {
      this.editMode = true;
      this.location = { ...location };
    },

    deleteLocation(location) {
      this.$store.dispatch("company/deleteLocationData", location.id).then((res) => {
        swal("Success!", res.message, "success");
        this.clearForm();
      });
    },

    clearForm() {
      this.$refs.form.reset();
      this.editMode = false;
      this.location = {
        id: "",
        title: "",
        address_line_1: "",
        address_line_2: "",
        contact_no: "",
        email: "",
        status: true,
      };
    },
  },
};
</script>

<style scoped>
.company-image {
  width: 300px;
  height: 300px;
}
</style>
