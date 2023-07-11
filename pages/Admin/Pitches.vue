<template>
  <div style="font-family: 'Nunito', sans-serif; max-width: 1200px">
    <PitchMyIdea
      ref="pitchMyIdea"
      :isDialogOpen="showPitchMyIdeaDialog"
      @close="showPitchMyIdeaDialog = false"
    />

    <h1 v-show="false">
      TwoGuysApp – The easiest way to find international business partners
    </h1>

    <div class="mt-4 d-flex justify-space-between align-center">
      <v-row>
        <v-col cols="12" sm="6">
          <v-chip
            v-show="postedIdeas.today_total_pitches > 0"
            class="ma-2 rounded-lg"
            color="primary"
            outlined
          >
            {{ postedIdeas.today_total_pitches }} {{ $t("newIdeaPostedToday") }}
          </v-chip>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex justify-end">
            <v-checkbox
              class="mr-2"
              dense
              v-model="locationsFilter"
              value="USA"
            >
              <template v-slot:label>
                <div class="text-caption mt-1">USA</div>
              </template>
            </v-checkbox>

            <v-checkbox
              class="mr-2"
              dense
              v-model="locationsFilter"
              value="Germany"
            >
              <template v-slot:label>
                <div class="text-caption mt-1">Germany</div>
              </template>
            </v-checkbox>
            <v-checkbox
              class="mr-2"
              dense
              v-model="locationsFilter"
              value="Worldwide"
            >
              <template v-slot:label>
                <div class="text-caption mt-1">Worldwide</div>
              </template>
            </v-checkbox>
          </div>
        </v-col>
      </v-row>
    </div>

    <PitchIdea
      :isDialogOpen="showPitchIdea"
      @close="showPitchIdea = false"
      :applyPitchIdea="applyPitchIdea"
    />

    <v-expansion-panels flat multiple active-class="active-expansion">
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

              <v-col cols="8" sm="6">
                <div class="ml-3 ml-md-0">
                  <div
                    class="title-text font-weight-light"
                    v-text="item.customer.name"
                  ></div>
                  <div
                    :class="$vuetify.breakpoint.xs ? '' : 'd-flex align-center'"
                  >
                    <h2
                      class="title-text font-bold"
                      v-text="item.pitch_title"
                    ></h2>

                    <v-chip
                      v-show="false"
                      class="ma-sm-2 mt-1 mb-2 pa-1 px-2 rounded-pill font-bold"
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
                cols="2"
                sm="5"
                class="d-flex align-center justify-end pl-md-16"
              >
                <div class="d-inline-flex align-center">
                  <div class="mr-1 text-h6">🚩</div>
                  0 reports
                </div>
                <div v-if="item.can_apply" class="d-none d-sm-flex">
                  <v-btn
                    class="ml-4 px-0 rounded-lg apply-btn"
                    color="red"
                    @click="onBanUserClick(item)"
                    dark
                  >
                    <div class="px-8">Ban User</div>
                  </v-btn>

                  <v-btn
                    class="ml-4 px-0 rounded-lg apply-btn"
                    color="red"
                    @click="onDeletePitchClick(item)"
                    dark
                  >
                    <div class="px-8">Delete Pitch</div>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          class="pt-6 pt-md-12 mt-n3"
          style="background: #fff; border-radius: 14px"
        >
          <div class="px-md-16">
            <div v-if="$vuetify.breakpoint.smAndUp" class="pb-8">
              <v-card
                class="
                  ml-md-8
                  text-center
                  mb-4
                  py-6
                  rounded-xl
                  float-sm-right
                  px-4
                "
                dark
                color="primary"
                style="
                  outline: 4px solid #fff !important;
                  border: 1px solid #ddd !important;
                "
                min-width="240px"
              >
                <v-avatar size="90px" class="mt-8">
                  <v-img
                    class="white--text align-end"
                    :src="item.customer.profile_image_url"
                    alt="profile-image"
                  >
                  </v-img>
                </v-avatar>

                <div
                  @click="onViewProfileClick(item)"
                  class="mt-6 text-h5 font-bold"
                >
                  {{ item.customer.name }}
                </div>

                <div>
                  ✅ {{ item.customer_pitch_apply_validity.total_applicant }}
                  {{ $t("applied") }}
                </div>

                <div class="mt-2">🚩 0 reports</div>
              </v-card>
            </div>

            <div>
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

              <div v-if="item.idea_description.length > 1" class="mt-5">
                <div class="text-caption text-sm-body-2">
                  {{ item.idea_description }}
                </div>
              </div>

              <div v-if="item.location.length > 1" class="mt-5">
                <p class="font-bold expand-title">{{ $t("location") }}</p>
                <div class="text-caption text-sm-body-2">
                  <span v-if="item.location === 'Worldwide'">🌏</span>
                  {{ item.location }}
                </div>
              </div>

              <div v-if="item.potential_yearly_revenue.length > 1" class="mt-5">
                <p class="font-bold expand-title">
                  {{ $t("expectedYearlyRev")
                  }}<span class="grey--text">&nbsp; (optional)</span>
                </p>
                <div class="text-caption text-sm-body-2">
                  {{ item.potential_yearly_revenue }}
                </div>
              </div>

              <div style="min-height: 280px" v-if="$vuetify.breakpoint.xs">
                <v-card
                  class="text-center my-6 py-6 rounded-xl float-md-right px-4"
                  dark
                  color="primary"
                  style="
                    outline: 4px solid #fff !important;
                    border: 1px solid #ddd !important;
                  "
                  min-width="240px"
                >
                  <v-avatar size="90px" class="mt-8">
                    <v-img
                      class="white--text align-end"
                      :src="item.customer.profile_image_url"
                      alt="profile-image"
                    >
                    </v-img>
                  </v-avatar>

                  <div class="mt-6 text-h5 font-bold">
                    {{ item.customer.name }}
                  </div>

                  <div>
                    ✅ {{ item.customer_pitch_apply_validity.total_applicant }}
                    {{ $t("applied") }}
                  </div>

                  <div class="mt-2">🚩 0 reports</div>
                </v-card>
              </div>

              <v-card
                outlined
                class="pa-2 py-3 pa-md-8 mt-12 text-center rounded-xl"
              >
                <div class="text-md-subtitle-2 text-caption my-4 font-bold">
                  {{ $t("pleaseShare") }}
                </div>
                <div class="mt-2 px-0 px-md-4 when-you-apply-text">
                  {{ $t("whenYouApplyText1") }}
                  <!-- <span class="font-bold">{{ $t("whenYouApplyText2") }}</span>
                  {{ $t("whenYouApplyText3") }} -->
                </div>
              </v-card>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { call, get } from "vuex-pathify";
import PitchMyIdea from "~/pages/PitchMyIdea.vue";
import PitchIdea from "~/pages/PitchIdea/index.vue";
import Swal from "sweetalert2";

export default {
  // middleware: 'auth',
  layout: "admin/default",

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
      postedIdeas: {
        today: null,
        total_pitches: null,
        today_total_pitches: null,
        customer_pitches: [],
      },

      applyPitchIdea: null,
      colorCache: {},
      locationsFilter: ["Worldwide"],
      isLoggedIn: false,
    };
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
          this.postedIdeas = data;
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
          id: item.customer_id,
        },
      });
    },

    onBanUserClick(item) {
      Swal.fire({
        icon: "error",
        title: "Are you sure you want to ban this user?",
        showCancelButton: true,
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios
            .$delete(`admin/customer/${item.customer_id}`)
            .then((response) => {
              if (response.success) {
                Swal.fire("Banned!", "User sucessfully banned.", "success");
              }
            });
        }
      });
    },

    onDeletePitchClick(item) {
      Swal.fire({
        icon: "error",
        title: "Are you sure you want to detele this pitch?",
        showCancelButton: true,
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios
            .$delete(`admin/customer/pitches/${item.id}`)
            .then(async (response) => {
              if (response.success) {
                Swal.fire("Deleted!", "Pitch sucessfully deleted.", "success");

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

  .when-you-apply-text {
    font-size: 11px;
  }
}
</style>
