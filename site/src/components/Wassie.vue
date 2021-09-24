<template>
  <div class="wassie">
    <img :src="image" />
    <div class="name">{{ name }}</div>
    <div class="order">More rare than <span class="orderRarity">{{((1 - order) * 100).toFixed(4)}}%</span> of all Wassies</div>
    <div class="rarity">Rarity score: {{ rarity }}</div>

  </div>
</template>

<script>
export default {
  name: 'Wassie',
  props: {
    name: String,
    id: Number,
    image: String,
    rarity: Number,
    order: Number
  }
}
</script>

<style scoped>
    .wassie {
        
    }
    .wassie img {
        object-fit: cover;
        width: 100%;
        max-height: 100%;
    }
    .name {
        font-weight: 700;
    }
    .order {
        font-size: 12px;
    }
    .orderRarity {
        font-weight: 700;
    }
</style>
