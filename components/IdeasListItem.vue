<template>
  <div class="ideas" @click="expandIdea(i)">
    <v-row>
      <v-col cols="12" sm="3">
        <!-- CUSTOMER -->
        <v-row class="align-center">
          <v-col sm="3" style="flex-grow: 0; max-width: none">
            <v-avatar>
              <img
                :src="idea.customer.profile_image_url"
                alt="profile-image"
                width="50px"
              />
            </v-avatar>
          </v-col>
          <v-col>
            <v-row>
              <div class="ml-3 ml-md-0 d-flex align-center">
                <div class="title-text font-weight-bold pr-3">
                  {{ idea.customer.name }}
                </div>
                <img
                  class="pr-3"
                  :src="require('@/assets/img/fish4-gray.svg')"
                  alt="profile-image"
                  width="30px"
                />
                <!-- <div>📌 {{ $dayjs(idea.created_at).format('D MMMM, YYYY') }}</div> -->
                <div class="text-caption d-sm-none">
                  Posted {{ duration(idea.created_at) }} ago
                </div>
              </div>
            </v-row>
            <v-row class="d-none d-sm-flex">
              <div class="text-caption">
                Posted {{ duration(idea.created_at) }} ago
              </div>
            </v-row>
          </v-col>
        </v-row>
        <!-- <div class="d-flex pt-3"> -->

        <!-- KEY VALUES – DESKTOP -->
        <div class="pt-3">
          <v-row class="pa-1 d-none d-sm-flex">
            <div class="custom-chip mr-2">
              <strong class="worldwide-logo-allignment-onexp">
                <img
                  :src="require('@/assets/img/world.png')"
                  alt="world Image"
                />
                <span>{{ idea.location }}</span>
              </strong>
            </div>
          </v-row>
          <v-row class="pa-1 d-none d-sm-flex">
            <div
              v-if="idea.potential_yearly_revenue.length > 1"
              class="custom-chip"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              💰
              <strong> {{ idea.potential_yearly_revenue }}</strong>
            </div>
          </v-row>
        </div>
      </v-col>

      <!-- DESCRIPTION BLOCK -->
      <v-col
        cols="12"
        sm="6"
        v-bind:class="
          $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly ? 'py-0' : ''
        "
      >
        <div class="font-bold expand-title">
          {{ idea.pitch_title }}
        </div>
        <div class="">
          <div class="text-caption text-sm-body-2 sliceAbleText">
            <span v-if="!idea.collapsed">
              {{ idea.idea_description.substring(0, 150) + " ..." }}
            </span>
            <span v-else>
              {{ idea.idea_description }}
            </span>
          </div>
        </div>
        <div v-show="idea.collapsed">
          <!-- <div v-if="idea.can_apply" style="display: flex; justify-content: center; align-items: center;">
                                                          <v-btn class="px-0 apply-btn" color="primary" @click="onApplyClick(item)">
                                                            <div class="px-8 py-2">
                                                              {{ $t("applyNow") }}
                                                            </div>
                                                          </v-btn>
                                                        </div> -->
          <div class="mt-2 text-center" color="#f2f6fa">
            <b> {{ $t("disclaimer") }}</b>
          </div>
          <div class="mt-2 px-0 px-md-4 when-you-apply-text">
            {{ $t("whenYouApplyText1") }}
          </div>
        </div>
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
            class="ml-2 mr-3 report-button"
            depressed
            dark
            @click="onReportClick(idea)"
          >
            <v-icon>mdi-flag-outline</v-icon>
            {{ $t("report") }}
          </v-btn>
        </v-row>

        <!-- SEND MESSAGE BUTTON WITH RESPONSE BOX -->
        <v-row
          v-if="!postIdeas[i].showContactData"
          v-on:click.stop.prevent="onApplyClick(idea, i)"
          v-bind:class="
            $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
              ? 'd-inline-flex'
              : ''
          "
          class="pa-2"
        >
          <!-- <v-btn color="#0C90F8" class="ml-2 mr-3 apply-button" :outlined="hover ? true : false" depressed dark> -->
          <v-btn
            :loading="emailBtnLoading"
            color="#0C90F8"
            class="ml-2 mr-3 apply-button"
            depressed
            dark
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
        </v-row>
        <v-row
          v-else
          class="ml-2 mr-3"
          v-bind:class="
            $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
              ? 'd-inline-flex'
              : ''
          "
        >
          <div
            class="mt-2 text-center apply-button text-sm-body-2 contact-data"
            color="#f2f6fa"
          >
            <span v-if="idea.customer.twitter"
              >Mein Twitter Account: {{ idea.customer.twitter }} oder</span
            >
            {{ idea.customer.email }}
          </div>
        </v-row>

        <!-- KEY VALUES – RESPONSIVE -->
        <div
          class="pt-3 d-sm-none"
          v-bind:class="
            $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
              ? 'd-inline-flex'
              : ''
          "
        >
          <div class="custom-chip mr-2">
            <strong class="worldwide-logo-allignment-onexp">
              <img :src="require('@/assets/img/world.png')" alt="world Image" />
                  <span>11{{ countryToAlpha2(idea.location) }}</span>
            </strong>
          </div>
          <div
            v-if="idea.potential_yearly_revenue.length > 1"
            class="custom-chip"
            style="display: flex; justify-content: center; align-items: center"
          >
            💰
            <strong> {{ idea.potential_yearly_revenue }}</strong>
          </div>
        </div>

        <!-- AMOUNT OF APPLICANTS -->
        <v-row
          class="ml-2 mr-3 pa-2"
          v-bind:class="
            $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
              ? 'd-inline-flex'
              : ''
          "
        >
          <div class="mt-2 text-center apply-button" color="#f2f6fa">
            <b
              >✅
              {{ idea.customer_pitch_apply_validity.total_applicant }}
              {{ $t("applied") }}</b
            >
          </div>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { countryToAlpha2 } from "country-to-iso"
export default {
  props: ["idea"],
  methods: {
    countryToAlpha2,
    duration(created_at) {
      return dayjs.duration(dayjs().diff(created_at)).humanize();
    },
  },
};
</script>

<style>
</style>