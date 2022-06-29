var a = 10;
var b = 20;

// setTimeout(() => {
//     b = 40;
// }, 2000);

// console.log(a+b);

var waitingData = new Promise((resolve, reject) => {
    setTimeout(() => {
        b = 400;
        resolve(b);
    }, 5000);
});

waitingData.then((data) => {
    console.log(data);
});