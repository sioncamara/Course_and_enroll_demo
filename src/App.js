import React, { useEffect, useState } from "react";
import "./App.css";
import Badge from "react-bootstrap/Badge";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import CompletedArea from "./CompletedArea";
import axios from "axios";
import responseAll from "./courses.json"
import responseCompleted from "./completed.json"

function App(props) {
  const [courses, setCourses] = useState({ all: [], completed: [] });
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);

  const [ratedCourseNumbers, setRatedCourseNumbers] = useState({})
  
  
  const [subjects, setSubjects] = useState([]);
  const [interests, setInterests] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function fetchAPI() {
      try {
        // const responseAll = await axios.get(
        //   "http://cs571.cs.wisc.edu:53706/api/react/classes"
        // );

        // const responseCompleted = await axios.get(
        //   "http://cs571.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed"
        // );


        setFilteredCourses(responseAll);
        //setRecommendedCourses(responseAll.data);
        setSubjects(getSubjects(responseAll));
        setInterests(getInterests(responseAll));

        const completedCourses = responseAll.filter((course) =>
            responseCompleted.data.includes(course.number)
          )
        setRatedCourseNumbers(getRatedCourseNumbers(completedCourses))

        setCourses({
          all: responseAll,
          completed: completedCourses
        });
      } catch (exception) {
        console.log(exception);
      }
    }
    fetchAPI();
  }, []);

  const getRatedCourseNumbers = (completedCourses) => {
    let rated = {}

    for( const course of completedCourses ) {
      rated[course.number] = ['No Rating', course.keywords]
    }
    return rated
  }

  const updateRatedCourses = (course, rating) => {
    let temp = ratedCourseNumbers
    const ratingIndex = 0
    temp[course.number][ratingIndex] = rating
    setRatedCourseNumbers(temp)
  }

  const getSubjects = (courses) => {
    let subjects = [];
    subjects.push("All");

    for (const course of courses) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  };

  const getInterests = (courses) => {
    let interests = [];
    interests.push("All");

    //horrible time complexity
    for (const course of courses) {
      const courseInterests = course.keywords;
      for (const interest of courseInterests) {
        if (interests.indexOf(interest) === -1) interests.push(interest);
      }
    }

    return interests.sort();
  };

  const updateCart = (newCourse) => {
    let isNew = true;
    for (const course of cartCourses) {
      if (course.number === newCourse.number) isNew = false;
    }
    if (isNew) {
      setCartCourses([...cartCourses, newCourse]);
      setCartCount(cartCount + 1);
    } else alert("This course is already in your cart");
  };

  const removeFromCart = (selectedCourse) => {
    let cartCoursesCopy = cartCourses;
    cartCoursesCopy = cartCoursesCopy.filter(
      (course) => course.number !== selectedCourse.number
    );
    setCartCourses(cartCoursesCopy);
    setCartCount(cartCount - 1);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="search"
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Tab eventKey="search" title="Search" style={{ paddingTop: "5vh" }}>
          <Sidebar
            setCourses={setFilteredCourses}
            courses={courses.all}
            subjects={subjects}
            interests={interests}
            setRecommendedCourses={setRecommendedCourses}
          />
          <div style={{ marginLeft: "21vw" }}>
            <CourseArea
              filteredCourses={filteredCourses}
              cartCourses={cartCourses}
              setCart={updateCart}
              allCourses={courses.all}
              cartMode={false}
              completedCourseNumbers={ratedCourseNumbers}
            />
          </div>
        </Tab>

        <Tab
          eventKey="cart"
          title={
            <>
              {" "}
              Cart&nbsp;{" "}
              {cartCount >= 1 && (
                <Badge pill bg="danger">
                  {cartCount}
                </Badge>
              )}
            </>
          }
          style={{ paddingTop: "5vh" }}
        >
          <div style={{ marginLeft: "5vw" }}>
            <CourseArea
              cartCourses={cartCourses}
              setCart={removeFromCart}
              allCourses={courses.all}
              cartMode={true}
              completedCourseNumbers={ratedCourseNumbers}
            />
          </div>
        </Tab>

        <Tab
          eventKey="completedcourses"
          title="Completed Courses"
          style={{ paddingTop: "5vh" }}
        >
          <div style={{ marginLeft: "5vw" }}>
            <CompletedArea
              allCourses={courses.all}
              completedCourses={courses.completed}
              updateRatedCourses={updateRatedCourses}
              ratedCourses={ratedCourseNumbers}
              setRecommendedCourses={setRecommendedCourses}
              recommendedCourses={recommendedCourses}
            ></CompletedArea>
          </div>
        </Tab>

        <Tab
          eventKey="recommendcourses"
          title="Recommended Courses"
          style={{ paddingTop: "5vh" }}
        >
          <div style={{ marginLeft: "5vw" }}>
            <CompletedArea
              allCourses={courses.all}
              recommendedCourses={recommendedCourses}
              isRecommended={true}
            ></CompletedArea>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
