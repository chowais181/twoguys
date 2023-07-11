<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      show1: false,
      password: "",
      fish_type: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },

      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    userLogin: call("user/login"),
    onRegisterClick() {
      this.$router.push({
        path: this.localePath("/register"),
      });
    },

    async onLoginClick() {
      try {
        this.$nuxt.$loading.start();
        //login
        let response = await this.$auth.loginWith("local", {
          data: this.user,
        });
        if (!response.data.success) {
          this.$toast({
            icon: "error",
            title: response.data.message,
          });
          return;
        }
        this.$toast({
          icon: "success",
          title: "Successfully logged in.",
        });
        this.$auth.setUser(response.data.customer);
        this.$auth.$storage.setUniversal("isLoggedIn", true);
        this.$auth.$storage.setUniversal("user", response.data.customer);
        // console.info("response.data.customer", response.data.customer)
        this.$router.push({
          path: this.localePath("/dashboard"),
          query: {
            id: response.data.customer.customer_id,
          },
        });
        // Trial Sub löschen, wenn Sub gekauft und je nach price_id von response, fish_status zuweisen – macht beides backend
        const stripe = this.$auth.$storage.getUniversal("user").stripe_customer_id;
        const customer = this.$auth.$storage.getUniversal("user").customer_id;
        setTimeout(() => {
          this.$axios
          .get(`stripe/customers/${stripe}`)
          .then(async (response) => {
            if (response.data.success) {
              console.log("response.data.fish_type")
              console.log("response.data.fish_type")
              console.log("response.data.fish_type")
              console.log(response.data.fish_type)
              console.log(response.data.fish_type)
              this.fish_type = response.data.fish_type
            //   this.$toast({
            //     icon: "success",
            //     title: "Subscription up to date.",
            //   });
            // } else {
            //   this.$toast({
            //     icon: "error",
            //     title: "Something went wrong.",
            //   });
            }
            // console.info('response');
            // console.info(response);
            // console.info(response.data.customer.subscriptions.data[0].items.data[0].plan.id);
          });
        }, 1000)
        setTimeout(() => {
          const body = {
            "fish_type": this.fish_type
          }
          this.$axios
            .put(`customers/${customer}`, body)
            .then(async (response) => {
              if (response.data.success) {
                this.$toast({
                  icon: "success",
                  title: "Subscription up to date.",
                });
              } else {
                this.$toast({
                  icon: "error",
                  title: "Something went wrong.",
                });
              }
              // console.info('response');
              // console.info(response);
              // console.info(response.data.customer.subscriptions.data[0].items.data[0].plan.id);
            });
        }, 2000)
      } catch (error) {
        console.error(error);
      } finally {
        this.$nuxt.$loading.finish();
      }
      this.loading = false
    },

    onForgotPasswordClick() {
      this.$router.push({
        path: "/forgot-password",
      });
    },
  },
};
</script>

<template>
  <v-container fluid
               fill-height>
    <v-row>
      <v-col cols="12"
             class="d-flex justify-center">
        <v-card ref="form"
                :width="$vuetify.breakpoint.smAndDown ? '100%' : '30vw'"
                min-height="410"
                class="pa-4 px-sm-10 d-flex align-center">
          <v-card-text>
            <!-- <v-img
              height="50"
              width="250"
              :src="require('@/assets/logo.png')"
              class="mx-auto mb-6"
              contain
            ></v-img> -->

            <div class="text-h6 mb-4 text-center font-weight-bold">
              {{ $t("loginToYourAccount") }}
            </div>

            <label class="font-weight-bold">Email</label>
            <v-text-field v-model="user.username"
                          :rules="[rules.required]"
                          outlined
                          dense></v-text-field>

            <div class="d-flex justify-space-between mb-n2">
              <label class="font-weight-bold">{{ $t("password") }}</label>

              <p @click="onForgotPasswordClick">{{ $t("forgotPassword") }}</p>
            </div>
            <v-text-field v-model="user.password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          outlined
                          dense></v-text-field>

            <!-- <v-checkbox label="Remember me" class="mt-n2"></v-checkbox> -->

            <v-btn block
                   color="primary"
                   class="mt-4"
                   dark
                   x-large
                   @click="onLoginClick">
              {{ $t("login") }}
            </v-btn>

            <v-btn block
                   color="primary"
                   class="mt-4 mb-2"
                   dark
                   x-large
                   @click="onRegisterClick"
                   outlined>
              {{ $t("createAccount") }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-text-field>.v-input__control>.v-input__slot {
  border: 2px solid #fff;
}
</style>
