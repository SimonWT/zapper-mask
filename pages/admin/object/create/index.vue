<template>
  <Object :order-number="orderNumber" />
</template>

<script>
import Object from '@/components/Object'
export default {
  components: { Object },
  async asyncData({app, route}) {
    const recordsNum = await app.$fire.database.ref('/Orders').once("value")
      .then(function(snapshot) {
        return snapshot.numChildren()
      });
    return {orderNumber: recordsNum}
  },
}
</script>

<style lang="scss"></style>
