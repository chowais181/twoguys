<template>
  <v-dialog v-model="showDialog" width="500" persistent>
    <v-card min-height="20vh">
      <v-toolbar max-height="20px" flat>
        <v-spacer></v-spacer>

        <v-btn fab icon @click="onCloseDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text style="min-height: 150px" class="black--text">
        <v-container class="d-flex justify-center">
          <div class="text-center">
            <v-img
              height="200"
              width="200"
              :src="require('@/assets/img/success-medium-handshake-logo.gif')"
              class="mx-auto mb-6"
              contain
            ></v-img>
            <div>Deal successfully accepted</div>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<router lang="yaml">
    path: /request-sent
    name: request-sent
</router>


<script>
import { call, get } from "vuex-pathify";
import { DialogMixin } from "~/mixins/DialogMixin";
export default {
  mixins: [DialogMixin],
  data() {
    return {};
  },

  methods: {
    onCloseDialog() {
      this.$router.push({ path: "dashboard" });
      // this.$emit("close");
      this.isDialogOpen = false;
    },
  },
};
</script>

