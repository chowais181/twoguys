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
      location: "",
    };
  },

  head() {
    const lowercaseLocation = this.location.toLowerCase();
    return {
      title: `Find a Business Partner in ${this.location}`,
      headers: {
        "X-Robots-Tag": "index,follow",
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Find business partners in ${lowercaseLocation} with our platform. Discover new opportunities and expand your network today.`,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `business partners, ${lowercaseLocation}, discover, opportunities`,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: `Find a Business Partner in ${lowercaseLocation}`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `Find business partners in ${lowercaseLocation}`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://twoguys.app/assets/img/twoguysapplogo.svg",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://twoguys.app/${lowercaseLocation}`,
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: `Find a Business Partner in ${lowercaseLocation}`,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: `Find business partners in ${lowercaseLocation} with our platform.`,
        },
        {
          hid: "robots",
          name: "robots",
          content: "index,follow",
        },
        {
          hid: "publisher",
          name: "publisher",
          content: "Two Guys",
        },
        {
          hid: "googlebot",
          name: "googlebot",
          content: "index,follow",
        },
        {
          hid: "bingbot",
          name: "bingbot",
          content: "index,follow",
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://twoguys.app/${lowercaseLocation}`,
        },
      ],
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
    async asyncData() {
      let user = this.$auth.$storage.getUniversal("user");
      let postIdeas = [];
      let location = this.$route.params.location
        .split("-")
        .map(
          (location) =>
            `${location[0].toUpperCase()}${location.slice(1, location.length)}`
        )
        .join(" ");

      console.log(location);
      try {
        const response = await this.$axios.get("pitches", {
          params: {
            locations_filter: location,
            ...(user && { customer_id: user.customer_id }),
          },
        });

        postIdeas = response.data.customer_pitches;
        this.postIdeas = postIdeas;
        console.log("Try", postIdeas);
        this.location = location;
      } catch (error) {
        console.log("catch error==>", error);
        this.postIdeas = [];
        this.location = "";
      }
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
  mounted() {
    this.asyncData();
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
    <FilterBar :location="location" />
    <IdeasContainer :postIdeas="postIdeas" />
  </div>
</template>
