<template>
  <div>
    <div class="login">
        <div class="login-box">
       <h1>Login</h1>
        <div class="text-box">
          <img src="../assets/user.png" alt="user">
          <input class='labelInput' type="text" placeholder="Username" v-model="email" />
        </div>
        <div class="text-box">
          <img src="../assets/padlock.png" alt="padlock">
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <input type="button" class="btn" value="Entrar" v-on:click="Login()"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      PassWrong: false,
    };
  },
  methods: {
    Login() {
      if (!this.password || !this.email) {
        this.PassWrong = true;
        return;
      }
      this.$http.post(`${this.$config.server}/sessions`, { email: this.email, password: this.password })
        .then((user) => {
          console.log(user);
          if (user.data.token) {
            localStorage.setItem('user', JSON.stringify(user.data));
            localStorage.setItem('token', user.data.accessToken);
            this.$http.defaults.headers.common.Authorization = `Bearer ${user.data.token}`;
            this.$router.push({ name: 'options' });
          }
        })
        .catch((ex) => {
          this.PassWrong = true;
          console.log(ex);
        });
    },
  },
};
</script>

<style  scoped>
.login{
  background-image: linear-gradient(
    45deg,
    rgba(1, 161, 255, 0.14) 0.01%,
    #017aff 101.95%
  );
  height: 100vh;
}
.login-box{
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-box h1 {
  float: left;
  font-size: 40px;
  border-bottom: 6px solid #2f3542;
  margin-bottom: 50px;
  padding: 13px 0;
}
.text-box{
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid #2f3542;
}
.text-box img {
  width: 26px;
  float:left;
  text-align: center;
}
.text-box input {
  border: none;
  outline: none;
  font-size: 18px;
  width: 80%;
  float: left;
  margin: 0 10px;
  border: none;
  background: none;
}
.btn{
  width: 100%;
  border: 2px solid #2f3542;
  padding: 5px;
  background: none;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
}


</style>
