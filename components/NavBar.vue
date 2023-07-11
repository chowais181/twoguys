<template>
  <v-app-bar
    app
    color="primary"
    elevation="0"
    clipped-left
    class="px-6 px-md-16 pb-4 white--text"
  >
    <v-img
      max-height="40"
      max-width="200"
      :src="require('@/assets/logo.png')"
      contain
      @click="onLogoClick"
    ></v-img>

    <v-spacer></v-spacer>

    <div class="font-weight-bold" @click="onLoginClick">Login</div>
    <v-btn
      rounded
      class="ml-4"
      v-show="$vuetify.breakpoint.smAndUp"
      v-if="register"
      @click="onRegisterClick"
    >
      <v-icon left> mdi-account </v-icon>
      Join as a Professional
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    register: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onLogoClick(){
      this.$router.push({
        path: "/",
      });
    },

    onLoginClick() {
      this.$router.push({
        path: "/login",
      });
    },

    onRegisterClick() {
      this.$router.push({
        path: "/register",
      });
    },
  },
};
</script>