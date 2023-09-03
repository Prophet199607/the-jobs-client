export default async function ({ app, redirect }) {
  // the following look directly for the cookie created by nuxtjs/auth
  // instead of using $auth.loggedIn
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    // let the user see the page
  } else {
    // redirect to homepage
    redirect("/login");
  }
}
