import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useDarkMode } from '../context/ThemeContext';

export default function Contact() {
	const { darkMode } = useDarkMode();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// In a real app, you would send this data to your backend
		alert('Message sent successfully!');
		setFormData({ name: '', email: '', subject: '', message: '' });
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-6 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Contact Information */}
					<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
						<h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<FaEnvelope className="text-2xl text-blue-500 mt-1" />
								<div>
									<h3 className="font-semibold">Email</h3>
									<p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
										support@shopmvp.com
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-4">
								<FaPhone className="text-2xl text-blue-500 mt-1" />
								<div>
									<h3 className="font-semibold">Phone</h3>
									<p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
										+1 (555) 123-4567
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-4">
								<FaMapMarkerAlt className="text-2xl text-blue-500 mt-1" />
								<div>
									<h3 className="font-semibold">Address</h3>
									<p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
										123 Shopping Street<br />
										Retail City, RC 12345<br />
										United States
									</p>
								</div>
							</div>
						</div>

						{/* Business Hours */}
						<div className="mt-8">
							<h3 className="font-semibold mb-4">Business Hours</h3>
							<div className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
								<p>Monday - Friday: 9:00 AM - 6:00 PM</p>
								<p>Saturday: 10:00 AM - 4:00 PM</p>
								<p>Sunday: Closed</p>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
						<h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block mb-1">Name</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className={`w-full p-2 rounded-lg ${darkMode
										? 'bg-gray-700 text-white'
										: 'bg-gray-100 text-gray-800'
										}`}
									required
								/>
							</div>
							<div>
								<label className="block mb-1">Email</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className={`w-full p-2 rounded-lg ${darkMode
										? 'bg-gray-700 text-white'
										: 'bg-gray-100 text-gray-800'
										}`}
									required
								/>
							</div>
							<div>
								<label className="block mb-1">Subject</label>
								<input
									type="text"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									className={`w-full p-2 rounded-lg ${darkMode
										? 'bg-gray-700 text-white'
										: 'bg-gray-100 text-gray-800'
										}`}
									required
								/>
							</div>
							<div>
								<label className="block mb-1">Message</label>
								<textarea
									name="message"
									value={formData.message}
									onChange={handleChange}
									rows="4"
									className={`w-full p-2 rounded-lg ${darkMode
										? 'bg-gray-700 text-white'
										: 'bg-gray-100 text-gray-800'
										}`}
									required
								></textarea>
							</div>
							<button
								type="submit"
								className={`w-full px-6 py-3 rounded-lg ${darkMode
									? 'bg-blue-600 hover:bg-blue-700'
									: 'bg-blue-500 hover:bg-blue-600'
									} text-white transition-colors`}
							>
								Send Message
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
} 