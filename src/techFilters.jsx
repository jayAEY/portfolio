import React from "react";

const TechFilters = (props) => {
  let filters = props.filters;
  function handleFilters(elem) {
    let filter = elem.innerHTML;
    if (!filters.includes(filter)) {
      props.setFilters(filters.concat(filter));
      elem.style.backgroundColor = "var(--light-gray)";
      elem.style.color = "var(--yellow)";
    } else if (filters.includes(filter)) {
      props.setFilters(filters.filter((e) => e !== filter));
      elem.style.backgroundColor = "var(--white)";
      elem.style.color = "var(--light-gray)";
    }
  }
  return (
    <section id="tech-filters">
      {/* <button
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
      </button> */}
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
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        D3.js
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        Next.js
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        Express
      </button>

      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        Node.js
      </button>
      <button
        className="tech-filter"
        onClick={(e) => handleFilters(e.target)}
      >
        MongoDB
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
        Supabase
      </button>
    </section>
  );
};

export default TechFilters;
