import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaGithub, FaLink } from "react-icons/fa";

const ProjectExpanded = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // line animation on load
  useEffect(() => {
    props.lineAnimation(document.querySelector(".project-expand h2"));
  });
  // handle window rezize for main image
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", () => handleResize());
  }, [windowWidth]);

  // handle different image returns based on projects label
  let mainImage = [
    <div
      className="image-container"
      onClick={() => window.open(props.liveurl)}
    >
      <img
        alt={`Screenshot of ${props.name}`}
        src={windowWidth < 750 ? props.mobileimage : props.desktopimage}
        className={`${
          props.projectsLabel == "web-filter" ? "web" : "graphics"
        }-img`}
      ></img>
      <h3 title="Live Site">Go to live site</h3>
    </div>,
    <img
      alt={`Screenshot of ${props.name}`}
      src={windowWidth < 750 ? props.mobileimage : props.desktopimage}
      className={`${
        props.projectsLabel == "web-filter" ? "web" : "graphics"
      }-img`}
      onClick={(e) => props.imgClick(e.target)}
    ></img>,
  ];
  // handle extra images for graphics projects
  let extraimages = [];
  props.extraimages && (extraimages = props.extraimages.split(","));

  // exit project expanded with escape
  useEffect(() => {
    props.clicked != "" && document.querySelector(".project-expand").focus();
  }, [props.clicked, props.lightboxActive]);

  return (
    <div
      className="project-expand"
      tabIndex={0}
      onKeyUp={(e) => e.key == "Escape" && props.projectClick(e.target)}
    >
      <AiOutlineClose
        className="close-button"
        onClick={(e) => props.projectClick(e.target)}
        onKeyUp={(e) => e.key == "Enter" && props.projectClick(e.target)}
        title="Close"
        tabIndex={0}
      />
      <h2 onMouseOver={(e) => props.lineAnimation(e.target)}> {props.name}</h2>
      <p>{props.desc}</p>
      <div className="project-links">
        {props.github && (
          <a
            href={props.github}
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
          >
            <FaGithub title="Github" />
          </a>
        )}
        {props.liveurl && (
          <a
            href={props.liveurl}
            target="_blank"
            rel="noopener noreferrer"
            title="Live Site"
          >
            <FaLink title="Live Site" />
          </a>
        )}
      </div>
      {props.projectsLabel == "web-filter" ? mainImage[0] : mainImage[1]}
      {extraimages.map((image, index) => (
        <img
          className={`${
            props.projectsLabel == "web-filter" ? "web" : "graphics"
          }-img`}
          src={image}
          alt={`Another screenshot of ${props.name}`}
          key={`${props.name} ${index} `}
          onClick={(e) => props.imgClick(e.target)}
          tabIndex={0}
        ></img>
      ))}
    </div>
  );
};

export default ProjectExpanded;
