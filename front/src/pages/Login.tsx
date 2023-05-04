import React from 'react';
import Navigation from '../components/Navigation';

const Login = () => {
	return (
		<div>
			<Navigation />
			<form action="http://localhost:4000/user/signup" method="POST">
				<label>Nom : <input name="name" /></label>
				<label>Adresse mél : <input name="email" /></label>
				<label>Commentaire : <textarea name="comment"></textarea></label>
				<button>Laisser un commentaire</button>
			</form>
		</div >
	);
};

export default Login;