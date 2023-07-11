<template>
  <v-dialog v-model="showDialog" fullscreen scrollable>
    <v-card tile>
      <v-toolbar max-height="60px" flat outlined>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <h3>{{ dialogTitle }}</h3></v-toolbar-title
        >
        <v-spacer></v-spacer>

        <v-btn fab icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-16" align="center">
        <v-form ref="form-customer" v-model="valid" lazy-validation>
          <!-- <v-text-field
            v-if="item && item.id"
            v-model="form.id"
            label="Id"
            disabled
            outlined
          ></v-text-field> -->
          <v-row justify="center text-left">
            <v-col cols="12" md="5" class="mt-13">
              <v-row dense>
                <v-col cols="12" md="6">
                  <label for="" class="label">First Name</label>
                  <v-text-field
                    v-model="form.first_name"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label for="" class="label">Last Name</label>
                  <v-text-field
                    v-model="form.last_name"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label for="" class="label">Mobile Number</label>
                  <v-text-field
                    v-model="form.mobile_number"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label for="" class="label">Telephone Number</label>
                  <v-text-field
                    v-model="form.telephone"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label for="" class="label">Email</label>
                  <v-text-field
                    v-model="form.email"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label for="" class="label">Gender</label>
                  <v-select
                    v-model="form.gender"
                    :items="genderOptions"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>

            <v-divider class="mx-6 mb-n7" vertical inset></v-divider>

            <v-col cols="12" md="5" class="mt-4">
              <p class="font-weight-bold text-left">Birthday</p>
              <v-divider class="mt-n2 mb-2"></v-divider>
              <v-row dense>
                <v-col cols="12" md="4">
                  <label for="" class="label">Month</label>
                  <v-select :items="items" outlined dense></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <label for="" class="label">Day</label>
                  <v-select :items="items" outlined dense></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <label for="" class="label">Year</label>
                  <v-select :items="items" outlined dense></v-select>
                </v-col>
              </v-row>
              <p class="font-weight-bold text-left">Address</p>
              <v-divider class="mt-n2 mb-2"></v-divider>
              <label for="" class="label">Address</label>
              <v-text-field
                v-model="form.address.address"
                :rules="[rules.required]"
                outlined
                dense
              ></v-text-field>
              <v-row dense>
                <v-col cols="12" md="6">
                  <label for="" class="label">Barangay</label>
                  <v-text-field
                    v-model="form.address.barangay"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label for="" class="label">City / Municipality</label>
                  <v-text-field
                    v-model="form.address.city_municipality"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label for="" class="label">Province</label>
                  <v-text-field
                    v-model="form.address.province"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <label for="" class="label">Zip code</label>
                  <v-text-field
                    v-model="form.address.zip_code"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="item && item.id ? update() : add()"
          depressed
          width="100px"
          large
        >
          {{ item && item.id ? "Update" : "Add" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { call, get } from "vuex-pathify";
import { last } from "lodash";
import Swal from "sweetalert2";
import moment from "moment";
import { DialogMixin } from "~/mixins/DialogMixin";

export default {
  props: {
    item: Object,
    value: Boolean,
  },

  mixins: [DialogMixin],

  data() {
    return {
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
      },
      genderOptions: ["Male", "Female"],
      dateMenu: false,
      date: null,
      form: null,
      items: ["option 1", "option 2"],
    };
  },

  methods: {
    createItem: call("customer/createItem"),
    updateItem: call("customer/updateItem"),

    add() {
      if (!this.$refs["form-customer"].validate()) return;

      //Todo: remove when data from api is done
      const _lastIdPlusOne = last(this.customers).id + 1;
      this.form.id = _lastIdPlusOne;
      this.form.full_name = `${this.form.first_name} ${this.form.last_name}`;
      this.form.created_at = new Date().toLocaleDateString();
      //Todo end: remove when data from api is done

      this.createItem(this.form).then(
        (res) => {
          this.showMsg("Successfully added!");
          this.$emit("on-submit", this.form, "add");
          this.showDialog = false;
        },
        (err) => {
          this.showMsg("Something went wrong! Please try again later", "error");
        }
      );
    },
    update() {
      if (!this.$refs["form-customer"].validate()) return;

      //Todo: remove when data from api is done
      this.form.full_name = `${this.form.first_name} ${this.form.last_name}`;
      //Todo end: remove when data from api is done

      this.updateItem(this.form).then(
        (res) => {
          this.showMsg("Successfully updated!");
          this.$emit("on-submit", this.form, "update");
          this.showDialog = false;
        },
        (err) => {
          this.showMsg("Something went wrong! Please try again later", "error");
        }
      );
    },
    showMsg(msg = "success", icon = "success") {
      this.$toast({
        title: msg,
        icon: icon,
      });
    },
  },

  computed: {
    //Todo: remove when data from api is done
    customers: get("customer/items"),
    dialogTitle() {
      return this.item && this.item.id ? "Update Customer" : "Add Customer";
    },

    dateFormatted: {
      get() {
        if (!this.form.birthday) return null;

        return moment(this.form.birthday).format("YYYY-MM-DD");
      },
      set(val) {
        this.date = val;
      },
    },
  },

  watch: {
    item: {
      handler(val) {
        this.form = {
          ...{
            id: null,
            first_name: null,
            last_name: null,
            full_name: null,
            mobile_number: null,
            telephone: null,
            email: null,
            profile_image_url: null,
            gender: this.genderOptions[0],
            birthday: null,
            created_at: new Date().toLocaleDateString(),
            address: {
              address: null,
              barangay: null,
              city_municipality: null,
              province: null,
              zip_code: null,
            },
          },
          ...val,
        };
      },
      immediate: true,
    },
    date: {
      handler(val) {
        if (!val) return null;

        this.form.birthday = moment(val).format("L");
      },
      immediate: true,
    },
  },
};
</script>
