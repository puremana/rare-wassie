<template>
  <h1>Rare Wassies</h1>
  
  <h2>Search Wassie</h2>

  <div>
    <input type="text" placeholder="Search Wassie ID..."  v-model="searchInput" />
    <button @click="search()">Search</button>
  </div>

  <div v-if="showWassie" class="showWassie">
    <Wassie :name="showWassie.name" :id="showWassie.id" :image="showWassie.image" :rarity="showWassie.rarity" :order="showWassie.order" />
  </div>

  <div v-if="showError" class="showWassie">
    {{ showError }}
  </div>

  <h3>Top 10</h3>
  
  <div class="wassieTen">
    <Wassie v-for="index in 10" :key="index" :name="ranked[index].name" :id="ranked[index].id" :image="ranked[index].image" :rarity="ranked[index].rarity" :order="ranked[index].order" />
  </div>


  <details class="calculated">
    <summary>How is this calculated?</summary>
    I take the total number of all of the attributes (rarity score) and use this to rank against all other wassies.
    <br />
    <br />
    How can a couch be more rare than Wassie 0? Here is an example of the rarity score using Wassie 0.
    <br />
    <br />
    Background: 1/1
    <br />
    Beak 1/1
    <br />
    Belly Colour: 1/1
    <br />
    Body: 1/1
    <br />
    Body Colour: 1/1
    <br />
    Clothes: 1/1
    <br />
    Couch Bottom: 1/12094
    <br />
    Couch Colour: 1/12094
    <br />
    Eyes: 1/1
    <br />
    Face: 1/12094
    <br />
    Feet: 1/1
    <br />
    Hat: 1/1
    <br />
    Left Arm: 1/12094
    <br />
    Right Arm: 1/12094
    <br />
    Rug: 1/12094
    <br />
    Seat: 1/12094
    <br />
    Sigil: 1/1
    <br />
    Wassie Colour: 1/12094
    <br />
    Wieldable: 1/1
    <br />
    <br />
    = 1 + 1 + 1 + 1 + 1 + 1 + 12094 + 12094 + 1 + 12094 + 1 + 1 + 12094 + 12094 + 12094 + 12094 + 1 + 12094 + 1
    <br />
    <br />
    Total rarity score: 96763

  </details>

  <div class="footer">
    Made with 💖 by <a href="https://jeremyshaw.co.nz/" target="_blank" rel="noopener norefferer">Jeremy</a>
  </div>
</template>

<script>
import ranked from './../public/ranked.json'
import Wassie from './components/Wassie.vue'

export default {
  name: 'App',
  components: {
    Wassie
  },
  data() {
    return {
      ranked: ranked,
      searchInput: "",
      showWassie: null,
      showError: ""
    };
  },
  methods: {
    search() {
      let found = false;
      for (var i=0, iLen=ranked.length; i<iLen; i++) {
        if (ranked[i].name == this.searchInput || ranked[i].id == this.searchInput) {
          this.showWassie = ranked[i];
          found = true;
          continue;
        }
      }
      if (!found) {
        this.showError = "No wassie found with that ID."
      } else {
        this.showError = "";
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
h1 {
  font-size: 2.5em;
}
.showWassie {
  width: 300px;
  margin: 20px auto;
}
.wassieTen {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
@media (max-width: 1200px) {
  .wassieTen {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (max-width: 800px) {
  .wassieTen {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 400px) {
  .wassieTen {
    display: grid;
    grid-template-columns: 1fr;
  }
}
.calculated {
  padding: 40px 20px;
}
</style>
