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
      spinner: false,
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
      // focus on error input
      if (this.v$.$error) {
        const errorArr = this.v$.$errors;
        for (let i = errorArr.length - 1; i >= 0; i--) {
          const el = errorArr[i].$property;
          for (let x in this.$refs) {
            if (x === el) {
              this.$refs[x].focus();
            }
          }
        }
      }

      // submit successfully
      if (!this.v$.$error) {
        this.state.spinner = true;
        setTimeout(() => {
          this.state.alwaysFail = "Invalid User Credentials";
          this.state.spinner = false;
        }, 2000);
      }
    },
    inputChange() {
      this.state.alwaysFail = "";
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
          <input
            type="text"
            id="url"
            autofocus
            v-model="state.url"
            ref="url"
            @change="inputChange()"
          />
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
            @change="inputChange()"
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
            @change="inputChange()"
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
        <div class="form_submit">
          <button class="btn-submit">Login</button>
          <div class="spinner" v-if="state.spinner === true"></div>
        </div>
      </form>
    </div>
  </div>
</template>
