import React, { useEffect, useState } from "react";
import styles from "./editresearch.module.css";
import {
  getResearch,
  addResearch,
  updateResearch,
  deleteResearch,
} from "../api"; // adjust path if needed

const defaultResearch = {
  title: "",
  short_description: "",
  author: "",
  link: ""
};

export default function EditResearch() {
  const [research, setResearch] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTitle, setEditTitle] = useState(null); // use title for editing
  const [form, setForm] = useState(defaultResearch);

  // Load research from API
  useEffect(() => {
    loadResearch();
  }, []);

  const loadResearch = async () => {
    try {
      const res = await getResearch();
      setResearch(res.data);
    } catch (err) {
      console.error("Error fetching research:", err);
    }
  };

  const handleEdit = (r) => {
    setEditTitle(r.title); // store title for updating
    setForm({ ...r });
    setShowForm(true);
  };

  const handleDelete = async (title) => {
    if (window.confirm("Delete this research entry?")) {
      try {
        await deleteResearch(title); // delete by title
        loadResearch();
      } catch (err) {
        console.error("Error deleting research:", err);
      }
    }
  };

  const handleAdd = () => {
    setEditTitle(null);
    setForm(defaultResearch);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTitle) {
        await updateResearch(editTitle, form); // update by title
      } else {
        await addResearch(form);
      }
      loadResearch();
      setShowForm(false);
      setEditTitle(null);
      setForm(defaultResearch);
    } catch (err) {
      console.error("Error saving research:", err);
    }
  };

  return (
    <div className={styles.editResearchWrap}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Research</h2>
        {!showForm && (
          <button className={styles.addBtn} onClick={handleAdd}>Add Research</button>
        )}
      </div>
      {showForm ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Short Description</label>
            <textarea
              name="short_description"
              value={form.short_description}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Author</label>
            <input name="author" value={form.author} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Link</label>
            <input name="link" value={form.link} onChange={handleChange} required />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn}>Save</button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {research.map((r) => (
                <tr key={r.title}>
                  <td>{r.title}</td>
                  <td>{r.short_description}</td>
                  <td>{r.author}</td>
                  <td>
                    <a href={r.link} target="_blank" rel="noopener noreferrer">View</a>
                  </td>
                  <td>
                    <button className={styles.actionBtn} onClick={() => handleEdit(r)}>Edit</button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(r.title)}>Delete</button>
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
