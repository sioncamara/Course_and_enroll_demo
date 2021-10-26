

This project is from my building user interfaces course where we were ask to implement a course search and enroll app.

## Course data

The course data is being fetched from `http://cs571.cs.wisc.edu:53706/api/react/classes` and is formatted as follows:

```
[
    {
        "credits": <number of credits for the course>,
        "description": <course description>,
        "keywords": <1D list of string keywords>,
        "name": <course name>,
        "number": <unique course number>,
        "requisites": <2D list of course requisites>,
        "sections": [
            {
                "instructor": <instructor name>,
                "location": <section location>,
                "subsections": [
                    {
                        "location": <subsection location>,
                        "time": {
                            <weekday>: <time range>, ...
                        },
    					"number": <subsection number>
                    }
                ],
                "time": {
                <weekday>: <time range>, ...
                },
				"number": <section number>
            }, ...
        ],
        "subject": <course subject>
    }, ...
]
```

- For the uploaded code I included the data in two seperate json filed (completed and courses) since one needs to have access to ours schools vpn to access the data.
- Below is a description of the problems we were asked to solve.



# Recommender

## Problem 1 (1 point)

- Fetch data from server `http://cs571.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed`. This data details which courses have already been completed.
- Create a new component to display a previously taken course. This component might look somewhat like the Course component, but it will be simpler and won’t have options to add the course to the cart. In addition, it should not display information regarding sections/subsections since they vary between semesters. (You may also reuse the Course component if you can satisfy the aforementioned requirements with conditional rendering. )
- Create a new component to hold the previously taken course components. Make this component accessible as a new tab in the app. (Refer to Problem 2 and Problem 4 for example visualizations)

## Problem 2 (1 point)

- Create a component for rating a specific course. For example, the sample implementation below created the rating component as a child of the completed course component.
- Allow the user to rate courses they have already completed.


![Problem 2 visualization](https://drive.google.com/uc?export=view&id=1543f5d7fxOj4kLfVg6R08dMU--UQro8g)

## Problem 3 (1 point)

- Generate a list of interest areas based on the course data. Note that the interest areas should not be hard-coded but should be based on some values of the course data. For example, the sample implementation below dynamically generates interest areas using keywords from the courses.
- Create a component for the user to filter course results by interest area, using your list of interest areas. Make this component available to the user. The sample implementation put this component in the Sidebar Component.

![Problem 3 visualization](https://drive.google.com/uc?export=view&id=1ClPka8GRXYejO5BUGpPmlIHGDmO-rIhF)

## Problem 4 (2 points)

- Create your own recommender algorithm that takes in the rated courses and interest areas. Use the interest areas of rated courses to recommend courses which have not yet been taken in the interest areas of highly rated completed courses.
- Create a new tab which displays the recommended courses to the user. For instance, the sample implementation below shows several recommended courses in the interest areas of rated courses, sorted by the rating scores user gave for each interest area.
- Note: As long as your algorithm considers user's recommendation score and interest areas you defined in Problem 3, and does not include previously taken courses, the rest of the specifics is up to you.


![Problem 4 visualization](https://drive.google.com/uc?export=view&id=1fjM6VEy118h3dwECWinCCE6AMfLBS1_h)

## Problem 5 (1 point)

- When adding a course to the cart, design a way to let the user know if they are not able to take the course based off of the requisites and the user's previously taken courses. Even if a student does not meet the requisites to enroll in a course, they should still be able to add it to the cart.
- Anytime a course, section, or subsection is added, the user should be notified in some way if they don't meet a requisite. As long as you adhere to this basic requirement, the way to achieve this is completely up to you. (You may use one of the components from Bootstrap, or even a simple JavaScript function.)


## Runing Demo
**Run `npm install` in the terminal after cloning to automatically install needed npm packages such as react-bootstrap**


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
