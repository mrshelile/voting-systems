<template>
<div class="container">
  <div class="row">
    <div class="input-group mb-3 w-50 shadow-lg">
      <input type="text" class="form-control border border-white" placeholder="Search Party" v-model="search" aria-label="Search Party" aria-describedby="basic-addon2">
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
                <th scope="col" class="text-uppercase" v-if="isVoted">Winner</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="party in filteredParties" :key="party.party.id">
                <th scope="row">{{ party.position }}</th>
                <td>{{ party.party.attributes.name }}</td>
                <td>{{ party.party.attributes.votes.data.length }}</td>
                <td>{{ party.party.attributes.leader }}</td>
                <td v-if="!isVoted">
                  <button
                    @click="voteNow(party)"
                    type="button"
                    class="btn btn-outline-success"
                    :disabled="isVoted"
                  >
                    Vote Now
                  </button>
                </td>
                <td v-if="isVoted">
                  <span v-if="party.party.id === winnerId" class="badge bg-success">Winner</span>
                </td>
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
import { v4 } from 'uuid';
import axios from 'axios';
export default {
  name: "Voting",
  data() {
    return {
      parties: [],
      isVoted: false,
      user: '',
      isAdmin: Boolean(localStorage.getItem('admin')),
      search: '',
      winnerId: null,
    };
  },
  computed: {
    filteredParties() {
      if (!this.search) return this.parties;
      return this.parties.filter(p =>
        p.party.attributes.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    async voteNow(party) {
      try {
        let data = {
          data: {
            voter: this.user.voter.id,
            partie: party.party.id,
            voteId: v4(),
          },
        };
        const voteRes = await axios.post("/votes", JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        });
        if (voteRes.status === 200) {
          let data1 = { data: { hasVoted: true } };
          let voterUpRes = await axios.put(
            "/voters/" + this.user.voter.id,
            JSON.stringify(data1),
            { headers: { 'Content-Type': 'application/json' } }
          );
          if (voterUpRes.status === 200) {
            this.isVoted = true;
            await this.refreshParties();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async refreshParties() {
      const res = await axios.get("parties?populate=*");
      let partiesRes = res.data.data;
      let unOrderParties = [];
      partiesRes.forEach(partyRes => {
        unOrderParties.push(partyRes);
      });
      unOrderParties.sort((a, b) => b.attributes.votes.data.length - a.attributes.votes.data.length);
      this.parties = [];
      let i = 1;
      unOrderParties.forEach(element => {
        this.parties.push({ position: i, party: element });
        i++;
      });
      this.setWinner();
    },
    setWinner() {
      if (this.parties.length === 0) {
        this.winnerId = null;
        return;
      }
      // Highest votes party
      let maxVotes = Math.max(...this.parties.map(p => p.party.attributes.votes.data.length));
      let winner = this.parties.find(p => p.party.attributes.votes.data.length === maxVotes);
      this.winnerId = winner ? winner.party.id : null;
    },
  },
  async mounted() {
    try {
      let user = await axios.get("users/" + localStorage.getItem('id') + "?populate=*");
      this.user = user.data;
      this.isVoted = this.user.voter.hasVoted;
      await this.refreshParties();
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
/* Add your styles here if needed */
</style>
