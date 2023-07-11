<template>
  <v-app>
    <v-container fluid fill-height>
      <v-row class="justify-center">
        <v-col cols="12" md="3">
          <div class="text-center">
            <v-img
              @click="onLogoClick"
              :max-height="$vuetify.breakpoint.smAndDown ? '60' : '80'"
              max-width="200"
              :src="require('@/assets/img/twoguysapplogo.svg')"
              contain
              class="mx-auto mb-12"
              style="cursor: pointer"
            ></v-img>
            <div class="font-bold">Reset your password</div>

            <v-card
              v-if="showErrorMessage"
              outlined
              color="#F4433666"
              class="pa-4 my-4 d-flex text-subtitle-2"
              style="border: 1px solid red"
            >
              <div class="text-left">
                That address is either invalid, not a verified primary email or
                is not associated with a personal user account.
              </div>
              <div>
                <v-btn icon class="mt-n2"><v-icon>mdi-close</v-icon></v-btn>
              </div>
            </v-card>

            <v-card v-if="showResetPassword" class="pa-4 mt-6" outlined>
              <div class="mb-4 text-left text-subtitle-2">
                Enter your user account's verified email address and we will
                send you a password reset link.
              </div>

              <v-text-field
                :rules="[rules.required]"
                outlined
                dense
                v-model="email"
              ></v-text-field>

              <v-btn color="green" dark large class="mt-4" @click="onSendResetPasswordClick"
                >Send password reset email</v-btn
              >
            </v-card>

            <v-card v-if="!showResetPassword" outlined class="my-6 pa-4 text-subtitle-2">
              <div class="text-left">
                Check your email for a link to rest your password. If it doesn't
                appear within a few minutes, check your spam folder.
              </div>

              <v-btn color="green" dark large class="mt-6" @click="onReturnSigninClick"
                >Return to sign in</v-btn
              >
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-footer padless color="primary" min-height="30px" dark>
      <v-container>
        <div class="text-center">
          Unsubscribe / © twoguys.app All rights reserved
        </div>
      </v-container>
    </v-footer> -->
  </v-app>
</template>

<router lang="yaml">
    path: /forgot-password
    name: forgot-password
</router>
<script>
export default {
  layout: "nolayout",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
      },
      email: null,
      showResetPassword: true,
      showErrorMessage: false,
      disableSendResetPassword: false
    }
  },

  methods: {
    onLogoClick(){
      this.$router.push({
        path: this.localePath("/"),
      })
    },
    
    onReturnSigninClick(){
      this.$router.push({
        path: this.localePath("/login"),
      })
    },

    async onSendResetPasswordClick(){
      if(this.email === null){
        this.$toast({
          icon: "error",
          title: "Email address is required",
        })
        return
      }

      if(this.disableSendResetPassword){
        return
      }

      this.$nuxt.$loading.start()

      this.disableSendResetPassword = true
      this.showErrorMessage = false
      
      this.$axios.$post('/user/reset-password', {
        email: this.email
      }).then((response) => {
        console.info(response)

        if(!response.success){
          this.showErrorMessage = true
          return
        }

        this.showResetPassword = false

      }).finally(() => {
        this.$nuxt.$loading.finish()
        this.disableSendResetPassword = false
      })
    }
  },

};
</script>

<style>
.font-bold {
  font-family: "Nunito-Bold", sans-serif !important;
  font-size: 24px;
}
</style>
