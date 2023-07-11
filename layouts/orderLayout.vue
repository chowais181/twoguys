<template>
  <v-app v-if="isMounted">
    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
      class="elevation-1"
      color="#1a263a"
      dark
      width="220"
    >
      <v-list>
        <v-list-item>
          <v-app-bar-nav-icon
            @click="toggleMini = !toggleMini"
          ></v-app-bar-nav-icon>
          <v-list-item-content>
            <v-list-item-title align="center" class="py-1">
              <h3 class="white--text">Web app</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-divider></v-divider> -->
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.href"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="font-size: 15px">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <nav-bar />

    <v-main>
      <nav-bar />
      <title-header style="height: 48px; margin-bottom: 0 !important" :title="title" />
      <v-container style="height: calc(100vh - 156px);" class="pa-0" fluid>
        <!-- <transition name="fade"> -->
        <client-only>
          <nuxt />
        </client-only>
        <!-- </transition> -->
      </v-container>
    </v-main>

    <Footer style="background: #e2e2e2"/>
  </v-app>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  computed: {
    mini() {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
    },
    title() {
      return this.$route.matched.map((r) => {
        return r.components.default.options
          ? r.components.default.options.pageTitle
          : null;
      })[0];
    },
  },
  data() {
    return {
      sidebarMenu: true,
      toggleMini: false,
      dialog: false,
      items: [
        { title: "Dashboard", href: "/", icon: "mdi-view-dashboard" },
        {
          title: "Customers",
          href: "/customer",
          icon: "mdi-account-multiple",
        },
        {
          title: "Product",
          href: "/product",
          icon: "mdi-dropbox",
        },
        {
          title: "Supplier",
          href: "/supplier",
          icon: "mdi-cart",
        },
        {
          title: "Category",
          href: "/category",
          icon: "mdi-tag",
        },

        { title: "Settings", href: "/settings", icon: "mdi-cog" },
        { title: "Order", href: "/order", icon: "mdi-cog" },
      ],
      isMounted: false,
    };
  },

  methods: {},

  mounted() {
    this.isMounted = true;
  },
};
</script>

<style scoped>


.v-list .v-list-item--active {
  background-color: #1a263a;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.theme--light.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--light.v-application ::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light.v-application ::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.theme--light.v-application ::-webkit-scrollbar-thumb:hover {
  background: black;
}

.theme--dark.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--dark.v-application ::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>