<template>
  <div class="sign-in-container">
    <div class="navbar">Navbar</div>
    <div class="sign-in-box">
      <div class="header-box">
      <h2>Welcome back!</h2>
      </div>
      <form>
        <h3>Sign In</h3>
        <div class="register">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" placeholder="Enter your Email" id="email" />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" placeholder="Enter your Password" id="password" />
          </div>
          <button type="submit">Sign In</button>
          <hr class ="line"/>
          <br>
          <h5>Forgot your password?</h5>
        </div>
      </form>
    </div>
    <div class="footer">Footer</div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style>
.sign-in-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: #e0f7e9;
}

.navbar, .footer {
  background-color: #3c5c5e;
  color: white;
  width: 100%;
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
}

.sign-in-box {
  background-color: #ffffff;
  padding: 2rem;
  text-align: center;
  width: 350px;
  min-height: 450px;
  border-radius: 15px;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header-box {
  border: 1px solid #3c5c5e;
  padding: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  background-color: #f0f4f8;
}

.register {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
}

input{
  width: 100%;
  padding: 0.5rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem;
  background-color: #3c5c5e;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #2d4749;
}

</style>
