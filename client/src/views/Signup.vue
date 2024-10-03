<template>
  <div class="sign-in-container">
    <div class="navbar">Navbar</div>
    <div class= "sign-in-box">
      <div class ="header-box">
        <h5>Welcome to Baby Buddy!</h5>
      </div>
      <h3>Create Account</h3>
      <div class="choice-box">
        <h6>Choose your role!</h6>
        <div class="radio-group">
          <label>
            <input type="radio" name="role" value="guardian"/>
            guardian
          </label>
          <label>
            <input type="radio" name="role" value="babysitter" />
            Babysitter
          </label>
        </div>
      </div>
      <form class ="scrollable-form">
        <div class = "register">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" placeholder="Enter your Email" id="email"/>
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" placeholder="Enter your Password" id="password"/>
          </div>
          <div class="input-group">
            <label for="firstname">First Name</label>
            <input type="text" placeholder="First Name" id="firstname"/>
          </div>
          <div class="input-group">
            <label for="lastname">Last Name</label>
            <input type="text" placeholder="Last Name" id="lastname"/>
          </div>
          <div class="input-group">
            <label for="phonenumber">Phone Number</label>
            <input type="number" placeholder="Phone Number" id="phonenumber"/>
          </div>
          <div class="input-group">
            <label for="dateofbirth">Date of Birth</label>
            <input type="date" placeholder="Date of Birth (YY-MM-DD)" id="dateofbirth"/>
          </div>
          <div class="input-group">
            <label for="city">City</label>
            <input type="text" placeholder="City" id="city"/>
          </div>
          <div class="input-group">
            <label for="country">Country</label>
            <input type="text" placeholder="Country" id="country"/>
          </div>
          <div class="input-group">
            <label for="address">Address</label>
            <input type="text" placeholder="Address" id="address"/>
          </div>

          <!-- Additional field with v-if for chosen role as Babysitter  -->
          <div class="input-group" v-if="role === 'babysitter'">
            <label for="hourlyrate"> Hourly Rate </label>
            <input type="number" placeholder="Hourly Rate kr/h" id="hourlyrate"/>
          </div>
          <button type="submit">Create account</button>
        </div>
      </form>
    </div>
    <div class="footer">Footer</div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      role: ''
    }
  }
}
</script>

<style scoped>
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

.header-box {
  border: 1px solid #3c5c5e;
  padding: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  background-color: #f0f4f8;
}
.sign-in-box {
  background-color: #ffffff;
  padding: 2rem;
  text-align: center;
  width: 350px;
  max-height: 500px;
  border-radius: 15px;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.radio-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
}

.radio-group input[type="radio"] {
  margin-right: 0.5rem;
}

.scrollable-form {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  padding-right: 1rem;
}

.register {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 0.5rem;
  background-color: #3c5c5e;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 20px;
}

button:hover {
  background-color: #2d4749;
}

</style>
