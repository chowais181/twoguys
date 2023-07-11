<template>
  <div>
    <PitchIdea :isDialogOpen="showPitchIdea" @close="showPitchIdea = false" />
    <v-dialog v-model="showStartDialog" max-width="600">
      <v-card min-height="20vh">
        <v-toolbar max-height="60px" flat>
          <v-spacer></v-spacer>

          <v-btn fab icon @click="showStartDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="min-height: 150px">
          <v-row class="d-flex align-center justify-center">
            <v-col cols="12" sm="10">
              <div class="text-center">
                <div class="mt-4 text-h4 font-weight-bold">
                  Lorem Ipsum Dolor
                </div>

                <v-btn
                  class="px-8 mt-8"
                  color="primary"
                  large
                  dark
                  @click="onStartClick"
                >
                  START
                </v-btn>

                <div class="mt-4 font-weight-bold">Lorem ipsum dolor</div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card
      class="pa-6"
      :min-height="$vuetify.breakpoint.mdAndUp ? '80vh' : '91vh'"
      :outlined="$vuetify.breakpoint.mdAndUp"
      :flat="$vuetify.breakpoint.smAndDown"
    >
      <div>
        <div class="d-flex justify-space-between">
          <div class="text-body-1 font-weight-bold" v-text="item.title"></div>

          <v-icon v-if="$vuetify.breakpoint.mdAndUp">mdi-close</v-icon>
        </div>

        <div class="text-subtitle-2 blue-grey--text">
          <div v-text="item.pitch_title"></div>
          <div v-text="item.location"></div>
          <div v-text="item.profit_expectation"></div>
        </div>

        <div class="mt-4">
          <v-btn color="primary" @click="onApplyClick">Apply now</v-btn>
          <v-btn
            v-if="!isPitchSavedStatus"
            color="#BDBDBD"
            max-width="5px"
            min-width="5px"
            @click="onSavePitchClick(item)"
          >
            <v-icon small color="black">mdi-heart-outline</v-icon></v-btn
          >
          <v-btn
            v-if="isPitchSavedStatus"
            color="#BDBDBD"
            max-width="5px"
            min-width="5px"
            @click="onRemovePitchClick(item)"
          >
            <v-icon small color="red">mdi-heart-outline</v-icon></v-btn
          >
        </div>
      </div>

      <v-divider class="my-6"></v-divider>

      <v-card
        flat
        class="overflow-y-auto px-4"
        :max-height="$vuetify.breakpoint.smAndDown ? '73vh' : '40vh'"
        v-text="item.qualifications"
      ></v-card>
    </v-card>
  </div>
</template>

<script>
import PitchIdea from "~/pages/PitchIdea/index.vue";
export default {
  props: {
    item: Object,
  },

  components: {
    PitchIdea,
  },

  data() {
    return {
      showPitchIdea: false,
      showStartDialog: false,
      isPitchSavedStatus: false,
    };
  },

  methods: {
    onApplyClick() {
      this.showStartDialog = !this.showStartDialog;
    },

    onStartClick() {
      this.showPitchIdea = !this.showPitchIdea;

      this.showStartDialog = false;
    },
    onSavePitchClick(item) {
      console.info(item);

      this.$axios
        .$post("customer/pitch/save", {
          customer_id: this.$auth.$storage.getUniversal("user").customer_id,
          customer_pitch_id: item.id,
        })
        .then((data) => {
          console.info(data);
          this.isPitchSavedStatus = true;
          this.$emit("onAddPitchClick", data.customer_pitch);
        });
    },

    onRemovePitchClick(item) {
      this.$axios
        .$delete("customer/pitch/save", {
          data: {
            customer_id: this.$auth.$storage.getUniversal("user").customer_id,
            customer_pitch_id: item.id,
          },
        })
        .then((data) => {
          console.info(data);
          this.isPitchSavedStatus = false;
          this.$emit("onRemovePitchClick", item);
        });
    },
  },

  watch: {
    isPitchSavedStatus: {
      immediate: true,
      handler(val) {
        console.info("watch", val);
        this.isPitchSavedStatus = val;
      },
    },
  },
};
</script>