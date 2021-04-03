const puppeteer = require('puppeteer');
let browserWillBeLaunchedPromise = puppeteer.launch({
    headless : false
})

//Callback hell method
// browserWillBeLaunchedPromise
//     .then(function(browserInstance){
//         let newPagePromise = browserInstance.newPage();
//         newPagePromise
//             .then(function(newPage){
//                 console.log("New tab opened");
//                 let pageWillBeOpenedPromise = newPage.goto("https://www.npmjs.com/package/puppeteer");
//                 pageWillBeOpenedPromise
//                     .then(function(){
//                         console.log("Page is opened");
//                     })
//             })
//     })


//Chaining 
browserWillBeLaunchedPromise
    .then(function(browserInstance){
        let newPagePromise = browserInstance.newPage();
        return newPagePromise
    })
    .then(function(newPage){
        console.log("New tab opened");
        let pageWillBeOpenedPromise = newPage.goto("https://www.npmjs.com/package/puppeteer");
        return pageWillBeOpenedPromise;
    })
    .then(function(){
        console.log("Page is opened");
    })
    .catch(function(err){
        console.log(err);
    })