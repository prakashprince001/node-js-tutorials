// Normal function
function getUserName(name) {
    var message = "Hello, " + name + " how are you.";
    console.warn(message);
}
getUserName("Prakash");

// Anonymous function
var sum = function(a, b) {
    let total = a+b;
    console.log("This is sum = " + total);
}
sum(10, 20);

// Multiple function
var multiple = function (a, b) {
    let multiply = a * b;
    console.log("This is multification = " + multiply);
}
multiple(10, 20);

// complex functions
var add = function (a, b) {
    return a + b;
}
function complexFunction(add) {
    console.log("Called complex function = " + add(50, 100));
}
console.log("Called add function direct = " + add(50, 100));
complexFunction(add);

// Complex callback function 1
function complexCallBackFunction(getFunction) {
    console.log("Called complex callback function = " + getFunction(200, 250));
}
complexCallBackFunction(function(a, b) {
    return a + b;
});