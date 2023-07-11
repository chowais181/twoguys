<template>
  <div class="ml-16 mb-3">
    <div class="title text-body-1" @click="onItemClick">{{ title }}</div>
    <div class="text-subtitle-2 grey--text">{{ caption }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    caption: String,
  },

  methods: {
    onItemClick() {
      this.$emit("on-item-click");
    },
  },
};
</script>

<style scoped>
.title {
  color: #077af6;
}

.title:hover {
  text-decoration: underline;
}
</style>