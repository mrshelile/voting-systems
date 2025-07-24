// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: null,
      name: '',
      hasVoted: false,
      isAdmin: false
    },
    parties: [],
    votes: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_PARTIES(state, parties) {
      state.parties = parties
    },
    ADD_VOTE(state, vote) {
      state.votes.push(vote)
      state.user.hasVoted = true
    },
    SET_USER_VOTED(state, status) {
      state.user.hasVoted = status
    }
  },
  actions: {
    fetchParties({ commit }) {
      // Simulate API call
      const parties = [
        { id: 1, name: 'Party A' },
        { id: 2, name: 'Party B' }
      ]
      commit('SET_PARTIES', parties)
    },
    updateVote({ commit }, vote) {
      // Simulate vote submission
      commit('ADD_VOTE', vote)
    },
    updateUserVotingStatus({ commit }, status) {
      commit('SET_USER_VOTED', status)
    }
  },
  modules: {
    // Example: parties, voters, votes modules can be added here
  }
})
