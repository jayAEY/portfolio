import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaFreeCodeCamp,
  FaCodepen,
} from "react-icons/fa";
import { SiReplit } from "react-icons/si";
import { webData } from "./web-projects-info.js";
import { graphicsData } from "./graphics-projects-info.js";

import Projects from "./Projects.jsx";
import TechFilters from "./TechFilters.jsx";
import Lightbox from "./Lightbox.jsx";

function App() {
  const [clicked, setClicked] = useState("");
  const [webOrGraphics, setWebOrGraphics] = useState("web-filter");
  const [lightboxImg, setLightboxImg] = useState("");
  const [lightboxActive, setLightboxActive] = useState(false);
  const [filters, setFilters] = useState([]);

  function handleWebOrGraphics(elem) {
    setFilters([]);
    // checks if button matches state
    if (elem.id != webOrGraphics) {
      let webFilter = document.querySelector("#web-filter");
      let graphicsFilter = document.querySelector("#graphics-filter");
      let projectsLabel = document.querySelector(".projects-label");

      // animate projects label and
      projectsLabel.style.transform = "translateX(-2000px)";
      setTimeout(() => {
        projectsLabel.style.transform = "translateX(0px)";
      }, 250);

      // set new state and handles style changes to show "active section"
      if (elem.id == "web-filter") {
        setWebOrGraphics("web-filter");
        webFilter.style.color = "var(--yellow)";
        webFilter.style.backgroundColor = "var(--light-gray)";
        graphicsFilter.style.color = "var(--light-gray)";
        graphicsFilter.style.backgroundColor = "var(--white)";
      }
      if (elem.id == "graphics-filter") {
        setWebOrGraphics("graphics-filter");
        graphicsFilter.style.color = "var(--yellow)";
        graphicsFilter.style.backgroundColor = "var(--light-gray)";
        webFilter.style.color = "var(--light-gray)";
        webFilter.style.backgroundColor = "var(--white)";
      }
    }
  }

  function projectClick(elem) {
    let projectsLabel = document.querySelector(".projects-label");
    let nav = document.querySelector("nav");
    let techFilters = document.querySelector("#tech-filters");
    let projects = document.querySelector("#projects");

    if (clicked == "") {
      //brings project section up for web
      webOrGraphics == "web-filter" && (projects.style.marginTop = "-80px");
      //"exit" animation and set state
      projectsLabel.style.transform = "translateX(-2000px)";
      techFilters && (techFilters.style.transform = "translateX(-2000px)");
      nav.style.transform = "translateX(-2000px)";
      elem.parentElement.style.transform = "translateX(-2000px)";
      setTimeout(() => {
        elem.parentElement.style.transform = "translateX(0px)";
        let elemProps = {
          name: elem.getAttribute("name"),
          desc: elem.getAttribute("desc"),
          mobileimage: elem.getAttribute("mobileimage"),
          desktopimage: elem.getAttribute("desktopimage"),
          extraimages: elem.getAttribute("extraimages"),
          liveurl: elem.getAttribute("liveurl"),
          github: elem.getAttribute("github"),
        };
        setClicked(elemProps);
      }, 100);
    } else {
      //"exit" animation and set state
      setTimeout(() => {
        //brings project section down if web
        webOrGraphics == "web-filter" && (projects.style.marginTop = 0);
        projectsLabel.style.transform = "translateX(0px)";
        techFilters && (techFilters.style.transform = "translateX(0px)");
        nav.style.transform = "translateX(0px)";
        elem.parentElement.parentElement.style.transform = "translateX(0px)";
        setClicked("");
      }, 100);
    }
  }

  function lineAnimation(elem) {
    let range = document.createRange();
    range.selectNodeContents(elem);
    let width = range.getBoundingClientRect().width;
    elem.style.setProperty("--lineWidth", `${width}px`);
  }

  // line animation on load
  useEffect(() => {
    setTimeout(() => {
      let h1 = document.querySelector("header h1");
      let projectsLabel = document.querySelector(".projects-label");
      h1.style.setProperty("--lineWidth", "100%");
      projectsLabel.style.setProperty("--lineWidth", "100%");
    }, 500);
  }, []);

  return (
    <>
      {lightboxActive && (
        <Lightbox
          lightboxActive={lightboxActive}
          setLightboxActive={setLightboxActive}
          lightboxImg={lightboxImg}
          setLightboxImg={setLightboxImg}
          projectClick={projectClick}
        />
      )}
      <header>
        <h1
          title="Jo Apuya"
          onClick={clicked == "" ? null : (e) => projectClick(e.target)}
        >
          Jo 😎 <br />
          Apuya
        </h1>
        <div
          id="bio"
          title="Bio"
        >
          <p>
            {/* Self-taught front-end web developer and graphic designer based in
            Vancouver, Canada */}
            Full-Stack Developer from Canada 🇨🇦 <br />
            This website was made entirely with regular React and CSS
          </p>
          <div className="link-icons">
            <a
              href="mailto:jomariapuya@gmail.com?subject = Questions&body = Message"
              title="Email"
              tabIndex={0}
            >
              <FaEnvelope title="Email" />
            </a>
            <a
              href="https://github.com/jayAEY"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              tabIndex={0}
            >
              <FaGithub title="Github" />
            </a>
            <a
              href="https://www.freecodecamp.org/jayAEY"
              target="_blank"
              rel="noopener noreferrer"
              title="FreeCodeCamp"
              tabIndex={0}
            >
              <FaFreeCodeCamp title="FreeCodeCamp" />
            </a>
            <a
              href="https://codepen.io/jayAEY/"
              target="_blank"
              rel="noopener noreferrer"
              title="CodePen"
              tabIndex={0}
            >
              <FaCodepen title="CodePen" />
            </a>
            <a
              href="https://replit.com/@joapuya"
              target="_blank"
              rel="noopener noreferrer"
              title="Replit"
              tabIndex={0}
            >
              <SiReplit title="Replit" />
            </a>
          </div>
        </div>
      </header>
      <nav>
        <button
          title="Web Projects"
          id="web-filter"
          onClick={(e) => handleWebOrGraphics(e.target)}
          onKeyUp={(e) => e.key == "Enter" && handleWebOrGraphics(e.target)}
          // tabIndex={0}
        >
          Web Development
        </button>
        <button
          title="Graphics Projects"
          id="graphics-filter"
          onClick={(e) => handleWebOrGraphics(e.target)}
          onKeyUp={(e) => e.key == "Enter" && handleWebOrGraphics(e.target)}
          // tabIndex={0}
        >
          Graphic Design
        </button>
      </nav>
      <h2 className="projects-label">
        {webOrGraphics == "web-filter" ? "Web Development" : "Graphic Design"}
      </h2>
      {webOrGraphics == "web-filter" && (
        <TechFilters
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <Projects
        title="Project"
        lineAnimation={lineAnimation}
        clicked={clicked}
        data={webOrGraphics == "web-filter" ? webData : graphicsData}
        projectsLabel={webOrGraphics}
        projectClick={projectClick}
        lightboxActive={lightboxActive}
        setLightboxActive={setLightboxActive}
        setLightboxImg={setLightboxImg}
        filters={filters}
        webOrGraphics={webOrGraphics}
      />
      <footer>
        <div className="link-icons">
          <a
            href="mailto:jomariapuya@gmail.com?subject = Questions&body = Message"
            title="Email"
            tabIndex={0}
          >
            <FaEnvelope title="Email" />
          </a>
          <a
            href="https://github.com/jayAEY"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
            tabIndex={0}
          >
            <FaGithub title="Github" />
          </a>
          <a
            href="https://www.freecodecamp.org/jayAEY"
            target="_blank"
            rel="noopener noreferrer"
            title="FreeCodeCamp"
            tabIndex={0}
          >
            <FaFreeCodeCamp title="FreeCodeCamp" />
          </a>
          <a
            href="https://codepen.io/jayAEY/"
            target="_blank"
            rel="noopener noreferrer"
            title="CodePen"
            tabIndex={0}
          >
            <FaCodepen title="CodePen" />
          </a>
          <a
            href="https://replit.com/@joapuya"
            target="_blank"
            rel="noopener noreferrer"
            title="Replit"
            tabIndex={0}
          >
            <SiReplit title="Replit" />
          </a>
        </div>
        <a
          onClick={() => document.querySelector("header").scrollIntoView()}
          tabIndex={0}
        >
          Back to top
        </a>
      </footer>
    </>
  );
}
export default App;
