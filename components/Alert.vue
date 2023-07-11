<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-text class="py-12 text-center">
          <v-btn fab class="pa-12" color="rgba(76, 175, 80, 0.29)" depressed>
            <v-icon size="80px" color="green">mdi-check</v-icon>
          </v-btn>
          <h1 class="mt-6 green--text">Success!</h1>
          <p class="mt-4">Your plan has been sucessful.</p>

          <div class="mt-10">
            <v-btn outlined class="mr-2" color="#808080">Cancel</v-btn>
            <v-btn color="green" dark width="98px">OK</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
</style>