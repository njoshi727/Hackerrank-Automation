const fs = require('fs');
console.log("Before");
let promise = fs.promises.readFile("f1.txt");
console.log(promise);
console.log("After");

//set time out is not recommended way to use promise 
//then should be used instead.
setTimeout(function(){
    console.log(promise);
},2000);

//then is a function/listener attached to promise object which will
//called as soon as promise is in settled state.
promise.
then(function(data){
    console.log(data);
})

//If function correspond to promise return an error then catch will
//catch that error
promise.
catch(function(err){
    console.log(err);
})
