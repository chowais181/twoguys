<template>
  <v-app>
    <BillingDialog
      :isDialogOpen="isBillingDialogOpen"
      @close="isBillingDialogOpen = false"
    />
    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      class="elevation-0 mt-n8"
      ref="drawer"
      color="primary"
      :mini-variant.sync="mini"
      floating
      clipped
      height="102vh"
    >
      <template v-slot:prepend>
        <div
          class="d-flex align-center justify-center"
          style="background: #f3f7fa"
        >
          <v-img
            max-height="60"
            max-width="60"
            :src="require('@/assets/img/2guys-logo.svg')"
            class="mb-6 mr-2"
            contain
            v-if="mini"
          ></v-img>

          <v-img
            max-height="80"
            max-width="160"
            :src="require('@/assets/img/2guys-logo-font.svg')"
            class="mb-6 mr-2 ml-n8"
            contain
            v-else
          ></v-img>
        </div>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index + Math.random()"
          link
          :to="item.href"
          active-class="active-list"
          class="mb-4"
        >
          <v-list-item-icon class="ml-1">
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ml-n5 white--text">
            <v-list-item-title class="text-subtitle-2">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <template #append>
        <div>
          <v-list>
            <v-list-item link active-class="active-list-append" to="">
              <v-list-item-icon class="ml-1">
                <v-icon color="#fff">mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="ml-n5">
                <v-list-item-title class="text-subtitle-2 white--text"
                  >Settings</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider class="mb-3"></v-divider>
          <div class="ml-8" v-if="mini === false">
            <p class="text-caption white--text">Feedback</p>
            <p class="text-caption white--text">Terms & Conditions</p>
            <p class="text-caption white--text">Support</p>
          </div>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="primary" elevation="0" class="px-6 pb-4 white--text" app>
      <v-app-bar-nav-icon dark @click="handleDrawerCollapse" />
      <v-spacer></v-spacer>

      <v-menu offset-y rounded="lg">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            style="text-transform: capitalize"
            fab
            icon
            class="ml-1 mr-2"
            color="white"
          >
            <v-badge color="green" dot overlap bordered>
              <v-icon> mdi-bell-outline </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <!-- <v-list nav dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, index) in items"
              :key="index + Math.random()"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list> -->
      </v-menu>

      <v-divider
        vertical
        inset
        class="mx-4"
        style="border-color: white"
      ></v-divider>

      <div>
        <span class="mr-2" v-if="$vuetify.breakpoint.mdAndUp">
          {{ user.username }}
        </span>
        <v-avatar color="#03b6df " size="36">
          <span class="white--text text-body-1">{{ getInitials(user) }}</span>
        </v-avatar>
      </div>

      <v-menu offset-y rounded="lg">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            style="text-transform: capitalize"
            fab
            icon
            class="mr-2"
            color="white"
          >
            <v-icon> mdi-dots-vertical </v-icon>
          </v-btn>
        </template>
        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="onLogoutClick"
                  >Logout</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="background pr-4">
      <v-container class="px-4 pt-4 pl-8 d-flex justify-center" fluid>
        <client-only>
          <nuxt />
        </client-only>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { call, get } from "vuex-pathify";
import userApi from "~/api/User";

export default {
  data() {
    return {
      sidebarMenu: true,
      selectedItem: "",
      isBillingDialogOpen: false,
      mini: false,
      dialog: false,
      items: [
        {
          title: "Dashboard",
          href: "/admin/dashboard",
          icon: "mdi-view-dashboard-outline",
        },
        {
          title: "Pitches",
          href: `/admin/pitches`,

          icon: "mdi-account-group",
        },
      ],

      account: [
        {
          text: "Logout",
        },
      ],

      user: {
        email: "",
        name: "Jhon",
      },
    };
  },

  computed: {},

  methods: {
    async onLogoutClick() {
      this.$auth.$storage.removeUniversal("admin")
      this.$auth.$storage.removeUniversal("isAdminLoggedIn")

      this.$router.push({
        path: this.localePath("/admin/login"),
      })
    },

    getInitials(user) {
      // let initials = user.username.split(" ");
      // let initials = user.username;

      // if (initials.length > 1) {
      //   initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      // } else {
      //   initials = user.username.substring(0, 2);
      // }

      return "";
    },
    handleDrawerCollapse() {
      this.mini = !this.mini;
    },
  },

  async mounted() {
    let isAdminLoggedIn = this.$auth.$storage.getUniversal("isAdminLoggedIn")
    
    if(isAdminLoggedIn){
      this.$router.push({
        path: this.localePath("/admin/dashboard"),
      })
    }else{
      this.$router.replace({
        path: this.localePath("/admin/login"),
      })
    }

  },
};
</script>

<style scoped>
.background {
  /* background-image: url("~/assets/bg1.png"); */
  background-color: #f3f7fa;
}

.active-list {
  border-left: 2px solid white;

  background-image: linear-gradient(
    to right,
    rgba(237, 237, 237, 0.885) -180%,
    rgba(255, 255, 255, 0) 30%
  );
  position: relative;
}

.active-list-append {
  border-left: 2px solid #808080;

  background-image: linear-gradient(
    to right,
    rgb(24, 23, 23) -180%,
    rgba(255, 255, 255, 0) 30%
  );
  position: relative;
}

.active-list:after,
.active-list-append:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-top: 3px solid transparent;

  border-bottom: 3px solid transparent;
  width: 0;
}

.active-list:after {
  border-left: 3px solid white;
}

.active-list-append:after {
  border-left: 3px solid #808080;
}

.bottom-drawer-list-text-color {
  color: #808080;
}

@media screen and (max-width: 1264px) {
  .bottom-drawer-list-text-color {
    color: #fff;
  }

  .active-list-append::after {
    border-left: 3px solid white;
  }

  .active-list-append {
    border-left: 2px solid white;

    background-image: linear-gradient(
      to right,
      rgba(237, 237, 237, 0.885) -180%,
      rgba(255, 255, 255, 0) 30%
    );
    position: relative;
  }
}
</style>
