const courseApi = "http://localhost:3000/course";

fetch(courseApi)
  .then((res) => res.json()) //return JSON.parse: JSON -> Javascript type
  .then((course) => {
    const html = course.map((course) => {
      return `
      <h2>${course.name}</h2>
      <p>${course.description}</p>`;
    });
  })
  .catch((err) => console.log("fail to fetch data"));
