const dateTimeNow = new Date();
let date = dateTimeNow.toLocaleDateString() + " " + dateTimeNow.toLocaleTimeString();

alert(date);

console.log(addDateTime("This is the best moment to have a look at this website !"));

function addDateTime(message) {
    return date + " " + message
}