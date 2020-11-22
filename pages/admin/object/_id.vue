<template>
  <Object is-edit="true" :editData="editData"/>
</template>

<script>
import Object from '@/components/Object'
export default {
  components: { Object },
 async asyncData({ app, route }) {
    const data = await app.$fire.database
      .ref(`/Orders/${route.params.id}`)
      .once('value')
      .then(function (snapshot) {
        console.log('ORDER:', snapshot.val())
        return { ...snapshot.val() }
      })
    return { editData: data }
  },
}
</script>

<style lang="scss"></style>
