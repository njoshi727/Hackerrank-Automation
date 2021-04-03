const puppeteer = require('puppeteer');
let {password , email} = require('/home/nickjosi/PepCodingWebDevelopment/AutomationWeek1/activity/secrets.js')
let gtab;
console.log("Before");


let browserPromise = puppeteer.launch({
    headless : false,
    args: ['--start-fullscreen'],
    defaultViewport : null
})

browserPromise
.then(function(browserInstance){
   let newTabPromise = browserInstance.newPage();
   return newTabPromise; 
})
.then(function(newTab){
    let loginPageWillBeOpenedPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    gtab = newTab;
    gtab.setDefaultNavigationTimeout(0);
    return loginPageWillBeOpenedPromise;
})
.then(function(){
    let emailWillBeTypedPromise = gtab.type("#input-1",email,{delay : 200});
    return emailWillBeTypedPromise;
})
.then(function(){
    let passwordWillBeTypedPromise = gtab.type("#input-2",password,{delay : 200});
    return passwordWillBeTypedPromise;
})
.then(function(){
    let loginButtonWillBeClickedPromise = gtab.click("button[data-analytics='LoginPassword']");
    
    let combinedPromise = Promise.all([loginButtonWillBeClickedPromise,
        gtab.waitForNavigation({waitUntil:"networkidle0"})
    ]);
    return combinedPromise;
})
.then(function(){
    let clickPromise = gtab.click(".card-content h3[title='Interview Preparation Kit']");

    let combinedPromise = Promise.all([clickPromise,
        gtab.waitForNavigation({waitUntil:"networkidle0"}),
        gtab.waitForSelector("a[data-attr1='warmup']",{visible: true})
        ]);
    
    return combinedPromise;
})
.then(function(){
    let clickPromise = gtab.click("a[data-attr1='warmup']");
    let combinedPromise = Promise.all([clickPromise,
        gtab.waitForNavigation({waitUntil:"networkidle0"}), 
        gtab.waitForSelector("a[data-attr1='sock-merchant']",{visible : true})
    ]);

    return combinedPromise;
})
.then(function(){
    let clickPromise = gtab.click("a[data-attr1='sock-merchant']");
    let combinedPromise = Promise.all([clickPromise,
        gtab.waitForNavigation({waitUntil:"networkidle0"})
    ]);
    return combinedPromise;
})
.catch(function(err){
    console.log(err);
})

function waitAndClick(selector){
    return new Promise(function(resolve,reject){
        let selectorWaitPromise = gtab.waitForSelector(selector,{visible :true});
        selectorWaitPromise
        .then(function () {
            let selectorClickPromise = gtab.click(selector);
            return selectorClickPromise;
        }).then(function () {
            resolve();
        })
    })
}
console.log("After");

