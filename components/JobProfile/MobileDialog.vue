<template>
  <v-dialog v-model="showDialog" fullscreen>
    <v-card class="pa-4">
      <v-toolbar max-height="40px" flat dense>
        <v-spacer></v-spacer>

        <v-btn fab icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <JobProfile :item="item" />
    </v-card>
  </v-dialog>
</template>

<script>
import { DialogMixin } from "~/mixins/DialogMixin";

export default {
  mixins: [DialogMixin],
  props: {
    item: Object,
  },
};
</script>
