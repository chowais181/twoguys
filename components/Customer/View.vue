<template>
  <div>
    <v-dialog width="500" :value="showDialog" scrollable>
      <v-card>
        <v-toolbar flat dark color="primary" max-height="60px">
          <v-toolbar-title> {{ item.full_name }} </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon dark @click="showDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="px-8 py-4">
          <v-row>
            <v-col cols="4">Id</v-col>
            <v-col cols="8">{{ item.id }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Full Name</v-col>
            <v-col cols="8">{{ item.full_name }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Mobile Number</v-col>
            <v-col cols="8">{{ item.mobile_number }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Telephone Number</v-col>
            <v-col cols="8">{{ item.telephone }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Email</v-col>
            <v-col cols="8">{{ item.email }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Gender</v-col>
            <v-col cols="8">{{ item.gender }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Birthday</v-col>
            <v-col cols="8">{{ item.birthday }}</v-col>
          </v-row>
          <br />
          <b>Address</b>
          <v-divider></v-divider>
          <br />
          <v-row>
            <v-col cols="4">Address</v-col>
            <v-col cols="8">{{ item.address.address }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Barangay</v-col>
            <v-col cols="8">{{ item.address.barangay }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">City / Municipality</v-col>
            <v-col cols="8">{{ item.address.city_municipality }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Province</v-col>
            <v-col cols="8">{{ item.address.province }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Zip code</v-col>
            <v-col cols="8">{{ item.address.zip_code }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    item: Object,
  },

  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>

<style>
</style>