<template>
  <!-- INFO BAR -->
  <v-hover v-slot="{}">
    <v-card
      class="mx-auto rounded-xl d-block pa-4 justify-center align-center info-bar-card-style"
      outlined
      v-if="showBanner"
    >
      <v-card-text
        class="d-block d-md-flex justify-center align-center flex-column"
      >
        <div
          class="font-bold black--text text-subtitle-1"
          v-if="$route.params.location"
        >
          <span class="text-h5 mr-1 mt-1">👉</span>
          {{ $t("frontBannerCountryText1") }}
          <span class="text-h6 mx-1">🏆</span>
          {{ $t("frontBannerCountryText2") }}
          {{
            $route.params.location
              .split("-")
              .map(
                (location) =>
                  `${location[0].toUpperCase()}${location.slice(
                    1,
                    location.length
                  )}`
              )
              .join(" ")
          }}
        </div>
        <div class="font-bold black--text text-subtitle-1" v-else>
          <span class="text-h5 mr-1 mt-1">👉</span>
          {{ $t("frontBannerText1") }}
          <span class="text-h6 mx-1">🏆</span>
          {{ $t("frontBannerText2") }}
        </div>

        <div class="d-flex justify-center mt-2">
          <v-hover v-slot="{ hover }">
            <v-btn
              color="red"
              class="ml-2 mr-3"
              :outlined="hover ? true : false"
              depressed
              dark
              @click="onPostClick"
            >
              {{ $t("postMyIdea") }}
            </v-btn>
          </v-hover>
          <v-hover v-slot="{ hover }">
            <v-btn
              color="red"
              :outlined="hover ? false : true"
              depressed
              @click="onHideClick"
              dark
            >
              {{ $t("hideThis") }}
            </v-btn>
          </v-hover>
        </div>
      </v-card-text>
      <div class="d-flex flex-wrap justify-center align-center">
        <p class="text-uppercase font-bold ma-0 mt-3">Founders are seen in:</p>
        <img
          style="height: 35px"
          class="ml-8 mt-3 mb-2"
          :src="require('@/assets/img/shopify_infobar.png')"
        />
        <img
          style="height: 35px"
          class="ml-3 mt-3"
          :src="require('@/assets/img/entrepreneur_magazine.png')"
        />
        <img
          style="height: 35px"
          class="ml-3 mt-3"
          :src="require('@/assets/img/forbes.png')"
        />
        <img
          style="height: 35px"
          class="ml-3 mt-3"
          :src="require('@/assets/img/payoneer.png')"
        />
        <img
          style="height: 35px"
          class="ml-3 mt-3"
          :src="require('@/assets/img/techcrunch.png')"
        />
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["onPostClick"],
  methods: {
    onHideClick() {
      this.showBanner = false;
    },
  },
  data() {
    return {
      showBanner: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.info-bar-card-style {
  cursor: pointer;
  border-radius: 14px;
  border: 1.5px solid #d7d7d7;

  &:hover {
    background: #ddd3d36b;
  }
}
</style>
