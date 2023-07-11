<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-card
          ref="form"
          :width="$vuetify.breakpoint.smAndDown ? '100%' : '30vw'"
          min-height="410"
          class="pa-4 px-sm-10 d-flex align-center"
        >
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
            <v-text-field
              v-model="user.username"
              :rules="[rules.required]"
              outlined
              dense
            ></v-text-field>

            <div class="d-flex justify-space-between mb-n2">
              <label class="font-weight-bold">{{ $t("password") }}</label>

              <p>{{ $t("forgotPassword") }}</p>
            </div>
            <v-text-field
              v-model="user.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              outlined
              dense
            ></v-text-field>

            <!-- <v-checkbox label="Remember me" class="mt-n2"></v-checkbox> -->

            <v-btn
              block
              color="primary"
              class="mt-4"
              dark
              x-large
              @click="onLoginClick"
            >
              {{ $t("login") }}
            </v-btn>
          
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<router lang="yaml">
    path: /admin/login
    name: admin-login
</router>

<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      show1: false,
      password: "",
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

        this.$auth.$storage.setUniversal("isAdminLoggedIn", true)
        this.$auth.$storage.setUniversal("admin", response.data.user)

        this.$router.push({
          path: this.localePath("/admin/dashboard"),
        })

      } catch (error) {
        console.error(error);
      } finally {
        this.$nuxt.$loading.finish();
      }
    },

  },

  mounted(){
    let isAdminLoggedIn = this.$auth.$storage.getUniversal("isAdminLoggedIn")

    if(isAdminLoggedIn){
      this.$router.push({
        path: this.localePath("/admin/dashboard"),
      })
    }

  }

}
</script>

<style scoped>
.v-text-field > .v-input__control > .v-input__slot {
  border: 2px solid #fff;
}
</style>
