import Project from "./project";
import ProjectExpanded from "./projectExpanded";

const Projects = (props) => {
  let projectsReturn =
    // filters if tech filters and web filter are active
    props.filters.length > 0 && props.webOrGraphics == "web-filter"
      ? Object.entries(props.data).map(
          (e) =>
            //checks if project has every filter
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
      : // returns all projects if no filter
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
          />
        ));

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
      imgClick={props.imgClick}
      lightboxActive={props.lightboxActive}
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
