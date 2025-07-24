<!-- /src/AdminComponents/DashboardComponents.vue -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div class="card shadow-lg b" style="width: 18rem; border-radius: 10%">
          <div class="card-body">
            <h5 class="card-title text-success">Total Voters</h5>
            <h6 class="card-subtitle mb-2 text-success">
              <i class="fs-4 bi-people"></i>
            </h6>
            <div class="progress">
              <div
                class="progress-bar bg-success progress-bar-animated progress-bar-striped"
                role="progressbar"
                v-bind:style="{ width: ratio + '%' }"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p class="Card-text">{{ voted }}/{{ registeredVoters }} people</p>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="card shadow-lg b" style="width: 18rem; border-radius: 10%">
          <div class="card-body">
            <h5 class="card-title text-success">Voted</h5>
            <h6 class="card-subtitle mb-2 text-success">
              <i class="fs-4 bi-people"></i>
            </h6>
            <p class="Card-text">{{ voted }} people</p>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="card shadow-lg b" style="width: 18rem; border-radius: 10%">
          <div class="card-body">
            <h5 class="card-title text-success">Not Voted</h5>
            <h6 class="card-subtitle mb-2 text-success">
              <i class="fs-4 bi-people"></i>
            </h6>
            <p class="Card-text">{{ registeredVoters - voted }} people</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-sm">
        <div class="card shadow-lg b" style="width: 18rem; border-radius: 10%">
          <div class="card-body">
            <h5 class="card-title text-success">Parties</h5>
            <h6 class="card-subtitle mb-2 text-success">
              <i class="fs-4 bi-collection"></i>
            </h6>
            <p class="Card-text">{{ parties }} Parties</p>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="card shadow-lg b" style="width: 18rem; border-radius: 10%">
          <div class="card-body">
            <h5 class="card-title text-success">Constitutions</h5>
            <h6 class="card-subtitle mb-2 text-success"><i class="fs-4 bi-back"></i></h6>
            <p class="Card-text">There are 81 Constitutions in Lesotho</p>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="card shadow-lg b" style="width: 18rem; border-radius: 10%">
          <div class="card-body">
            <h5 class="card-title text-success">Results</h5>
            <h6 class="card-subtitle mb-2 text-success">
              <i class="fs-4 bi-patch-question-fill"></i>
            </h6>
            <router-link
              :to="{ name: 'Voting' }"
              class="btn btn-success stretched-link shadow-lg"
              >Check
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import '@/axios'
import axios from "axios";
export default {
  name: "DashComponents",
  data() {
    return {
      parties: 0,
      voted: 0,
      ratio: "",
      registeredVoters: 0,
      userSession: "",
    };
  },
  async mounted() {
    try {
      const partiesRes = await axios.get("parties");
      const registeredVotersRes = await axios.get("voters");
      const votedRes = await axios.get("votes?populate=*");
      const userRes = await axios.get("users/" + localStorage.getItem("id"));

      this.userSession = userRes.data;
      this.voted = votedRes.data.data.length;
      this.registeredVoters = registeredVotersRes.data.data.length;
      this.parties = partiesRes.data.data.length;
      this.ratio = ((this.voted / this.registeredVoters) * 100).toString();
      // console.log(userRes.data.is_admin);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
