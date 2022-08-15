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
       Elections
      </div>
      <div class="card-body">
        <div class="table-responsive">
        <table class="table table-hover">
   
            <thead>
              <tr>
                <th scope="col" class="text-uppercase">Position</th>
                <th scope="col" class="text-uppercase">Parties</th>
                <th scope="col" class="text-uppercase">Votes</th>
                <th scope="col" class="text-uppercase">Leader</th>
                <th scope="col" class="text-uppercase" v-if="!isVoted">Vote Now</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="party in parties" :key="party">
                <th scope="row">{{party.position}}</th>
                <td>{{party.party.attributes.name}}</td>
                <td>{{party.party.attributes.votes.data.length}}</td>
                <td>{{party.party.attributes.leader}}</td>
                <td><button v-if="!isVoted" @click="voteNow(party)" type="button" class="btn btn-outline-success " >Vote Now</button></td>           
              </tr>
              
            </tbody>
          </table>
        </div>  
      </div>
      <div class="card-footer">
        Voting Section
    </div>
    </div>      
  </div>
  
</div>

</template>

<script>
import {v4 } from 'uuid';
import axios from 'axios';
export default {
  name:"Voting",
  data(){
    return{
     parties:[],
     isVoted:false,
     user:'',
     isAdmin:Boolean(localStorage.getItem('admin'))
    };
  },
  methods: {
    async voteNow(party){
      console.log("voteNow",party.party.id)
      console.log(this.user.voter.id)
        let data= {
          "data":{
            "voter":this.user.voter.id,
            "partie":party.party.id,
            "voteId":v4(),
          }
        }
        data= JSON.stringify(data)
        
       const voteRes = await axios.post("/votes",data,{
          headers: {
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }
       })
       if(voteRes.status==200)
       {
        let data1 = {
          "data":{
            "hasVoted":true,
          }
        }
        data1= JSON.stringify(data1)
        let voterUpRes= await axios.put("/voters/"+this.user.voter.id,data1,{
          headers: {
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }
       })
       if(voterUpRes.status==200)
       { console.log(voterUpRes)
      //  this.isVoted=true;
        this.$router.go()
        }
     
       }
       
    }
  },
  components:[

  ],
 async mounted() {
    try{
      // alert(v4())
      let user =await axios.get("users/"+localStorage.getItem('id')+"?populate=*");
     
      this.user=user.data;
      // alert(this.user.id)
      this.isVoted=this.user.voter.hasVoted
  const res= await axios.get("parties?populate=*");
      // alert(this.user.voter)
      // if(this.user.voter)
      // {
        
      //   let voter =await axios.get("votes/?populate=*");
      //   console.log(voter)
      // }
    // if(localStorage.getItem('admin')!=null)
    //   {    
    //     if(localStorage.getItem('admin'))
    //       {     
    //         alert(this.isAdmin)     
    //       this.isView=true
    //       }
    //       // else
    //       //  alert(localStorage.getItem('admin')) 
    //   }

  var partiesRes = res.data.data;
  // console.log(partiesRes.id)
 var  unOrderParties=[]
  partiesRes.forEach(partyRes => {
    unOrderParties.push(partyRes);
    // partyRes.attributes.votes.data.forEach(element => {
    //       console.log(element);
    // });
  });
  //  console.log(this.parties);
  unOrderParties.sort(function(a,b){
    if(a.attributes.votes.data.length > b.attributes.votes.data.length) return -1;
    if(a.attributes.votes.data.length < b.attributes.votes.data.length) return 1;
  });
  var i=1;
  unOrderParties.forEach(element => {
    this.parties.push({'position':i,"party":element});
    i++;
  });
  console.log(this.parties[0].party.id);
  // for(var i=0;i<partiesRes.length;i++)
  //     var tempVote = partiesRes[i].attributes
  //     console.log("partyRes.attributes"+tempVote.votes)
      // for(var j in tempVote)
            // console.log(tempVote[j])

  // console.log(res.data.data[0].attributes);
    }
    catch (err){
      console.log(err)
    }
    
  },
}
</script>

<style>

</style>