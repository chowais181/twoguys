<template>
  <v-container>
    <h3
      class="text-center text-md-h4 text-sm-h5 font-weight-thin mb-4"
      v-text="item.name"
    ></h3>
    <div class="text-center card" min-height="300px">
      <div v-if="item.isPopular" class="is-popular font-weight-thin pt-1">
        MOST POPULAR
      </div>
      <p class="description text-left pt-12 px-6" v-text="item.description"></p>

      <p
        class="display-1 accent--text my-6 font-weight-black"
        v-text="item.price"
      ></p>

      <div style="height: 60px" class="mt-12">
        <p class="mb-0">USD/user/month</p>
        <p v-if="item.price !== 'Free'" class="font-weight-bold">
          billed monthly
        </p>
      </div>

      <v-btn
        :color="item.selected ? 'grey' : 'primary'"
        class="rounded text-uppercase mb-10 mt-4"
        dark
        style="border: 1px solid #4f4fff !important"
      >
        {{ item.selected ? "Selected" : "Select Plan" }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  position: relative;
}

.is-popular {
  position: absolute;
  top: 0;
  background-color: #4f4fff;
  color: #fff;
  width: 100%;
}

.description {
  height: 130px;
  color: #132f60;
}
</style>