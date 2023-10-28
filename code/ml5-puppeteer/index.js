const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // Navigate to the page that trains the model
  await page.goto('http://localhost:5000')
 console.log("DONE!") 
  // if you want to trigger some function in the page use evaluate
  console.log(await page.evaluate('ml5.version')) // prints "0.5.0"

  // Display browser console messages on screen
  page.on('console', msg => console.log('>', msg.text()));
 console.log("DONE!") 
  // This allows to save the model when classifier.save() is called.
  // downloadPath is the folder in which the model will be saved.
  await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './'})
 
  //Wait till element with id="done" is visible
  //By default puppeteer will wait 30s and then throw error. `timeout = 0` disables the timeout.
  await page.waitForSelector('#done', {visible: true, timeout: 0})

  console.log("DONE!") 
  browser.close()
})();
