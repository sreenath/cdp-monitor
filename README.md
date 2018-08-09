MakerDAO is a decentralized organization dedicated to bringing stability to the crypto economy through Dai, the world's first stablecoin on the Ethereum blockchain. Dai is an asset-backed hard currency that addresses the crypto economy’s problems of volatility with a secure and transparent smart contract platform of permission-less loans.

**Cross Platform Tray Application for CDP Monitoring:**
This application is developed using Electron and can be used to monitor the liquidation price and collateralization ratio of any CDP real time. If a user want to see additional information regarding the CDP, there is a button labelled "Open CDP Page", on clicking which will open the corresponding CDP page. This application is also capable of triggering alert/desktop notification when liquidation price reaches above the user set target price. 


**Execution instruction:**
After checking out the code, simply run :

  npm install
  
  npm start

This will start the electron application and user can follow the instructions from UI

**Instructions for creating packages:**

Windows: npm run package-win

Mac: npm run package-mac

Linux: npm run package-linux

Once you have pacakage available, simply double click on the corresponding executable file, it will start the desktop application.


**Known Issue:**

Desktop Notification does not work in windows due to an existing issue in electron - [issue-10684](https://github.com/electron/electron/issues/10864)


**Screenshots:**

[Initial Page](https://raw.githubusercontent.com/sreenath/cdp-monitor/master/assets/screenshots/Initial_page.png)


[CDP Data displayed](https://github.com/sreenath/cdp-monitor/blob/master/assets/screenshots/CDP%20display.png)

[Create Alert Dialog](https://github.com/sreenath/cdp-monitor/blob/master/assets/screenshots/Create%20Alert.png)

[Alert Displayed](https://github.com/sreenath/cdp-monitor/blob/master/assets/screenshots/Alert%20display.png)
