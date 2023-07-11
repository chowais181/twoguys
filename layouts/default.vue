<script>
import { call, get } from "vuex-pathify";
import userApi from "~/api/User";
import PitchMyIdea from "~/pages/PitchMyIdea.vue";

export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    };
  },
  components: {
    PitchMyIdea,
  },
  data: () => ({
    sidebarMenu: false,
    customerId: "",
    selectedItem: "",
    showPitchMyIdeaDialog: false,
    has_fish: "",
    has_trial: "",
    showStartFreeTrial: false,
    showSearchClubButton: false,
    selectedLanguage: {
      id: 0,
      country: "us",
      text: "English",
    },
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
    dialog: false,
    items: [
      {
        title: "Find Partner",
        href: "/pitch-posts",
      },
      {
        title: "Post My Idea",
        href: `/pitch-my-idea`,
        icon: "mdi-credit-card-outline",
      },

      {
        title:
          'Messages <span class="text-center rounded red white--text pa-1 ml-1 " >0</span>',
        href: `/messages`,
      },
    ],
    account: [
      {
        text: "My Profile",
      },

      {
        text: "Logout",
      },
    ],
    user: null,
    isPostMyIdeaVisible: false,
    isMessagesVisible: false,
    isAccountOptionVisible: false,
    isSignInVisible: false,
    isSignUpVisible: false,
  }),

  computed: {
    selectedLanguageNav() {
      return this.selectedLanguage.text;
    },
  },

  methods: {
    // fetchSettings: call("setting/findItem"),

    async onLogoutClick() {
      this.$auth.$storage.removeUniversal("user");
      this.$auth.$storage.removeUniversal("isLoggedIn");
      // await this.$auth.logout();
      this.$router.push({
        path: this.localePath("/login"),
      });
    },
    onSignInClick() {
      this.$router.push({
        path: this.localePath("/login"),
      });
    },
    onBlogClick() {
      this.$router.push({
        path: this.localePath("/blogs"),
      });
    },
    onRegisterInClick() {
      this.$router.push({
        path: this.localePath("/register"),
      });
    },

    onCookiesClick() {
      this.$router.push({
        path: this.localePath("/cookies-notice"),
      });
    },

    onPrivacyPolicyClick() {
      this.$router.push({
        path: this.localePath("/terms-of-service-and-privacy-policy"),
      });
    },

    onImprintClick() {
      this.$router.push({
        path: this.localePath("/imprint"),
      });
    },

    onSearchClick() {
      this.$router.push({
        path: this.localePath("/search-club"),
      });
    },

    async onPitchMyIdeaClick() {
      if (!this.$auth.$storage.getUniversal("isLoggedIn")) {
        this.$router.push({
          path: this.localePath("/login"),
        });
        return;
      }

      let response = await this.$refs.pitchMyIdea.checkCustomerPitchLimit();

      if (response.success && response.can_post_pitch) {
        this.showPitchMyIdeaDialog = !this.showPitchMyIdeaDialog;
        return;
      }
    },

    onMessagesClick() {
      this.$router.push({
        path: this.localePath("/messages"),
      });
    },

    onDashboardClick() {
      this.$router.push({
        path: this.localePath("/dashboard"),
      });
    },
    onPricingClick() {
      if (!this.$auth.$storage.getUniversal("isLoggedIn")) {
        this.$router.push({
          path: this.localePath("/register"),
        });
      } else {
        this.$router.push({
          path: this.localePath("/pricing"),
        });
      }
    },

    onProfileClick() {
      let customerId = this.$auth.$storage.getUniversal("user").customer_id;

      this.$router.push({
        path: this.localePath("/profile"),
        query: {
          id: customerId,
        },
      });
    },

    onFindPartnerClick() {
      this.$router.push({
        path: this.localePath("/"),
      });
    },

    toggleDrawer() {
      this.sidebarMenu = !this.sidebarMenu;
    },

    checkUserLogin() {
      let isLoggedIn = this.$auth.$storage.getUniversal("isLoggedIn");
      if (isLoggedIn) {
        this.user = this.$auth.$storage.getUniversal("user");
        this.customerId = this.$auth.$storage.getUniversal("user").customer_id;
        this.isPostMyIdeaVisible = true;
        this.isMessagesVisible = true;
        this.isAccountOptionVisible = true;
        this.isSignInVisible = false;
        this.isSignUpVisible = false;
        this.showStartFreeTrial = false;
        this.showSearchClubButton = true;
      } else {
        this.isPostMyIdeaVisible = true;
        this.isMessagesVisible = false;
        this.isAccountOptionVisible = false;
        this.isSignInVisible = true;
        this.isSignUpVisible = true;
        this.showStartFreeTrial = true;
        this.showSearchClubButton = false;
      }
    },

    onSelectedLanguageClick(value) {
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
    },
  },

  async fetch() {
    this.checkUserLogin();
    let isLoggedIn = this.$auth.$storage.getUniversal("isLoggedIn");
    // console.info("isLoggedIn", isLoggedIn);
  },
  created() {
    // this.has_trial = this.$auth.$storage.getUniversal("user").has_trial;
    // this.has_fish = this.$auth.$storage.getUniversal("user").has_fish;
    // this.has_trial = true;
    // this.has_fish = "BIG";
    this.$axios.get(`/customers/${this.customerId}`).then((response) => {
      // console.info(response.data);
      if (response.data.success) {
        this.has_fish = response.data.customer.has_fish;
        this.has_trial = response.data.customer.has_trial;
      }
    });
  },

  watch: {
    $route: {
      handler(val) {
        // console.info("Loggg", this.$auth.$storage.getUniversal("isLoggedIn"));
        // console.log("route changed", this.$route);
        this.checkUserLogin();
        this.setPreferredLanguage();
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <v-app>
    <PitchMyIdea
      ref="pitchMyIdea"
      :isDialogOpen="showPitchMyIdeaDialog"
      @close="showPitchMyIdeaDialog = false"
      :item="{}"
    />

    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      class="elevation-0 pl-6"
      color="#f2f2f2"
      ref="drawer"
      clipped
      v-if="$vuetify.breakpoint.smAndDown"
      right
    >
      <!-- <div class="d-flex align-center justify-center">
          <v-img
            max-height="80"
            max-width="160"
          :src="require('@/assets/img/2guys-logo-font.svg')"
          class="mt-8 mr-2 ml-n8"
          contain
        ></v-img>
      </div> -->

      <v-list class="mx-3 mt-12">
        <v-list-item v-if="isPostMyIdeaVisible" @click="onPitchMyIdeaClick">
          <v-list-item-content class="list-items">
            <v-list-item-title class="text-subtitle-1">
              {{ $t("postMyIdea") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item
            active-class="active-list"
            v-if="isMessagesVisible"
            @click="onMessagesClick"
          >
            <v-list-item-content class="list-items">
              <v-list-item-title class="text-subtitle-2">
                <div class="py-2">
                  Messages
                  <span
                    class="text-center rounded white--text pa-1 ml-1"
                    style="background-color: #e53935"
                    >0</span
                  >
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        {{ customerId }}
        <v-list-item @click="onSignInClick" v-if="isSignInVisible">
          <v-list-item-content class="list-items">
            <v-btn color="primary" large block> Sign Up / Log In </v-btn>
            <!-- <v-list-item-title class="text-subtitle-1">
               
                </v-list-item-title> -->
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list class="mx-3" v-if="isAccountOptionVisible">
        <v-list-group :value="true">
          <template v-slot:activator>
            <v-list-item-title class="text-subtitle-1 primary--text">
              Account
            </v-list-item-title>
          </template>
          <v-list>
            <v-list-item class="pl-8" link>
              <v-list-item-title
                class="ml-3 text-subtitle-1"
                @click="onDashboardClick"
              >
                {{ $t("dashboard") }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="pl-8" link>
              <v-list-item-title
                class="ml-3 text-subtitle-1"
                @click="onProfileClick"
              >
                {{ $t("myProfile") }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item link @click="onLogoutClick">
              <v-list-item-content class="list-items">
                <v-btn color="primary" large block>
                  {{ $t("logout") }}
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="#f3f7fa"
      elevation="0"
      class="pb-4 appbar-style"
      :height="$vuetify.breakpoint.smAndDown ? '90px' : '140px'"
    >
      <v-img
        :max-height="$vuetify.breakpoint.smAndDown ? '60' : '100'"
        max-width="140"
        :src="require('@/assets/img/twoguysapplogo.svg')"
        contain
        @click="onFindPartnerClick"
        style="cursor: pointer"
      >
      </v-img>

      <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>
      <v-app-bar-nav-icon
        @click="toggleDrawer"
        v-if="$vuetify.breakpoint.smAndDown"
        class="text-right"
        color="primary"
      />

      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>

      <div
        v-show="$vuetify.breakpoint.mdAndUp"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <!-- <div> -->

        <v-btn
          v-if="isPostMyIdeaVisible"
          class="mr-2 gray--text text-body-1"
          color="red"
          light
          @click="onPitchMyIdeaClick"
          large
          dark
          depressed
        >
          {{ $t("postMyIdea") }}
        </v-btn>

        <!-- <v-btn
            outlined
            class="mr-2 gray--text text-body-1"
            color="primary"
            light
            @click="onMessagesClick"
            v-if="isMessagesVisible"
            large
          >
            <div class="blue-grey--text d-flex align-center">
              Messages
              <span
                class="text-center rounded white--text pa-1 ml-1"
                style="background-color: #e53935; padding-top: 12px"
                >0</span
              >
            </div>
          </v-btn> -->

        <!-- <v-tooltip
            bottom
            max-width="180px"
            color="#000"
            content-class="bottom-tooltip"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                class="mr-2"
                large
                @click="onSearchClick"
              >
                Search
              </v-btn>
            </template>
            <span>
              Welcome to the premium Club. Here you can find people in your area
              who want to do business.
            </span>
          </v-tooltip> -->

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <button
                href="#"
                v-show="showSearchClubButton"
                class="top-nav-search-button mr-2"
                @click="onSearchClick"
              >
                <span class="top"
                  ><img src="~/assets/img/fish4.svg" /> CLUB</span
                >
                <span class="bottom">SEARCH</span>
              </button>
            </span>
          </template>
          <span>
            Welcome to the premium Club. <br />Here you can find people in
            your<br />
            area who want to do business.
          </span>
        </v-tooltip>

        <v-menu v-if="isAccountOptionVisible" offset-y rounded="lg">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              outlined
              class="mr-2 text-body-1"
              color="primary"
              light
              large
            >
              Account
              <v-icon right color="primary">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item @click="onDashboardClick">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon color="primary">mdi-view-dashboard</v-icon>
                    {{ $t("dashboard") }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="onProfileClick">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon color="primary">mdi-account</v-icon
                    >{{ $t("myProfile") }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content @click="onPricingClick">
                  <v-list-item-title>
                    <v-icon color="primary">mdi-currency-usd</v-icon>
                    Pricing
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="onLogoutClick">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon color="primary">mdi-logout</v-icon
                    >{{ $t("logout") }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <v-btn
          outlined
          class="mr-2 gray--text text-body-1"
          color="black"
          style="background: white"
          @click="onSignInClick"
          large
          v-if="isSignInVisible"
        >
          <!-- {{ $t("signIn") }} -->
          Log In
        </v-btn>

        <!-- <v-btn
            class="mr-2 gray--text text-body-1 rounded"
            @click="onRegisterInClick"
            color="primary"
            light
            large
            v-if="isSignUpVisible"
          >
            Register
          </v-btn> -->
        <div v-show="showStartFreeTrial">
          <v-btn
            class="mr-2 gray--text text-body-1 rounded"
            color="primary"
            light
            large
            @click="onPricingClick"
          >
            Start Free Trial
          </v-btn>
        </div>
        <!-- <v-btn color="#fff" class="ma-2 primary--text rounded" large>
            <v-icon left dark>
              mdi-cloud-upload
            </v-icon>
            CLUB
          
          </v-btn> -->
        <!-- <v-btn
            outlined
            class="mr-2 gray--text text-body-1"
            color="black"
            style="background: white"
            @click="onBlogClick"
            large
          >
            Blog
          </v-btn> -->

        <v-menu offset-y rounded="lg">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              depressed
              color="transparent"
              return-value="text"
              class="mr-2"
              fab
            >
              <div class="d-flex align-center">
                <countryFlag
                  class="mt-n2"
                  :country="selectedLanguage.country"
                />
              </div>
            </v-btn>

            <v-btn
              depressed
              icon
              v-bind="attrs"
              v-on="on"
              class="d-flex d-sm-none"
            >
              <span class="flag-icon flag-icon-au flag-round"> </span>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item-group
              v-for="(item, i) in supportedLanguages"
              :key="i"
              color="primary"
            >
              <v-list-item @click="onSelectedLanguageClick(item)">
                <countryFlag class="mr-1 mt-n2" :country="item.country" />
                <v-list-item-content> </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main class="background">
      <v-container
        class="pt-md-6 pb-16 d-flex align-center justify-center pages"
        fluid
        fill-height
      >
        <client-only>
          <nuxt />
        </client-only>
      </v-container>
    </v-main>

    <v-footer padless style="background-color: #000" min-height="200px" dark>
      <v-container>
        <v-row align="center">
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-img
              max-width="100"
              max-height="100"
              contain
              :src="require('@/assets/img/2guys-logo.svg')"
              class="rounded-circle mr-4"
            ></v-img>
            <div class="pl-2">
              <div
                style="cursor: pointer"
                class="text-subtitle-2 mb-md-1"
                @click="onCookiesClick"
              >
                Cookies Notice
              </div>
              <div
                style="cursor: pointer"
                class="text-subtitle-2 mb-md-1"
                @click="onPrivacyPolicyClick"
              >
                Privacy Policy
              </div>
              <!-- <div
                  style="cursor: pointer"
                  class="text-subtitle-2 mb-md-1"
                  @click="onImprintClick"
                >
                  Imprint
                </div> -->
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <div
              class="pa-2 d-flex justify-center justify-md-end align-center"
              max-width="200"
            >
              <div class="mr-2 text-subtitle-2 text-md-body-1">Follow us:</div>
              <a
                href="https://www.instagram.com/twoguys.app"
                target="blank"
                style="text-decoration: none"
              >
                <v-icon class="mr-2">mdi-instagram</v-icon>
              </a>
              <a
                href="https://twitter.com/twoguysapp"
                target="blank"
                style="text-decoration: none"
              >
                <v-icon class="mr-1">mdi-twitter</v-icon>
              </a>
              <a href="https://www.tiktok.com/@twoguysapp" target="blank">
                <v-img
                  contain
                  max-height="21px"
                  max-width="21px"
                  :src="require('@/assets/img/tiktok.svg')"
                ></v-img>
              </a>
            </div>
          </v-col>
        </v-row>

        <div class="text-center text-subtitle-2 text-md-body-1">
          Made with <v-icon color="red">mdi-heart</v-icon>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
.background {
  /* background-image: url("~/assets/background.svg"); */
  background-color: #f3f7fa;
  /* background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  overflow: hidden; */
}

.select {
  padding: 8px 0;
}

.list-items {
  color: #4f4fff;
}

.active-list {
  background-color: #4f4fff;

  .list-items {
    color: white;
  }
}

.appbar-style {
  padding: 0;
}

.pages {
  padding: 0 10px;
}

a:hover {
  text-decoration: none;
}

.bottom-tooltip::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

@media screen and (min-width: 1264px) {
  .appbar-style {
    padding: 0px 150px;
  }

  .pages {
    padding: 0 232px;
  }
}

.top-nav-search-button {
  background: #4f4fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 3px;
  border-radius: 12px;
  width: 150px;
  height: 45px;
  text-decoration: none;
  letter-spacing: 5px;
}

.top-nav-search-button span.top img {
  height: 20px;
  padding-right: 7px;
}

.top-nav-search-button span.top {
  height: 30%;
  display: flex;
  align-items: center;
  font-size: 10px;
}

.top-nav-search-button span.bottom {
  background: #fff;
  font-size: small;
  width: 99%;
  color: #4f4fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68%;
  border-radius: 1px 1px 6px 6px;
  font-weight: bold;
}

.top-nav-search-button:hover span.bottom {
  background: #f1f1f1;
  transition: all 0.2s;
}
</style>
