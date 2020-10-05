const users = [
  {
    id: 01,
    name: "Duong Ha",
  },
  {
    id: 02,
    name: "Linh Ha",
  },
  {
    id: 03,
    name: "Thu Ha",
  },
];
const comments = [
  {
    id: 01,
    user_id: 01,
    text: "Hello",
  },
  {
    id: 02,
    user_id: 03,
    text: "Monday",
  },
  {
    id: 01,
    user_id: 02,
    text: "How are you?",
  },
];

//Fake API
//Su dung promise de lay du lieu tu database
function getComments() {
  //lay comment
  return new Promise((resolve) => resolve(comments));
}

function getUserById(userIds) {
  //truyen vao cai list/mang ID
  return new Promise((resolve) => {
    var result = users.filter((user) => userIds.includes(user.id)); //loc ra nhung user co id tuong ung trong mang userIds
    resolve(result);
  });
}

getComments()
  .then((comments) => {
    var userIds = comments.map((cmt) => cmt.user_id); //map ra id trong comment

    //return ra 1 promise nua
    //lay duoc user co id tuong ung vua lay ra duoc
    return getUserById(userIds).then((users) => {
      //trong promise nay lai tra ve data nua, thay vi chi tra ve user de in ra UI
      //thi minh lay ca comments nua
      //duoi dang object
      return { users: users, comments: comments };
    });
  })
  .then((data) => {
    const cmtBlock = document.getElementById("cmt");
    let html = "";
    data.comments.forEach((comment) => {
      let user = data.users.find((user) => user.id === comment.user_id);
      return (html += `<li>${user.name}: ${comment.text}</li>`);
    });
    cmtBlock.innerHTML = html;
  });
