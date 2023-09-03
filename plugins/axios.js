export default function ({ $axios }, inject) {
  const api = $axios.create({
    baseURL: process.env.API_BASE_URL,
  });
  // Inject to context as $api
  inject("api", api);
}
