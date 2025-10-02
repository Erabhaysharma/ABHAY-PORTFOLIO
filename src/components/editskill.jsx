import React, { useEffect, useState } from "react";
import styles from "./editskill.module.css";
import { getSkills, addSkill, updateSkill, deleteSkill } from "../api";

const defaultCategory = { name: "", icon: "", skills: [] };

export default function EditSkill() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCatName, setEditCatName] = useState(null); // use name instead of id
  const [catForm, setCatForm] = useState(defaultCategory);

  // Load categories from backend
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getSkills();
      setCategories(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Add new category
  const handleAddCategory = () => {
    setEditCatName(null);
    setCatForm(defaultCategory);
    setShowForm(true);
  };

  // Edit category
  const handleEditCategory = (cat) => {
    setEditCatName(cat.name); // use name
    setCatForm(JSON.parse(JSON.stringify(cat)));
    setShowForm(true);
  };

  // Delete category
  const handleDeleteCategory = async (name) => {
    if (window.confirm("Delete this category and all its skills?")) {
      try {
        await deleteSkill(name); // pass name to API
        loadData();
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
  };

  // Handle category input change
  const handleCatChange = (e) => {
    setCatForm({ ...catForm, [e.target.name]: e.target.value });
  };

  // Handle sub-skill input change
  const handleSubSkillChange = (idx, field, value) => {
    const updatedSkills = [...catForm.skills];
    updatedSkills[idx][field] = field === "percent" ? Number(value) : value;
    setCatForm({ ...catForm, skills: updatedSkills });
  };

  // Add sub-skill row
  const handleAddSubSkill = () => {
    setCatForm({
      ...catForm,
      skills: [...catForm.skills, { name: "", percent: 0 }],
    });
  };

  // Delete sub-skill row
  const handleDeleteSubSkill = (idx) => {
    const updatedSkills = catForm.skills.filter((_, i) => i !== idx);
    setCatForm({ ...catForm, skills: updatedSkills });
  };

  // Submit category (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: catForm.name.trim(),
      icon: catForm.icon.trim(),
      skills: catForm.skills.map((s) => ({
        name: s.name.trim(),
        percent: Number(s.percent),
      })),
    };

    try {
      if (editCatName) {
        await updateSkill(editCatName, payload); // update by name
      } else {
        await addSkill(payload);
      }
      setShowForm(false);
      setEditCatName(null);
      setCatForm(defaultCategory);
      loadData();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error saving category. Check console for details.");
    }
  };

  return (
    <div className={styles.editSkillWrap}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Skills</h2>
        {!showForm && (
          <button className={styles.addBtn} onClick={handleAddCategory}>
            Add Category
          </button>
        )}
      </div>

      {showForm ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Category fields */}
          <div className={styles.formGroup}>
            <label>Category Name</label>
            <input
              name="name"
              value={catForm.name}
              onChange={handleCatChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Icon</label>
            <input name="icon" value={catForm.icon} onChange={handleCatChange} />
          </div>

          {/* Sub-skills */}
          <h4>Sub-Skills</h4>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Percent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {catForm.skills.map((s, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) =>
                        handleSubSkillChange(idx, "name", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={s.percent}
                      min="0"
                      max="100"
                      onChange={(e) =>
                        handleSubSkillChange(idx, "percent", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteSubSkill(idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={handleAddSubSkill}>
            + Add Sub-Skill
          </button>

          {/* Form actions */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
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
          {categories.map((cat) => (
            <div key={cat.name} style={{ marginBottom: "2.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.7rem",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  {cat.name}{" "}
                  <span
                    style={{
                      color: "#5eead4",
                      fontWeight: 400,
                      fontSize: "1rem",
                    }}
                  >
                    {cat.icon && `(${cat.icon})`}
                  </span>
                </div>
                <div>
                  <button
                    className={styles.actionBtn}
                    onClick={() => handleEditCategory(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={() => handleDeleteCategory(cat.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.skills.map((s, idx) => (
                    <tr key={idx}>
                      <td>{s.name}</td>
                      <td>{s.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
