<!-- /src/AdminComponents/Candidates.vue -->
<template>
  <div class="container">
    <div class="row">
      <div class="input-group mb-3 w-50 shadow-lg">
        <input
          type="text"
          class="form-control border border-white"
          placeholder="Search User"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <button class="btn">
            <i class="bi bi-search text-success"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <div class="card shadow-lg">
        <div class="card-header text-uppercase bg-success text-white">
          Registered Voters
        </div>
        <div class="card-body">
          <div class="table-responsive" v-if="!isAddCandidates">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="text-uppercase">#</th>
                  <th scope="col" class="text-uppercase">Full Name</th>
                  <th scope="col" class="text-uppercase">ID Number</th>
                  <th scope="col" class="text-uppercase">Phone Number</th>
                  <th scope="col" class="text-uppercase">Place Of Birth</th>
                  <th scope="col" class="text-uppercase">District</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="candidate in candidates" :key="candidate" >
                  <th scope="row">{{ candidate.key }}</th>
                  <td>{{ candidate.candidate.attributes.full_names }}</td>
                  <td>{{ candidate.candidate.attributes.ID_Number }}</td>
                  <td>{{ candidate.candidate.attributes.phone }}</td>
                  <td>{{ candidate.candidate.attributes.Place_of_Birth }}</td>
                  <td>{{ candidate.candidate.attributes.district }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <form @submit.prevent="hantleSubmit()">
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    v-model="names"
                    placeholder="Full names"
                    required
                  />
                </div>
                <div class="col">
                  <input
                    type="Number"
                    class="form-control"
                    v-model="phone"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div class="col">
                  <input
                    type="Number"
                    class="form-control"
                    v-model="ID_number"
                    placeholder="National ID Number"
                    required
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    v-model="district"
                    placeholder="District"
                    required
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    v-model="POB"
                    placeholder="Place Of Birth"
                    required
                  />
                </div>
              </div>
              <div class="row mt-2">
                <button
                  type="submit"
                  class="btn btn-success shadow-lg"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="card-footer" v-if="!isAddCandidates">
          <button
            type="button"
            @click="changeCandidatesView"
            class="btn btn-success shadow-lg"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Add New
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Candidates",
  data() {
    return {
      candidates: [],
      isAddCandidates: false,
      POB: "",
      district: "",
      ID_number: "",
      names: "",
      phone: "",
    };
  },
  methods: {
    // async sendPasswordAxios(password, call) {
    //   const twilio = require("twilio");
    //   const accountSid = "ACd9b8dc499018e9dbf79b6f98ec0c096b"; // Your Account SID from www.twilio.com/console
    //   const authToken = "8da739160051496a6e583ff7e82ccbbf";
    //   const fromNumber = "+19786482515";
    // },
    async sendPassword(password, call,user) {
      // const axiosSend = require("axios");
      let dataSend = { password: password, number: call,user: user};
      // dataSend = JSON.stringify(dataSend);
      let res1 = await axios.post("/sendsms", dataSend, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      });
      console.log(res1);
      return res1;
    },
    async hantleSubmit() {
      var pass = Math.floor(Math.random() * 1000000);
      // alert(pass);
      var data = {
        username: this.ID_number,
        password: pass.toString(),
        is_admin: false,
        email: this.ID_number + "@email.com",
      };
      data = JSON.stringify(data);

      const userRes = await axios.post("/auth/local/register", data, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      });
      //  console.log(userRes)
      let voter = userRes.data;
      // console.log(voter.user.id);
      var data1 = {
        data: {
          user: voter.user.id,
          ID_Number: this.ID_number,
          full_names: this.names,
          Place_of_Birth: this.POB,
          district: this.district,
          hasVoted: false,
          phone: "+266" + this.phone,
        },
      };
      // alert(data1.data.phone);
      console.log(data1.data.phone);
      await this.sendPassword(pass.toString(), data1.data.phone,data1.data.full_names);

      data1 = JSON.stringify(data1);

      const voterRes = await axios.post("/voters", data1, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      });
      if (voterRes.status == 200 || voterRes.status == 201) {
        this.isAddCandidates = !this.isAddCandidates;

        this.$router.go();
      }
    },
    changeCandidatesView() {
      this.isAddCandidates = !this.isAddCandidates;
    },
  },
  async mounted() {
    try {
      const res = await axios.get("voters?populate=*");
      // await this.sendPassword("sdssd", "+266545454");
      var candidatesRes = res.data.data;

      var i = 1;
      candidatesRes.forEach((element) => {
        this.candidates.push({ key: i, candidate: element });
        i++;
      });
    } catch (err) {
      console.lor(err);
    }
  },
};
</script>

<style></style>
