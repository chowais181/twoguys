<template>
  <div style="font-family: 'Nunito', sans-serif">
    <p class="text-h6 text-md-h4 title-text">Cookies Notice</p>

    <div class="mt-4">
      <div class="title-text">EU dispute resolution</div>

      <div>
        Information about online dispute resolution: Consumers have the
        possibility to submit complaints to the EU online dispute resolution
        platform:
        https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE.
        You can also send any complaints to the e-mail address given above.
      </div>
    </div>

    <div class="mt-4">
      <div class="title-text">Liability for the content of this website</div>
      <div>
        We are constantly developing the content of this website and make every
        effort to provide correct and up-to-date information. Unfortunately, we
        cannot assume any liability for the correctness of all contents on this
        website, especially for those provided by third parties. If you notice
        any problematic or illegal content, please contact us immediately, you
        will find the contact details in the imprint.
      </div>
    </div>

    <div class="mt-4">
      <div class="title-text">Liability for links on this website</div>
      <div>
        Our website contains links to other websites for whose content we are
        not responsible. If you notice illegal links on our website, please
        contact us, you will find the contact details in the imprint.
      </div>
    </div>

    <div class="mt-4">
      <div class="title-text">Copyright notice</div>
      <div>
        All contents of this website (pictures, photos, texts, videos) are
        subject to copyright. If necessary, we will legally pursue the
        unauthorized use of parts of the content of our site.
      </div>
    </div>

    <div class="mt-4">
      <div class="title-text">Picture credits</div>
      <div>
        The images, photos and graphics on this website are protected by
        copyright. The image rights are held by our company.
      </div>
    </div>
  </div>
</template>

<router lang="yaml">
    path: /cookies-notice
    name: cookies-notice
</router>

<script>

export default {
    head() {
    return {
      meta: [{ hid: 'noindex', name: 'noindex', content: 'noindex' }],
      meta: [{ hid: 'nofollow', name: 'nofollow', content: 'nofollow' }],
    }
  },
  data() {
    return {
    
    };
  },

};
</script>

<style lang="scss" scoped>
.title-text {
  font-family: "Nunito-Bold", sans-serif !important;
}
</style>

