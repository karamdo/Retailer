import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { showToast } from '../showToast';
import { useDarkMode } from '../context/ThemeContext';

const SignUp = () => {
	const navigate = useNavigate();
	const { darkMode } = useDarkMode();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Basic validation
		if (formData.password !== formData.confirmPassword) {
			showToast('Passwords do not match!', 'error');
			return;
		}

		// Here you would typically handle registration
		// For now, we'll just show a success message and redirect
		showToast('Account created successfully!', 'success');
		navigate('/signin');
	};

	return (
		<div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
			<div className={`max-w-md w-full space-y-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
				<div>
					<h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
						Create your account
					</h2>
					<p className={`mt-2 text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
						Already have an account?{' '}
						<Link to="/Retailer/signin" className={`font-medium ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
							Sign in
						</Link>
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="firstName" className="sr-only">
									First Name
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									required
									className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="First Name"
									value={formData.firstName}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor="lastName" className="sr-only">
									Last Name
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									required
									className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="Last Name"
									value={formData.lastName}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Email address"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="relative">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								required
								className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<FaEyeSlash className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />
								) : (
									<FaEye className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />
								)}
							</button>
						</div>
						<div className="relative">
							<label htmlFor="confirmPassword" className="sr-only">
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
								required
								className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
								placeholder="Confirm Password"
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? (
									<FaEyeSlash className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />
								) : (
									<FaEye className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />
								)}
							</button>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp; 