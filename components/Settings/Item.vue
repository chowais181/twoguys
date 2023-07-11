<template>
  <div class="d-flex align-center">
    <div class="box pa-2 mr-6">
      <v-icon color="black">{{ icon }}</v-icon>
    </div>

    <div class="font-weight-bold text-body-1">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
  },
};
</script>

<style scoped>
.box {
  border: 1px solid #d8d8d8;
  border-radius: 10px;
}
</style>