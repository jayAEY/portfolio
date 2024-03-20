import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Lightbox = (props) => {
  function lightboxArrows(arrow) {
    let currentImg = document.querySelector("#lightbox-img");
    let projectImgs = document.querySelectorAll(".graphics-img");
    projectImgs.forEach((img, index) => {
      if (img.src == currentImg.src) {
        if (arrow.id == "right-arrow") {
          index == projectImgs.length - 1
            ? props.setLightboxImg(projectImgs[0].src)
            : props.setLightboxImg(projectImgs[index + 1].src);
        }
        if (arrow.id == "left-arrow") {
          index == 0
            ? props.setLightboxImg(projectImgs[projectImgs.length - 1].src)
            : props.setLightboxImg(projectImgs[index - 1].src);
        }
      }
    });
  }

  function handleKeyPresses(e) {
    let leftArrow = document.querySelector("#left-arrow");
    let rightArrow = document.querySelector("#right-arrow");
    if (e.key == "Escape" && props.projectClick) {
      props.setLightboxActive(false);
    }
    if (e.key == "ArrowRight" && props.lightboxActive == true) {
      lightboxArrows(rightArrow);
    }
    if (e.key == "ArrowLeft" && props.lightboxActive == true) {
      lightboxArrows(leftArrow);
    }
  }

  // use esc and arrow keys to control lightbox
  useEffect(() => {
    //  automatically focus
    props.lightboxActive && document.querySelector("#lightbox").focus();
  }, [props.lightboxActive]);

  return (
    <div
      id="lightbox"
      tabIndex={0}
      onKeyUp={(e) => handleKeyPresses(e)}
    >
      <AiOutlineClose
        className="close-button"
        onClick={() => props.setLightboxActive(false)}
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
        src={props.lightboxImg}
      ></img>
    </div>
  );
};

export default Lightbox;
