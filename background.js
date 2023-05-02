var consentValue = false;

browser.storage.local.onChanged.addListener((changes) => {
    const changedItems = Object.keys(changes);

    for (const item of changedItems) {
        if(item === "consent"){
            consentValue = changes[item].newValue;
            return;
        }
    }
});

browser.storage.local.get(["consent"], function (result) {
    if (result["consent"] === undefined) {
        consentValue = false;
    }
    else {
        consentValue = result["consent"];
    }
});

browser.webRequest.onHeadersReceived.addListener((details) => doWork(details), { urls: ["http://*/*", "https://*/*"] }, ["blocking", "responseHeaders"]);

const doWork = (details) => {
    const regexPattern = /https?:\/\/([^/]+\/)+[^/]+\.application(\?.*)?/;
    if(details.tabId != -1 && regexPattern.test(details.url) && details.responseHeaders.findIndex(rh => rh.name.toLowerCase() === "content-type" && rh.value.toLowerCase() === "application/x-ms-application") !== -1){
        if(consentValue){
			browser.runtime.sendNativeMessage('breez.clickonce.clickoncehelper', { url: details.url })
			.catch(() => {
				browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    let currentTab = tabs[0];
					if (currentTab) {
						browser.tabs.sendMessage(currentTab.id, { func: "showDialog", args: {showHelperWarning: true, showConsentWarning: false} } );
					}
				});
			});
        }
		else{
            browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
                let currentTab = tabs[0];
                if (currentTab) {
                    browser.tabs.sendMessage(currentTab.id, { func: "showDialog", args: {showHelperWarning: false, showConsentWarning: true} } );
                }
            });
		}

        return { cancel: true };
    }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.openConsentPage === true){
            let url = browser.runtime.getURL('afterinstall.html');
            browser.tabs.create({ "url": url });
        }
    }
);

browser.runtime.onInstalled.addListener((details) => {
    if(details.reason === "install"){
        let url = browser.runtime.getURL('afterinstall.html');
        browser.tabs.create({ "url": url });
    }
});