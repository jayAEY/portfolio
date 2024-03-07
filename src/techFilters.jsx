import React from "react";

const TechFilters = (props) => {
  let handleFilters = props.handleFilters;
  return (
    <section id="tech-filters">
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        HTML
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        CSS
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        JavaScript
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        React
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        Vite
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        API
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        Tailwind CSS
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        Bootstrap
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        TypeScript
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        GSAP
      </button>
    </section>
  );
};

export default TechFilters;
