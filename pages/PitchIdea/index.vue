<template>
  <v-dialog
    v-model="showDialog"
    scrollable
    max-width="700px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card tile>
      <v-toolbar max-height="60px" flat>
        <v-spacer></v-spacer>
        <v-toolbar-title
          class="
            text-body-2 text-center text-md-h5
            font-weight-black
            black--text
          "
        >
          {{ customerIdea.pitch_title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn fab icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-0 px-md-16 py-0">
        <!-- Submit Pitch Dialog -->
        <v-dialog v-model="showSubmitDialog" width="500">
          <v-card min-height="20vh">
            <v-toolbar max-height="60px" flat>
              <v-spacer></v-spacer>

              <v-btn fab icon @click="showSubmitDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text style="min-height: 150px">
              <v-container class="d-flex justify-center">
                <div class="text-center">
                  <v-icon color="green" size="150px">mdi-check-circle</v-icon>

                  <div>
                    Congratulations. <br />
                    Your request has been sent.
                  </div>

                  <!-- <v-btn class="px-8 mt-6" color="green" dark>
                    Back to Home Page
                  </v-btn> -->
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- End of Dialog -->

        <div
          class="text-center font-weight-black text-caption text-md-body-2 px-4"
        >
          These are the question
          <strong>{{ customerIdea.customer.name }}</strong> has selected for all
          applicants
        </div>

        <v-row class="d-flex justify-center" dense no-gutters>
          <v-col cols="12">
            <v-form ref="form-answer-questions" v-model="valid" lazy-validation>
              <v-container class="mt-4">
                <div
                  v-for="item in customerIdea.customer_pitch_assessment_questions"
                  :key="item.id"
                >
                  <label for="" class="label">
                    {{ item.question_title }}
                    <span v-if="item.question_optional == 1" class="grey--text"
                      >(Optional)</span
                    ></label
                  >
                  <v-textarea
                    v-model="item.answer"
                    outlined
                    rows="2"
                    placeholder="Answer"
                    auto-grow
                    :rules="[rules.required]"
                  ></v-textarea>
                </div>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="py-3 px-16">
        <v-btn color="grey" dark small class="rounded-pill py-2">
          <v-icon>mdi-flag-outline</v-icon> Report
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="onSubmitPitchClick"> Apply </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DialogMixin } from "~/mixins/DialogMixin";

export default {
  name: "PitchIdea",
  mixins: [DialogMixin],
  props: {
    applyPitchIdea: {
      type: Object,
    },
  },
  data: () => ({
    valid: true,
    rules: {
      required: (value) => !!value || "Required.",
    },
    showSubmitDialog: "",
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },

      {
        text: "Pitch My Idea",
        disabled: true,
      },
    ],

    customerId: null,

    customer: {
      customer_id: null,
      name: null,
      age: null,
      email: null,
      gender: null,
      customer_occupations: [],
      customer_startups: [],
      customer_pitches: [],
    },

    customerApplicantEmail: null,
    showContactInfo: false,
    nextStepLabel: "Next",

    customerIdea: null,
  }),

  computed: {},

  methods: {
    onNextClick() {
      if (this.showContactInfo) {
        this.e1 = 2;
        this.nextStepLabel = "Next";
      } else {
        this.onSubmitPitchClick();
      }
    },

    onSubmitPitchClick() {
      if (!this.$refs["form-answer-questions"].validate()) return;

      console.info(this.$auth.$storage.getUniversal("user"));

      try {
        let customerId =
          this.$auth.$storage.getUniversal("user") === null ||
          this.$auth.$storage.getUniversal("user") === undefined
            ? 0
            : this.$auth.$storage.getUniversal("user").customer_id;
        let customerEmail =
          this.$auth.$storage.getUniversal("user") === null ||
          this.$auth.$storage.getUniversal("user") === undefined
            ? this.customerApplicantEmail
            : this.$auth.$storage.getUniversal("user").email;

        let questionAnswers = [];

        this.customerIdea.customer_pitch_assessment_questions.forEach(
          (item) => {
            console.info(item.answer);
            questionAnswers.push({
              customer_pitch_assessment_question_id: item.id,
              question: item.question_title,
              customer_answer: item.answer,
            });
          }
        );

        this.$axios
          .$post("customer/pitch/assessment/applicants", {
            customer_id: customerId,
            customer_pitch_id: this.customerIdea.id,
            customer_applicant_email: customerEmail,
            question_answers: questionAnswers,
          })
          .finally(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            window.location.reload(true);
          });
      } catch (error) {
        console.error(error);
      }

      this.showSubmitDialog = !this.showSubmitDialog;
      this.showDialog = false;
    },

    showContactInfoInit() {
      this.showContactInfo =
        this.$auth.$storage.getUniversal("user") === null ||
        this.$auth.$storage.getUniversal("user") === undefined
          ? true
          : false;
      // console.info("xxx", this.showContactInfo);
      // console.info("xxx1", this.$auth.$storage.getUniversal("user"));

      if (this.showContactInfo) {
        this.nextStepLabel = "Next";
      } else {
        this.nextStepLabel = "Apply";
      }
    },
  },

  watch: {
    applyPitchIdea: {
      immediate: true,
      handler(val) {
        this.customerIdea = {
          ...{
            id: null,
            customer_id: null,
            pitch_title: null,
            expectations: null,
            location: null,
            profit_expectation: null,
            qualifications: null,
            income: null,
            availability: null,
            profit_so_far: null,
            credit: null,
            other_notes: null,
            customer: {
              user_id: null,
              customer_id: null,
              name: null,
              age: null,
              email: null,
              gender: null,
            },
            customer_pitch_assessment_questions: [],
          },
          ...val,
        };
        this.showContactInfoInit();
      },
    },
  },

  mounted() {},
};
</script>

<style scoped>
</style>

