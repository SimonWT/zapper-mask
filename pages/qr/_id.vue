<template>
    <div>
        <vue-qr :text="link" :size="400"></vue-qr>
    </div>
</template>

<script>
export default {
    computed: {
        link(){
            return process.env.baseUrl + '/ar/' + this.$route.params.id
        }
    }
}
</script>