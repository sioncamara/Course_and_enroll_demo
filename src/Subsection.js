import React from "react";
import "./App.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Button from "react-bootstrap/Button"

function Subsection(props) {


  const setsubsection = (course, section) => {
    let courseCopy = Object.assign({}, course); // must use temp copy to prevent courses sections from being modified
    let sectionCopy = Object.assign({}, section)
    sectionCopy.subsections = [props.sub]
    courseCopy.sections = [sectionCopy];
    console.log(courseCopy)
    return courseCopy;
  };

  return (
    <>
      <li>
        {props.sub.number}
        <Button
              type="button"
              onClick={
                props.cartMode
                  ? () => props.setCart(props.course)
                  : () => props.setCart(setsubsection(props.course, props.section))
              }
              style={{ transform: "scale(.6)", margin: "10px" }}
              variant="outline-secondary"
            >
              {props.cartMode ? (
                <RemoveShoppingCartIcon />
              ) : (
                <ShoppingCartIcon />
              )}
            </Button>
        <ul style={{ listStyleType: "disc" }}>
          <li>{props.sub.location}</li>
          <li>
            Metting Times
            <ul style={{ listStyleType: "square" }}>{props.getMettingTimes(Object.entries(props.sub.time))}</ul>
          </li>
          {}
        </ul>
      </li>
    </>
  );
}

export default Subsection;
