<template>
  <v-container>
    <v-card class="py-3" height="80vh">
      <v-row>
        <v-col cols="12" md="4">
          <div>
            <v-text-field
              outlined
              dense
              class="mx-2"
              append-icon="mdi-magnify"
              v-show="isSearchClick"
              v-model="search"
            ></v-text-field>

            <div class="d-flex justify-space-between">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    style="text-transform: capitalize"
                    class="ml-2"
                    color="transparent"
                    light
                    elevation="0"
                  >
                    All Conversations
                    <v-icon right color="primary">mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list nav dense>
                  <v-list-item-group v-model="selectedItem" color="primary">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title> Spam</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>

              <v-btn icon @click="onSearchClick" class="mr-4">
                <v-icon> mdi-magnify </v-icon>
              </v-btn>
            </div>
          </div>
          <v-list class="overflow-y-auto" max-height="70vh">
            <v-list-item-group :value="0">
              <template v-for="(item, index) in messages">
                <v-list-item :key="item.id" active-class="lead-item">
                  <v-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                  <v-list-item-content class="ml-2">
                    <v-list-item-title
                      v-html="item.name"
                      class="text-body-1 grey--text text--darken-3"
                    >
                    </v-list-item-title>
                    <v-list-item-subtitle
                      v-html="item.message"
                      class="text-body-2"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="d-flex align-self-start">
                    <v-list-item-action-text
                      v-text="item.time"
                    ></v-list-item-action-text>

                    <v-icon v-if="!active" color="grey lighten-1">
                      mdi-star-outline
                    </v-icon>

                    <v-icon v-else color="yellow darken-3"> mdi-star </v-icon>
                  </v-list-item-action>
                </v-list-item>

                <v-divider
                  v-if="index < messages.length - 1"
                  :key="item.name"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-divider vertical class="ml-n3" inset></v-divider>
        <v-col
          cols="12"
          md="8"
          style="height: 78vh; overflow-y: auto"
          :loading="loading"
        >
          <v-container
            fill-height
            v-if="loading"
            class="d-flex align-center justify-center"
          >
            <v-progress-circular
              indeterminate
              size="64"
              color="primary"
              class="d-flex align-center justify-center"
            ></v-progress-circular>
          </v-container>
          <!-- <v-overlay :value="loading" :absolute="absolute">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay> -->
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<router lang="yaml">
    path: /messages
    name: messages
</router>

<script>
import { call, get } from "vuex-pathify";

export default {
  computed: {
    // leads: get("leads/items"),
  },

  data() {
    return {
      selectedItem: "",
      isSearchClick: false,
      isLeadsDialogOpen: false,
      search: "",
      active: false,

      loading: false,

      messages: [
        {
          id: 1,
          name: "Kisses",
          message: "Hello",
          time: "1 day ago",
        },

        {
          id: 2,
          name: "Kisses",
          message: "Hello",
          time: "1 day ago",
        },
      ],
    };
  },

  methods: {
    onSearchClick() {
      this.isSearchClick = !this.isSearchClick;
    },
  },
};
</script>

<style >
.lead-item {
  background-color: #ebebeb;
}
</style>