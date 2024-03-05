import Project from "./project";
import ProjectExpanded from "./projectExpanded";

const Projects = (props) => {
  let projectsReturn = Object.entries(props.data).map((e, i) => (
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
      tab={i + 7}
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
