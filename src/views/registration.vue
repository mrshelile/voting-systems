<template>
<div class="registration-form gradient-background">
        <form @submit.prevent="handleSumit">
            <div class="form-icon">
                <!-- <span><i class="icon icon-user"></i></span> -->
                <img class="icon_img" src="../../src/assets/security.svg"/>
            </div>
            <div class="form-group">
                <input type="text" class="form-control item" v-model="email"  placeholder="email" required>
            </div>

            <div class="form-group">
                <input type="password" v-model="password" class="form-control item" @keydown="onchange"  placeholder="Password" required>
            </div>
            <div class="form-group">
                <div class="row">
                <input type="password" v-model="rePassword" class="form-control item" @keyup="onchange" placeholder="Confirm Password" required>
                </div>
                <div class="row text-danger">{{Error}}</div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn gradient-btn create-account">Create Account</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name:"Registration",
  data() {
    return {
      email:'',
      password:'',
      rePassword:'',
      Error:""
    }
  },

  methods:{
    onchange(){
    
    if(this.password!=this.rePassword) 
        this.Error='Passwords do not Match'
    else
     this.Error=''
    //  alert(this.Error)
    },
    async handleSumit(){
     if(this.password==this.rePassword)   
      {  let data ={
            "username":this.email,
            "password":this.password,
            "is_admin":true,
            "email":this.email
            }
            
        data = JSON.stringify(data)
        console.log(data)
        const userRes = await axios.post("/auth/local/register",data,{
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
                }
        })   
        if(userRes.status==200){
            this.$router.push({name:'Login'})
        }
        }

    }
  }
}
</script>

<style scoped>
body{
    background-color: #dee9ff;
}
.gradient-background{background: rgb(0,10,36);
background: linear-gradient(90deg, rgba(0,10,36,1) 0%, rgba(40,24,27,0.7791491596638656) 32%, rgba(9,121,60,0.7063200280112045) 76%, rgba(5,18,28,0.87718837535014) 100%);}

.registration-form{
	padding: 50px 0;
}
.icon_img{width: 100%;}
.registration-form form{
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .form-icon{
	text-align: center;

    border-radius: 50%;
    font-size: 40px;
    color: white;
    width: 150px;
    height: 100px;
    margin: auto;
    margin-bottom: 50px;
    line-height: 100px;
}

.registration-form .item{
	border-radius: 20px;
    margin-bottom: 25px;
    padding: 10px 20px;
}

.registration-form .create-account{
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: #5791ff;
    border: none;
    color: white;
    margin-top: 20px;
}

.registration-form .social-media{
    max-width: 600px;
    background-color: #fff;
    margin: auto;
    padding: 35px 0;
    text-align: center;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #9fadca;
    border-top: 1px solid #dee9ff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .social-icons{
    margin-top: 30px;
    margin-bottom: 16px;
}

.registration-form .social-icons a{
    font-size: 23px;
    margin: 0 3px;
    color: #5691ff;
    border: 1px solid;
    border-radius: 50%;
    width: 45px;
    display: inline-block;
    height: 45px;
    text-align: center;
    background-color: #fff;
    line-height: 45px;
}



.gradient-btn{background: rgb(36,11,0);
background: linear-gradient(90deg, rgba(36,11,0,1) 19%, rgba(5,18,28,0.9304096638655462) 81%);}
@media (max-width: 576px) {
    .registration-form form{
        padding: 50px 20px;
    }

    .registration-form .form-icon{
        width: 70px;
        height: 70px;
        font-size: 30px;
        line-height: 70px;
    }

}
</style>