<template>
  <v-card
    color="#EAF1FD"
    class="d-inline-flex pa-2 mb-6"
    :width="$vuetify.breakpoint.smAndDown ? '76vw' : '38vw'"
    @click="onClick"
  >
    <v-icon class="mr-4 align-start" color="primary"> mdi-information</v-icon>
    <div class="primary--text text-subtitle-2">{{ text }}</div>
  </v-card>
</template>

<script>
export default {
  props: {
    text: String,
  },

  methods: {
    onClick() {
      this.$emit("on-click");
    },
  },
};
</script>