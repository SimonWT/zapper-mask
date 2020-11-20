<template>
    <div class="container my-5">
        <el-form label-position="top">
            <el-form-item label="Username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="login" type="primary">Войти</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login(){
            if( this.form.username === 'admin' && this.form.password === 'wowadmin2020' ){
                this.$store.dispatch('setUser', {
                    username: 'username',
                    role: 'admin'
                })
                this.$router.push('/admin')
            }else  this.$message.error('Oops, неверный логин или пароль');
        }
    }
}
</script>