<template>
  <v-container fluid fill-height class="d-flex justify-center">
    <div class="text-center">
      <v-img
        height="250"
        width="250"
        :src="require('@/assets/img/big-handshake-logo.gif')"
        class="mx-auto mb-6"
        contain
      ></v-img>

      <div>
        Congratulations. <br />
        Your request has been sent.
      </div>

      <v-btn class="px-8 mt-6" color="green" dark> Back to Home Page </v-btn>
    </div>
  </v-container>
</template>

<router lang="yaml">
    path: /request-sent
    name: request-sent
</router>


<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {};
  },
};
</script>

