<template>
  <div class="home">
    <div class="dashboard-card">
      <img alt="Vue logo" src="../assets/logo.png" class="logo" />
      <h1 class="welcome">Welcome to Your Voting System</h1>
      <p class="subtitle">Secure, Fast, and Reliable Voting Platform</p>
      <div class="stats">
        <div class="stat">
          <span class="stat-value">1,245</span>
          <span class="stat-label">Total Votes</span>
        </div>
        <div class="stat">
          <span class="stat-value">12</span>
          <span class="stat-label">Active Polls</span>
        </div>
        <div class="stat">
          <span class="stat-value">5</span>
          <span class="stat-label">Admins Online</span>
        </div>
      </div>
      <div class="actions">
        <button class="btn admin">Admin Dashboard</button>
        <button class="btn voter">Vote Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a1a 0%, #145214 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-card {
  background: #222c22;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(20, 82, 20, 0.3);
  padding: 40px 32px;
  max-width: 420px;
  width: 100%;
  text-align: center;
}

.logo {
  width: 80px;
  margin-bottom: 16px;
}

.welcome {
  color: #38b000;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  color: #b7e4c7;
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
}

.stat {
  background: #145214;
  border-radius: 12px;
  padding: 16px 12px;
  color: #fff;
  flex: 1;
  margin: 0 6px;
  box-shadow: 0 2px 8px rgba(56, 176, 0, 0.12);
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 600;
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: #b7e4c7;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  background: #38b000;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn.admin {
  background: #145214;
}

.btn.voter {
  background: #38b000;
}

.btn:hover {
  background: #218838;
}
</style>
