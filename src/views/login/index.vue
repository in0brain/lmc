<template>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// import Mock from 'mockjs'
import { getMenu } from '@/api/data'
import axios from "axios";
export default {
    name: 'login',
    data() {
        return {
            form: {
              username: '',
              password: ''
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    {
                        min: 1,
                        message: "用户名长度不能小于1位",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
      login() {
        axios({
            method: 'post',
            url: '/customer_service/custom/login',
            data: {
              userName: 9,
              pwd:123
            }
          }).then((res)=> {
            console.log(res)
            getMenu(res.data).then(({data:ans}) => {
              if (ans.code === 200) {
                console.log(ans)
                this.$store.commit('clearMenu')
                this.$store.commit('setMenu', ans.data.menu)
                this.$store.commit('setToken', ans.data.token)
                this.$store.commit('addMenu', this.$router)
                this.$router.push({ name: 'home' })
              }else {
                this.$message.error('登录失败')

              }
          }).catch((e) => {
              console.log(e)
            })

        })
      }
    }
}
</script>
<style lang="less" scoped>
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

.login_submit {
    margin: 10px auto 0px auto;
}
</style>