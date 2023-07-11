<script>
import { DialogMixin } from "~/mixins/DialogMixin";
import { uuid } from "vue-uuid";
export default {
  mixins: [DialogMixin],
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    valid: false,
    e1: 1,
    showAddQuestionDialog: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
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

    questionTitle: "",
    questionOptional: false,

    form: null,
  }),

  computed: {},

  methods: {
    onAddQuestionClick() {
      (this.questionTitle = ""), (this.questionOptional = false);
      this.showAddQuestionDialog = !this.showAddQuestionDialog;
    },

    async onSubmitPitchClick() {
      this.form.status = "1";
      this.form.collapsed = false;
      this.form.show_contact_data = false;
      if (!this.$refs["form-create-pitch"].validate()) {
        this.$toast({
          icon: "error",
          title: "Please fill the required fields.",
        });
        this.e1 = 1;
        return;
      }
      if (this.form.assessment_questions.length < 1) {
        this.$toast({
          icon: "error",
          title: "Please add one or more questions",
        });
        this.e1 = 2;
        return;
      }
      this.$axios
        .$post("pitches", {
          customer_id: this.$auth.$storage.getUniversal("user").customer_id,
          ...this.form,
        })
        .then(async (response) => {
          console.info(response);
          if (response.success) {
            this.$toast({
              icon: "success",
              title: "Successfully created pitch.",
            });
            this.closeDialog();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // window.location.reload(true);
          }
        });
    },

    onSaveQuestionClick() {
      if (this.questionTitle.length < 1) {
        this.$toast({
          icon: "error",
          title: "Please type something on the question field.",
        });
        return;
      }

      if (
        this.form.assessment_questions.length === 10 ||
        this.form.assessment_questions > 10
      ) {
        return;
      }

      this.form.assessment_questions.push({
        uuid: uuid.v4(),
        question_title: this.questionTitle,
        question_order_num: 0,
        question_optional: this.questionOptional,
      });
      // this.showAddQuestionDialog = false;
      this.questionTitle = "";
    },

    onRemoveQuestionClick(uuid) {
      this.form.assessment_questions.splice(
        this.form.assessment_questions.findIndex(
          (items) => items.uuid === uuid
        ),
        1
      );
    },

    async checkCustomerPitchLimit() {
      this.$nuxt.$loading.start();

      try {
        let customerId = this.$auth.$storage.getUniversal("user").customer_id;

        let response = await this.$axios.$get(
          `customers/${customerId}/check-pitch-limit`
        );

        if (!response.success) {
          this.$toast({
            icon: "error",
            title: "Something went wrong.",
          });
          return;
        }

        if (response.success && !response.can_post_pitch) {
          this.$toast({
            icon: "error",
            title: "You have reached the maximum post limit per month.",
          });
        }

        return response;
      } catch (error) {
        if (error) {
          this.$toast({
            icon: "error",
            title: "Something went wrong.",
          });
          return;
        }
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
  },

  watch: {
    item: {
      handler(val) {
        this.form = {
          ...{
            pitch_title: null,
            idea_description: null,
            location: null,
            potential_yearly_revenue_min: null,
            potential_yearly_revenue_max: null,
            status: null,
            collapsed: null,
            show_contact_data: null,
            assessment_questions: [],
            customer_pitch_apply_validity: {
              post_validity: null,
              total_applicant: null,
            },
          },
          ...val,
        };
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <v-dialog v-model="showDialog" fullscreen scrollable>
    <v-card tile>
      <v-stepper v-model="e1" class="elevation-0">
        <v-toolbar max-height="70px" flat color="#F3F7FA" class="px-md-8">
          <v-img
            :max-height="$vuetify.breakpoint.smAndDown ? '40' : '50'"
            max-width="100"
            :src="require('@/assets/img/twoguysapplogo.svg')"
            contain
          ></v-img>
          <v-spacer></v-spacer>
          <v-stepper-header
            color="red"
            class="mx-auto"
            style="max-width: 700px"
          >
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
              class="pl-md-16 ml-md-16"
              :color="e1 > 1 ? '#4CAF50' : 'primary'"
            >
              {{ $t("create") }}
            </v-stepper-step>

            <v-icon class="mx-n5 mx-sm-n4">mdi-chevron-right</v-icon>

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
              :color="e1 > 2 ? '#4CAF50' : 'primary'"
            >
              {{ $t("questions") }}
            </v-stepper-step>

            <v-icon class="mx-n5 mx-sm-n4">mdi-chevron-right</v-icon>

            <v-stepper-step
              :complete="e1 > 3"
              step="3"
              class="pr-md-16 mr-md-16"
              :color="e1 > 3 ? '#4CAF50' : 'primary'"
            >
              Post
            </v-stepper-step>
          </v-stepper-header>
          <v-spacer></v-spacer>

          <v-btn fab icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="px-6 px-md-16">
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="10">
              <v-card class="px-6 my-16" flat>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-container class="px-md-16">
                      <v-form
                        ref="form-create-pitch"
                        v-model="valid"
                        lazy-validation
                      >
                        <div
                          class="
                            text-h5 text-center text-md-h4
                            mb-16
                            font-weight-black
                          "
                        >
                          Create a post to find a business partner
                        </div>
                        <!-- <div
                          class="
                            text-center
                            font-weight-black
                            text-body-2 text-md-body-2
                            my-2
                            mb-4
                          "
                        >
                          {{ $t("shareYourIdeaText") }}
                        </div> -->

                        <label class="font-weight-bold">{{
                          $t("ideaTitle")
                        }}</label>
                        <v-text-field
                          :rules="[rules.required]"
                          outlined
                          dense
                          v-model="form.pitch_title"
                          placeholder="Give your business idea a short title"
                        ></v-text-field>

                        <label class="font-weight-bold">{{
                          $t("ideaDescription")
                        }}</label>

                        <v-textarea
                          rows="4"
                          outlined
                          :rules="[rules.required]"
                          v-model="form.idea_description"
                          placeholder="Describe your business idea without giving away secrets :)"
                        ></v-textarea>

                        <v-row>
                          <v-col cols="12" md="6">
                            <label class="font-weight-bold">{{
                              $t("location")
                            }}</label>
                            <v-select
                              :items="require('~/assets/json/locations.json')"
                              :rules="[rules.required]"
                              item-text="name"
                              outlined
                              dense
                              v-model="form.location"
                              placeholder="In this place I start my business"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" md="6">
                            <label class="font-weight-bold">
                              {{ $t("expectedYearlyRev") }}
                              <span class="grey--text">
                                ({{ $t("optional") }})
                              </span>
                            </label>
                            <InputPriceValue
                              @onValueChange="
                                (val) => {
                                  this.form.potential_yearly_revenue_max = val;
                                }
                              "
                            />
                          </v-col>
                        </v-row>
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
                                <v-btn color="primary" @click="e1 = 2" large>
                                  {{ $t("next") }}
                                </v-btn>
                              </div>
                            </v-col>
                          </v-row>
                        </div>
                      </v-form>
                    </v-container>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-container class="text-center px-md-16">
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

                      <div class="text-h5 text-md-h4 font-weight-black">
                        {{ $t("askQuestions") }}
                      </div>
                      <div
                        class="
                          font-weight-black
                          text-body-2 text-md-body-2
                          my-2
                        "
                      >
                        {{ $t("askQuestionText1") }}
                      </div>

                      <v-textarea
                        rows="2"
                        outlined
                        placeholder="Type something"
                        class="mt-6"
                        v-model="questionTitle"
                      ></v-textarea>

                      <v-btn
                        color="black"
                        @click="onSaveQuestionClick"
                        :small="$vuetify.breakpoint.smAndDown"
                        fab
                        dark
                        class="mb-6"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>

                      <v-row
                        class="text-center"
                        v-for="question in form.assessment_questions"
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
                          <v-icon @click="onRemoveQuestionClick(question.uuid)"
                            >mdi-close</v-icon
                          >
                        </v-col>
                      </v-row>
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
                            <v-btn
                              @click="e1 = 1"
                              color="primary"
                              outlined
                              large
                            >
                              {{ $t("back") }}
                            </v-btn>
                            <v-btn color="primary" @click="e1 = 3" large>
                              {{ $t("next") }}
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-container class="text-center px-md-16">
                      <div class="text-h5 text-md-h4 font-weight-black">
                        Publish
                      </div>
                      <div
                        class="
                          font-weight-black
                          text-body-2 text-md-body-2
                          my-2
                          px-md-16
                        "
                      >
                        {{ $t("postText") }}
                      </div>
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
                            <v-btn
                              @click="e1 = 2"
                              color="primary"
                              outlined
                              large
                            >
                              {{ $t("back") }}
                            </v-btn>
                            <v-btn
                              color="#000"
                              @click="onSubmitPitchClick"
                              large
                              dark
                            >
                              {{ $t("publish") }}
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-stepper-content>
                </v-stepper-items>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-stepper>
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
    path: /pitch-my-idea
    name: pitch-my-idea
</router>

<style scoped>
.full-bg {
  width: 100vw;
  margin: -5 auto;
  background-color: #4f4fff;
  color: white;
}
</style>

