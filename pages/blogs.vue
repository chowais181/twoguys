<template>
  <v-container style="background: #fff">
    <v-row class="nav-bar">
      <v-col cols="12" sm="2"
        ><a class="nav-bar-links">Latest Articles</a></v-col
      >
      <v-col cols="12" sm="2"><a class="nav-bar-links">Our Mission</a></v-col>
      <v-col cols="12" sm="1"><a class="nav-bar-links">Pricing</a></v-col>
    </v-row>
    <div class="blog-pag-bar">
      <a class="nav-bar-pag">Home</a>
      <v-icon> mdi-chevron-right </v-icon>
      <a class="nav-bar-pag">TwoGuys Blog</a>
    </div>
    <v-row>
      <v-col cols="12" sm="8">
        <v-img :src="require('@/assets/img/ShopifyBlog.jpg')"></v-img>
        <v-row>
          <v-col class="blogs-container">
            <div
              class="blogs-card"
              style="padding-right: 20px"
              @click="onViewBlogClick"
            >
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
              ></v-img>
              <div>
                <a class="blog-tag"><h4>Sell</h4></a>
                <a class="blog-title"
                  >How to sell on Twitter, Direct from shopify</a
                >
                <div class="by-date">
                  <div class="by">by <a class="author">Braveen Kumar</a></div>
                  <a class="date">Aug 9, 2022</a>
                </div>
              </div>
            </div>
            <div class="blogs-card">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
              ></v-img>
              <div>
                <a class="blog-tag">
                  <h4>Sell</h4>
                </a>
                <a class="blog-title"
                  >How to sell on Twitter, Direct from shopify</a
                >
                <div class="by-date">
                  <div class="by">by <a class="author">Braveen Kumar</a></div>
                  <a class="date">Aug 9, 2022</a>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="bp-container">
          <div class="container">
            <h2 class="pb-3">Do you want to find a business partner?</h2>
            <v-btn style="border-radius: 7px" color="primary">Yes</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<router lang="yaml">
path: /blogs
name: Blogs
</router>
<script>
export default {
  name: "blogs",
  data() {
    return {};
  },
  methods: {
    onViewBlogClick(item) {
      this.$router.push({
        path: this.localePath("/single-blog"),
      });
    },
  },
};
</script>
<style>
a.nav-bar-links {
  font-size: 20px;
  color: #000;
  text-decoration: none;
}
a.nav-bar-pag {
  color: gray;
  text-decoration: none;
}
.nav-bar {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.blog-pag-bar {
  display: flex;
  padding: 3rem 0rem;
}
.blogs-container {
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
}
.blogs-card {
  width: 50%;
  cursor: pointer;
}
.blogs-card a.blog-tag {
  color: rgb(0, 192, 115);
  font-weight: bold;
  text-decoration: none;
}
.blogs-card a.blog-title {
  text-decoration: none;
  font-weight: bold;
  color: rgb(37, 36, 36);
}
.blogs-card .by-date .by a.author {
  color: rgb(0, 192, 115);
  text-decoration: none;
}
.blogs-card .by-date {
  display: flex;
}
.blogs-card .by-date a.date {
  color: gray;
  text-decoration: none;
  padding-left: 10px;
}
.bp-container {
  background: #f0f1f2;
}
.bp-container .container {
  text-align: center;
  padding: 30px;
}
</style>
