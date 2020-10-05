var promise = new Promise(
  //Executor
  function (resolve, reject) {
    //logic
    //thành công: resolve()
    //thất bại: reject()
  }
);

promise
  .then(function () {}) //xử lý thành công
  .catch(function () {}) //bắt thất bại
  .finally(function () {}); //thành công hay thất bại đều vào đây

var promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve([2, 3]), 1000);
});

var promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve([4, 5]), 2000);
});

Promise.all([promise1, promise2]) // nhận vào promise và trả về promise
  .then(([res1, res2]) => console.log(res1.concat(res2))) //xử lý kết quả trả về theo đúng thứ tự từ các promise
  .catch((err) => console.log(err));
