<template>
  <v-row class="justify-space-between align-center mb-2 mt-3">
    <v-col cols="2" sm="2">
      <v-menu offset-y>
        <template v-if="!location" v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            :large="$vuetify.breakpoint.smAndUp"
            class="mb-1"
            outlined
            color="grey"
            style="background: #fff"
            rounded
          >
            <span class="black--text text-subtitle-1"> Worldwide 🌍 </span>
          </v-btn>
        </template>
        <template v-else v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            :large="$vuetify.breakpoint.smAndUp"
            class="mb-1"
            outlined
            color="grey"
            style="background: #fff"
            rounded
          >
            <span class="black--text text-subtitle-1">
              <img
                class="pr-3"
                :src="require('@/assets/img/circle-plus-solid.svg')"
                alt="profile-image"
                width="30px"
              />{{ $t("filter") }}
            </span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group color="primary">
            <nuxt-link
              v-for="(country, i) in countries"
              :key="i"
              :to="
                '/' +
                country?.name?.toLowerCase()?.replace(' ', '-').toLowerCase()
              "
              class="text-decoration-none"
            >
              <v-list-item
                class="d-flex align-items-center"
                v-bind:value="country.title"
                @click="
                  $store.dispatch('location/setCountryCode', country?.alpha_2)
                "
              >
                <div class="d-flex align-items-center">
                  <country-flag
                    class="mr-1"
                    style="margin-bottom: 1px"
                    :country="country?.alpha_2"
                  />
                </div>
                <v-list-item-content class="pa-0" style="min-width: 180px">
                  <v-list-item-title>
                    {{ country?.name }}
                  </v-list-item-title>
                </v-list-item-content>
                <!-- <v-list-item-icon> -->
                <small class="font-weight-bold"
                  >({{ country?.amount_of_pitches }})</small
                >
                <!-- </v-list-item-icon> -->
              </v-list-item>
            </nuxt-link>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-col>
    <!-- FILTER CHIPS-->
    <v-chip
      v-if="location"
      class="ma-2"
      close
      color="red"
      text-color="white"
      @click:close="
        $router.push('/'), $store.dispatch('location/setCountryCode', '')
      "
    >
      <country-flag
        class="mr-1"
        style="margin-bottom: 1px"
        :country="$store.getters['location/selectedCountryCode']"
      />
      {{ location }}
    </v-chip>
  </v-row>
</template>

<script>
export default {
  props: ["location"],
  data() {
    return {
      locationFilter: "Worldwide",
      countries: [],
    };
  },
  created() {
    this.$axios.$get("countries").then((data) => {
      this.countries = data.countries.filter(
        (country) => country?.amount_of_pitches
      );
      console.log("countries:", this.countries);
    });
  },
};
</script>

<style></style>
