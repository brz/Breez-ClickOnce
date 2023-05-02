const injectCode = (src) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}
injectCode(browser.runtime.getURL('windowObjectHelper.js'));
injectCode(browser.runtime.getURL('modalHelper.js'));

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.func === "showDialog"){
		showDialog(message.args.showHelperWarning, message.args.showConsentWarning);
    }
    sendResponse();
});