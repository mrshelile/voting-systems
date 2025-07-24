<!-- /src/AdminComponents/Parties.vue -->
<template>
<div class="container">
  <div class="row">
    <div class="input-group mb-3 w-50 shadow-lg">
      <input type="text" class="form-control border border-white" placeholder="Search Party" aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn ">
        <i class="bi bi-search text-success "></i>
        </button>
      </div>
    </div>
  </div>
  <div class="mt-2">
    <div class="card shadow-lg" >
      <div class="card-header text-uppercase bg-success text-white">
       Registered Parties
      </div>
      <div class="card-body">
        <div class="table-responsive" v-if="!isPartyViewNext">
        <table class="table">
   
            <thead>
              <tr>
                <th scope="col" class="text-uppercase">#</th>
                <th scope="col" class="text-uppercase">Parties</th>
                <th scope="col" class="text-uppercase">Leader</th>
                <th scope="col" class="text-uppercase">Code</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="party in parties" :key="party">
                <th scope="row">{{party.key}}</th>
                <td>{{party.party.attributes.name}}</td>
                <td>{{party.party.attributes.leader}}</td>
                <td>{{party.party.attributes.code}}</td>
              </tr>
            </tbody>
          </table>
        </div>  
        <div v-else>
          <form @submit.prevent="handleSubmit()">
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" v-model="name" placeholder="Party Name" required>
              </div>
              <div class="col">
                <input type="text" class="form-control" v-model="leader" placeholder="Leader" required>
              </div>

            </div>
            
            <div class="row mt-2">
              <button type="submit"  class="btn btn-success shadow-lg"  data-toggle="modal" data-target="#exampleModalCenter">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div class="card-footer">
        <button type="button"  v-if="!isPartyViewNext" @click="changePartyView" class="btn btn-success shadow-lg"  data-toggle="modal" data-target="#exampleModalCenter">Add New</button>
    </div>
    </div>      
  </div>
  
</div>

</template>

<script>
import axios from 'axios';
export default { 
    name:'Parties',
    data(){
      return{
        parties:[],
        isPartyViewNext:false,
        name:'',
        leader:'',
        

      }
    },
    methods:{
      async handleSubmit(){
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 6; i++ ) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
    
        let data= {
          "data":{
            "name":this.name,
            "leader":this.leader,
            "code":OTP
          }
        }
        data= JSON.stringify(data)
        const partyRes = await axios.post("/parties",data,{
          headers: {
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }
       })
        if(partyRes.status==200 || partyRes==201){
          this.isPartyViewNext=false
           this.$router.go()
        }
      },
      changePartyView(){
        this.isPartyViewNext=!this.isPartyViewNext;
      }
    },
  async mounted() {

  try{
  const res= await axios.get("parties?populate=*");
  var partiesRes = res.data.data;
  var i=1;
  partiesRes.forEach(partyRes => {
    this.parties.push({"key":i,"party":partyRes});
    i++;
  });
    }
    catch (err){
      console.lor(err)
    }
    
  },
}
</script>

<style>

</style>