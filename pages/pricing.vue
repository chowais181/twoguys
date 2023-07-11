<template>
  <v-container fluid fill-height color="primary">
    <div class="pricing-headlines">
      <h1>Two Guys Pricing</h1>
      <p>
        14 days free trial for everyone who take their business very seriously.
      </p>
    </div>

    <!-- PLAN SELECTOR TABLE -->
    <v-row>
      <v-col class="pricing-card">
        <p class="text-center pricing-heading">Free Plan</p>
        <div class="pricingContainer">
          <p>Free but you can't post or contact in the club search.</p>
          <div class="cta-section">
            <h2 style="font-size: 2rem">Free</h2>
            <span class="small">USD/user/month</span>
            <v-btn class="mr-2 gray--text text-body-1 rounded" color="primary">
              TRY FOR FREE
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col class="pricing-card">
        <p class="text-center pricing-heading">Small Fish</p>
        <div class="pricingContainer">
          <p>
            Beginner, to join all users with the same plan in the club search.
          </p>
          <div class="cta-section" style="margin-top: -25px">
            <h2 class="pricing-d">7</h2>
            <span class="small">USD/user/month</span>
            <stripe-checkout
              ref="checkoutRefSmall"
              mode="subscription"
              :pk="publishableKey"
              :client-reference-id="clientReferenceId"
              :line-items="lineitemsSmall"
              :success-url="successUrlSmall"
              :cancel-url="cancelUrl"
              @loading="(v) => (loading = v)"
            />
            <v-btn
              @click="submitSmall"
              class="mr-2 gray--text text-body-1 rounded"
              color="primary"
            >
              UPGRADE NOW
            </v-btn>
          </div>
        </div>
      </v-col>
      <div></div>
      <v-col class="pricing-card">
        <p class="text-center pricing-heading">Medium Fish</p>
        <div class="pricingContainer">
          <p>
            Advanced, to join all users with the same plan in the club search
            and below.
          </p>
          <div class="cta-section" style="margin-top: -25px">
            <h2 class="pricing-d">37</h2>
            <span class="small">USD/user/month</span>
            <stripe-checkout
              ref="checkoutRefMedium"
              mode="subscription"
              :pk="publishableKey"
              :client-reference-id="clientReferenceId"
              :line-items="lineitemsMedium"
              :success-url="successUrlMedium"
              :cancel-url="cancelUrl"
              @loading="(v) => (loading = v)"
            />
            <v-btn
              @click="submitMedium"
              class="mr-2 gray--text text-body-1 rounded"
              color="primary"
            >
              UPGRADE NOW
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col class="pricing-card">
        <p class="text-center pricing-heading">Big Fish</p>
        <div class="pricingContainer">
          <p>
            Pro, to join all users with the same plan in the club search and
            below.
          </p>
          <div class="cta-section" style="margin-top: -25px">
            <h2 class="pricing-d">97</h2>
            <span class="small">USD/user/month</span>
            <stripe-checkout
              ref="checkoutRefBig"
              mode="subscription"
              :pk="publishableKey"
              :client-reference-id="clientReferenceId"
              :line-items="lineitemsBig"
              :success-url="successUrlBig"
              :cancel-url="cancelUrl"
              @loading="(v) => (loading = v)"
            />
            <v-btn
              @click="submitBig"
              class="mr-2 gray--text text-body-1 rounded"
              color="primary"
            >
              UPGRADE NOW
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-container>
      <div class="pricingCancelContainer">
        <p>Do you want to cancel your subscription?</p>
        <v-btn
          class="mr-2 gray--text text-body-1 rounded"
          color="primary"
          @click="BigFishBtnClicked"
          >CANCEL</v-btn
        >
      </div>
    </v-container>

    <div class="pricing-headlines mt-30">
      <h1>Compare editions and top features</h1>
    </div>
    <v-container>
      <v-row class="comparisonContainer">
        <v-col md="4"> </v-col>
        <v-col md="2" class="cetf free-cetf">
          <span class="free-cetf-head">Free</span>
          <!-- <span class="small">USD/user/month**</span> -->
        </v-col>
        <v-col class="cetf" md="2">
          <span>Small Fish</span>
          <h2 class="pricing-d">7</h2>
          <span class="small">USD/user/month</span>
        </v-col>
        <v-col class="cetf" md="2">
          <span>Medium Fish</span>
          <h2 class="pricing-d">37</h2>
          <span class="small">USD/user/month</span>
        </v-col>
        <v-col class="cetf" md="2">
          <span>Big Fish</span>
          <h2 class="pricing-d">97</h2>
          <span class="small">USD/user/month</span>
        </v-col>
      </v-row>
      <v-row class="comparisonContainerDetail">
        <v-col md="4">
          <span class="feature-name">Unlimited Posts</span>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
      </v-row>
      <v-row class="comparisonContainerDetail">
        <v-col md="4">
          <span class="feature-name">Unlimited Applications</span>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
      </v-row>

      <v-row class="comparisonContainerDetail">
        <v-col md="4">
          <span class="feature-name">Main Features</span>
          <p class="feature-name-subt">
            Access to a list of all participants from your region who want to
            start a business
          </p>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#FFFFFF" class="feature-icon-close">
            mdi-close
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <div class="feature-icon-flex">
            <v-icon small color="#1a8200" class="feature-icon-right">
              mdi-check
            </v-icon>
            <span class="feature-detail-text">SMALL FISH</span>
          </div>
        </v-col>
        <v-col md="2" class="feature-list">
          <div class="feature-icon-flex">
            <div class="feature-icon-flex">
              <v-icon small color="#1a8200" class="feature-icon-right">
                mdi-check
              </v-icon>
              <span class="feature-detail-text">MEDIUM FISH</span>
            </div>
            <div class="feature-icon-flex">
              <v-icon small color="#1a8200" class="feature-icon-right">
                mdi-check
              </v-icon>
              <span class="feature-detail-text">SMALL FISH</span>
            </div>
          </div>
        </v-col>
        <v-col md="2" class="feature-list">
          <div class="feature-flex-holder">
            <div class="feature-icon-flex">
              <v-icon small color="#1a8200" class="feature-icon-right">
                mdi-check
              </v-icon>
              <span class="feature-detail-text">BIG FISH</span>
            </div>
            <div class="feature-icon-flex">
              <v-icon small color="#1a8200" class="feature-icon-right">
                mdi-check
              </v-icon>
              <span class="feature-detail-text">MEDIUM FISH</span>
            </div>
            <div class="feature-icon-flex">
              <v-icon small color="#1a8200" class="feature-icon-right">
                mdi-check
              </v-icon>
              <span class="feature-detail-text">SMALL FISH</span>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="comparisonContainerDetail">
        <v-col md="4">
          <span class="feature-name">Public Fish Symbol</span>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#FFFFFF" class="feature-icon-close">
            mdi-close
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
        <v-col md="2" class="feature-list">
          <v-icon small color="#1a8200" class="feature-icon-right">
            mdi-check
          </v-icon>
        </v-col>
      </v-row>
    </v-container>
    <div class="pricing-headlines">
      <h1>Two Guys Pricing FAQ</h1>
    </div>
    <v-expansion-panels style="border-radius: none">
      <v-expansion-panel>
        <v-expansion-panel-header>
          What does the Premium subscription do for me?
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          The big advantage is that you can contact people who are as serious
          about business. Depending on which plan you have selected, registered
          users in this plan will be displayed and you can contact them
          directly.
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Are there upfront costs or additional fees?
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          There are no upfront costs and no additional fees. We offer 14 days
          free trial after registration for each account.
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          How can I cancel or change my subscription?
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          After signing up for a paid subscription, you have the option to
          change or cancel your subscription at any time.
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Can I pay monthly?
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          There are no discounted annual contracts. Each subscription must pay
          monthly with us. In return, everyone can cancel monthly without any
          problems.
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Can I upgrade at anytime?
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Every user has the possibility to upgrade his subscription at any
          time. Just select the plan you want, complete the registration with
          Stripe and you will receive the new premium benefits.
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          What is the benefit behind TwoGuys?
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          We connect people who are really serious about business.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-container class="pricingBottomContainer custom-container-padding">
      <div class="pricingBottomContainer-data">
        <h1>
          Questions? We'll put you<br />
          on the right path.
        </h1>
        <p class="pb-2">
          Ask about TwoGuys products, pricing, technical support, or anything
          else. <br />
          Our knowledgeable developers are ready to help. Or check out our<br />
          pricing list and packages above to learn more.
        </p>
        <v-row class="mb-2">
          <v-col>
            <v-btn
              color="#0b5dab"
              class="contactUsButton"
              href="mailto:sales@twoguys.app"
              >Contact us</v-btn
            >
          </v-col>
        </v-row>
        <span class="small-subt">OR SALES@TWOGUYS.APP</span>
      </div>
    </v-container>
    <!-- <v-container class="custom-container-padding">
      <h3 class="pfbth">
        The online contact does not replce a meeting in real life
      </h3>
      <h3 class="pfbth">It is not our intention to replace it</h3>
      <h3 class="pfbth">
        We recomend our users to arrange a personal meeting in real life with
        their counterpart after the initial contact via our plateform
      </h3>
    </v-container> -->
  </v-container>
</template>
<script>
var qs = require("qs");
export default {
  data() {
    this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    this.secretKey = process.env.STRIPE_SECRET_KEY;
    return {
      loading: false,
      lineitemsSmall: [
        {
          price: "price_1MeGngKZRFtAHMBz2JbqpbhN",
          quantity: 1,
        },
      ],
      lineitemsMedium: [
        {
          price: "price_1MeHOOKZRFtAHMBzkTAEbxI9",
          quantity: 1,
        },
      ],
      lineitemsBig: [
        {
          price: "price_1MeHP5KZRFtAHMBzYkGhHbEV",
          quantity: 1,
        },
      ],
      successUrlSmall: "http://localhost:3000",
      successUrlMedium: "http://localhost:3000",
      successUrlBig: "http://localhost:3000",
      clientReferenceId: "",
      cancelUrl: "http://localhost:3000",
      sessionId:
        "cs_test_a13ncK4hPSln8Q9oNQw1lL6omUlCIWtxLTGO10p1Ao2ChcKiZqbfhvLFCb",
      urlFrom: true,
      customer_id: "",
      customer_stripe_id: "",
      success_token: "",
      success_token_length: 0,
    };
  },
  setup() {},
  methods: {
    // handle logic here to cancel the subscription
    BigFishBtnClicked() {
      this.$axios
        .post(`https://2guys.yesbyt.com/v1/stripe/checkout-session`, {
          cancel_url: "https://twoguys.com/pricing?cancelled=true",
          price_id: "price_1M1xYnLLHpBosu5LlIVDPJiu",
        })
        .then((response) => {
          window.location.href = response.data.session.url;
          console.log(response.data);
        });
      this.customerId = this.$auth.$storage.getUniversal("user").customer_id;
      this.$axios
        .put(`https://2guys.yesbyt.com/v1/customers/pricing`, {
          customer_id: this.customerId,
          has_fish: "BIG",
        })
        .then((response) => {
          this.response_data = response.data;
          console.log(this.response_data);
        });
    },
    async fetch() {
      this.$nuxt.$loading.start();
      this.customerId = this.$route.query.id;
      this.$axios.get(`customers/${this.customerId}`).then((response) => {
        console.info(response.data);
        if (response.data.success) {
          this.customer = response.data.customer;
        }
      });
    },
    makeBigFish() {
      this.customerId = this.$auth.$storage.getUniversal("user").customer_id;
      this.$axios
        .put(`https://2guys.yesbyt.com/v1/customers/pricing`, {
          customer_id: this.customerId,
          has_fish: "BIG",
        })
        .then((response) => {
          this.response_data = response.data;
          console.log(this.response_data);
        });
    },
    submitSmall() {
      this.submitSubscription(process.env.STRIPE_SMALL_FISH_PRICE_ID);
      // this.$refs.checkoutRefSmall.redirectToCheckout();
    },
    submitMedium() {
      this.submitSubscription(process.env.STRIPE_MEDIUM_FISH_PRICE_ID);
      // this.$refs.checkoutRefMedium.redirectToCheckout();
    },
    submitBig() {
      this.submitSubscription(process.env.STRIPE_BIG_FISH_PRICE_ID);
      // this.$refs.checkoutRefBig.redirectToCheckout();
    },
    submitSubscription(price_id) {
      this.$axios
        .post("/stripe/checkout-sessions", {
          stripe_customer_id: this.customer_stripe_id,
          price_id: price_id,
        })
        .then(async (response) => {
          if (response.data.success) {
            this.$toast({
              icon: "success",
              title: "Checkout session successfully created.",
            });
            // this.$router.push({
            //   path: response.data.session.url
            // });
            window.location.href = response.data.session.url;
          } else {
            this.$toast({
              icon: "error",
              title: "Something went wrong.",
            });
          }
          console.info("response");
          console.info(response);
        });
      this.loading = false;
      // this.$refs.checkoutRefMedium.redirectToCheckout();
    },
  },
  beforeMount() {
    window.addEventListener("beforeunload", (event) => {
      if (!this.isEditing) return;
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
    });
  },
  created() {
    this.customerId = this.$auth.$storage.getUniversal("user").customer_id;
    this.customer_stripe_id =
      this.$auth.$storage.getUniversal("user").stripe_customer_id;
  },
};
</script>
<style>
.Pricing-Success {
  padding: 20px;
  text-align: center;
}

.custom-container-padding {
  margin: 50px 0;
}

.pricing-headlines {
  padding: 50px 0;
}

.pricing-headlines h1 {
  font-weight: normal;
}

.pricingCancelContainer {
  background: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pricingCancelContainer p {
  margin-top: 13px;
  margin-right: 30px;
}
.pricingContainer {
  background: #fff;
  padding: 40px 20px;
  height: 300px;
}

.pricingContainer .cta-section {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}

.pricingContainer .cta-section h2 {
  padding: 20px;
}

.pricingContainer .cta-section span.small {
  padding-bottom: 20px;
  font-size: 12px;
}

p.pricing-heading {
  font-weight: normal;
  font-size: 30px;
}

h2.pricing-d {
  font-weight: bolder;
  font-size: 2rem;
}

h2.pricing-d::before {
  content: "$ ";
}

.comparisonContainer {
  background: #fff;
}

.cetf {
  background: #4f3fff;
  border-left: 2px solid #fff;
  color: #fff;
  text-align: center;
  font-size: 16px;
}

.cetf h2.pricing-d {
  font-size: 25px;
  font-weight: normal;
}

.free-cetf {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.free-cetf span.free-cetf-head {
  font-size: 25px;
}

.feature-name {
  font-size: 1.5rem;
}

.feature-list {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: #d8dbdd solid 2px;
}

.feature-list .feature-icon-right {
  background: #c2ddb8;
  border-radius: 50%;
  padding: 1px;
}

.feature-list .feature-icon-close {
  border-radius: 50%;
  padding: 1px;
  background: #cac7c2;
}

.comparisonContainerDetail {
  background: #fbfbfa;
  border-bottom: #d8dbdd solid 2px;
}

.comparisonContainerDetail .feature-name-subt {
  font-size: 12px;
}

.pricingBottomContainer {
  background: url("~/assets/img/fish-premium-banner.png");
  background-size: 100%;
  padding: 5em;
  background-color: white;
}

.pricingBottomContainer .pricingBottomContainer-data h1 {
  font-size: 35px;
  font-weight: normal;
}

.pricingBottomContainer .pricingBottomContainer-data p {
  font-size: 14px;
  font-weight: normal;
}

.pricingBottomContainer .pricingBottomContainer-data .contactUsButton {
  border-radius: 5px;
  color: #fff;
}

.pricingBottomContainer .pricingBottomContainer-data a {
  text-decoration: none;
  color: #0a5dab;
  padding-left: 10px;
}

h3.pfbth {
  font-weight: normal;
  font-size: 25px;
}

/* .pb-10{
    padding-bottom: 3px;
}
.mb-10{
    margin-bottom: 3px;
} */
</style>
