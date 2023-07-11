<script>
import { DialogMixin } from "~/mixins/DialogMixin";
const dayjs = require("dayjs");

export default {
  mixins: [DialogMixin],

  data: () => ({
    showSnackbar: true,
    vertical: true,
    items: [
      {
        text: "Home",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },

      {
        text: "name",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },
    ],
    premiumClub: {
      customer_id: null,
      contact_email: "",
      interested_in: "",
      show_fish: null,
      show_profile: null,
    },
    overlay: false,
    showAddOccupation: false,
    showAddStartup: false,

    genders: [
      {
        id: 1,
        name: "Male",
      },

      {
        id: 2,
        name: "Female",
      },
      {
        id: 2,
        name: "Divers",
      },
    ],

    supportedLanguages: [
      {
        id: 0,
        country: "us",
        language: "en",
        text: "English",
      },
      {
        id: 1,
        country: "de",
        language: "de",
        text: "German",
      },
    ],

    selectedLanguage: {
      id: 0,
      country: "us",
      text: "English",
    },

    customerId: null,

    customer: {
      customer_id: null,
      name: null,
      age: null,
      email: null,
      gender: null,
      twitter: null,
      city: null,
      country: null,
      has_fish: null,
      profile_image_url: null,
      customer_occupations: [],
      customer_premium_owns: [],
      customer_startups: [],
      customer_pitches: [],
    },

    profile_image: {
      profile_image_url: null,
      raw: null,
      base64: null,
      extension: null,
    },
    customerOccupationName: null,
    customerOwnsName: null,
    customerStartupName: null,
    customerSavedPitches: [],
  }),

  computed: {
    daysToTrialExpiry() {
      const date1 = dayjs().format("YYYY-MM-DD");
      const date2 = dayjs(this.customer.created_at).format("YYYY-MM-DD");
      const days = 14 - dayjs().diff(date2, "days");
      if (days < 1) {
        return "Your free plan is expired.";
      } else {
        return "Your free plan expires in " + days + " days.";
      }
    },

    profileDisplay() {
      if (this.profile_image.raw !== null) {
        return URL.createObjectURL(this.profile_image.raw);
      }

      if (this.customer.profile_image_url !== null) {
        return this.customer.profile_image_url;
      }

      return `${process.env.webAppBaseURL}avatar.png`;
    },
  },

  methods: {
    onAddOccupationClick() {
      this.showAddOccupation = true;
    },

    onPricingClick() {
      this.$router.push({
        path: this.localePath("/pricing"),
      });
    },

    onAddStartupClick() {
      this.showAddStartup = true;
    },

    async onImageInputChange(file) {
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

      if (!validImageTypes.includes(file.type)) {
        this.$toast({
          icon: "error",
          title: "Please upload an image only.",
        });

        return;
      }

      this.profile_image = {
        raw: file,
        base64: await this.getBase64Image(file),
        extension: file.type.split("/")[1],
      };

      this.$axios
        .$put("customers/profile-image", {
          customer_id: this.customerId,
          profile_image: this.profile_image,
        })
        .then((response) => {
          if (response.success) {
            this.$toast({
              icon: "success",
              title: "Profile image successfully updated.",
            });
          }
        });

      console.info(this.profile_image);
    },

    onAddImageClick() {
      this.$refs.profileImageInput.$refs.input.click();
    },

    getBase64Image(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split("base64,")[1]);
        reader.readAsDataURL(file);
      });
    },

    onSelectedLanguageChange(value) {
      this.selectedLanguage = value;
      this.$auth.$storage.setUniversal("selectedLanguage", value);
      this.$router.push({
        path: this.switchLocalePath(value.language),
      });
      // <nuxt-link :to="switchLocalePath('de')" @click="$router.push(localePath('/about'))">EN</nuxt-link>
    },

    setPreferredLanguage() {
      let preferredLanguage =
        this.$auth.$storage.getUniversal("selectedLanguage");
      if (preferredLanguage) {
        this.selectedLanguage = preferredLanguage;
      }

      console.info(preferredLanguage);
    },

    onDeleteOccupationClick(id) {
      this.$axios.$delete(`customer/occupations/${id}`).then((data) => {
        if (data.success) {
          this.customer.customer_occupations.splice(
            this.customer.customer_occupations.findIndex(
              (items) => items.id === id
            ),
            1
          );

          this.$toast({
            icon: "success",
            title: "Occupation successfully deleted.",
          });
        }
      });
    },
    onDeleteOwnsClick(id) {
      this.$axios.$delete(`customer/owns/${id}`).then((data) => {
        if (data.success) {
          this.customer.customer_premium_owns.splice(
            this.customer.customer_premium_owns.findIndex(
              (items) => items.id === id
            ),
            1
          );

          this.$toast({
            icon: "success",
            title: "Business successfully deleted.",
          });
        }
      });
    },

    onSaveOccupationClick() {
      this.showAddOccupation = false;
      this.$axios
        .$post("customer/occupations", {
          customer_id: this.customerId,
          name: this.customerOccupationName,
        })
        .then((data) => {
          this.customer.customer_occupations.push(data.customer_occupation);
          this.$toast({
            icon: "success",
            title: "Occupation successfully added.",
          });

          this.customerOccupationName = null;
        });
    },

    onSaveOwnsClick() {
      this.showAddOccupation = false;
      this.$axios
        .$post("customer/owns", {
          customer_id: this.customerId,
          name: this.customerOwnsName,
        })
        .then((data) => {
          this.customer.customer_premium_owns.push(data.customer_occupation);
          this.$toast({
            icon: "success",
            title: "Your Business successfully added.",
          });

          this.customerOwnsName = null;
        });
    },

    onSaveStartupClick() {
      this.showAddStartup = false;
      this.$axios
        .$post("customer/startups", {
          customer_id: this.customerId,
          name: this.customerStartupName,
        })
        .then((data) => {
          this.customer.customer_startups.push(data.customer_startup);
          this.$toast({
            icon: "success",
            title: "Business successfully added.",
          });

          this.customerStartupName = null;
        });
    },

    onDeleteStartupClick(id) {
      this.$axios.$delete(`customer/startups/${id}`).then((data) => {
        if (data.success) {
          this.customer.customer_startups.splice(
            this.customer.customer_startups.findIndex(
              (items) => items.id === id
            ),
            1
          );

          this.$toast({
            icon: "success",
            title: "Business successfully deleted.",
          });
        }
      });
    },

    getAllCustomerSavedPitches() {
      this.$axios
        .$get(`customer/${this.customerId}/pitches/save`)
        .then((data) => {
          this.customerSavedPitches = data.customer_pitch;
          console.info(data);
        });
    },

    onSavePremiumData() {
      const customer = this.$auth.$storage.getUniversal("user").customer_id;
      const body = {
        show_profile_in_premium_club_search: this.premiumClub.show_profile,
      };
      setTimeout(() => {
        this.$axios
          .put(`customers/${customer}`, body)
          .then(async (response) => {
            if (response.data.success) {
              this.$toast({
                icon: "success",
                title: "Saved profile data.",
              });
            } else {
              this.$toast({
                icon: "error",
                title: "Something went wrong.",
              });
            }
            // console.info('response');
            // console.info(response);
            // console.info(response.data.customer.subscriptions.data[0].items.data[0].plan.id);
          });
      }, 500);
      // this.$axios.$put("customers/premium_data", this.premiumClub).then((response) => {
      //   if (response.success) {
      //     this.$toast({
      //       icon: "success",
      //       title: "Your Premium Data is successfully updated.",
      //     });
      //   }
      // });
    },

    onSaveProfile() {
      this.$axios
        .$put(`customers/${this.customerId}`, this.customer)
        .then((response) => {
          if (response.success) {
            this.$toast({
              icon: "success",
              title: "Profile successfully updated.",
            });
          }
        });
    },
  },

  async fetch() {
    this.$nuxt.$loading.start();

    this.customerId = this.$route.query.id;

    this.$axios.get(`customers/${this.customerId}`).then((response) => {
      console.info(response.data);
      if (response.data.success) {
        this.customer = response.data.customer;
        this.premiumClub.show_profile =
          response.data.customer.show_profile_in_premium_club_search;
        // this.premiumClub = response.data.customer.customer_premium_data[0];
      }
    });

    this.getAllCustomerSavedPitches();

    this.setPreferredLanguage();
  },
};
</script>

<template>
  <v-container fluid>
    <v-dialog v-model="showAddOccupation" width="600">
      <v-card min-height="20vh">
        <v-toolbar max-height="60px" flat>
          <v-spacer></v-spacer>
          <v-toolbar-title> Add Occupation</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn fab icon @click="showAddOccupation = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text
          class="px-16 d-flex align-center"
          style="min-height: 150px"
        >
          <v-row class="d-flex align-center">
            <v-col cols="12" sm="10">
              <div class="text-left">
                <label class="font-weight-bold">Name</label>
                <v-text-field
                  outlined
                  dense
                  v-model="customerOccupationName"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="12" sm="2" class="text-center">
              <v-btn color="primary" @click="onSaveOccupationClick">Save</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showAddStartup" width="600">
      <v-card min-height="20vh">
        <v-toolbar max-height="60px" flat>
          <v-spacer></v-spacer>
          <v-toolbar-title> {{ $t("addStartup") }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn fab icon @click="showAddStartup = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text
          class="px-16 d-flex align-center"
          style="min-height: 150px"
        >
          <v-row class="d-flex align-center">
            <v-col cols="12" sm="10">
              <div class="text-left">
                <label class="font-weight-bold">Name</label>
                <v-text-field
                  outlined
                  dense
                  v-model="customerStartupName"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="12" sm="2" class="text-center">
              <v-btn color="primary" @click="onSaveStartupClick">Save</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- <v-breadcrumbs class="pl-6 pl-md-16" :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs> -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <div class="line-bg"></div>
          <v-file-input
            accept=".png, .jpg, .jpeg"
            ref="profileImageInput"
            required
            :hide-input="true"
            style="display: none"
            @change="
              (file) => {
                onImageInputChange(file);
              }
            "
          ></v-file-input>

          <v-hover v-slot:default="{ hover }">
            <div style="display: flex; justify-content: center">
              <v-avatar
                class="avatar-profile"
                color="#fff"
                size="155"
                @click="onAddImageClick()"
              >
                <v-img :src="profileDisplay" alt="profile">
                  <v-fade-transition>
                    <div
                      v-if="hover"
                      class="d-flex primary white--text align-center justify-center"
                      style="height: 100%; width: 100%; opacity: 0.75"
                    >
                      Change Image
                    </div>
                  </v-fade-transition>
                </v-img>
              </v-avatar>
            </div>
          </v-hover>
          <v-card-text style="margin-top: 3rem">
            <v-container class="my-6">
              <v-row dense>
                <v-col cols="12" sm="6">
                  <label class="font-weight-bold">Username</label>
                  <v-text-field
                    outlined
                    dense
                    v-model="customer.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <label class="font-weight-bold">Login Email</label>
                  <v-text-field
                    outlined
                    dense
                    v-model="customer.email"
                  ></v-text-field>
                </v-col>

                <!-- <v-col cols="12" sm="6">
                  <label class="font-weight-bold">Twitter</label>
                  <v-text-field
                    outlined
                    dense
                    v-model="customer.twitter"
                  ></v-text-field>
                </v-col> -->

                <!-- <v-col cols="12" sm="6">
                  <label class="font-weight-bold">{{ $t("age") }}</label>
                  <v-text-field
                    outlined
                    dense
                    v-model="customer.age"
                  ></v-text-field>
                </v-col> -->

                <!-- <v-col cols="12" sm="6">
                  <label class="font-weight-bold">{{ $t("gender") }}</label>
                  <v-select
                    outlined
                    dense
                    :items="genders"
                    item-text="name"
                    v-model="customer.gender"
                  ></v-select>
                </v-col> -->

                <v-col cols="12" sm="6">
                  <label class="font-weight-bold">{{ $t("City") }}</label>
                  <v-text-field
                    outlined
                    dense
                    v-model="customer.city"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <label class="font-weight-bold">{{ $t("Country") }}</label>
                  <v-text-field
                    outlined
                    dense
                    v-model="customer.country"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <label class="font-weight-bold">{{ $t("language") }}</label>
                  <v-select
                    return-object
                    :items="supportedLanguages"
                    @change="onSelectedLanguageChange"
                    item-text="text"
                    outlined
                    dense
                    v-model="selectedLanguage"
                  >
                    <template v-slot:item="{ item }">
                      <div class="d-flex align-center">
                        <countryFlag
                          class="mt-n2 mr-2"
                          :country="item.country"
                        />
                      </div>
                      <span>{{ item.text }}</span>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-right mb-3">
                    <v-btn color="primary" dark @click="onSaveProfile">
                      {{ $t("saveChanges") }}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>

              <!-- DAYS TILL TRIAL EXPIRY -->
              <div class="expiry-date">
                {{ daysToTrialExpiry }}
              </div>
              <div class="mt-5 posted-main">
                <span class="heading-posted">Posted Ideas</span>
                <v-col cols="12" sm="12">
                  <label class="font-weight-bold">Contact</label>

                  <v-text-field
                    class="contact-posted"
                    outlined
                    dense
                    placeholder="Business Email, Social Media"
                  >
                  </v-text-field>
                  <p class="text-caption">
                    This text field becomes publicly visible when someone
                    contacts you about a post you made. Share your preferred
                    method of contact.
                    <b
                      >Attention: Do not share unwanted information here! You
                      are responsible for your content, we can not take any
                      responsibility or liability.</b
                    >
                  </p>
                </v-col>

                <v-row>
                  <v-col>
                    <div class="text-right mb-3">
                      <v-btn color="primary" dark @click="onSaveProfile">
                        {{ $t("saveChanges") }}
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </div>

              <!-- Posted Ideas TABLE -->
              <!-- <div class="mt-5">
                <v-card min-height="20vh" outlined>
                  <v-toolbar color="white" outlined>
                    <v-toolbar-title
                      class="black--text text-body-2 text-sm-h6 ml-n2 ml-sm-1"
                    >
                      {{ $t("occupations") }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click="onAddOccupationClick"
                      :small="$vuetify.breakpoint.smAndDown"
                    >
                      {{ $t("addOccupation") }}
                    </v-btn>
                  </v-toolbar>
                  <v-card-text style="min-width: 100px">
                    <v-row class="text-center">
                      <v-col
                        cols="12"
                        md="6"
                        v-for="item in customer.customer_occupations"
                        :key="item.id"
                      >
                        <p class="text-body-2">
                          {{ item.name }}
                          <v-icon
                            color="red"
                            @click="onDeleteOccupationClick(item.id)"
                          >
                            mdi-close-circle-outline
                          </v-icon>
                        </p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div> -->

              <!-- <div class="mt-5">
                <v-card min-height="20vh" outlined>
                  <v-toolbar color="white" outlined>
                    <v-toolbar-title class="black--text text-body-2 text-sm-h6">
                      {{ $t("startups") }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click="onAddStartupClick"
                      :small="$vuetify.breakpoint.smAndDown"
                    >
                      {{ $t("addStartup") }}
                    </v-btn>
                  </v-toolbar>
                  <v-card-text style="min-width: 100px">
                    <v-row class="text-center">
                      <v-col
                        cols="12"
                        md="6"
                        v-for="item in customer.customer_startups"
                        :key="item.id"
                      >
                        <p class="text-body-2">
                          {{ item.name }}
                          <v-icon
                            color="red"
                            @click="onDeleteStartupClick(item.id)"
                          >
                            mdi-close-circle-outline
                          </v-icon>
                        </p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div> -->

              <div v-if="customer.has_fish != ''" class="mt-5 posted-main">
                <span class="heading-posted"> Premium Search </span>
                <v-col col="12" sm="12">
                  <label class="font-weight-bold">Contact: </label>
                  <v-text-field
                    background-color="#fff"
                    light
                    rounded
                    outlined
                    dense
                    placeholder="Business Email, Social Media"
                    v-model="premiumClub.contact_email"
                  ></v-text-field>

                  <p class="text-caption">
                    This text field becomes publicly visible when someone
                    contacts you about a post you made. Share your preferred
                    method of contact.
                    <b
                      >Attention: Do not share unwanted information here! You
                      are responsible for your content, we can not take any
                      responsibility or liability.</b
                    >
                  </p>
                </v-col>
                <!-- <v-row>
                    <v-col cols="12" sm="12">
                      <label class="font-weight-bold">I own:</label>
                      <v-text-field
                        background-color="#fff"
                        light
                        rounded
                        outlined
                        dense
                        placeholder="Education, Business, Job..."
                        v-model="customerOwnsName"
                        v-on:keyup.enter="onSaveOwnsClick"
                      ></v-text-field>

                      <v-row class="text-center">
                        <v-col
                          cols="12"
                          sm="12"
                          v-for="item in customer.customer_premium_owns"
                          :key="item.id"
                        >
                          <p class="text-body-2">
                            {{ item.name }}
                            <v-icon
                              color="red"
                              @click="onDeleteOwnsClick(item.id)"
                            >
                              mdi-close-circle-outline
                            </v-icon>
                          </p>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row> -->
                <v-row>
                  <v-col cols="12" sm="12">
                    <label class="font-weight-bold">Message:</label>
                    <v-text-field
                      background-color="#fff"
                      light
                      rounded
                      outlined
                      dense
                      v-model="premiumClub.interested_in"
                    ></v-text-field>
                    <p class="text-caption">
                      This status message is displayed in the premium Club
                      search.<b>
                        Attention: Do not share unwanted information! You are
                        responsible for your content, we can not take any
                        responsibility or liability.</b
                      >
                    </p>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <label class="font-weight-bold">Twitter</label>
                    <v-text-field
                      outlined
                      dense
                      v-model="customer.twitter"
                    ></v-text-field>
                  </v-col>
                  <!-- show profile in premium club search -->
                  <v-col cols="12" md="6">
                    <div class="d-flex align-center text-body-1">
                      Show my profile in Premium Search
                      <v-switch
                        class="ml-4"
                        inset
                        v-model="premiumClub.show_profile"
                      ></v-switch>
                    </div>
                    <!-- <v-col cols="12" md="8"> -->
                    <div class="d-flex align-center text-body-1">
                      <span>
                        I want to display my
                        <v-img
                          width="30"
                          height="30"
                          :src="require('@/assets/img/fish4-gray.svg')"
                        ></v-img>
                        icon next to my username.
                      </span>

                      <v-switch
                        class="ml-4"
                        inset
                        v-model="premiumClub.show_fish"
                      ></v-switch>
                    </div>
                    <!-- </v-col> -->
                  </v-col>

                  <v-row>
                    <v-col>
                      <div class="text-right mb-3">
                        <v-btn color="primary" dark @click="onSavePremiumData">
                          {{ $t("saveChanges") }}
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- <v-col cols="12" md="12">
                    <v-btn color="danger" @click="onSavePremiumData"
                      >Save Changes</v-btn
                    >
                  </v-col> -->
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-if="customer.has_fish == ''"
      :timeout="-1"
      :value="true"
      right
      max-width="180px"
      color="#000"
    >
      <div
        v-if="showSnackbar"
        class="d-flex justify-space-between align-center"
      >
        Your test has just started

        <v-btn icon small @click="showSnackbar = false">
          <v-icon> mdi-menu-up </v-icon>
        </v-btn>
      </div>

      <div v-else>
        <div class="d-flex justify-space-between align-center">
          <h6 class="text-h6 font-weight-bold">Your test has just started</h6>
          <v-btn fab small @click="showSnackbar = true">
            <v-icon> mdi-menu-down </v-icon>
          </v-btn>
        </div>
        <p>Choose plan and continue using TwoGuysApp after August 23.</p>

        <v-btn
          color="primary"
          v-bind="attrs"
          block
          class="rounded"
          @click="onPricingClick"
        >
          Select Plan
        </v-btn>
      </div>
    </v-snackbar>
  </v-container>
</template>

<router lang="yaml">
path: /profile
name: profile
</router>

<style lang="scss">
.posted-main {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 20px;
}

.heading-posted {
  font-size: 25px;
  font-style: bold;
}
.contact-posted {
  border-radius: 10px;
}

.expiry-date {
  margin-left: 2px;
  font-size: 18px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 20px;
}

.line-bg {
  background-size: cover;
  background-position: center center;
  background-color: #645dfd;
  // background-color: #645dfd;
  // background-image: url("~/assets/sample-bg-1.jpg");
  height: 220px;
  width: 100%;
}

.avatar-profile {
  position: absolute;
  margin-top: -70px;
  /* margin-left: 10vw; */
}
</style>
