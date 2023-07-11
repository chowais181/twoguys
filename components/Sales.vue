<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto text-center">
        <v-card-title class="primary--text"> Sales </v-card-title>
        <v-sparkline
          :value="sparklineData"
          padding="18"
          label-size="4"
          color="cyan"
          :gradient="['#007bff', 'cyan']"
          :line-width="2"
          :stroke-linecap="'round'"
        >
        </v-sparkline>
        <v-card-actions class="py-4 justify-center">
          <v-btn color="primary" to="/reports">View Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      sparklineData: [423, 446, 675, 510, 590, 610, 423],
    };
  },
};
</script>