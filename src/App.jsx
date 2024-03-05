import { useState, useEffect } from "react";
import Projects from "./projects.jsx";

import { AiOutlineClose } from "react-icons/ai";
import {
  FaCodepen,
  FaEnvelope,
  FaGithub,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { SiReplit } from "react-icons/si";
import { webData } from "./webProjectsInfo.js";
import { graphicsData } from "./graphicsProjectsInfo";

function App() {
  const [clicked, setClicked] = useState("");
  const [webOrGraphics, setWebOrGraphics] = useState("web-filter");
  const [lightboxImg, setLightboxImg] = useState("");
  const [lightboxActive, setLightboxActive] = useState(false);

  function lineAnimation(elem) {
    let range = document.createRange();
    range.selectNodeContents(elem);
    let width = range.getBoundingClientRect().width;
    elem.style.setProperty("--lineWidth", `${width}px`);
  }

  function handleWebOrGraphics(elem) {
    // checks if button matches state
    if (elem.id != webOrGraphics) {
      let webFilter = document.querySelector("#web-filter");
      let graphicsFilter = document.querySelector("#graphics-filter");
      let projectsLabel = document.querySelector(".projects-label");
      // animate projects label
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
    if (clicked == "") {
      //"exit" animation and set state
      projectsLabel.style.transform = "translateX(-2000px)";
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
        nav.style.transform = "translateX(0px)";
        elem.parentElement.parentElement.style.transform = "translateX(0px)";
        setClicked("");
      }, 100);
    }
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
          <div id="link-icons">
            <a
              href="mailto:jomariapuya@gmail.com?subject = Questions&body = Message"
              title="Email"
              tabIndex={1}
            >
              <FaEnvelope title="Email" />
            </a>
            <a
              href="https://github.com/jayAEY"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              tabIndex={2}
            >
              <FaGithub title="Github" />
            </a>
            <a
              href="https://codepen.io/jayAEY/"
              target="_blank"
              rel="noopener noreferrer"
              title="CodePen"
              tabIndex={3}
            >
              <FaCodepen title="CodePen" />
            </a>
            <a
              href="https://replit.com/@joapuya"
              target="_blank"
              rel="noopener noreferrer"
              title="Replit"
              tabIndex={4}
            >
              <SiReplit title="Replit" />
            </a>
          </div>
        </div>
      </header>
      <nav>
        <a
          title="Web Projects"
          id="web-filter"
          onClick={(e) => handleWebOrGraphics(e.target)}
          onKeyUp={(e) => e.key == "Enter" && handleWebOrGraphics(e.target)}
          tabIndex={5}
        >
          Web Development
        </a>
        <a
          title="Graphics Projects"
          id="graphics-filter"
          onClick={(e) => handleWebOrGraphics(e.target)}
          onKeyUp={(e) => e.key == "Enter" && handleWebOrGraphics(e.target)}
          tabIndex={6}
        >
          Graphic Design
        </a>
      </nav>
      <h2 className="projects-label">
        {webOrGraphics == "web-filter" ? "Web Development" : "Graphic Design"}
      </h2>
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
      />
    </>
  );
}
export default App;
