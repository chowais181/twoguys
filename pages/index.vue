<script>
import PitchMyIdea from "~/pages/PitchMyIdea.vue";
import PitchIdea from "~/pages/PitchIdea/index.vue";
import dayjs from "dayjs";
import InfoBar from "~/components/InfoBar.vue";
import FilterBar from "../components/FilterBar.vue";
import IdeasContainer from "../components/IdeasContainer.vue";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
export default {
  components: {
    PitchMyIdea,
    PitchIdea,
    InfoBar,
    FilterBar,
    IdeasContainer,
  },
  data() {
    return {
      showPitchMyIdeaDialog: false,
      postIdeas: [],
    };
  },
  head() {
    return {
      title: `The Easiest Business Partner Finder`,
    };
  },
  methods: {
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
    getAllPitches(location) {
      let user = this.$auth.$storage.getUniversal("user");
      this.$axios
        .$get("pitches", {
          params: {
            locations_filter: location,
            ...(user && { customer_id: user.customer_id }),
          },
        })
        .then((data) => {
          this.postIdeas = data.customer_pitches;
        });
    },
  },
  async created() {
    const firstResponse = await fetch("https://api.ipify.org?format=json");
    const { ip } = await firstResponse.json();
    await fetch(`https://api.ipregistry.co/${ip}?key=0xjh6xmh6j0jwsy6`)
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        this.clientCurrentState = payload.location.continent.name;
      });
  },
  async fetch() {
    this.getAllPitches("Worldwide");
  },
};
</script>

<template>
  <div
    style="font-family: 'Nunito', sans-serif; max-width: 1100px; width: 100%"
  >
    <PitchMyIdea
      ref="pitchMyIdea"
      :isDialogOpen="showPitchMyIdeaDialog"
      @close="showPitchMyIdeaDialog = false"
    />
    <InfoBar :onPostClick="onPostClick" />
    <FilterBar />
    <IdeasContainer :postIdeas="postIdeas" />
  </div>
</template>
