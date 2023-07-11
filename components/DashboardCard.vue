<template>
  <v-card
    class="px-2 py-2"
    style="background: linear-gradient(to right, #11c9ef 0%, #1175ef 80%)"
    :style="bgColor"
  >
    <v-card-text>
      <p class="text-right text-subtitle-1 white--text">{{ text }}</p>
      <div class="d-flex justify-space-between align-center">
        <v-icon x-large color="white"> {{ icon }} </v-icon>

        <div class="text-h5 white--text">
          <b>{{ value }}</b>
        </div>
      </div>
    </v-card-text>
    <v-divider dark class="pb-10"></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCard",

  props: {
    icon: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: 0,
    },
    cardColor: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    selectedItem: 0,
    show: false,
  }),

  computed: {
    bgColor() {
      if (!_.isEmpty(this.cardColor)) {
        return this.cardColor;
      }
      return "background: linear-gradient(to right, #11c9ef 0%, #1175ef 80%)";
    },
  },
};
</script>