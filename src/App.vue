<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  setup() {
    const state = reactive({
      url: "api-mono",
      username: "",
      password: "",
      alwaysFail: "",
    });
    const rules = computed(() => {
      return {
        url: { required },
        username: { required },
        password: { required },
      };
    });
    const v$ = useVuelidate(rules, state);

    return {
      state,
      v$,
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      // if (this.v$.$error) {
      //   for (let key in Object.keys(this.v$)) {
      //     const input = Object.keys(this.v$)[key];
      //     if (input.includes("$")) return false;
      //     if (this.state.v$[input].$error) {
      //       this.state.$refs[input].focus();
      //       break;
      //     }
      //   }
      // }
      if (!this.v$.$error) {
        setTimeout(() => {
          this.state.alwaysFail = "Invalid User Credentials";
        }, 2000);
      }
    },
  },
};
</script>

<template>
  <div id="app" v-cloak>
    <img
      class="secondary-logo"
      src="/digital_factory.svg"
      alt="digital_factory"
    />

    <div class="login-box">
      <p class="welcome">WELCOME BACK TO</p>
      <img class="primary-logo" src="/logo.svg" alt="linkSE" />

      <form class="login-form" @submit.prevent="submitForm">
        <label class="box-input url" for="url">
          Base URL
          <input type="text" id="url" autofocus v-model="state.url" ref="url" />
          <div class="error-input" v-if="v$.url.$error">
            {{ v$.url.$errors[0].$message }}
          </div>
          <span class="url-fixed">.linkse.dev</span>
        </label>
        <label class="box-input" for="username">
          Username
          <input
            type="text"
            id="username"
            v-model="state.username"
            ref="username"
          />
          <div class="error-input" v-if="v$.username.$error">
            {{ v$.username.$errors[0].$message }}
          </div>
        </label>
        <label class="box-input" for="password">
          Password
          <input
            type="password"
            id="password"
            v-model="state.password"
            ref="password"
          />
          <div class="error-input" v-if="v$.password.$error">
            {{ v$.password.$errors[0].$message }}
          </div>
        </label>

        <div class="login-form_bottom">
          <div class="error" v-if="state.alwaysFail !== ''">
            {{ state.alwaysFail }}
          </div>
          <label class="container">
            Remember me
            <input type="checkbox" checked="checked" />
            <span class="checkmark"></span>
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button class="btn-submit">Login</button>
      </form>
    </div>
  </div>
</template>
