
import React, { useEffect, useState } from "react";
import styles from "./editprojects.module.css";
import { getProjects, addProject, updateProject, deleteProject } from "../api";

const defaultProject = {
  title: "",
  description: "",
  stack: "",
  code: "",
  image: "",
  snippet: ""
};


export default function EditProjects() {
	const [projects, setProjects] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [editIdx, setEditIdx] = useState(null);
	const [form, setForm] = useState(defaultProject);
	const [loading, setLoading] = useState(false);

	// Fetch all projects from API
	useEffect(() => {
		setLoading(true);
		getProjects()
			.then(res => setProjects(res.data))
			.catch(() => setProjects([]))
			.finally(() => setLoading(false));
	}, []);

	// Open form for edit
	const handleEdit = (idx) => {
		setEditIdx(idx);
		const p = projects[idx];
		setForm({ ...p, stack: Array.isArray(p.stack) ? p.stack.join(", ") : (p.stack || "") });
		setShowForm(true);
	};

	// Delete project via API
	const handleDelete = async (idx) => {
		if (!window.confirm("Delete this project?")) return;
		const proj = projects[idx];
		try {
			await deleteProject(proj.id);
			setProjects(projects.filter((_, i) => i !== idx));
		} catch {
			alert("Failed to delete project.");
		}
	};

	// Open form for add
	const handleAdd = () => {
		setEditIdx(null);
		setForm(defaultProject);
		setShowForm(true);
	};

	// Form field change
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Add or update project via API
	const handleSubmit = async (e) => {
		e.preventDefault();
		//const newProject = { ...form, stack: form.stack.split(",").map(s => s.trim()) };
		const newProject = { 
  			id: Date.now().toString(),   // generate unique string id
  			...form, 
  			stack: form.stack.split(",").map(s => s.trim()) 
			};

		try {
			if (editIdx !== null) {
				// Update
				const proj = projects[editIdx];
				const res = await updateProject(proj.id, newProject);
				const updated = [...projects];
				updated[editIdx] = res.data;
				setProjects(updated);
			} else {
				// Add
				const res = await addProject(newProject);
				setProjects([res.data, ...projects]);
			}
			setShowForm(false);
			setEditIdx(null);
			setForm(defaultProject);
		} catch {
			alert("Failed to save project.");
		}
	};

		return (
			<div className={styles.editProjectsWrap}>
				<div className={styles.headerRow}>
					<h2 className={styles.title}>Projects</h2>
					{!showForm && (
						<button className={styles.addBtn} onClick={handleAdd}>Add Project</button>
					)}
				</div>
				{loading ? (
					<div style={{ color: '#aaa', padding: '2rem', textAlign: 'center' }}>Loading...</div>
				) : showForm ? (
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.formGroup}>
							<label>Title</label>
							<input name="title" value={form.title} onChange={handleChange} required />
						</div>
						<div className={styles.formGroup}>
							<label>Description</label>
							<input name="description" value={form.description} onChange={handleChange} required />
						</div>
						<div className={styles.formGroup}>
							<label>Stack (comma separated)</label>
							<input name="stack" value={form.stack} onChange={handleChange} />
						</div>
						<div className={styles.formGroup}>
							<label>Code Link</label>
							<input name="code" value={form.code} onChange={handleChange} />
						</div>
						<div className={styles.formGroup}>
							<label>Image URL</label>
							<input name="image" value={form.image} onChange={handleChange} />
						</div>
						<div className={styles.formGroup}>
							<label>Snippet</label>
							<textarea name="snippet" value={form.snippet} onChange={handleChange} rows={3} />
						</div>
						<div className={styles.formActions}>
							<button type="submit" className={styles.saveBtn}>Save</button>
							<button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
						</div>
					</form>
				) : (
					<div className={styles.card}>
						<table className={styles.table}>
							<thead>
								<tr>
									<th>Title</th>
									<th>Description</th>
									<th>Stack</th>
									<th>Code</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{projects.map((p, idx) => (
									<tr key={p.id || idx}>
										<td>{p.title}</td>
										<td>{p.description}</td>
										<td>{Array.isArray(p.stack) ? p.stack.join(", ") : p.stack}</td>
										<td><a href={p.code} target="_blank" rel="noopener noreferrer">Repo</a></td>
										<td>
											<button className={styles.actionBtn} onClick={() => handleEdit(idx)}>Edit</button>
											<button className={styles.actionBtn} onClick={() => handleDelete(idx)}>Delete</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
}
