<template>
  <v-container style="font-family: 'Nunito', sans-serif" class="px-md-16">
    <v-skeleton-loader
      v-if="false"
      v-bind="attrs"
      type="list-item, actions"
      class="banner"
    ></v-skeleton-loader>
    <div class="mt-4">
      <v-row>
        <v-col cols="12" sm="3">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                depressed
                color="white"
                large
                class="black--text text-subtitle-1"
                rounded
                block
              >
                <div v-if="selectedLocation === 'clientCurrentState'">
                  {{ clientCurrentState }}
                </div>
                <div v-else>
                  {{ selectedLocation }}
                </div>
                <v-avatar size="30" class="ml-4">
                  <v-img
                    v-if="selectedLocation === 'clientCurrentState'"
                    :src="require('@/assets/img/my-location.png')"
                    contain
                  >
                  </v-img>
                  <v-img
                    v-if="selectedLocation === 'Worldwide'"
                    :src="require('@/assets/img/world.png')"
                    contain
                  >
                  </v-img>
                  <v-img
                    v-if="selectedLocation === 'North America'"
                    :src="require('@/assets/img/north-america.png')"
                    contain
                  ></v-img>
                  <v-img
                    v-if="selectedLocation === 'Europe'"
                    :src="require('@/assets/img/europe.png')"
                    contain
                  ></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item-group v-model="currentCountry" color="primary">
                <v-list-item
                  v-for="(item, i) in locations"
                  :key="i"
                  v-bind:value="item.title"
                >
                  <v-list-item-icon>
                    <v-avatar size="30" class="ml-4">
                      <v-img :src="item.icon" contain></v-img>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>

        <!-- fish_type selector -->
        <v-col cols="12" sm="3">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                depressed
                large
                color="white"
                rounded
                block
              >
                <span class="black--text text-subtitle-1">
                  {{ selectedClub }}
                </span>
                <v-avatar size="50" class="ml-4">
                  <v-img
                    :src="require('@/assets/img/fish4-gray.svg')"
                    contain
                  ></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item-group v-model="fishValue" color="primary">
                <v-list-item
                  v-for="(item, i) in clubs"
                  :key="i"
                  v-bind:value="item.name"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-avatar size="30" class="ml-4">
                      <v-img
                        :src="require('@/assets/img/fish4-gray.svg')"
                        contain
                      ></v-img>
                    </v-avatar>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>

        <!-- <v-col cols="12" sm="7">
          <v-text-field class="rounded-pill" height="44px" dense outlined prepend-inner-icon="mdi-magnify">
          </v-text-field>
        </v-col> -->
        <v-col cols="12" sm="5">
          <form class="nosubmit">
            <input
              class="nosubmit"
              v-model="searchValue"
              type="search"
              placeholder="Search..."
            />
          </form>
        </v-col>
      </v-row>
    </div>

    <v-skeleton-loader
      v-if="false"
      v-bind="attrs"
      type="list-item-avatar-three-line"
      class="pitch-lists"
    >
    </v-skeleton-loader>

    <!-- <v-card
      class="mt-4 py-2 px-4 rounded-xl"
      style="cursor: pointer"
      v-for="item in postedIdeas.customer_pitches"
      :key="item.id"
      flat
    >
    <v-row class="d-flex align-center">
      <v-col cols="2" sm="1">
        <v-avatar>
          <img :src="item.customer.profile_image_url" alt="profile-image" />
        </v-avatar>
      </v-col>

      <v-col cols="8" sm="5">
        <div class="ml-3 ml-md-0">
          <div class="title-text font-weight-light d-flex align-center">
            {{ item.customer.name }}
            <div>
              <v-tooltip right color="#000" content-class="right-tooltip">
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    width="40px"
                    height="34px"
                    :src="require('@/assets/img/fish-facing-left.png')"
                    contain
                    v-bind="attrs"
                    v-on="on"
                  ></v-img>
                </template>
                <span> Big Fish </span>
              </v-tooltip>
            </div>
          </div>
          <div class="d-flex">
            <p class="text-caption mb-0">My location:</p>
            <div
              class="custom-chip ml-2 rounded-pill px-3 font-weight-regular"
            >
              <span class="mr-1">🌏</span>
              {{ item.location }}
            </div>
          </div>

          <div class="d-flex mt-2">
            <div class="text-caption">
              <p class="mb-0">My budget:</p>
              <p class="mb-0">(optional)</p>
            </div>
            <div
              v-if="item.potential_yearly_revenue.length > 1"
              class="custom-chip ml-2 px-3"
            >
              💰
              <strong> {{ item.potential_yearly_revenue }}</strong>
            </div>
          </div>
        </div>
      </v-col>

      <v-col cols="8" sm="5">
        <p class="mb-1 text-caption">I'm interested in:</p>
        <v-chip
          class="mb-1"
          color="#FAEC03"
          small
          style="border: 1px solid black"
        >
          Partnership with Ecommerce shop
        </v-chip>
        <v-chip color="#FAEC03" small style="border: 1px solid black">
          Partnership with Ecommerce shop
        </v-chip>
      </v-col>
      <v-col cols="2" sm="1">
        <v-btn fab depressed color="#1C4570" dark>
          <v-icon> mdi-email </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-card>  -->

    <!-- IDEA LIST -->
    <v-card
      v-if="item.show_profile_in_premium_club_search"
      class="mt-4 py-2 px-4 rounded-xl"
      style="cursor: pointer"
      v-for="item in FilteredIdeas"
      :key="item.id"
      flat
    >
      <v-row class="d-flex align-center">
        <v-col cols="12" sm="3">
          <!-- CUSTOMER -->
          <v-row class="align-center">
            <v-col sm="3" style="flex-grow: 0; max-width: none">
              <!-- :src="idea.customer.profile_image_url" -->
              <v-avatar>
                <img
                  :src="item.profile_image_url"
                  alt="profile-image"
                  width="50px"
                />
              </v-avatar>
            </v-col>
            <v-col>
              <v-row>
                <div class="ml-3 ml-md-0 d-flex align-center">
                  <div class="title-text font-weight-bold pr-3">
                    {{ item.name }}
                  </div>
                  <img
                    class="pr-3"
                    :src="require('@/assets/img/fish4-gray.svg')"
                    alt="profile-image"
                    width="30px"
                  />
                </div>
              </v-row>
            </v-col>
          </v-row>

          <div class="pt-3">
            <v-row class="pa-1 d-sm-flex">
              <div class="custom-chip mr-2">
                <strong class="worldwide-logo-alignment">
                  <!-- <countryFlag
                    style="margin-top: -8px"
                    size="normal"
                    :country="countryToAlpha2(idea?.location)"
                  /> -->
                  🌏
                  <!-- <span>{{ idea?.location }}</span> -->
                  <span>Dubai</span>
                </strong>
              </div>
              <div class="custom-chip-twitter mr-1">
                <a
                  href="https://www.twitter.com/twoguys.app"
                  target="blank"
                  style="text-decoration: none"
                >
                  <div class="worldwide-logo-alignment">
                    <v-icon style="color: white">mdi-twitter</v-icon>
                    <span style="color: white">@Mention</span>
                  </div>
                </a>
              </div>
            </v-row>
          </div>
        </v-col>

        <!-- <v-col cols="8" sm="5">
          <div class="ml-3 ml-md-0">
            <div class="title-text font-weight-light d-flex align-center">
              {{ item.name }}
              <div>
                <v-tooltip right color="#000" content-class="right-tooltip">
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      width="34px"
                      height="34px"
                      :src="require('@/assets/img/fish4-gray.svg')"
                      style="margin-left: 10px"
                      contain
                    ></v-img>
                  </template> -->
        <!-- <span v-if="item.fish_type == 'big'"> Big Fish </span>
                  <span v-if="item.fish_type == 'medium'"> Small Fish </span>
                  <span v-if="item.fish_type == 'big'"> Medium Fish </span> -->
        <!-- </v-tooltip>
              </div>
            </div>
            <div class="d-flex">
              <div class="custom-chip ml-2 px-3 font-weight-regular">
                <span class="mr-1">🌏 Dubai </span> -->
        <!-- {{ item.locations }} -->
        <!-- </div>
            </div>
            <div class="d-flex">
              <div class="custom-chip ml-2 px-3 font-weight-regular">
                <span class="mr-1">
                  <v-icon class="mr-1">mdi-twitter</v-icon>
                  @Mention -->
        <!-- </span> -->
        <!-- {{ item.locations }} -->
        <!-- </div>
            </div>
          </div>
        </v-col> -->

        <v-col cols="16" sm="6">
          <p class="style-msg-body">
            Partnership with Ecommerce shop Partnership with Ecommerce shop A
            long message that cover it form goingt ogo sdhkdsf sdf sdfksdhfkh
          </p>
        </v-col>

        <v-col cols="12" sm="3">
          <!-- REPORT BUTTON -->
          <v-row
            class="pa-2"
            v-bind:class="
              $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
                ? 'd-inline-flex'
                : ''
            "
          >
            <v-btn
              color="#9E9E9E"
              class="ml-auto mr-3 report-button"
              depressed
              dark
              @click="onReportClick(item)"
            >
              <v-icon>mdi-flag-outline</v-icon>
              {{ $t("report") }}
            </v-btn>
          </v-row>
          <!-- SEND MESSAGE BUTTON WITH RESPONSE BOX -->
          <v-row
            v-bind:class="
              $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
                ? 'd-inline-flex'
                : ''
            "
            class="pa-2"
          >
            <v-btn
              @click="emailBtnClicked(item.email)"
              :loading="emailBtnLoading === item.email"
              color="#0C90F8"
              class="ml-auto mr-3 apply-button"
              depressed
              dark
              v-show="item.email !== clickedEmail"
            >
              <!-- <v-icon>mdi-send-outline</v-icon> -->
              <img
                class="pr-3"
                :src="require('@/assets/img/send-icon.svg')"
                alt="profile-image"
                width="30px"
              />
              {{ $t("applyNow") }}
            </v-btn>
            <p
              class="email-bg"
              v-if="!emailBtnLoading && clickedEmail"
              v-show="item.email === clickedEmail"
            >
              {{ clickedEmail }}
            </p>
          </v-row>
          <!-- <v-btn
            fab
            depressed
            color="#1C4570"
            dark
            :loading="emailBtnLoading"
            @click="emailBtnClicked(item.email)"
          >
            <v-icon> mdi-email </v-icon>
          </v-btn> -->
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<router lang="yaml">
path: /search-club
name: search-club
</router>

<script>
import { call, get } from "vuex-pathify";
import PitchMyIdea from "~/pages/PitchMyIdea.vue";
import PitchIdea from "~/pages/PitchIdea/index.vue";
import Swal from "sweetalert2";

export default {
  // middleware: 'auth',

  components: {
    PitchMyIdea,
    PitchIdea,
  },

  data() {
    return {
      postedIdeas: {
        today: null,
        total_pitches: null,
        today_total_pitches: null,
        customer_pitches: [],
      },

      locationsFilter: ["Worldwide"],
      isLoggedIn: false,
      selectedLocation: "Worldwide",
      userFishValue: "",
      fishValue: "Small",
      searchValue: "",
      currentCountry: "",
      emailBtnLoading: false,
      clickedEmail: "",
      clientIpAddress: "",
      clientCurrentState: "",
      locations: [
        {
          icon: require("@/assets/img/my-location.png"),
          title: "All",
        },
        {
          icon: require("@/assets/img/world.png"),
          title: "Worldwide",
        },
        {
          icon: require("@/assets/img/north-america.png"),
          title: "North America",
        },
        {
          icon: require("@/assets/img/europe.png"),
          title: "Europe",
        },
      ],
      selectedClub: "Small",
      searchClubData: [],
      // searchClubData: [
      //   {
      //     username: 'UserName1111',
      //     fish: 'Big, All',
      //     email: 'username1111@gmail.com',
      //     locations: 'Berline + Germany Worldwide',
      //     budget: '$40k - 80k',
      //     img: '/avatar.png',
      //     interestedIn: [
      //       { interest: 'Partnership with ECommerce shop' },
      //       { interest: 'Partnership in realestate in Taiwan' },
      //     ]
      //   },
      //   {
      //     username: 'UserName2222',
      //     fish: 'Small, All',
      //     email: 'username2222@gmail.com',
      //     locations: 'Berline + Germany Worldwide',
      //     budget: '$20k - 40k',
      //     img: '/avatar.png',
      //     interestedIn: [
      //       { interest: 'Partnership with ECommerce shop' },
      //       { interest: 'Partnership in realestate in Taiwan' },
      //     ]
      //   },
      //   {
      //     username: 'UserName333',
      //     fish: 'Medium, All',
      //     email: 'username333@gmail.com',
      //     locations: 'Chicago + United States of America(USA) Worldwide',
      //     budget: '$10k - 30k',
      //     img: '/avatar.png',
      //     interestedIn: [
      //       { interest: 'Partnership with ECommerce shop' },
      //       { interest: 'Partnership in realestate in Taiwan' },
      //     ]
      //   },
      //   {
      //     username: 'UserName3333',
      //     fish: 'Small, All',
      //     email: 'username3333@gmail.com',
      //     locations: 'Atlanta + United States of America(USA) Worldwide',
      //     budget: '$40k - 80k',
      //     img: '/avatar.png',
      //     interestedIn: [
      //       { interest: 'Partnership with ECommerce shop' },
      //       { interest: 'Partnership in realestate in Taiwan' },
      //     ]
      //   },
      //   {
      //     username: 'UserName4444',
      //     fish: 'Medium, All',
      //     email: 'username4444@gmail.com',
      //     locations: 'London + United Kingdom(UK) Worldwide',
      //     budget: '$50k - 100k',
      //     img: '/avatar.png',
      //     interestedIn: [
      //       { interest: 'Partnership with ECommerce shop' },
      //       { interest: 'Partnership in realestate in Taiwan' },
      //     ]
      //   },
      //   {
      //     username: 'UserName5555',
      //     fish: 'Big, All',
      //     email: 'username5555@gmail.com',
      //     locations: 'Cambridge + United Kingdom(UK) Worldwide',
      //     budget: '$100k - 150k',
      //     img: '/avatar.png',
      //     interestedIn: [
      //       { interest: 'Partnership with ECommerce shop' },
      //       { interest: 'Partnership in realestate in Taiwan' },
      //     ]
      //   }
      // ]
    };
  },

  computed: {
    clubs() {
      if (this.userFishValue == "Big, All") {
        return [
          {
            id: 1,
            name: "All",
          },
          {
            id: 2,
            name: "Small",
          },
          {
            id: 3,
            name: "Medium",
          },
          {
            id: 4,
            name: "Big",
          },
        ];
      } else if (this.userFishValue == "Medium, All") {
        return [
          {
            id: 1,
            name: "Small",
          },
          {
            id: 2,
            name: "Medium",
          },
        ];
      } else if (this.userFishValue == "Small, All") {
        return [
          {
            id: 1,
            name: "Small",
          },
        ];
      }
    },

    searchClubFilter() {
      return this.searchClubData.filter((idea) => {
        //
        if (!!idea.fish_type) {
          return this.selectedClub
            .toLowerCase()
            .split(" ")
            .every((v) => idea.fish_type.toLowerCase().includes(v));
        }
      });
    },

    FilteredIdeas() {
      console.log(this.fishValue);
      let tempIdeas = this.searchClubData;

      this.selectedClub = this.fishValue;

      tempIdeas.filter((item) => {
        if (item.show_profile_in_premium_club_search) {
          console.log("postedIdeas: ", item);
        }
      });

      if (this.searchValue != "" && this.searchValue) {
        tempIdeas = tempIdeas.filter((item) => {
          return item.name
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }

      if (this.fishValue != "" && this.fishValue) {
        tempIdeas = tempIdeas.filter((item) => {
          return item.fish_type
            .toUpperCase()
            .includes(this.fishValue.toUpperCase());
        });
      }

      // if (this.currentCountry != "" && this.currentCountry) {
      //   tempIdeas = tempIdeas.filter((item) => {
      //     return item.locations
      //       .toUpperCase()
      //       .includes(this.currentCountry.toUpperCase());
      //   });
      // }

      return tempIdeas;
    },
  },
  created() {
    fetch("https://api.ipify.org?format=json")
      .then((x) => x.json())
      .then(({ ip }) => {
        this.clientIpAddress = ip;
      });
    fetch(
      `https://api.ipregistry.co/${this.clientIpAddress}?key=0xjh6xmh6j0jwsy6`
    )
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        this.locations[0].title = payload.location.country.name;
        this.clientCurrentState = payload.location.country.name;
      });
    this.$axios.get(`customers`).then((response) => {
      console.info(response.data);
      if (response.data.success) {
        this.searchClubData = response.data.customers;
        // this.premiumClub = response.data.customer.customer_premium_data[0];
      }
    });
  },
  methods: {
    getAllPitches(locationFilters) {
      let user = this.$auth.$storage.getUniversal("user");
      this.userFishValue = user.fish_type;
      this.$axios
        .$get("/pitches", {
          params: {
            locations_filter: locationFilters,
            ...(user && { customer_id: user.customer_id }),
          },
        })
        .then((data) => {
          console.info(data);
          this.postedIdeas = data;
        });
    },
    emailBtnClicked(email) {
      this.emailBtnLoading = email;
      this.clickedEmail = "";
      setTimeout(() => {
        this.emailBtnLoading = false;
        this.clickedEmail = email;
        window.location.href = `mailto:${email}`;
      }, 3000);
    },
    onReportClick(item) {
      Swal.fire({
        icon: "warning",
        title: "Are you sure you want to report this?",
        showCancelButton: true,
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios
            .$post(`report/pitch/${item.id}`)
            .then(async (response) => {
              if (response.success) {
                Swal.fire(
                  "Reported!",
                  "Pitch sucessfully reported.",
                  "success"
                );
                await new Promise((resolve) => setTimeout(resolve, 1000));
                window.location.reload(true);
              }
            });
        }
      });
    },
  },

  watch: {
    locationsFilter: {
      handler(val) {
        if (val.length < 1) {
          this.getAllPitches("USA,Germany,Worldwide");
          return;
        }
        this.getAllPitches(val.toString());
      },
      immediate: true,
    },
  },

  async fetch() {
    this.getAllPitches(this.locationsFilter.toString());
    this.isLoggedIn = this.$auth.$storage.getUniversal("isLoggedIn");
  },
};
</script>

<style>
.email-bg {
  background-color: #f7f7f7;
  padding: 6px;
  overflow: hidden;
  border-radius: 10px;
}

.style-msg-body {
  position: relative;
  color: black;
  background-color: #f7f7f7;
  margin-top: 10px;
  padding: 20px;
  border-radius: 10px;
}

.style-msg-body::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #f7f7f7;
}

.dark-btn-text {
  background-color: #fff;
  color: #000;
  mix-blend-mode: screen;

  border: none;
  padding: 6px 8px;
  border-radius: 24px;
  font-size: 12px;
  cursor: pointer;
  width: 100%;
  font-family: "Nunito-Bold", sans-serif !important;
}

.font-bold,
.apply-btn {
  font-family: "Nunito-Bold", sans-serif !important;
}

.title-text {
  font-size: 22px !important;
  line-height: 1.2;
  white-space: nowrap;
}

.custom-chip {
  font-size: 0.75em;
  overflow: hidden;
  white-space: nowrap;
  max-width: 16em;
  text-overflow: ellipsis;

  background: #ddd;
  padding: 4px;
  padding-top: 5px;
  text-transform: uppercase;
  border-radius: 3px;
  font-weight: 900;
  color: #0f1115;
  max-height: 24px;
}

.custom-chip-twitter {
  font-size: 0.75em;
  overflow: hidden;
  white-space: nowrap;
  max-width: 16em;
  text-overflow: ellipsis;
  background: #6ebff1;
  /* padding: 2px; */
  padding-left: 2px;
  padding-right: 4px;
  border-radius: 10px;
  font-weight: 900;
  color: #ffffff;
  max-height: 24px;
}

.right-tooltip::after {
  content: " ";
  position: absolute;
  top: 50%;
  left: -12%;
  /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

form.nosubmit {
  border: none;
  padding: 0;
}

input.nosubmit {
  /* border: 1px solid #555; */
  width: 100%;
  padding: 9px 4px 9px 40px;
  outline: none;
  border-radius: 20px;
  background: #fff
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 13px center;
}

@media screen and (max-width: 960px) {
  .title-text {
    font-size: 14px !important;
    white-space: normal;
  }
}
</style>
