import React, { useEffect } from "react";
import projects from "../data/projects_demo.json";
import "../../public/style/admin.css";

// Helper to generate random bubbles
const NUM_BUBBLES = 18;
function BubbleBackground() {
	// Generate random properties for each bubble
	const bubbles = Array.from({ length: NUM_BUBBLES }).map((_, i) => {
		const left = Math.random() * 100;
		const size = 24 + Math.random() * 36;
		const duration = 4 + Math.random() * 5;
		const delay = Math.random() * 5;
		const opacity = 0.13 + Math.random() * 0.18;
		return (
			<div
				key={i}
				className="bubble-square"
				style={{
					left: `${left}%`,
					width: `${size}px`,
					height: `${size}px`,
					animationDuration: `${duration}s`,
					animationDelay: `${delay}s`,
					opacity,
				}}
			/>
		);
	});
	return <div className="bubble-bg">{bubbles}</div>;
}

const ProjectsPage = () => {
	return (
		<div className="projects-page-root">
			<BubbleBackground />
			<h2 className="projects-title">Projects</h2>
			<div className="projects-list">
				{projects.map((project) => (
					<div className="project-card" key={project.id}>
						<div className="project-card-header">
							<img src={project.image} alt={project.title} className="project-card-img" />
							<div className="project-card-header-info">
								<h3 className="project-card-title">{project.title}</h3>
								<a href={project.code} target="_blank" rel="noopener noreferrer" className="project-card-link">View Code</a>
							</div>
						</div>
						<div className="project-card-body">
							<p className="project-card-desc">{project.description}</p>
							<div className="project-card-stack">
								{project.stack && project.stack.map((tech, idx) => (
									<span className="project-card-tech" key={idx}>{tech}</span>
								))}
							</div>
							<div className="project-card-snippet">
								<pre><code>{project.snippet}</code></pre>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectsPage;
