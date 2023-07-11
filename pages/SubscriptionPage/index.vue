<template>
  <v-container class="px-16">
    <SubscriptionDeactivateDialog
      :isDialogOpen="showDeactivateDialog"
      @close="showDeactivateDialog = false"
    />
    <h1 class="text-h3">Two Guys App Pricing</h1>
    <p>
      Sell faster and smarter with any of our fully customizable CRM editions.
    </p>
    <v-row>
      <v-col cols="6" md="3" v-for="item in pricingItems" :key="item.id">
        <SubscriptionPricingPlan :item="item" />
      </v-col>
    </v-row>

    <h2 class="mt-16 mb-4 text-h3 font-weight-thin">
      Compare editions and top features.
    </h2>
    <v-data-table
      :headers="headers"
      :items="featureItems"
      hide-default-header
      hide-default-footer
    >
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th
              v-for="item in headers"
              class="text-center py-2 white--text"
              :class="item.value == 'features' ? '' : 'feature-header'"
              :key="item.text"
            >
              <div>
                <span class="text-subtitle-1">{{ item.text }}</span>
                <p class="text-h5 mb-0">{{ item.price }}</p>
                <span>{{ item.subscription }}</span>
              </div>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.features`]="{ item }">
        <div class="d-inline-flex">
          <p class="mb-0 accent--text mr-2">
            {{ item.features }}
          </p>
          <v-img
            width="14"
            :src="require('@/assets/img/radio-buttons.png')"
            contain
          ></v-img>
        </div>
      </template>

      <template v-slot:[`item.essentials`]="{ item }">
        <span v-if="item.essentials == true">
          <v-icon color="green">mdi-check-circle-outline</v-icon>
        </span>
        <span v-else>
          <v-icon color="grey">mdi-close-circle</v-icon>
        </span>
      </template>

      <template v-slot:[`item.professional`]="{ item }">
        <span v-if="item.professional == true">
          <v-icon color="green">mdi-check-circle-outline</v-icon>
        </span>
        <span v-else>
          <v-icon color="grey">mdi-close-circle</v-icon>
        </span>
      </template>

      <template v-slot:[`item.enterprise`]="{ item }">
        <span v-if="item.enterprise == true">
          <v-icon color="green">mdi-check-circle-outline</v-icon>
        </span>
        <span v-else>
          <v-icon color="grey">mdi-close-circle</v-icon>
        </span>
      </template>

      <template v-slot:[`item.unlimited`]="{ item }">
        <span v-if="item.unlimited == true">
          <v-icon color="green">mdi-check-circle-outline</v-icon>
        </span>
        <span v-else>
          <v-icon color="grey">mdi-close-circle</v-icon>
        </span>
      </template>
    </v-data-table>

    <h2 class="mt-16 mb-4 text-h3 font-weight-thin">Manage subscription</h2>

    <v-card class="rounded-lg" outlined>
      <v-card-title> Subscriptions </v-card-title>
      <v-card-subtitle
        >Items you've billed for on a recurring basis, like your shopify plan
        and apps.</v-card-subtitle
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="align-center mb-4">
          <v-col cols="6" md="6">
            <div class="d-inline-flex align-center">
              <div class="pa-2 rounded" style="border: 1px solid #d8d8d8">
                <v-img
                  width="50"
                  :src="require('@/assets/img/shopify.png')"
                  contain
                ></v-img>
              </div>
              <div class="ml-2">
                <p class="mb-0 font-weight-black black--text">Trial</p>
                <p class="mb-0">Your trial ends on 23 August 2022</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="text-right">
            <v-btn
              class="rounded"
              color="red"
              outlined
              depressed
              @click="onDeactivateClick"
              >Deactivate Trial</v-btn
            >
            <v-btn class="rounded" color="primary" depressed>Choose Plan</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-btn text color="primary" class="mt-2">View all</v-btn>
      </v-card-text>
    </v-card>

    <v-card class="rounded-lg mt-5" outlined>
      <v-card-title> Payment methods </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>Add payment method for purchases and bills in Shopify.</p>
        <v-btn outlined class="rounded">Add payment method</v-btn>
      </v-card-text>
    </v-card>

    <v-card class="rounded-lg mt-5" outlined>
      <v-card-title class="justify-space-between">
        <div>
          Billing currency
          <v-icon class="ml-2">mdi-information</v-icon>
        </div>
        <div>
          <v-btn text color="primary">Change currency</v-btn>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>
          Your billing currency is set to
          <span class="font-weight-bold">EUR (Euro)</span>.
        </p>
      </v-card-text>
    </v-card>

    <v-card class="rounded-lg mt-5" outlined>
      <v-card-title>
        Upcoming bill
        <v-icon class="ml-2">mdi-information</v-icon>
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="12" md="6">
            If this cycle's fee exceed the equivalent of $60,000 USD, you'll
            need to pay these fees before incurring more. Your billing threshold
            is set in USD, even if your billing currency is different.
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text class="black--text">
        <p class="font-weight-bold">Billing cycle: Billed on 23 August 2022</p>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between">
          <p class="mt-4">Subscription Charges</p>
          <p class="mt-4">€0,00</p>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between">
          <p class="mt-4">Running total</p>
          <p class="mt-4">€0,00 EUR</p>
        </div>
        <v-divider></v-divider>
        <v-btn text color="primary" class="px-0 mt-4"> View details</v-btn>
      </v-card-text>
    </v-card>

    <h2 class="mt-16 mb-4 text-h3 font-weight-thin">Sales Cloud Pricing FAQ</h2>
    <v-card outlined class="mt-5 rounded">
      <v-expansion-panels tile>
        <v-expansion-panel v-for="(item, i) in faqs" :key="i">
          <v-expansion-panel-header hide-actions>
            <div>
              <v-icon color="#2B5CAB" left>mdi-plus-circle-outline</v-icon>
              {{ item.title }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="px-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<router lang="yaml">
    path: /subscription-page
    name: subscription-page
</router>

<script>
export default {
  data: () => ({
    showDeactivateDialog: false,
    pricingItems: [
      {
        id: 1,
        name: "Free Plan",
        description: "All-in-one sales and support app*",
        price: "Free",
      },
      {
        id: 2,
        name: "Small Fish",
        description: "Complete CRM for any size team",
        price: "$ 17",
        selected: true,
      },
      {
        id: 3,
        name: "Medium Fish",
        description: "Deeply customizable sales CRM for your business",
        price: "$ 47",
        isPopular: true,
      },
      {
        id: 4,
        name: "Big Fish",
        description: "Unlimited CRM power and support",
        price: "$ 97",
      },
    ],

    headers: [
      { text: "", value: "features" },

      {
        text: "Essentials",
        price: "$ 25",
        subscription: "USD/user/month**",
        value: "essentials",
        align: "center",
        // divider: true,
      },
      {
        text: "Professional",
        price: "$ 75",
        subscription: "USD/user/month**",
        value: "professional",
        align: "center",
        // divider: true,
      },
      {
        text: "Enterprise",
        price: "$ 25",
        subscription: "USD/user/month**",
        value: "enterprise",
        align: "center",
        // divider: true,
      },
      {
        text: "Unlimited",
        price: "$ 25",
        subscription: "USD/user/month**",
        value: "unlimited",
        align: "center",
      },
    ],
    featureItems: [
      {
        features: "Account, Contact, Lead, and Opportunity Management",
        essentials: true,
        professional: true,
        enterprise: true,
        unlimited: true,
      },
      {
        features: "Email Integration with Gmail or Outlook",
        essentials: true,
        professional: true,
        enterprise: true,
        unlimited: true,
      },
      {
        features: "Salesforce Mobile App",
        essentials: true,
        professional: true,
        enterprise: true,
        unlimited: true,
      },
      {
        features: "Lead Registration and Rules-Based Lead Scoring",
        essentials: false,
        professional: true,
        enterprise: true,
        unlimited: true,
      },
      {
        features: "Collaborative Forecasting",
        essentials: false,
        professional: true,
        enterprise: true,
        unlimited: true,
      },
      {
        features: "Workflow and Approval Automation",
        essentials: false,
        professional: false,
        enterprise: true,
        unlimited: true,
      },
      {
        features: "24/7 Support",
        essentials: false,
        professional: false,
        enterprise: false,
        unlimited: true,
      },
    ],

    faqs: [
      {
        id: 1,
        title: "Are there upront costs or additional fees?",
      },
      {
        id: 2,
        title: "What if my business priorites and product need have changed?",
      },
      {
        id: 3,
        title:
          "Do Salesforce products integrate with outside applications and systems?",
      },
      {
        id: 4,
        title: "What support and service packages are available?",
      },
      {
        id: 5,
        title: "Can I pay monthly?",
      },
      {
        id: 6,
        title: "How long are your contracts?",
      },
      {
        id: 7,
        title: "Can I ugrade at any time? Can I add more products later on?",
      },
    ],
  }),

  methods: {
    onDeactivateClick() {
      this.showDeactivateDialog = true;
    },
  },
};
</script>

<style  lang="scss">
.feature-header {
  background-color: #4f4fff;
  border-left: 1px solid #fff;
}
</style>