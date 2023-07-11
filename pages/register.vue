<script>
import { call, get } from "vuex-pathify";

export default {
  props: {
    item: Object,
    value: Boolean,
  },

  data() {
    return {
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },

      genderOptions: ["Male", "Female", "Others"],
      loading: false,
      user: {
        name: "",
        age: "",
        email: "",
        gender: "",
        password: "",
        post_limit: 30,
        stripe_customer_id: "",
        fish_type: "Small, All"
      },
      subscription_data: {
        customer_id: "",
        price_id: "",
        period_days: 14
      }
    };
  },

  methods: {
    createUser: call("user/createUser"),

    onBackClick() {
      this.$router.push({
        path: this.localePath("/login"),
      });
    },

    onSignUpClick() {
      this.$router.push({
        path: this.localePath("/profile"),
      });
    },

    onSubmitClick() {
      this.loading = true,
        this.$axios
          .post(`stripe/customers`)
          .then((response) => {
            this.user.stripe_customer_id = response.data.customer.id;
            this.user.fish_type = 'Small, All';
          });
      setTimeout(() => {
        this.$axios
          .post("/customers", this.user)
          .then(async (response) => {
            if (response.data.success) {
              this.subscription_data.customer_id = this.user.stripe_customer_id;
              this.subscription_data.price_id = process.env.STRIPE_SMALL_FISH_PRICE_ID;
              this.subscription_data.period_days = 14;
              this.$toast({
                icon: "success",
                title: "Account successfully created.",
              });
              await this.$auth.$storage.setUniversal(
                "user",
                response.data.customer
              );
              await this.$auth.$storage.setUniversal("isLoggedIn", true);

              this.$router.push({
                path: this.localePath("/profile"),
                query: {
                  id: response.data.customer.customer_id,
                },
              });
            } else {
              this.$toast({
                icon: "error",
                title: "Something went wrong.",
              });
            }
            console.info('response');
            console.info(response);
          });
      }, 2500)
      setTimeout(() => {
        this.$axios
          .post("/stripe/subscriptions", this.subscription_data)
          .then(async (response) => {
            if (response.data.success) {
              this.$toast({
                icon: "success",
                title: "Subscription successfully created.",
              });

            } else {
              this.$toast({
                icon: "error",
                title: "Something went wrong.",
              });
            }

            console.info('response');
            console.info(response);
          });
        this.loading = false
      }, 8000)

      // this.createUser(this.user).then((response) => {
      //   if (response.data.success) {
      //     console.info(response.data);

      //     this.$auth.$storage.setUniversal("user", response.data.user);
      //     this.$router.push({
      //       name: "dashboard",
      //     });
      //   }
      // });
    },
  },

  async fetch() { },
};
</script>

<template>
  <div v-if="loading">
    <div class="loading-page">
      <p>{{ $t("accountCreation") }}</p>
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </div>

  <v-container v-else
               fluid
               fill-height
               color="primary">
    <v-row align="center">
      <v-col cols="12"
             class="d-flex justify-center">
        <v-card class="rounded-lg ppa-4"
                :width="$vuetify.breakpoint.smAndDown ? '100%' : '30vw'">
          <v-card-text class="px-md-12">
            <p class="text-h5 font-weight-black black--text mb-1">
              {{ $t("register") }}
            </p>
            <p class="text-caption">
              One last step before starting your free 14-day trial
            </p>
            <label class="label">{{ $t("username") }}</label>
            <v-text-field :rules="[rules.required]"
                          outlined
                          dense
                          v-model="user.name"></v-text-field>

            <label class="label">{{ $t("emailAddress") }}</label>
            <v-text-field outlined
                          dense
                          v-model="user.email"></v-text-field>

            <label class="label">{{ $t("password") }}</label>
            <v-text-field v-model="user.password"
                          :rules="[rules.required, rules.min]"
                          type="password"
                          outlined
                          dense></v-text-field>

            <!-- <label class="label">Confirm Password</label>
            <v-text-field
              v-model="user.password"
              :rules="[rules.required, rules.min]"
              type="password"
              outlined
              dense
            ></v-text-field> -->

            <div class="text-center">
              <v-btn color="primary"
                     @click="onSubmitClick">{{
                       $t("signup")
                     }}</v-btn>
            </div>

            <div class="text-caption mt-8">
              <p class="mb-0">
                By proceeding, you agree to the
                <span class="success--text">Terms and conditions</span>
              </p>
              <div class="d-flex justify-space-between align-center">
                <p class="mb-0">
                  Already have a <span>TwoGuysApp</span> account?
                  <span class="success--text">Log in</span>
                </p>
                <v-btn text
                       class="pa-0 text-caption grey--text text--darken-3">
                  Privacy
                </v-btn>
                <v-btn text
                       class="pa-0 text-caption grey--text text--darken-3">
                  Terms
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}

.spinner {
  margin: 100px auto 0;
  /* width: 70px; */
  text-align: center;
}

.spinner>div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {

  0%,
  80%,
  100% {
    -webkit-transform: scale(0)
  }

  40% {
    -webkit-transform: scale(1.0)
  }
}

@keyframes sk-bouncedelay {

  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>