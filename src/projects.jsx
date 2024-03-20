import Project from "./Project";
import ProjectExpanded from "./ProjectExpanded";
import TechFilters from "./TechFilters";

const Projects = (props) => {
  let projectsReturn =
    props.webOrGraphics == "graphics-filter"
      ? //display graphics projects
        Object.entries(props.data).map((e) => (
          <Project
            name={e[1].name}
            key={e[1].name}
            desc={e[1].desc}
            mobileimage={e[1].mobileimage}
            desktopimage={e[1].desktopimage}
            extraimages={e[1].extraimages}
            liveurl={e[1].liveurl}
            github={e[1].github}
            lineAnimation={props.lineAnimation}
            projectsLabel={props.projectsLabel}
            projectClick={props.projectClick}
            technologies={props.technologies}
          />
        ))
      : //displays web projects
        Object.entries(props.data).map((e) =>
          props.filters.length == 0 ? (
            // display for web projects if no filters are active
            e[1].section ? (
              <section
                className="section-text"
                key={e[1].section}
              >
                <h3 className="section-name">{e[1].section}</h3>
                <p
                  className="section-description
                "
                >
                  {e[1].desc}
                </p>
              </section>
            ) : (
              <Project
                name={e[1].name}
                key={e[1].name}
                desc={e[1].desc}
                mobileimage={e[1].mobileimage}
                desktopimage={e[1].desktopimage}
                extraimages={e[1].extraimages}
                liveurl={e[1].liveurl}
                github={e[1].github}
                lineAnimation={props.lineAnimation}
                projectsLabel={props.projectsLabel}
                projectClick={props.projectClick}
                technologies={props.technologies}
              />
            )
          ) : (
            // handle filters
            //  checks if project has every filter
            !e[1].section &&
            props.filters.every((filter) =>
              e[1].technologies.includes(filter)
            ) && (
              <Project
                name={e[1].name}
                key={e[1].name}
                desc={e[1].desc}
                mobileimage={e[1].mobileimage}
                desktopimage={e[1].desktopimage}
                extraimages={e[1].extraimages}
                liveurl={e[1].liveurl}
                github={e[1].github}
                lineAnimation={props.lineAnimation}
                projectsLabel={props.projectsLabel}
                projectClick={props.projectClick}
                technologies={props.technologies}
              />
            )
          )
        );
  let expandedReturn = (
    <ProjectExpanded
      name={props.clicked.name}
      desc={props.clicked.desc}
      mobileimage={props.clicked.mobileimage}
      desktopimage={props.clicked.desktopimage}
      extraimages={props.clicked.extraimages}
      liveurl={props.clicked.liveurl}
      github={props.clicked.github}
      lineAnimation={props.lineAnimation}
      projectsLabel={props.projectsLabel}
      projectClick={props.projectClick}
      lightboxActive={props.lightboxActive}
      setLightboxActive={props.setLightboxActive}
      setLightboxImg={props.setLightboxImg}
    />
  );
  return (
    <section
      id="projects"
      className={props.projectsLabel}
    >
      {props.clicked == "" ? projectsReturn : expandedReturn}
    </section>
  );
};

export default Projects;
