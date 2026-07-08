//IIFE Immediately Invoked Function Expression - confif file is not applicable
import { Browser, chromium, firefox, Page, webkit } from "@playwright/test";

(async () => {
    //console.log('Hello world');

    //let browser: Browser = await chromium.launch({ channel: 'msedge', headless: false });
    //For Opera and Brave browser use executablepath, because channel won't work
    //let browser: Browser = await chromium.launch({ executablePath: 'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe', headless: false });
    //below is the new feature of playwright
    //let browser: Browser = await chromium.launch({ channel: 'chromium', headless: false });//this will open the CFT, it is a replica of main chrome browser.
    //firefox: Nightly - it is the name provided by playwright
    //let browser: Browser = await firefox.launch({ headless: false }); //drawback of playwright, bcz they are using original firefox, only using nightly created by playwright, it's a limitation.
    //webkit:safari
    //let browser: Browser = await webkit.launch({ headless: false });
    //let browser: Browser = await chromium.launch({ headless: false }); //this will also work, by defailt it will open in CFT(Chrome for test)
    let browser: Browser = await chromium.launch({ channel: 'chrome', headless: false });
    let page: Page = await browser.newPage();
    await page.goto('https://google.com');
    let title: string = await page.title();
    console.log('Title is:', title);
    let url: string = page.url();
    console.log('URL is:', url);
    page.close();
    browser.close();
})();

