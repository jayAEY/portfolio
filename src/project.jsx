const Project = (props) => {
  function projectHover(elem, overOrOut) {
    if (overOrOut == "over") {
      elem.style.background = `
      linear-gradient(rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.8)),
      url("${props.mobileimage}")
      `;
      elem.style.backgroundPosition = "center";
      elem.style.backgroundSize = "cover";
    } else if (overOrOut == "out") {
      elem.style.background = `url("${props.mobileimage}")`;
      elem.style.backgroundPosition = "center";
      elem.style.backgroundSize = "cover";
    }
  }
  return (
    <div
      className={`project ${
        props.projectsLabel == "web-filter" ? "web" : "graphics"
      }`}
      id={props.name}
      alt={`Screenshot of ${props.name}`}
      style={{
        background: `url("${props.mobileimage}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      onMouseOver={(e) => {
        projectHover(e.target, "over");
        props.lineAnimation(e.target);
      }}
      onMouseOut={(e) => projectHover(e.target, "out")}
      onClick={(e) => props.projectClick(e.target)}
      onKeyUp={(e) => e.key == "Enter" && props.projectClick(e.target)}
      name={props.name}
      desc={props.desc}
      mobileimage={props.mobileimage}
      desktopimage={props.desktopimage}
      extraimages={props.extraimages}
      liveurl={props.liveurl}
      github={props.github}
      title={props.name}
      aria-label={props.name}
      tabIndex={0}
    >
      <h2>{props.name}</h2>
    </div>
  );
};

export default Project;
