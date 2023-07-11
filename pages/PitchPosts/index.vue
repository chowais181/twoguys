<template>
  <v-container>
    <v-row class="mb-0 mb-md-2">
      <v-col cols="12" md="4" class="overflow-y-auto" style="max-height: 81vh">
        <v-card
          v-for="item in customerPitches"
          :key="item.id"
          class="mb-4 active-card"
          outlined
          style="cursor: pointer"
          @click="onJobPostClick(item)"
        >
          <v-card-title>
            <v-row dense>
              <v-col cols="11" class="text-body-1">
                {{ item.pitch_title }}
              </v-col>

              <v-col cols="1">
                <v-btn icon class="mt-n2">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text class="text-subtitle-2 blue-grey--text mt-n4">
            <div v-text="item.expectations"></div>
            <div v-text="item.location"></div>
            <div
              v-text="item.profit_expectation"
              class="font-weight-bold grey--text text--darken-3 my-2"
            ></div>

            <div v-text="item.qualifications" class="truncate-3"></div>

            <div v-text="item.time_posted" class="text-caption mt-2"></div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <JobProfile 
          ref="jobProfile"
          v-if="$vuetify.breakpoint.mdAndUp"
          :item="jobPost" 
          @onAddPitchClick="onAddPitchClick"
          @onRemovePitchClick="onRemovePitchClick"

        />
        <!-- <JobProfileMobileDialog
          v-if="$vuetify.breakpoint.smAndDown"
          :isDialogOpen="showEditor"
          @close="showEditor = false"
          :item="jobPost"
        /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<router lang="yaml">
    path: /pitch-posts
    name: pitch-posts
</router>

<script>
import { call, get } from "vuex-pathify";

export default {
  computed: {
    // leads: get("leads/items"),
  },

  data() {
    return {
      showEditor: false,
      jobPost: {},
      item: {
        id: 1,
        name: "Kisses",
        time: "",
      },
      items: [
        {
          id: 1,
          title: "IT Support",
          company: "Hello company",
          location: "Work from home",
          payment: "PHP 50,000 - 100,000 a month",
          description:
            "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characterist",
          time_posted: "1 day ago",
        },

        {
          id: 2,
          title: "Database Support",
          company: "Text company",
          location: "Philippines",
          payment: "PHP 20,000 - 40,000 a month",
          description:
            "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characterist Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characterist Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characterist Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characterist Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characterist Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characterist Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristss",
          time_posted: "5 days ago",
        },

        {
          id: 3,
          title: "IT Support",
          company: "Hello company",
          location: "Work from home",
          payment: "PHP 50,000 - 100,000 a month",
          description:
            "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary the first true generator on theInternet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characterist",
          time_posted: "1 day ago",
        },
      ],
      customerPitches: [],
      customerId: null,
      customerSavedPitches: [],
      isPitchSaved: false,
    };
  },

  methods: {
    onJobPostClick(item) {
      this.jobPost = { ...{}, ...item };
      this.showEditor = true;

      let pitchExist = _.find(this.customerSavedPitches, ['customer_pitch_id', item.id])

      if(pitchExist){
        this.$refs.jobProfile.isPitchSavedStatus = true

      }else{
        this.$refs.jobProfile.isPitchSavedStatus = false

      }

    },

    getAllPitches(){
      this.$axios.$get('customer/pitches')
      .then((data) => {
        console.info(data)
        this.customerPitches = data.customer_pitches
      })
    },

    getAllCustomerSavedPitches(){
      this.$axios.$get(`customer/${this.customerId}/pitches/save`)
      .then((data) => {
        this.customerSavedPitches = data.customer_pitch
      })
    },

    onRemovePitchClick(item){
      console.info("onRemovePitchClickitem", item)
      this.customerSavedPitches.splice(this.customerSavedPitches.findIndex((items) => items.customer_pitch_id === item.id), 1);
      console.info(this.customerSavedPitches)
    },

    onAddPitchClick(item){
      console.info("onAddPitchClick", item)
      this.customerSavedPitches.push(item)
      console.info(this.customerSavedPitches)
    }

  },

  async fetch(){
    this.getAllPitches()

    if(this.$auth.$storage.getUniversal("user")){
      this.customerId = this.$auth.$storage.getUniversal("user").customer_id

      this.getAllCustomerSavedPitches()
    }
  }

};
</script>

<style >
.lead-item {
  background-color: #ebebeb;
}

.truncate-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.active-card:focus {
  border: 1px solid rgb(156, 154, 154);
}
</style>