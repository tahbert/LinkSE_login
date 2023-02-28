Vue.createApp({
  data() {
    return {
      isSubmitted: false,
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
