<template>
  <div class="github-container">
    <iframe class="github-button" src="https://ghbtns.com/github-btn.html?user=puremana&repo=rare-wassie&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
  </div>

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
    <Wassie v-for="index in 10" :key="index" :name="ranked[index - 1].name" :id="ranked[index - 1].id" :image="ranked[index - 1].image" :rarity="ranked[index - 1].rarity" :order="ranked[index - 1].order" />
  </div>

  <div class="details-container">
    <details>
      <summary>How is this calculated?</summary>
      The current rarity method I am using is called statistical rarity, using only non-null attributes. How this works is I multiply the rarity percentage of each attribute together, then rank the wassies accordingly.
      <br />
      <br />
      Lets see how this works with Wassie 9653, a seemingly one off wassie yet not as rare as couch wassies according to this method.
      <br />
      <br />
      Background: 13/12344
      <br />
      Beak 9047/12344
      <br />
      Belly Colour: 451/12344
      <br />
      Body: 1/12344
      <br />
      Body Colour: 451/12344
      <br />
      Clothes: 10638/12344
      <br />
      Couch Bottom: null
      <br />
      Couch Colour: null
      <br />
      Eyes: 1274/12344
      <br />
      Face: null
      <br />
      Feet: 5526/12344
      <br />
      Hat: 7097/12344
      <br />
      Left Arm: null
      <br />
      Right Arm: null
      <br />
      Rug: null
      <br />
      Seat: null
      <br />
      Sigil: 1458/12344
      <br />
      Wassie Colour: null
      <br />
      Wieldable: 10111/12344
      <br />
      <br />
      = 13/12344 * 9047/12344 * 451/12344 * 1/12344 * 451/12344 * 10638/12344 * 1274/12344 * 5526/12344 * 7097/12344 * 1458/12344 * 1458/12344
      <br />
      <br />

    </details>
    <details>
      <summary>Why use statistical rarity?</summary>
      I have tried using other methods such as total trait rarity, and average trait rarity, but the problem was that one off wassies such as Wassie 0 and other one off wassies weren't being recognized as being that rare.
      <br />
      <br />
      This is because there is such a small number of a couch wassies. Statistical rarity using non-null attributes seems to be the best to exaggerate the one off trait rarity.
      <br />
      <br />
      Statistical rarity is also one of the most common rarity ranking methods in NFTs currently.
    </details>
    <details>
      <summary>What is the rarity score?</summary>
      Once I calculate the statistical rarity for each wassie, I perform some operations to make the rarity more readable. This involves squaring the number 5 times then multipling it by 10000.
      <br />
      <br />
      This makes it more easy to read and see the gap between different wassies, while keeping the ranking order the same.
    </details>
  </div>

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
.github-container {
  position: absolute;
  display: inline-block;
  right: 0;
  top: 30px;
}
.github-container .github-button {
  position: absolute;
  right: 0;
  margin-bottom: -20px;
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
  h1 {
    padding-top: 40px;
  }
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
.details-container {
  padding: 20px 0 20px 0;
}
details {
  padding: 5px 20px 5px 20px;
  font-size: 14px;
}
summary {
  font-size: 18px;
}
</style>
