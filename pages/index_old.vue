<template>
    <div 
    style="font-family: 'Nunito', sans-serif; max-width: 1100px">
      <PitchMyIdea ref="pitchMyIdea" :isDialogOpen="showPitchMyIdeaDialog" @close="showPitchMyIdeaDialog = false" />
  
      <h1 v-show="false">
        TwoGuysApp – The easiest way to find international business partners
      </h1>
  
      <v-hover v-slot="{ hover }">
        <v-card class="mx-auto rounded-xl d-none d-md-flex justify-center align-center" outlined
          :color="hover ? '#ddd3d36b' : '#FFF6'" style="cursor: pointer; border-radius: 14px; border: 1px solid #d7d7d7"
          v-if="showBanner">
          <v-card-text class="my-2 text-center">
            <div class="font-bold black--text text-subtitle-1">
              <span class="text-h5 mr-1 mt-1">👉</span>
              {{ $t("frontBannerText1") }}
              <span class="text-h6 mx-1">🏆</span>
              {{ $t("frontBannerText2") }}
              <v-hover v-slot="{ hover }">
                <v-btn color="red" class="ml-2 mr-3" :outlined="hover ? true : false" depressed dark @click="onPostClick">
                  {{ $t("postMyIdea") }}
                </v-btn>
              </v-hover>
              <v-hover v-slot="{ hover }">
                <v-btn color="red" :outlined="hover ? false : true" depressed @click="onHideClick" dark>
                  {{ $t("hideThis") }}
                </v-btn>
              </v-hover>
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
  
      <v-skeleton-loader v-if="false" v-bind="attrs" type="list-item, actions" class="banner"></v-skeleton-loader>
      <PitchIdea :isDialogOpen="showPitchIdea" @close="showPitchIdea = false" :applyPitchIdea="applyPitchIdea" />
  
      <v-skeleton-loader v-if="false" v-bind="attrs" type="list-item-avatar-three-line" class="pitch-lists">
      </v-skeleton-loader>
        <v-expansion-panel
          v-for="item in postedIdeas.customer_pitches"
          :key="item.id"
          style="background: transparent"
        >
          <v-expansion-panel-header
            hide-actions
            class="pa-0"
            style="background: linear-gradient(#f3f7fa 80%, transparent 40px)"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                class="mt-4 py-2 px-4 elevation-0 expansion-header"
                :dark="item.isDark"
                style="cursor: pointer"
                :class="item.isDark ? 'elevation-0' : 'elevation-2'"
              >
                <v-row class="d-flex align-center">
                  <v-col cols="2" sm="1">
                    <v-avatar>
                      <img
                        :src="item.customer.profile_image_url"
                        alt="profile-image"
                      />
                    </v-avatar>
                  </v-col>
  
                  <v-col cols="8" sm="7">
                    <div class="ml-3 ml-md-0">
                      <div
                        class="title-text font-weight-light"
                        v-text="item.customer.name"
                      ></div>
                      <div
                        :class="
                          $vuetify.breakpoint.xs ? '' : 'd-flex align-center'
                        "
                      >
                        <h2
                          class="title-text font-bold"
                          v-text="item.pitch_title"
                        ></h2>
  
                        <v-chip
                          v-show="false"
                          class="
                            ma-sm-2
                            mt-1
                            mb-2
                            pa-1
                            px-2
                            rounded-pill
                            font-bold
                          "
                          :small="$vuetify.breakpoint.mdAndUp"
                          :x-small="$vuetify.breakpoint.smAndDown"
                          dark
                          color="#000"
                        >
                          CLOSED
                        </v-chip>
                      </div>
                      <div class="d-flex">
                        <div class="custom-chip mr-2">
                          <strong
                            ><span v-if="item.location === 'Worldwide'">🌏</span>
                            {{ item.location }}</strong
                          >
                        </div>
                        <div
                          v-if="item.potential_yearly_revenue.length > 1"
                          class="custom-chip"
                        >
                          💰
                          <strong> {{ item.potential_yearly_revenue }}</strong>
                        </div>
                      </div>
                    </div>
                  </v-col>
  
                  <v-col
                    cols="1"
                    sm="3"
                    class="d-none d-sm-flex align-center justify-end"
                  >
                    <div v-if="item.can_apply" class="d-none d-sm-flex">
                      <v-btn
                        class="mr-4 px-0 rounded-lg apply-btn"
                        :class="hover ? 'd-flex' : 'd-none'"
                        :color="item.isDark ? 'transparent' : 'primary'"
                        @click="onApplyClick(item)"
                      >
                        <div
                          v-if="item.isDark"
                          class="dark-btn-text px-8 py-2 text-body-2"
                        >
                          {{ $t("apply") }}
                        </div>
                        <div v-else class="px-8">{{ $t("apply") }}</div>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="2" sm="1">
                    <div>📌 {{ item.from_now }}</div>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            class="py-6 pt-md-12 mt-n3"
            style="background: #fff; border-radius: 14px"
          >
            <div class="px-md-16">
              <div v-if="$vuetify.breakpoint.smAndUp">
                <v-card
                  class="ml-sm-8 text-center mb-4 py-6 rounded-xl float-sm-right px-4"
                  dark
                  color="primary"
                  style="outline: 4px solid #fff !important; border: 1px solid #ddd !important;"
                  min-width="240px">
                  <v-avatar
                    size="90px"
                    @click="onViewProfileClick(item)"
                    style="cursor: pointer"
                    class="mb-3"
                  >
                    <v-img
                      class="white--text align-end"
                      :src="item.customer.profile_image_url"
                      alt="profile-image"
                    >
                    </v-img>
                  </v-avatar>
  
                  <div
                    @click="onViewProfileClick(item)"
                    class="text-h5 mb-2 font-bold"
                    style="cursor: pointer"
                  >
                    {{ item.customer.name }}
                  </div>
  
                  <div v-if="item.can_apply">
                    <v-btn
                      class="px-0 rounded-pill apply-btn"
                      color="transparent"
                      @click="onApplyClick(item)"
                      block
                    >
                      <div class="dark-btn-text px-8 py-2 text-body-2">
                        {{ $t("applyNow") }}
                      </div>
                    </v-btn>
                  </div>
  
                  <div class="mt-2">
                    ✅ {{ item.customer_pitch_apply_validity.total_applicant }}
                    {{ $t("applied") }}
                  </div>
                </v-card>
              </div>
  
              <div>
                <div :style="$vuetify.breakpoint.xs ? '' : 'min-height: 260px'">
                  <div>
                    <div style="line-height: 1.5">
                      <span class="expand-title" style="font-weight: 400">
                        {{ item.customer.name }} seeks a partner for
                      </span>
                      <br />
                    </div>
                    <div class="font-bold expand-title">
                      {{ item.pitch_title }}
                    </div>
                  </div>
  
                  <div
                    v-if="item.idea_description.length > 1"
                    class="mt-2 mt-md-5"
                  >
                    <div class="text-caption text-sm-body-2">
                      {{ item.idea_description }}
                    </div>
                  </div>
  
                  <div v-if="item.location.length > 1" class="mt-2 mt-md-5">
                    <p class="font-bold expand-title">{{ $t("location") }}</p>
                    <div class="text-caption text-sm-body-2">
                      <span v-if="item.location === 'Worldwide'">🌏</span>
                      {{ item.location }}
                    </div>
                  </div>
  
                  <div
                    v-if="item.potential_yearly_revenue.length > 1"
                    class="mt-2 mt-md-5"
                  >
                    <p class="font-bold expand-title">
                      {{ $t("expectedYearlyRev")
                      }}<span class="grey--text">&nbsp; (optional)</span>
                    </p>
                    <div class="text-caption text-sm-body-2">
                      {{ item.potential_yearly_revenue }}
                    </div>
                  </div>
                </div>
  
                <div v-if="$vuetify.breakpoint.xs">
                  <v-card
                    class="text-center my-6 py-6 rounded-xl float-md-right px-4"
                    dark
                    color="primary"
                    style="outline: 4px solid #fff !important;
                      border: 1px solid #ddd !important;"
                    min-width="240px"
                  >
                    <v-avatar
                      size="90px"
                      @click="onViewProfileClick(item)"
                      style="cursor: pointer"
                      class="mb-3"
                    >
                      <v-img
                        class="white--text align-end"
                        :src="item.customer.profile_image_url"
                        alt="profile-image"
                      >
                      </v-img>
                    </v-avatar>
  
                    <div
                      @click="onViewProfileClick(item)"
                      class="text-h5 mb-2 font-bold"
                      style="cursor: pointer"
                    >
                      {{ item.customer.name }}
                    </div>
  
                    <div v-if="item.can_apply">
                      <v-btn
                        class="px-0 rounded-pill apply-btn"
                        color="transparent"
                        @click="onApplyClick(item)"
                        block
                      >
                        <div class="dark-btn-text px-8 py-2 text-body-2">
                          {{ $t("applyNow") }}
                        </div>
                      </v-btn>
                    </div>
  
  
                    <div class="mt-2">
                      ✅ {{ item.customer_pitch_apply_validity.total_applicant }}
                      {{ $t("applied") }}
                    </div>
  
                  </v-card>
                </div>
  
                <v-card
                  outlined
                  class="pa-2 py-3 pa-md-8 mt-12 text-center rounded-xl"
                >
                  <v-hover v-if="item.can_apply" v-slot="{ hover }">
                    <v-btn
                      class="mb-6"
                      color="primary"
                      @click="onApplyClick(item)"
                      block
                      v-if="$vuetify.breakpoint.smAndUp"
                      :outlined="hover ? true : false"
                      style="border-radius: 12px"
                      large
                      depressed
                    >
                      <div class="font-bold" style="font-size: 15px">
                        {{ $t("applyForThisJob") }}
                      </div>
                    </v-btn>
                  </v-hover>
  
                  <div class="text-md-subtitle-2 text-caption my-4 font-bold">
                    {{ $t("pleaseShare") }}
                  </div>
                  <div class="mt-2 px-0 px-md-4 when-you-apply-text">
                    {{ $t("whenYouApplyText1") }}
                  </div>
                </v-card>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row class="justify-lg-space-between mb-2 mt-3">
        <v-col cols="2" sm="2">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" depressed :large="$vuetify.breakpoint.smAndUp" class="mb-1" outlined
                color="grey" style="background:#fff" rounded>
                <span class="black--text text-subtitle-1">
                  <div v-if="selectedLocation === 'Your Location'">
                    {{ clientCurrentState }}
                  </div>
                  <div v-else>
                    {{ selectedLocation }}
                  </div>
                </span>
                <v-avatar size="30" class="ml-4">
                  <v-img v-if="selectedLocation === 'Your Location'" :src="require('@/assets/img/my-location.png')"
                    contain></v-img>
                  <v-img v-if="selectedLocation === 'Worldwide'" :src="require('@/assets/img/world.png')" contain></v-img>
                  <v-img v-if="selectedLocation === 'North America'" :src="require('@/assets/img/north-america.png')"
                    contain>
                  </v-img>
                  <v-img v-if="selectedLocation === 'Europe'" :src="require('@/assets/img/europe.png')" contain></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item-group v-model="selectedLocation" color="primary">
                <v-list-item v-for="(item, i) in locations" :key="i" v-bind:value="item.title">
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
      </v-row>
      
      <div class="ideasContainer" v-for="(idea, i) in ideasFilter" :key="i" >
        <div class="Ideas" @click="expandIdea(i)" >
            <v-row>
              <v-col cols="12" sm="3">
                <v-row style="align-items: center">
                  <v-col cols="12" sm="3">
                    <v-avatar>
                      <img :src="idea.img" alt="profile-image" width="50px"/>
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <div class="ml-3 ml-md-0" style="display: flex; align-items: center;">
                        <div class="title-text font-weight-bold pr-3" style="color: #818b9e">{{ idea.userName }}</div>
                        <img :src="require('@/assets/img/fish4-gray.svg')" alt="profile-image" width="30px"/>
                    </div>
                  </v-col>
                </v-row>
                <div class="d-flex pt-3">
                  <div class="custom-chip mr-2">
                    <strong class="worldwide-logo-allignment-onexp">
                      <img :src="require('@/assets/img/world.png')"
                          alt="world Image" />
                      <span>{{ idea.region }}</span>
                    </strong>
                  </div>
                  <div v-if="idea.revenue.length > 1" class="custom-chip"
                    style="display: flex; justify-content: center; align-items: center;">
                    💰
                    <strong> {{ idea.revenue }}</strong>
                  </div>
                  </div>
              </v-col>
              <v-col cols="12" sm="6">
                    <div class="font-bold expand-title">
                      {{ idea.userTitle }}
                    </div>
  
                  <div class="">
                    <div class="text-caption text-sm-body-2 sliceAbleText">
                      <span v-if="!idea.collapsed">
                        {{ idea.userDescription.substring(0, 150) + ' ...' }}
                      </span>
                      <span v-else>
                        {{ idea.userDescription }}
                      </span>
                      </div>
                    </div>
                    <div v-show="idea.collapsed">
                      <div v-if="idea.can_apply" style="display: flex; justify-content: center; align-items: center;">
                        <v-btn class="px-0 apply-btn" color="primary" @click="onApplyClick(item)">
                          <div class="px-8 py-2">
                            {{ $t("applyNow") }}
                          </div>
                        </v-btn>
                      </div>
                      <div class="mt-2 text-center" color="#f2f6fa">
                        <b>✅ {{ idea.applied }}
                          {{ $t("applied") }}</b>
                      </div>
                      <div class="mt-2 px-0 px-md-4 when-you-apply-text">
                        {{ $t("whenYouApplyText1") }}
                      </div>
                    </div>
                    
              </v-col>
              <v-col cols="12" sm="3">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <div v-if="idea.can_apply" style="display: none; justify-content: center; align-items: center; width: 100%">
                              <v-btn class="px-0 apply-btn hoverShowBtn" color="primary" @click="onApplyClick(item)">
                                <div class="px-8 py-2">
                                  {{ $t("applyNow") }}
                                </div>
                              </v-btn>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <div>📌 {{ idea.datePosted }}</div>
                        </v-col>
                    </v-row>
                    
              </v-col>
            </v-row>
        </div>
      </div>
  
    </div>
  </template>
  
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
    computed: {},
  
    data() {
      return {
        bgColor: "red",
        showBanner: true,
        showPitchMyIdeaDialog: false,
        showPitchIdea: false,
        CollapsedIdea: false,
        togglerIdea: 0,
        togglerIdeaIndex: 1,
        postedIdeas: {
          today: null,
          total_pitches: null,
          today_total_pitches: null,
          customer_pitches: [],
        },
        keyword: '',
        currentRegion: null,
        applyPitchIdea: null,
        colorCache: {},
        locationsFilter: ["Worldwide"],
        isLoggedIn: false,
        selectedLocation: "",
        clientIpAddress: '',
        clientCurrentState: '',
        openedPanel: [],
        locations: [
          {
            icon: require('@/assets/img/my-location.png'),
            title: 'ASIA',
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
        postIdeas: [
          {
            userName: 'joe555',
            CustomerID: "5d6123b23fe7663ca689981bb64943f7",
            fishType: 'small',
            userTitle: 'info vom Admin',
            userDescription: 'Hallo Leute, Hier könnt ihr einen Beitrag erstellen. Mit diesem Beitrag können sich andere bei euch als Geschäftspartner bewerben. Danach erhalten sie deine E-Mail-Adresse, um dich zu kontaktieren. Es ist wirklich einfach, nicht wahr? Probiert es einfach aus',
            img: '/avatar.png',
            region: 'WORLDWIDE, ASIA',
            revenue: '0',
            datePosted: '2mo',
            can_apply: true,
            applied: 10, 
            collapsed: false
          },
          {
            userName: 'joe555',
            CustomerID: "2b9ba116500f70862ebac2b81d31a9df",
            fishType: 'small',
            userTitle: 'info vom Admin',
            userDescription: 'Hallo Leute, Hier könnt ihr einen Beitrag erstellen. Mit diesem Beitrag können sich andere bei euch als Geschäftspartner bewerben. Danach erhalten sie deine E-Mail-Adresse, um dich zu kontaktieren. Es ist wirklich einfach, nicht wahr? Probiert es einfach aus',
            img: '/avatar.png',
            region: 'ASIA, WORLDWIDE',
            revenue: '0',
            datePosted: '2mo',
            can_apply: true,
            applied: 10,
            collapsed: false
          },
          {
            userName: 'juanx123',
            CustomerID: "106d5b63de6eb305417f826968cb2726",
            fishType: 'medium',
            userTitle: 'aaa',
            userDescription: 'Hallo Leute, Hier könnt ihr einen Beitrag erstellen. Mit diesem Beitrag können sich andere bei euch als Geschäftspartner bewerben. Danach erhalten sie deine E-Mail-Adresse, um dich zu kontaktieren. Es ist wirklich einfach, nicht wahr? Probiert es einfach aus',
            img: '/avatar.png',
            region: 'WORLDWIDE, USA',
            revenue: '110 - 220',
            datePosted: '2mo',
            can_apply: true,
            applied: 13,
            collapsed: false
          },
          {
            userName: 'joe555',
            CustomerID: "b8f6099ed6aaa08bac34efd0a1d4a86c",
            fishType: 'big',
            userTitle: 'test',
            userDescription: 'Hallo Leute, Hier könnt ihr einen Beitrag erstellen. Mit diesem Beitrag können sich andere bei euch als Geschäftspartner bewerben. Danach erhalten sie deine E-Mail-Adresse, um dich zu kontaktieren. Es ist wirklich einfach, nicht wahr? Probiert es einfach aus',
            img: '/avatar.png',
            region: 'WORLDWIDE, GERMANY',
            revenue: '0',
            datePosted: '2mo',
            can_apply: true,
            applied: 25,
            collapsed: false
          },
          {
            userName: 'lizi02',
            CustomerID: "4d38a345a13a18906b4bb82ee5560c91",
            fishType: 'medium',
            userTitle: 'test',
            userDescription: 'Hallo Leute, Hier könnt ihr einen Beitrag erstellen. Mit diesem Beitrag können sich andere bei euch als Geschäftspartner bewerben. Danach erhalten sie deine E-Mail-Adresse, um dich zu kontaktieren. Es ist wirklich einfach, nicht wahr? Probiert es einfach aus',
            img: '/avatar.png',
            region: 'WORLDWIDE, GERMANY',
            can_apply: true,
            revenue: '0',
            datePosted: '2mo',
            applied: 44,
            collapsed: false
          },
          {
            userName: 'simonlampl',
            CustomerID: "a9b26cf40edc7482eaa3760da5fcafcb",
            can_apply: true,
            fishType: 'small',
            userTitle: 'Platform for lending of used items',
            userDescription: 'I want to establish a platform where people can post offers for lending objects/goods. The other market participant should be able to find posted items and rent them for a certain period of time.',
            img: '/avatar.png',
            region: 'Worldwide',
            revenue: '5.0k',
            datePosted: '2mo',
            applied: 6,
            collapsed: false
          },
          {
            userName: 'joe555',
            CustomerID: "2318736df8afb7d13d361517f288e9a5",
            can_apply: true,
            fishType: 'big',
            userTitle: 'My business idea',
            userDescription: 'Hallo Leute, Hier könnt ihr einen Beitrag erstellen. Mit diesem Beitrag können sich andere bei euch als Geschäftspartner bewerben. Danach erhalten sie deine E-Mail-Adresse, um dich zu kontaktieren. Es ist wirklich einfach, nicht wahr? Probiert es einfach aus',
            img: '/avatar.png',
            region: 'Worldwide',
            revenue: '1.0k',
            datePosted: '2mo',
            applied: 12,
            collapsed: false
          },
          {
            userName: 'jhon123',
            CustomerID: "cba08f6d3c766d371c05fa208e5daa40",
            can_apply: true,
            fishType: 'small',
            userTitle: 'Hello world',
            userDescription: 'Hallo Leute, Hier könnt ihr einen Beitrag erstellen. Mit diesem Beitrag können sich andere bei euch als Geschäftspartner bewerben. Danach erhalten sie deine E-Mail-Adresse, um dich zu kontaktieren. Es ist wirklich einfach, nicht wahr? Probiert es einfach aus',
            img: '/avatar.png',
            region: 'Worldwide',
            revenue: '20.0K - 50.0K',
            datePosted: '2mo',
            applied: 0,
            collapsed: false
          },
        ]
      };
    },
    computed: {
      ideasFilter() {
        return this.postIdeas.filter((idea) => {
          return this.selectedLocation.toLowerCase().split(' ').every(v => idea.region.toLowerCase().includes(v));
        });
      },
  
    },
    created() {
      fetch('https://api.ipify.org?format=json')
        .then(x => x.json())
        .then(({ ip }) => {
          this.clientIpAddress = ip;
        });
      fetch(`https://api.ipregistry.co/${this.clientIpAddress}?key=0xjh6xmh6j0jwsy6`)
        .then((response) => {
          return response.json()
        }).then((payload) => {
          this.clientCurrentState = payload.location.continent.name;
        })
    },
    methods: {
      getAllPitches(locationFilters) {
        let user = this.$auth.$storage.getUniversal("user");
        this.$axios
          .$get("customer/pitches", {
            params: {
              locations_filter: locationFilters,
              ...(user && { customer_id: user.customer_id }),
            },
          })
          .then((data) => {
            console.info(data);
            // this.postedIdeas = data;
          });
      },
  
      onHideClick() {
        this.showBanner = false;
      },
  
      linearBackground(item) {
        return `linear-gradient(${item.bgColor} -5%, white 120px) `;
      },
  
      onApplyClick(item) {
        console.info(item);
        if (!this.$auth.$storage.getUniversal("isLoggedIn")) {
          this.$router.push({
            path: this.localePath("/login"),
          });
          return;
        }
  
        this.applyPitchIdea = item;
  
        this.showPitchIdea = !this.showPitchIdea;
      },
      expandIdea(index){
        this.postIdeas[index].collapsed = !this.postIdeas[index].collapsed;
      },
  
      async onPostClick() {
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
      randomColor(item) {
        const r = () => Math.floor(256 * Math.random());
  
        // return (
        //   this.colorCache[item] ||
        //   (this.colorCache[item] = `rgb(${r()}, ${r()}, ${r()})`)
        // );
  
        return `rgb(${r()}, ${r()}, ${r()})`;
      },
  
      onViewProfileClick(item) {
        this.$router.push({
          path: this.localePath("/view-profile"),
          query: {
            id: item,
          },
        });
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
  
  
  <style scoped>
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
    border-radius: 7px;
  }
  
  .title-text {
    font-size: 17px !important;
    line-height: 1.2;
    white-space: nowrap;
  }
  
  .expansion-header {
    border-radius: 14px;
    border: 1px solid #d7d7d7;
  }
  
  .expansion-header:hover {
    background-color: #d7d7d7;
  }
  
  .active-expansion .expansion-header {
    background-color: #d7d7d7;
    border-radius: 14px 14px 0 0;
  }
  
  .active-expansion .apply-btn {
    display: flex !important;
  }
  
  .expand-title {
    font-size: 26px;
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
  }
  
  .when-you-apply-text {
    font-family: "Nunito", sans-serif;
    font-size: 13px;
  }
  
  @media screen and (max-width: 960px) {
    .title-text {
      font-size: 14px !important;
      white-space: normal;
    }
  
    .expand-title {
      font-size: 20px;
    }
  
    /* .when-you-apply-text {
      font-size: 11px;
    } */
  }
  
  
  .username-fish {
    display: flex;
    /* justify-content: center; */
    align-items: center;
  }
  
  .username-fish img {
    height: 25px;
  }
  .worldwide-logo-allignment-onexp{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
  }
  .worldwide-logo-allignment-onexp img{
    height: 15px;
  }
  .worldwide-logo-allignment-onexp span{
    padding-left: 10px;
  }
  .ideasContainer .Ideas{
    background: #fff;
    padding: 20px;
    border: 2px solid #dcdcdc;
    border-radius: 10px;
    /* height: 150px; */
    overflow: hidden;
    margin: 20px 0;
    cursor: pointer
  }
  .ideasContainer .Ideas .hoverShowBtn{
    display: none;
  }
  .ideasContainer .Ideas:hover .hoverShowBtn {
    display: block;
  }
  </style>
  