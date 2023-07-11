<template>
  <v-dialog v-model="showDialog" fullscreen scrollable>
    <v-card tile>
      <v-toolbar max-height="60px" flat outlined color="primary" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title> <h3>Post My Idea</h3></v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn fab icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-6 px-md-16">
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="10">
            <v-card class="px-6 my-16" outlined>
              <v-stepper v-model="e1" class="my-8" flat>
                <v-stepper-header>
                  <v-stepper-step
                    :complete="e1 > 1"
                    step="1"
                    class="pl-md-16 ml-md-16"
                  >
                    Create Pitch
                  </v-stepper-step>

                  <v-divider class="mx-md-2"></v-divider>

                  <v-stepper-step
                    :complete="e1 > 2"
                    step="2"
                    class="pr-md-16 mr-md-16"
                  >
                    Pitch Assessment
                  </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-container class="mt-10">
                      <label for="" class="label">Pitch Title</label>
                      <v-text-field
                        dense
                        outlined
                        v-model="customer_pitch.pitch_title"
                      ></v-text-field>

                      <label for="" class="label">Expectations</label>
                      <v-textarea
                        v-model="customer_pitch.expectations"
                        outlined
                        rows="2"
                        placeholder="This is why I need a partner. That's why I don't start the business alone..."
                      ></v-textarea>

                      <label for="" class="label">Location</label>
                      <v-select
                        :items="locations"
                        outlined
                        item-text="name"
                        v-model="customer_pitch.location"
                        placeholder="Internation business or only in your country..."
                      ></v-select>

                      <label for="" class="label">Profit Expectation</label>
                      <v-textarea
                        v-model="customer_pitch.profit_expectation"
                        outlined
                        rows="2"
                        placeholder="Expected monthly profit at the end of 2022..."
                      ></v-textarea>

                      <label for="" class="label">Qualification</label>
                      <v-textarea
                        v-model="customer_pitch.qualifications"
                        outlined
                        rows="2"
                        placeholder="This qualifies me to make this project successful..."
                      ></v-textarea>

                      <label for="" class="label">Income</label>
                      <v-textarea
                        v-model="customer_pitch.income"
                        outlined
                        rows="2"
                        placeholder="How much money have you earned as an entrepreneur so far..."
                      ></v-textarea>

                      <label for="" class="label">Availability</label>
                      <v-textarea
                        v-model="customer_pitch.availability"
                        outlined
                        rows="2"
                        placeholder="These are the hours I will invest in the project each week..."
                      ></v-textarea>

                      <label for="" class="label">Profit so far</label>
                      <v-textarea
                        v-model="customer_pitch.profit_so_far"
                        outlined
                        rows="2"
                        placeholder="Have you already made a profit with this project?"
                      ></v-textarea>

                      <label for="" class="label">Credit</label>
                      <v-textarea
                        v-model="customer_pitch.credit"
                        outlined
                        rows="2"
                        placeholder="Have you taken any loans for this project?"
                      ></v-textarea>

                      <label for="" class="label">Other notes</label>
                      <v-textarea
                        v-model="customer_pitch.other_notes"
                        outlined
                        rows="2"
                        placeholder="Other comments about the project"
                      ></v-textarea>

                      <div
                        style="
                          position: fixed;
                          bottom: 0;
                          left: 0;
                          right: 0;
                          background-color: white;
                          width: 100vw;
                        "
                      >
                        <v-row class="d-flex justify-center">
                          <v-col cols="11" md="9" class="px-6">
                            <div
                              class="buttons text-right pt-3 pb-6 elevation-0"
                            >
                              <v-btn color="primary" @click="e1 = 2">
                                Next
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </v-container>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-container>
                      <!-- Add questions dialog -->
                      <v-dialog v-model="showAddQuestionDialog" max-width="600">
                        <v-card min-height="20vh">
                          <v-toolbar max-height="60px" flat>
                            <v-spacer></v-spacer>
                            <v-toolbar-title>Add Question</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                              fab
                              icon
                              @click="showAddQuestionDialog = false"
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-toolbar>
                          <v-card-text style="min-height: 150px">
                            <v-container>
                              <label class="label">Question</label>
                              <v-textarea
                                v-model="questionTitle"
                                outlined
                                rows="2"
                              ></v-textarea>
                              <v-checkbox
                                v-model="questionOptional"
                                label="Optional"
                                class="mt-n4"
                              ></v-checkbox>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="onSaveQuestionClick"
                              >Add</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <!-- End of dialog -->

                      <v-card min-height="20vh" outlined class="mb-4">
                        <v-toolbar color="white" flat>
                          <v-toolbar-title
                            class="
                              black--text
                              text-body-1 text-sm-h6
                              ml-n2 ml-sm-1
                            "
                          >
                            Questions
                          </v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            @click="onAddQuestionClick"
                            :small="$vuetify.breakpoint.smAndDown"
                          >
                            Add questions
                          </v-btn>
                        </v-toolbar>
                        <v-card-text style="min-width: 100px">
                          <v-row
                            class="text-center"
                            v-for="question in customer_pitch.assessment_questions"
                            :key="question.index"
                          >
                            <v-col cols="12" class="d-flex align-center">
                              <v-icon>mdi-circle-small</v-icon>
                              <v-card
                                width="100%"
                                class="pa-4 mr-2 text-left d-flex align-center"
                                outlined
                              >
                                <div>{{ question.question_title }}</div>
                              </v-card>
                              <v-icon
                                @click="onRemoveQuestionClick(question.uuid)"
                                >mdi-close</v-icon
                              >
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                      <!-- <label for="" class="label">Expectations</label>
                      <v-textarea
                        v-model="customer_pitch.pitch_title"
                        outlined
                        rows="2"
                        placeholder="This is why I need a partner. That's why I don't start the business alone..."
                      ></v-textarea> -->
                    </v-container>

                    <div
                      style="
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background-color: white;
                        width: 100vw;
                      "
                      class="d-flex justify-center"
                    >
                      <v-row class="d-flex justify-center">
                        <v-col cols="11" md="9" class="px-6">
                          <div
                            class="
                              buttons
                              d-flex
                              justify-space-between
                              pt-3
                              pb-6
                            "
                          >
                            <v-btn @click="e1 = 1" color="primary" outlined>
                              Back
                            </v-btn>
                            <v-btn color="primary" @click="onSubmitPitchClick">
                              Submit Pitch
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <!-- 
      <v-card-actions class="py-3">
        <v-spacer></v-spacer>
        <v-btn color="primary" dark>Publish Pitch</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>


<router lang="yaml">
    path: /v1//pitch-my-idea
    name: v1-pitch-my-idea
</router>

<script>
import { DialogMixin } from "~/mixins/DialogMixin";
import { uuid } from "vue-uuid";

export default {
  mixins: [DialogMixin],
  data: () => ({
    e1: 1,
    showAddQuestionDialog: false,
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

    locations: [
      { id: 1, name: "Worldwide" },
      {
        id: 2,
        name: "Germany",
      },
    ],

    questionTitle: "",
    questionOptional: false,

    customer_pitch: {
      pitch_title: null,
      expectations: null,
      location: null,
      profit_expectation: null,
      qualifications: null,
      income: null,
      availability: null,
      credit: null,
      profit_so_far: null,
      other_notes: null,
      assessment_questions: [],
    },
  }),

  computed: {},

  methods: {
    onAddQuestionClick() {
      (this.questionTitle = ""), (this.questionOptional = false);
      this.showAddQuestionDialog = !this.showAddQuestionDialog;
    },
    async onSubmitPitchClick() {
      this.$axios
        .$post("customer/pitches", {
          customer_id: this.$auth.$storage.getUniversal("user").customer_id,
          ...this.customer_pitch,
        })
        .then((response) => {
          console.info(response);
          if (response.success) {
            this.$toast({
              icon: "success",
              title: "Successfully created pitch.",
            });
            this.closeDialog();
            this.customer_pitch = {
              pitch_title: null,
              expectations: null,
              location: null,
              profit_expectation: null,
              qualifications: null,
              income: null,
              availability: null,
              credit: null,
              profit_so_far: null,
              other_notes: null,
              assessment_questions: [],
            };
          }
        });
    },

    onSaveQuestionClick() {
      this.customer_pitch.assessment_questions.push({
        uuid: uuid.v4(),
        question_title: this.questionTitle,
        question_order_num: 0,
        question_optional: this.questionOptional,
      });
      this.showAddQuestionDialog = false;
    },

    onRemoveQuestionClick(uuid) {
      this.customer_pitch.assessment_questions.splice(
        this.customer_pitch.assessment_questions.findIndex(
          (items) => items.uuid === uuid
        ),
        1
      );
    },
  },
};
</script>

<style scoped>
.full-bg {
  width: 100vw;
  margin: -5 auto;
  background-color: #4f4fff;
  color: white;
}
</style>

