Vue.createApp({
  data() {
    return {
      isSubmitted: false,
      error: "Invalid User Credentials",
    };
  },
  methods: {
    logIn() {
      setTimeout(() => {
        this.isSubmitted = true;
      }, 2000);
    },
  },
}).mount("#app");
