import React, { useEffect, useState } from "react";
import styles from "./editexprience.module.css";
import {
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../api"; // adjust path if needed

const defaultExpr = {
  role: "",
  company: "",
  type: "",
  duration: ""
};

export default function EditExprience() {
  const [exprs, setExprs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editRole, setEditRole] = useState(null); // use role for editing
  const [form, setForm] = useState(defaultExpr);

  // Load from API
  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const res = await getExperience();
      setExprs(res.data);
    } catch (err) {
      console.error("Error fetching experience:", err);
    }
  };

  const handleEdit = (expr) => {
    setEditRole(expr.role); // store role for updating
    setForm({ ...expr });
    setShowForm(true);
  };

  const handleDelete = async (role) => {
    if (window.confirm("Delete this experience?")) {
      try {
        await deleteExperience(role); // delete by role
        loadExperiences();
      } catch (err) {
        console.error("Error deleting experience:", err);
      }
    }
  };

  const handleAdd = () => {
    setEditRole(null);
    setForm(defaultExpr);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRole) {
        await updateExperience(editRole, form); // update by role
      } else {
        await addExperience(form);
      }
      loadExperiences();
      setShowForm(false);
      setEditRole(null);
      setForm(defaultExpr);
    } catch (err) {
      console.error("Error saving experience:", err);
    }
  };

  return (
    <div className={styles.editExprienceWrap}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Experience</h2>
        {!showForm && (
          <button className={styles.addBtn} onClick={handleAdd}>Add Experience</button>
        )}
      </div>
      {showForm ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Role</label>
            <input name="role" value={form.role} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Company</label>
            <input name="company" value={form.company} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Type</label>
            <input name="type" value={form.type} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Duration</label>
            <input name="duration" value={form.duration} onChange={handleChange} required />
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
                <th>Role</th>
                <th>Company</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exprs.map((e) => (
                <tr key={e.role}>
                  <td>{e.role}</td>
                  <td>{e.company}</td>
                  <td>{e.type}</td>
                  <td>{e.duration}</td>
                  <td>
                    <button className={styles.actionBtn} onClick={() => handleEdit(e)}>Edit</button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(e.role)}>Delete</button>
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
