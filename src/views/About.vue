<!-- /src/views/About.vue -->
<template>
  <div class="about">
    <div class="about-card">
      <h1>About Voting Systems</h1>
      <p>
        Welcome to our voting system project! This platform is designed to provide secure, transparent, and efficient voting solutions for organizations and communities.
      </p>
      <ul>
        <li>🟢 Secure authentication and voting process</li>
        <li>🟢 Real-time results and analytics</li>
        <li>🟢 User-friendly interface with accessibility in mind</li>
        <li>🟢 Built with modern technologies</li>
      </ul>
      <p>
        Explore the features and learn how our system can help you run fair and reliable elections.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a1a 0%, #145214 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-card {
  background: #222c22;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(20, 82, 20, 0.3);
  padding: 2.5rem 2rem;
  max-width: 500px;
  color: #e6ffe6;
  text-align: left;
}

.about-card h1 {
  color: #38b000;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
}

.about-card ul {
  margin: 1rem 0;
  padding-left: 1.2rem;
}

.about-card li {
  margin-bottom: 0.5rem;
  color: #b6ffb6;
  font-size: 1.05rem;
}
</style>
