<template>
  <div>
    <CustomerEditor
      :isDialogOpen="showEditor"
      :item="_editItem"
      @close="showEditor = false"
    />
    <CustomerView v-if="showView" v-model="showView" :item="_viewItem" />

    <v-data-table
      :headers="headers"
      :items="customers"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search Customer"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="ml-4" dark @click="addItem">
            Add Customer
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon medium class="mr-2" color="blue" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon
          medium
          class="mr-2"
          color="red"
          @click="showDeleteConfirmation(item)"
        >
          mdi-delete
        </v-icon>
        <v-icon medium color="green" @click="viewItem(item)"> mdi-eye </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<router lang="yaml">
    path: /customer
    name: customer
</router>

<script>
import Swal from "sweetalert2";
import { call, get } from "vuex-pathify";
export default {
  pageTitle: "Customer",

  data: () => ({
    showEditor: false,
    showView: false,
    _editItem: null,
    _viewItem: null,
    search: "",
    headers: [
      { text: "Name", value: "full_name" },
      { text: "Mobile Number", value: "mobile_number" },
      { text: "Email", value: "email" },
      { text: "Gender", value: "gender" },
      {
        text: "Action",
        value: "actions",
        sortable: false,
        align: "center",
        width: "150px",
      },
    ],
  }),

  computed: {
    customers: get("customer/items"),
  },

  methods: {
    fetchCustomers: call("customer/fetchItems"),
    deleteCustomer: call("customer/deleteItem"),
    findCustomer: call("customer/findCustomer"),
    viewItem(item) {
      this._viewItem = { ...{}, ...item };
      this.showView = true;
    },
    addItem() {
      this._editItem = null;
      this.showEditor = true;
    },
    editItem(item) {
      this._editItem = { ...{}, ...item };
      this._editItem.address = { ...{}, ...item.address };
      this.showEditor = true;
    },
    deleteItem(item) {
      this.deleteCustomer(item.id).then(
        (res) => {
          this.showMsg("Successfully deleted!");
        },
        (err) => {
          this.showMsg("Something went wrong!", "error");
        }
      );
    },
    showMsg(msg = "success", icon = "success") {
      this.$toast({
        title: msg,
        icon: icon,
      });
    },
    showDeleteConfirmation(item) {
      Swal.fire({
        icon: "question",
        title: "Are you sure you want to delete the item?",
        showCancelButton: true,
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteItem(item);
        }
      });
    },
  },

  async fetch() {
    await this.fetchCustomers();
  },
};
</script>

