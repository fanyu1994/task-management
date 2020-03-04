<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录
      </span>
      <el-row>
        <el-input
          v-model="username"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
          @keyup.enter.native="login">
        </el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    login() {
      let obj = {
        username: this.username,
        password: this.password
      };
      this.$http.post("http://localhost:3000", obj).then(res => {
        if (res.data.success == 1) {
          this.$message({
            type: "warning",
            message: res.data.info
          })
        } else if(res.data.success == 2) {
          this.$message({
            type: "success",
            message: `登陆成功！欢迎${res.data.info}`
          });
          this.$router.push({
            path: "/todoList"
          })
        } else {
          this.$message({
            type: "error",
            message: res.data.info
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
</style>
