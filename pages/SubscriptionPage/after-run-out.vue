<template>
  <v-container class="text-center grey--text text--darken-3 align-center">
    <v-img
      width="160"
      class="mx-auto"
      :src="require('@/assets/img/cooked-fish.png')"
      contain
    ></v-img>
    <p class="mb-0 text-h4 mt-4">Renew your membership to continue</p>
    <p class="mb-0 text-h4">Your membership has expired</p>
    <p class="mb-0 text-h4">Please renew your membership to continue</p>

    <v-btn color="primary" class="px-10 mt-6" rounded large>
      <v-icon left dark> mdi-currency-usd </v-icon>Pricing</v-btn
    >
  </v-container>
</template>
<router lang="yaml">
    path: /after-run-out
    name: after-run-out
</router>