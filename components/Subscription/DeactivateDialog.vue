<template>
  <v-dialog v-model="showDialog" max-width="600px">
    <v-card tile>
      <v-toolbar max-height="60px" flat outlined>
        <v-toolbar-title>
          <h3>Shop Deactivate</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn fab icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <div class="alert-text my-6 pa-4 pb-0 d-flex align-start">
          <v-icon color="red">mdi-alert-rhombus</v-icon>
          <p class="ml-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, quo
            quos sed eum magni asperiores beatae consequatur repellendus, facere
            dolore unde illo temporibus ex! Recusandae magnam eius quibusdam
            impedit neque?
          </p>
        </div>

        <v-form v-model="valid" lazy-validation>
          <label for="" class="label">Password</label>
          <v-text-field :rules="[rules.required]" outlined dense></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn class="rounded" outlined depressed>Cancel</v-btn>
        <v-btn color="red" dark class="rounded" depressed>Deactivate</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DialogMixin } from "~/mixins/DialogMixin";
export default {
  mixins: [DialogMixin],
  data() {
    return {
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
};
</script>

<style scoped>
.alert-text {
  border: 1px solid red;
  border-radius: 4px;
  background-color: rgb(255 0 0 / 8%);
}
</style>
