//add animations to filters?

import { useState, useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import {
  FaEnvelope,
  FaGithub,
  FaFreeCodeCamp,
  FaCodepen,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { SiReplit } from "react-icons/si";
import { webData } from "./webProjectsInfo.js";
import { graphicsData } from "./graphicsProjectsInfo";

import Projects from "./projects.jsx";
import TechFilters from "./techFilters.jsx";

function App() {
  const [clicked, setClicked] = useState("");
  const [webOrGraphics, setWebOrGraphics] = useState("web-filter");
  const [lightboxImg, setLightboxImg] = useState("");
  const [lightboxActive, setLightboxActive] = useState(false);
  const [filters, setFilters] = useState([]);

  function handleWebOrGraphics(elem) {
    // checks if button matches state
    if (elem.id != webOrGraphics) {
      let webFilter = document.querySelector("#web-filter");
      let graphicsFilter = document.querySelector("#graphics-filter");
      let projectsLabel = document.querySelector(".projects-label");
      let techFilters = document.querySelector("#tech-filters");

      // animate projects label and tech filters
      projectsLabel.style.transform = "translateX(-2000px)";
      setTimeout(() => {
        projectsLabel.style.transform = "translateX(0px)";
      }, 200);

      // set new state and handles style changes to show "active section"
      if (elem.id == "web-filter") {
        setWebOrGraphics("web-filter");
        webFilter.style.color = "var(--yellow)";
        webFilter.style.backgroundColor = "var(--light-gray)";
        graphicsFilter.style.color = "var(--light-gray)";
        graphicsFilter.style.backgroundColor = "var(--white)";
        techFilters.style.display = "flex";
        setTimeout(() => {
          techFilters.style.transform = "translateX(0px)";
        }, 150);
      }
      if (elem.id == "graphics-filter") {
        setWebOrGraphics("graphics-filter");
        // setFilters([]);
        graphicsFilter.style.color = "var(--yellow)";
        graphicsFilter.style.backgroundColor = "var(--light-gray)";
        webFilter.style.color = "var(--light-gray)";
        webFilter.style.backgroundColor = "var(--white)";
        techFilters.style.display = "none";
        techFilters.style.transform = "translateX(-2000px)";
      }
    }
  }

  function handleFilters(elem) {
    let filter = elem.innerHTML;
    if (!filters.includes(filter)) {
      setFilters(filters.concat(filter));
      elem.style.backgroundColor = "var(--light-gray)";
      elem.style.color = "var(--yellow)";
    } else if (filters.includes(filter)) {
      setFilters(filters.filter((e) => e !== filter));
      elem.style.backgroundColor = "var(--white)";
      elem.style.color = "var(--light-gray)";
    }
  }

  function projectClick(elem) {
    let projectsLabel = document.querySelector(".projects-label");
    let nav = document.querySelector("nav");
    let techFilters = document.querySelector("#tech-filters");

    if (clicked == "") {
      //"exit" animation and set state
      projectsLabel.style.transform = "translateX(-2000px)";
      techFilters.style.transform = "translateX(-2000px)";
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
        projectsLabel.style.transform = "translateX(0px)";
        techFilters.style.transform = "translateX(0px)";
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

  //lightbox feature
  function imgClick(img) {
    setLightboxActive(true);
    setLightboxImg(img.src);
  }

  function lightboxArrows(arrow) {
    let currentImg = document.querySelector("#lightbox-img");
    let projectImgs = document.querySelectorAll(".graphics-img");
    projectImgs.forEach((img, index) => {
      if (img.src == currentImg.src) {
        if (arrow.id == "right-arrow") {
          index == projectImgs.length - 1
            ? setLightboxImg(projectImgs[0].src)
            : setLightboxImg(projectImgs[index + 1].src);
        }
        if (arrow.id == "left-arrow") {
          index == 0
            ? setLightboxImg(projectImgs[projectImgs.length - 1].src)
            : setLightboxImg(projectImgs[index - 1].src);
        }
      }
    });
  }

  // use esc and arrow keys to control lightbox
  useEffect(() => {
    lightboxActive && document.querySelector("#lightbox").focus();
  }, [lightboxActive]);

  function handleKeyUps(e) {
    let leftArrow = document.querySelector("#left-arrow");
    let rightArrow = document.querySelector("#right-arrow");
    if (e.key == "Escape" && projectClick) {
      setLightboxActive(false);
    }
    if (e.key == "ArrowRight" && lightboxActive == true) {
      lightboxArrows(rightArrow);
    }
    if (e.key == "ArrowLeft" && lightboxActive == true) {
      lightboxArrows(leftArrow);
    }
  }

  return (
    <>
      {lightboxActive && (
        <div
          id="lightbox"
          tabIndex={0}
          onKeyUp={(e) => handleKeyUps(e)}
        >
          <AiOutlineClose
            className="close-button"
            onClick={() => setLightboxActive(false)}
          />
          <FaArrowLeft
            className="arrow-button"
            id="left-arrow"
            onClick={(e) => lightboxArrows(e.target)}
          />
          <FaArrowRight
            className="arrow-button"
            id="right-arrow"
            onClick={(e) => lightboxArrows(e.target)}
          />
          <img
            id="lightbox-img"
            src={lightboxImg}
          ></img>
        </div>
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
            Self-taught front-end web developer and graphic designer based in
            Vancouver, Canada
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
      <TechFilters handleFilters={handleFilters} />
      <Projects
        title="Project"
        lineAnimation={lineAnimation}
        clicked={clicked}
        setClicked={setClicked}
        data={webOrGraphics == "web-filter" ? webData : graphicsData}
        projectsLabel={webOrGraphics}
        projectClick={projectClick}
        imgClick={imgClick}
        lightboxActive={lightboxActive}
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
