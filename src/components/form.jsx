import React, { useState } from "react";

const Form = ({ heading, onSubmit, loading }) => {
	const [form, setForm] = useState({
		title: "",
		description: "",
		tech: "",
		link: ""
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(form);
		setForm({ title: "", description: "", tech: "", link: "" });
	};

	return (
		<form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: 320, margin: '2rem auto 0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: '2rem 1.5rem'}}>
			<h3 style={{textAlign: 'center', margin: 0}}>Add {heading} Project</h3>
			<input
				name="title"
				value={form.title}
				onChange={handleChange}
				placeholder="Project Title"
				required
				style={{padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc'}}
			/>
			<textarea
				name="description"
				value={form.description}
				onChange={handleChange}
				placeholder="Description"
				required
				style={{padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', minHeight: 60}}
			/>
			<input
				name="tech"
				value={form.tech}
				onChange={handleChange}
				placeholder="Tech Used (comma separated)"
				required
				style={{padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc'}}
			/>
			<input
				name="link"
				value={form.link}
				onChange={handleChange}
				placeholder="Project Link (GitHub, Streamlit, Vercel, etc)"
				required
				style={{padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc'}}
			/>
			<button type="submit" disabled={loading} style={{padding: '0.5rem', borderRadius: 6, background: '#61dafb', color: '#222', border: 'none', fontWeight: 600, cursor: 'pointer'}}>
				{loading ? 'Saving...' : 'Submit'}
			</button>
		</form>
	);
};

export default Form;
