const listCoursesBlock = document.querySelector("#courses");
const courseAPI = "http://localhost:3000/course";

function start() {
  getCourse((courses) => renderCourse(courses));
}
start();

//GetAPI and Render
function getCourse(callback) {
  fetch(courseAPI)
    .then((res) => res.json())
    .then(callback);
}

function renderCourse(courses) {
  const html = courses.map((course) => {
    return `
        <li class="course-item-${course.id}">
            <h2>${course.name}</h2>
            <p>${course.description}</p>
            <button onclick="HandleDeleteCourse(${course.id})">&times;</button>
        </li>
        `;
  });
  listCoursesBlock.innerHTML = html.join("");
}

//Handle create
//data is data input from UI
//callback return data POSTED to database
function createCourse(data, callback) {
  //reference on mozilla to use fetch with POST method
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(courseAPI, option)
    .then((res) => res.json)
    .then(callback);
}
function createForm() {
  const createBtn = document.getElementById("btn");
  createBtn.onclick = () => {
    const name = document.querySelector('input[name="name"]').value;
    const description = document.querySelector('input[name="description"]')
      .value;
    console.log(name, description);
    const formData = {
      name: name,
      description: description,
    };

    //after create new data, we need to get data to render again
    createCourse(formData, () => getCourse((courses) => renderCourse(courses)));
  };
}
createForm();

//Delete
function HandleDeleteCourse(id) {
  //reference on mozilla to use fetch with POST method
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(courseAPI + "/" + id, option)
    .then((res) => res.json)
    .then(() => {
      const courseItem = document.querySelector(".course-item-" + id);
      courseItem.remove();
    });
}
//Update
