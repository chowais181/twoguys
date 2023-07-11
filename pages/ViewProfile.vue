<template>
  <div style="width: 100vw" class="mt-n8">
    <v-container class="mb-n6">
      <v-breadcrumbs class="pl-6 pl-md-16 font-bold" :items="items" large>
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-container>

    <div class="line-bg"></div>

    <v-container>
      <div
        class="d-flex"
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'justify-center'
            : 'justify-start px-8'
        "
      >
        <v-avatar class="avatar-profile" color="#fff" size="155">
          <v-img :src="profileDisplay" alt="profile"> </v-img>
        </v-avatar>
      </div>
    </v-container>

    <v-card-text style="margin-top: 3rem" class="grey--text text--darken-4">
      <v-container class="px-md-8">
        <div class="pt-8 font-bold px-4">
          <div class="d-flex">
            {{ customer.name }}
            <div>
              <v-img
                width="50"
                height="20"
                :src="require('@/assets/img/fish-facing-left.png')"
              ></v-img>
            </div>
          </div>
          <div>{{ customer.age }} Years</div>
          <div>{{ customer.gender }}</div>
          <div>Big Fish Club</div>
        </div>

        <v-divider class="mt-4"></v-divider>

        <div class="mt-8 px-4">
          <div class="font-bold">Occupation:</div>
          <div
            v-for="item in customer.customer_occupations"
            :key="item.id"
            class="text-md-subtitle-1"
          >
            • {{ item.name }}
          </div>
        </div>

        <v-divider class="mt-4"></v-divider>

        <v-row dense class="align-end px-4">
          <v-col cols="12" md="6">
            <div class="mt-8">
              <div class="font-bold">Business:</div>
              <div
                v-for="item in customer.customer_startups"
                :key="item.id"
                class="text-md-subtitle-1"
              >
                • {{ item.name }}
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="d-flex justify-end">
            <!-- <p class="grey--text">Last time online: Today</p> -->
          </v-col>
        </v-row>

        <v-btn
          class="mt-16 px-12"
          color="rgb(197, 200, 202)"
          large
          depressed
          dark
          @click="onBackButtonClick"
          ><span class="text-subtitle-1">Back</span></v-btn
        >
      </v-container>
    </v-card-text>
  </div>
</template>

<router lang="yaml">
    path: /view-profile
    name: view-profile
</router>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Home",
          disabled: false,
          href: "/",
        },

        {
          text: "name",
          disabled: false,
        },
      ],
      customer: {
        customer_id: null,
        name: null,
        age: null,
        email: null,
        gender: null,
        profile_image_url: null,
        customer_occupations: [],
        customer_startups: [],
        customer_pitches: [],
      },

      profile_image: {
        profile_image_url: null,
        raw: null,
        base64: null,
        extension: null,
      },
    };
  },

  computed: {
    profileDisplay() {
      return this.profile_image.raw !== null
        ? URL.createObjectURL(this.profile_image.raw)
        : this.customer.profile_image_url;
    },
  },

  methods: {
    onBackButtonClick() {
      this.$router.go(-1);
    },
  },

  async fetch() {
    this.$nuxt.$loading.start();

    this.customerId = this.$route.query.id;

    this.$axios.get(`customers/${this.customerId}`).then((response) => {
      console.info(response.data);
      if (response.data.success) {
        this.customer = response.data.customer;
      }
    });
  },
};
</script>


<style  lang="scss">
.line-bg {
  background-size: cover;
  background-position: center center;
  background-color: #645dfd;
  // background-color: #645dfd;
  // background-image: url("~/assets/sample-bg-1.jpg");
  height: 120px;
  width: 100vw;
}

.avatar-profile {
  position: absolute;
  margin-top: -90px;
}

.avatar-left {
  margin-left: 200px;
}

.font-bold {
  font-size: 18px;
}
</style>