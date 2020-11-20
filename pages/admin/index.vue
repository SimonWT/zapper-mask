<template>
  <div class="container admin-page">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.number.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Date" prop="date"> </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>
      <el-table-column label="ID" prop="id"> </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-button type="primary" icon="el-icon-plus" circle @click="$router.push('/admin/object/create')"/>
        </template>
        <template slot-scope="scope">
            <i class="el-icon-share" @click="goToResult(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
    <el-button type="warning" class="text-center my-5" @click="logout">Выйти</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
      ],
      search: '',
    }
  },
  async asyncData({
    app
  }) {
    const data = await app.$fire.database
      .ref('/Orders')
      .once('value')
      .then(function (snapshot) {
        const list = []
        snapshot.forEach((doc) => {
          const item = {
            key: doc.key,
            name: doc.val().Name,
            date: doc.val().Date,
            id: doc.val().Number,
            otherInfo: { ...doc.val() },
            link: doc.val().Link
          }
          list.push(item)
        })
        return list
      })
    return { tableData: data }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push(`/admin/object/${this.tableData[index].key}`)
    },
    async handleDelete(index, row) {
      console.log(index, row)
      await this.$fire.database.ref(`/Orders/${this.tableData[index].key}`).remove()
      this.$router.go()
    },
    goToResult(index){
        var win = window.open(this.tableData[index].link, '_blank');
        win.focus();
    },
    logout(){
        this.$store.dispatch('logout')
        this.$router.push('/admin/login')
    }
  },
}
</script>

<style lang="scss">
.admin-page {
  margin-top: 10vh;
}
</style>
