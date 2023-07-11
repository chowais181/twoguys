<template>
  <v-app>
    <client-only>
      <nuxt />
    </client-only>
    <v-footer padless class="mt-16" style="background-color: #dfdfdf">
      <v-container>
        <div class="mt-3">
          <p>© {{ new Date().getFullYear() }} - Verified Project</p>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>



