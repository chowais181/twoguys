<template>
  <v-container fluid fill-height class="d-flex justify-center">
    <div class="text-center">
      <v-btn outlined class="px-8" color="primary" @click="onSignInClick">
        Sign In
      </v-btn>
      <div class="mt-4">
        Sign up or leave your email so your partner can get in touch with you.
      </div>

      <v-card class="mt-8 mx-8" outlined>
        <v-card-text class="text-left pt-6">
          <label class="label">Email Address</label>
          <v-text-field outlined dense v-model="email"></v-text-field>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<router lang="yaml">
    path: /assessment-process-and-questions/steps/get-in-touch
    name: get-in-touch
</router>


<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      show1: false,
      email: "",
    };
  },
  methods: {
    onSignInClick() {
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

