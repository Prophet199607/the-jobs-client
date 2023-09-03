import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
  if (rule == "required") {
    extend(rule, {
      ...rules[rule],
      message: "This field is required!",
    });
  } else if (rule == "confirmed") {
    extend(rule, {
      ...rules[rule],
      message: "Password doesn't match!",
    });
  } else if (rule == "min") {
    extend(rule, {
      ...rules[rule],
      message: "Your password must be at least 8 characters!",
    });
  } else if (rule == "email") {
    extend(rule, {
      ...rules[rule],
      message: "This should be a valid email!",
    });
  } else if (rule == "max") {
    extend(rule, {
      ...rules[rule],
      message: "Maximum character count is 350",
    });
  }
});

extend("select", (value) => {
  if (value != 0) {
    return true;
  }

  return "Please select an option";
});
