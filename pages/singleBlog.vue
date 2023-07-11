<template>
    <v-container style="background: #fff;">
        <v-row class="nav-bar">
            <v-col cols="12" sm="2"><v-btn text class="nav-bar-links">Latest Articles</v-btn></v-col>
            <v-col cols="12" sm="2"><v-btn text class="nav-bar-links">Our Mission</v-btn></v-col>
            <v-col cols="12" sm="1"><v-btn text class="nav-bar-links">Pricing</v-btn></v-col>
        </v-row>
        <div class="blog-pag-bar">
            <v-btn text class="nav-bar-pag">Home</v-btn>
            <v-icon>
                mdi-chevron-right
            </v-icon>
            <v-btn text class="nav-bar-pag">TwoGuys Blog</v-btn>
            <v-icon>
                mdi-chevron-right
            </v-icon>
            <v-btn text class="nav-bar-pag">Our Mission</v-btn>
        </div>
        <v-row>
            <v-col cols="12" sm="8">
                <div class="blog-post">
                    <h1 class="title">17 Trending Products and Things to Sell Online (Updated 2022)</h1>
                    <span class="mins-of-read-and-posted-time">Mar 2, 2022 · 19 minute read</span>
                    <v-img :src="require('@/assets/img/single-blog.png')"></v-img>
                    <p class="pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga cupiditate quos laudantium, voluptas necessitatibus sint consequuntur sed fugit architecto tenetur dignissimos incidunt recusandae, magnam optio ipsa dolorem. Suscipit ipsam fugit est! Minima ipsum id corrupti blanditiis eveniet optio odio officiis laudantium assumenda delectus, similique doloribus harum molestias omnis ad? Cumque.</p>
                    <p class="pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga cupiditate quos laudantium, voluptas
                        necessitatibus sint consequuntur sed fugit architecto tenetur dignissimos incidunt recusandae, magnam optio ipsa
                        dolorem. Suscipit ipsam fugit est! Minima ipsum id corrupti blanditiis eveniet optio odio officiis laudantium
                        assumenda delectus, similique doloribus harum molestias omnis ad? Cumque.</p>
                        <p class="pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga cupiditate quos laudantium, voluptas
                            necessitatibus sint consequuntur sed fugit architecto tenetur dignissimos incidunt recusandae, magnam optio ipsa
                            dolorem. Suscipit ipsam fugit est! Minima ipsum id corrupti blanditiis eveniet optio odio officiis laudantium
                            assumenda delectus, similique doloribus harum molestias omnis ad? Cumque.</p>
                </div>
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
    path: /single-blog
    name: single-blog
</router>
<style>
a.nav-bar-links{
    font-size: 20px;
    color: #000;
    text-decoration: none;
}
a.nav-bar-pag{
    color: gray;
    text-decoration: none;
}
.nav-bar{
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.blog-pag-bar{
    display: flex;
    padding: 3rem 0rem;
}
.blogs-container{
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
}
.blogs-card{
    width: 50%;
}
.blogs-card a.blog-tag{
    color: rgb(0, 192, 115);
    font-weight: bold;
    text-decoration: none;
}
.blogs-card a.blog-title{
    text-decoration: none;
    font-weight: bold;
    color: rgb(37, 36, 36);
}
.blogs-card .by-date .by a.author{
    color: rgb(0, 192, 115);
    text-decoration: none;
}
.blogs-card .by-date{
    display: flex;
}
.blogs-card .by-date a.date{
    color: gray;
    text-decoration: none;
    padding-left: 10px;
}
.bp-container{
    background: #f0f1f2;
}
.bp-container .container{
    text-align: center;
    padding: 30px;
}
span.mins-of-read-and-posted-time{
    color: gray;
    font-size: 12px;
}
</style>