<template>
  <div>
    <ul class="inlineblock ul-bookmarks" v-for="(links,index) in this.links.bookmarks" :key="index">
      <li class="title" :class="links.color">{{ links.category }} :::::</li>
      <li v-for="(cat,index) in links.links" :key="index">
        <strong>-- {{ cat.subcategory }} --</strong>
        <ul>
          <li v-for="(link, index) in cat.links" :key="index">
            <a :href="link.url">{{ link.name }}</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>

import links from '../data/links.json'

export default {
  name: 'Bookmarks',
  data: function(){
    return {
      links,
    }
  },
}
</script>

