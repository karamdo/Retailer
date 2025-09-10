import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { showToast, toastConfig } from '../showToast';
import { toast } from 'react-toastify';
import { useDarkMode } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { apiPost } from '../api/client';

const SignIn = () => {
	const navigate = useNavigate();
	const { darkMode } = useDarkMode();
	const { setToken, setUser, setRole } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		loginAs: 'user',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		if (isSubmitting) return;
		setIsSubmitting(true);
		try {
			const path = formData.loginAs === 'admin' ? '/admin/login' : '/login';
			const payload = { email: formData.email, password: formData.password };
			const data = await apiPost(path, payload);
			const receivedToken = data.token || data.access_token || data?.data?.token;
			const receivedUser = data.user || data?.data?.user || null;
			if (!receivedToken) throw new Error('No token returned');
			setToken(receivedToken);
			const fallbackName = receivedUser?.name || (formData.email ? formData.email.split('@')[0] : 'User');
			const email = receivedUser?.email || formData.email;
			const avatar = receivedUser?.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email || fallbackName)}`;
			setUser({ ...receivedUser, name: fallbackName, email, avatar });
			setRole(formData.loginAs === 'admin' ? 'admin' : 'customer');
			toast.success('Successfully signed in!', toastConfig);
			navigate(formData.loginAs === 'admin' ? '/Retailer/dashboard' : '/Retailer');
		} catch (err) {
			showToast.error(err.message || 'Login failed');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
			<div className={`max-w-md w-full space-y-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
				<div>
					<h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
						Sign in to your account
					</h2>
					<p className={`mt-2 text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
						Or{' '}
						<Link to="/Retailer/signup" className={`font-medium ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
							create a new account
						</Link>
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={onSubmitForm}>
					<div className="rounded-md shadow-sm space-y-4">
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
								autoComplete="current-password"
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
						<div>
							<label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Login as</label>
							<select
								name="loginAs"
								value={formData.loginAs}
								onChange={handleChange}
								className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
							>
								<option value="user">User</option>
								<option value="admin">Admin</option>
							</select>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border rounded ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
							/>
							<label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a href="#" className={`font-medium ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn; 