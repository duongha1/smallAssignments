const listCoursesBlock = document.querySelector("#courses");
const courseAPI = "http://localhost:3000/course";

//Definition
const createBtn = document.getElementById("btn-create");
const updateBtn = document.getElementById("btn-update");

//start to render course
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
            <button onclick="renderInput(${course.id})">Edit</button>
        </li>
        `;
  });
  listCoursesBlock.innerHTML = html.join("");
}

//-----------------------------Handle create-----------------------------
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
  createBtn.onclick = () => {
    const newName = document.querySelector('input[name="name"]').value;
    const newDescription = document.querySelector('input[name="description"]')
      .value;
    console.log(newName, newDescription);
    const formData = {
      name: newName,
      description: newDescription,
    };

    //after create new data, we need to get data to render again
    createCourse(formData, () => getCourse((courses) => renderCourse(courses)));
  };
}
createForm();

//-----------------------------Delete-----------------------------
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

//-----------------------------Update-----------------------------
//execute PUT method on database and fetch API to render UI
function HandleUpdateCourse(id, data, callback) {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(courseAPI + "/" + id, option)
    .then((res) => res.json)
    .then(callback);
}
//get data from UI
function setNewCourse(id) {
  updateBtn.onclick = () => {
    const newName = document.querySelector('input[name="name"]').value;
    const newDescription = document.querySelector('input[name="description"]')
      .value;
    const formData = {
      name: newName,
      description: newDescription,
    };
    console.log(formData);
    HandleUpdateCourse(id, formData, () =>
      getCourse((courses) => renderCourse(courses))
    );
  };
}
function renderInput(id) {
  const courseItem = document.querySelector(".course-item-" + id);
  createBtn.style.display = "none";
  updateBtn.style.display = "block";

  //set value into input
  const title = courseItem.children[0].textContent;
  const content = courseItem.children[1].textContent;
  const currentName = document.querySelector('input[name="name"]');
  const currentDescription = document.querySelector(
    'input[name="description"]'
  );
  currentName.value = title;
  currentDescription.value = content;
  setNewCourse(id);
}
