<template>
  <v-dialog
    v-model="showDialog"
    width="600"
    persistent
    overlay-color="transparent"
    content-class="dialog"
    scrollable
  >
    <v-card class="px-md-16 pt-8">
      <!-- <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar> -->
      <v-card-text class="pb-6 black--text">
        <p class="font-bold text-center mb-8" style="font-size: 32px">
          Welcome
        </p>
        <p>
          We want to take you by the hand and help you find a business partner
          to reach your goal.
        </p>
        <p>
          1. That's why you can create posts that will be posted on the home
          page. On the start page other users can apply for it. Your published
          posts can be managed here in the dashboard.
        </p>
        <p>
          2. Each job offer will stay online for maximum 25 days and maximum 50
          users can apply. For each job offer, you can accept a maximum of 3
          applicants as business partners via email.
        </p>

        <p>
          3. For each application you will receive a notification by email. You
          can remove your post from the dashboard at any time. When you accept
          an application by email you get the possibility to contact the new
          business partner. By using the app you accept these terms of use.
        </p>
      </v-card-text>

      <v-card-actions class="pb-6">
        <v-spacer></v-spacer>
        <v-btn color="#000" large block dark>Okay</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DialogMixin } from "~/mixins/DialogMixin";

export default {
  mixins: [DialogMixin],
};
</script>

<style>
.dialog {
  border-radius: 24px !important;
}
</style>

