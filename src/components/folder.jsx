
import React from "react";
//import { addProjectToFolder } from './firestoreHelpers';


// Optionally, you can pass a prop to handle project submission from the parent
const Folder = ({ heading, onBack, onAddProject, onProjectSubmit }) => {
   // Example usage: onProjectSubmit({ title, description, tech, link })
   // This is just a placeholder for where you would call addProjectToFolder
   // You should call addProjectToFolder(heading, projectData) when the form is submitted
   return (
	   <div style={{ position: 'relative', width: '100%' }}>
		   <button
			   style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'none', border: 'none', color: '#222', fontSize: '1rem', cursor: 'pointer', fontWeight: 600, zIndex: 2, display: 'flex', alignItems: 'center' }}
			   onClick={onBack}
			   title="Back to list"
		   >
			   &#8592; Back
		   </button>
		   <h2 style={{ textAlign: 'center', margin: '0 0 2rem 0', fontWeight: 600 }}>{heading}</h2>
		   <button
			   style={{ display: 'block', margin: '0 auto 2rem auto', padding: '0.5rem 1.2rem', fontSize: '1rem', borderRadius: '6px', background: '#61dafb', color: '#222', border: 'none', fontWeight: 600, cursor: 'pointer' }}
			   onClick={onAddProject}
		   >
			   Add {heading} Project
		   </button>
	   </div>
   );
};

export default Folder;
