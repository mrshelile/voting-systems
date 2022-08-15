<template>
<div class="container-fluid ">
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info gradient-background">
				<span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
				<h4 class="company_title">Please login</h4>
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
				
					<div class="row mt-3">
						<form @submit.prevent="login" class="form-group">
							<div class="row">
								<input type="text" v-model="id_number" id="username" class="form__input " placeholder="National ID Number">
							</div>
							<div class="row">
								<!-- <span class="fa fa-lock"></span> -->
								<input type="password" v-model="password" id="password" class="form__input" placeholder="Password">
								<span class="text-danger">{{error}}</span>
							</div>
							<div class="row">
								<input type="submit" value="Submit" class="btn gradient-background text-white">
							</div>
						</form>
					</div>

				</div>
			</div>
		</div>
	</div>

</template>

<script>
import axios from 'axios';
export default {
  name:"Login",
  data() {
    return {
      id_number:"",
      password:"",
  error:''
    }
  },
  methods:{
	async login(){
		try
		{ const response=await axios.post('auth/local',{
				identifier:this.id_number,
				password:this.password
			});
			localStorage.setItem("token",response.data.jwt);
			localStorage.setItem("id",response.data.user.id);
			localStorage.setItem("admin",response.data.user.is_admin);

			// alert(response.data.user.is_admin )
			if(response.status==200 && localStorage.getItem("token")!=null)
				{
					this.$router.push({name:'Home'});
					this.error=''
				}
			else
				this.error="Invalid login credentials"	
		}
		catch(error){
			this.error="Invalid login credentials"	
		}
	}
  }
  
}
</script>

<style scoped>
.main-content{
	width: 50%;
	border-radius: 20px;
	box-shadow: 0 5px 5px rgba(0,0,0,.4);
	margin: 5em auto;
	display: flex;
}
.gradient-background{background: rgb(0,10,36);
background: linear-gradient(90deg, rgba(0,10,36,1) 0%, rgba(40,24,27,0.7791491596638656) 32%, rgba(9,121,60,0.7063200280112045) 76%, rgba(5,18,28,0.87718837535014) 100%);}

.company__info{
	/* background-color: #008080; */
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: #fff;
}
.fa-android{
	font-size:3em;
}
@media screen and (max-width: 640px) {
	.main-content{width: 90%;}
	.company__info{
		display: none;
	}
	.login_form{
		border-top-left-radius:20px;
		border-bottom-left-radius:20px;
	}
}
@media screen and (min-width: 642px) and (max-width:800px){
	.main-content{width: 70%;}
}
.row > h2{
	color:#008080;
}
.login_form{
	background-color: #fff;
	border-top-right-radius:20px;
	border-bottom-right-radius:20px;
	border-top:1px solid #ccc;
	border-right:1px solid #ccc;
}
form{
	padding: 0 2em;
}
.form__input{
	width: 100%;
	border:0px solid transparent;
	border-radius: 0;
	border-bottom: 1px solid #aaa;
	padding: 1em .5em .5em;
	padding-left: 2em;
	outline:none;
	margin:1.5em auto;
	transition: all .5s ease;
}
.form__input:focus{
	border-bottom-color: #008080;
	box-shadow: 0 0 5px rgba(0,80,80,.4); 
	border-radius: 4px;
}
.btn{
	transition: all .5s ease;
	width: 70%;
	border-radius: 30px;
	color:#008080;
	font-weight: 600;
	background-color: #fff;
	border: 1px solid #008080;
	margin-top: 1.5em;
	margin-bottom: 1em;
}
.btn:hover, .btn:focus{
	background-color: #008080;
	color:#fff;
}
</style>