<template>
	<div class="container-fluid">
		<div class="row justify-content-center align-items-center min-vh-100">
			<div class="col-lg-6 col-md-8 col-12">
				<div class="card shadow-lg rounded-4 overflow-hidden">
					<div class="row g-0">
						<div class="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center gradient-background text-white p-4">
							<h2><i class="fa fa-android"></i></h2>
							<h4 class="mt-3">Please login</h4>
						</div>
						<div class="col-md-7 col-12 bg-white p-4">
							<form @submit.prevent="login" novalidate>
								<div class="mb-3">
									<label for="idNumber" class="form-label">National ID Number</label>
									<input
										type="text"
										id="idNumber"
										v-model="idNumber"
										class="form-control"
										placeholder="Enter National ID Number"
										required
									>
								</div>
								<div class="mb-3">
									<label for="password" class="form-label">Password</label>
									<input
										type="password"
										id="password"
										v-model="password"
										class="form-control"
										placeholder="Enter Password"
										required
									>
								</div>
								<div class="mb-3 text-end">
									<router-link to="/registration" class="text-decoration-none text-success">
										New user? Register here
									</router-link>
								</div>
								<div class="mb-2">
									<span v-if="error" class="text-danger">{{ error }}</span>
								</div>
								<div class="d-grid">
									<button type="submit" class="btn gradient-background text-white fw-bold">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const idNumber = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
	error.value = '';
	if (!idNumber.value || !password.value) {
		error.value = 'Please enter both National ID Number and Password.';
		return;
	}
	try {
		const res = await axios.post('/auth/local', {
			identifier: idNumber.value,
			password: password.value
		});
		localStorage.setItem('token', res.data.jwt);
		localStorage.setItem('id', res.data.user.id);

		const userRes = await axios.get('/api/users/me?populate=voter', {
			headers: { Authorization: `Bearer ${res.data.jwt}` }
		});

		const isAdmin = userRes.data.isAdmin || userRes.data.is_admin || (userRes.data.role && userRes.data.role.name === 'Admin');
		localStorage.setItem('admin', isAdmin);

		if (isAdmin) {
			router.push('/admin-dashboard');
		} else if (userRes.data.voter) {
			router.push('/voter-dashboard');
		} else {
			error.value = 'User role not found.';
		}
	} catch (e) {
		error.value = 'Invalid login credentials';
	}
};
</script>

<style scoped>
.gradient-background {
	background: linear-gradient(90deg, rgba(0,10,36,1) 0%, rgba(40,24,27,0.779) 32%, rgba(9,121,60,0.706) 76%, rgba(5,18,28,0.877) 100%);
}
.card {
	border-radius: 1.5rem;
}
.fa-android {
	font-size: 3em;
}
@media (max-width: 767.98px) {
	.gradient-background {
		display: none !important;
	}
	.card {
		border-radius: 1.5rem;
	}
}
</style>
