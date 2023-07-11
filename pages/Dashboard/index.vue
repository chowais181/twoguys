<template>
  <v-container>
    <congratulations-dialog :isDialogOpen="showCongratsDialog" />
    <welcome-dialog :isDialogOpen="showWelcomeDialog" />
    <v-row>

      <!-- PUBLISHED POSTS TABLE -->
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title class="text-body-1 text-sm-h6">
              <v-icon>mdi-head-lightbulb-outline</v-icon>
              {{ $t("publishedPost") }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <!-- IDEA ENTRY -->
          <v-data-table :headers="businessIdeaHeaders" :items="customerPitches" class="elevation-0" :items-per-page="5"
            :hide-default-footer="customerPitches.length < 5" mobile-breakpoint="0" height="290px" :footer-props="{
              'items-per-page-text': $vuetify.breakpoint.smAndDown
                ? ''
                : 'Rows per page:',
            }">
            <!-- IDEA ENTRY – TITLE -->
            <template v-slot:[`item.pitch_title`]="{ item }">
              <div style="cursor: pointer;">
                  {{ item.pitch_title }}
                </div>
            </template>
            <!-- IDEA ENTRY – STATUS -->
            <template v-slot:[`item.status`]="{ item }">
              <v-icon v-if="item.status === '1'" medium color="green">
                mdi-check-circle
              </v-icon>
              <v-icon v-if="item.status !== '1'" medium color="red">
                mdi-close-circle
              </v-icon>
            </template>
            <!-- IDEA ENTRY – AMOUNT OF REQUESTS -->
            <template v-slot:[`item.customer_pitch_apply_validity.total_applicant`]="{
              item,
            }">
              <v-tooltip bottom left offset-overflow max-width="220px" open-delay="200" content-class="tooltip"
                :open-on-hover="$vuetify.breakpoint.mobile ? false : true">
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on" class="text-center rounded white--text pa-1 ml-1 px-2"
                    style="background-color: #e53935; padding-top: 12px">{{
                      item.customer_pitch_apply_validity.total_applicant
                    }}</span>
                </template>
                <span>This is the number of applications you have received by
                  email. All applications can be reviewed and accepted via
                  email.</span>
              </v-tooltip>
            </template>
            <!-- IDEA ENTRY – ACTION -->
            <template v-slot:[`item.action`]="{ item }">
              <div style="cursor: pointer;" @click="onDeletePostedIdea(item.id)">
                <v-icon :disabled="item.status !== 1" medium color="red" v-if="item.status == 1">
                  mdi-delete
                </v-icon>
              </div>
            </template>
            <!-- IDEA ENTRY – IF NO IDEA EXISTS -->
            <template v-slot:no-data>
              <v-card class="d-flex justify-center align-center" min-height="180px" flat>
                <v-card-text class="grey--text mt-12">No data available</v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- SUCCESSFUL PARTNERSHIPS – TABLE -->
      <v-col cols="12" md="6">
        <v-card min-height="414px">
          <v-toolbar color="green" dark>
            <v-toolbar-title class="text-body-1 text-sm-h6">
              {{ $t("successfulPartnership") }}
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- <v-btn
              color="transparent"
              depressed
              :small="$vuetify.breakpoint.smAndDown"
              >View All <v-icon right>mdi-chevron-right</v-icon></v-btn
            > -->
          </v-toolbar>
          <v-data-table :headers="partnerHeaders" :items="customerAcceptedPartners" class="elevation-0"
            :items-per-page="5" :hide-default-footer="customerAcceptedPartners.length < 5" mobile-breakpoint="0"
            height="290px">
            <template v-slot:[`item.customer_pitch`]="{ item }">
              <div style="white-space: nowrap">
                {{ item.customer_pitch.pitch_title }}
              </div>
            </template>
            <template v-slot:[`item.status`]>
              <v-img max-height="40" max-width="40" :src="require('@/assets/img/2guys-logo.svg')" class="ma-auto"
                contain></v-img>
            </template>

            <template v-slot:no-data>
              <v-card class="d-flex justify-center align-center" min-height="180px" flat>
                <v-card-text class="grey--text mt-12">No data available</v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- SAVED POSTS – TABLE -->
      <v-col cols="12" md="6">
        <v-card min-height="414px">
          <v-toolbar color="#2D2D2D" dark>
            <v-toolbar-title class="text-body-1 text-sm-h6">
              {{ $t("savePosts") }}
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- <v-btn
              color="transparent"
              depressed
              :small="$vuetify.breakpoint.smAndDown"
              >View All <v-icon right>mdi-chevron-right</v-icon></v-btn
            > -->
          </v-toolbar>
          <v-data-table :headers="savedBusinessIdeasHeaders" :items="customerSavedPitches" class="elevation-0"
            :items-per-page="5" :hide-default-footer="saved_business_ideas.length < 5" mobile-breakpoint="0"
            height="290px">
            <template v-slot:[`item.status`]>
              <v-icon medium color="green"> mdi-check-circle </v-icon>
            </template>

            <template v-slot:[`item.partner_request`]="{ item }">
              <span class="text-center rounded white--text pa-1 ml-1"
                style="background-color: #e53935; padding-top: 12px">{{ item.partner_request }}</span>
            </template>

            <template v-slot:no-data>
              <v-card class="d-flex justify-center align-center" min-height="180px" flat>
                <v-card-text class="grey--text mt-12">No data available</v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<router lang="yaml">
    path: /dashboard
    name: dashboard
</router>


<script>
import { call, get } from "vuex-pathify";
import CongratulationsDialog from "~/components/CongratulationsDialog.vue";

export default {
  components: { CongratulationsDialog },
  pageTitle: "Dashboard",

  data: () => ({
    businessIdeaHeaders: [
      { text: "Business Idea", value: "pitch_title" },
      {
        text: "Status",
        value: "status",
        align: "center",
        sortable: false,
      },
      {
        text: "Request",
        value: "customer_pitch_apply_validity.total_applicant",
        align: "center",
        sortable: false,
      },
      {
        text: "Action",
        value: "action",
        align: "center",
        sortable: false,
      },
    ],
    business_ideas: [
      {
        id: 1,
        business_idea: "Realestate investment",
        status: "",
        partner_request: 1,
      },
    ],

    requestSentHeaders: [
      { text: "Business Idea", value: "business_idea" },
      {
        text: "User",
        value: "user",
        align: "center",
        sortable: false,
      },
      {
        text: " Request Sent",
        value: "request_sent",
        align: "center",
        sortable: false,
      },
    ],

    request_sents: [
      {
        id: 1,
        business_idea: "Solar Panel",
        user: "2dfr",
        request_sent: "12/2/2022",
      },
    ],

    partners: [
      // {
      //   id: 1,
      //   pitch_title: "td",
      //   partner: "s",
      // },
    ],

    partnerHeaders: [
      { text: "Business Idea", value: "customer_pitch" },
      {
        text: "Status",
        value: "status",
        align: "center",
        sortable: false,
      },
      {
        text: "Partner",
        value: "customer_partner.name",
      },
    ],

    savedBusinessIdeasHeaders: [
      { text: "Business Idea", value: "customer_pitch.pitch_title" },
      {
        text: "User",
        value: "customer.name",
        align: "center",
        sortable: false,
      },
    ],

    saved_business_ideas: [
      {
        id: 1,
        business_idea: "Solar Panel",
        user: "2dfr",
      },
    ],

    customerSavedPitches: [],

    customerId: null,

    customerPitches: [],
    showCongratsDialog: false,
    showWelcomeDialog: false,
    customerAcceptedPartners: [],
  }),

  methods: {
    pitchTitleWidth() {
      if (this.customerPitches.length > 0) {
        return "300px";
      }
    },

    getAllCustomerSavedPitches() {
      this.$axios
        .$get(`customer/${this.customerId}/pitches/save`)
        .then((data) => {
          this.customerSavedPitches = data.customer_pitch;
          console.info(data);
        });
    },

    getAllCustomerPostedPitches() {
      this.$axios
        .$get(`customer/${this.customerId}/pitches`)
        .then((response) => {
          if (response.success) {
            this.customerPitches = response.customer_pitches;
          }
        });
    },

    getAllCustomerAcceptedPartners() {
      this.$axios
        .$get(`/customer/${this.customerId}/pitch/accepts`)
        .then((response) => {
          if (response.success) {
            this.customerAcceptedPartners =
              response.customer_successful_partners;
          }
        });
    },

    onDeletePostedIdea(customer_pitch_id) {
      this.$axios
        .$put(`customer/${this.customerId}/pitch/status`, {
          customer_pitch_id,
          status: 2,
        })
        .then((response) => {
          this.$toast({
            icon: "success",
            title: "Post successfully deleted",
          });
          this.customerPitches.splice(
            this.customerPitches.findIndex(
              (items) => items.id === customer_pitch_id
            ),
            1
          );
        });
    },

    onDealAccepted() {
      let pitchId = this.$route.query.pitchid;
      let applicantId = this.$route.query.applicantid;

      this.$axios
        .$post("customer/pitch/accepted", {
          customer_pitch_id: pitchId,
          customer_partner_id: applicantId,
        })
        .then((response) => {
          console.info(response);
          this.showCongratsDialog = true;
        });
    },
  },

  async fetch() {
    this.customerId = this.$auth.$storage.getUniversal("user").customer_id;
    this.getAllCustomerSavedPitches();
    this.getAllCustomerPostedPitches();
    this.getAllCustomerAcceptedPartners();
  },

  async mounted() {
    let isDealAccepted = this.$route.query.accepted;
    console.info("dealxx", isDealAccepted);
    if (isDealAccepted !== undefined || isDealAccepted !== null) {
      this.onDealAccepted();
    }
  },
};
</script>

<style >
.v-data-table-header th {
  background-color: rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(0, 0, 0, 0.124);
  white-space: nowrap;
}

tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.05);
}

.v-application--is-ltr .v-data-footer__select {
  margin-right: 0;
}

.tooltip {
  text-align: center;
  font-size: 13px !important;
}

.delete-icon:hover {
  cursor: pointer;
}

@media screen and (min-width: 960px) {
  .tooltip::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #212121 transparent;
  }
}
</style>
