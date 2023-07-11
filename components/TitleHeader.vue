<template>
  <div class="mb-4">
    <v-card prominent color="grey lighten-4" flat height="50px" tile>
      <v-toolbar dense color="#e2e2e2" elevation="0">
        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>