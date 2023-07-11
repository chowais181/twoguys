<template>
  <div style="width: 100%">
    <div class="white--text">Dashboard</div>

    <v-row class="mt-4">
      <v-col cols="12" md="3">
        <DashboardCard
          icon="mdi-head-lightbulb"
          text="TOTAL IDEAS"
          :value="totalCustomers"
          cardColor="background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);"
        />
      </v-col>
      <v-col cols="12" md="3">
        <DashboardCard
          icon="mdi-head-lightbulb"
          text="TOTAL IDEAS PER MONTH"
          :value="totalCustomers"
          cardColor="background: #1D976C; background: -webkit-linear-gradient(to top, #93F9B9, #1D976C);  background: linear-gradient(to top, #93F9B9, #1D976C);"
        />
      </v-col>
      <v-col cols="12" md="3">
        <DashboardCard
          icon="mdi-account-group"
          text="TOTAL USERS"
          :value="totalCustomers"
          cardColor="background: #d53369;  background: -webkit-linear-gradient(to right, #cbad6d, #d53369);  background: linear-gradient(to right, #cbad6d, #d53369);

"
        />
      </v-col>
      <v-col cols="12" md="3">
        <DashboardCard
          icon="mdi-account-group"
          text="TOTAL USERS PER MONTH"
          :value="totalCustomers"
          cardColor=" background-color: #21D4FD; background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);"
        />
      </v-col>
    </v-row>

    <Bar :chart-options="chartOptions" :chart-data="chartData" ></Bar>

    
  </div>
</template>

<router lang="yaml">
    path: /admin/dashboard
    name: admin-dashboard
</router>

<script>
import Swal from "sweetalert2";
import { call, get } from "vuex-pathify";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  pageTitle: "Customer",
  layout: "admin/default",
  // middleware: 'auth',
  // components: { Bar },

  data: () => ({
    totalCustomers: 9,

    chartData: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        },
      ],
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),

  computed: {
    // customers: get("customer/items"),
  },

  methods: {
    // fetchProxidizeSystemInfo() {
    //   this.$axios.get("proxidize/system-info").then((response) => {
    //     this.systemInfo = response.data.system_info;
    //     console.info(response);
    //   });
    // },
  },

  async fetch() {
    // await this.fetchProxidizeSystemInfo();
  },

  async mounted() {
    // this.timer = setInterval(this.fetchProxidizeSystemInfo, 5000);
  },

  beforeDestroy() {
    // clearInterval(this.timer);
  },
};
</script>

<style >
.v-data-table-header th {
  background-color: rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(0, 0, 0, 0.124);
}

tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
