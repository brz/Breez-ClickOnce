// Analyze request for ClickOnce URL's
browser.webRequest.onBeforeRequest.addListener(function (details) {
    var extension = '.application';
    if (details.url.indexOf(extension) != -1) {
        // Parse URL with regex
        var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        var result = parse_url.exec(details.url);

        // Check for '.application' at the end of the URL
        if (result[5].length > extension.length && result[5].indexOf(extension, result[5].length - extension.length) > 0) {
            // Send message to native helper to launch ClickOnce
            var sending = browser.runtime.sendNativeMessage('breez.clickonce.clickoncehelper', { url: details.url });

            // Cancel the request
            url = 'javascript:void()';
            return { redirectUrl: url };
        }
    }
}, { urls: ['http://*/*', 'https://*/*'] }, ['blocking']);

// Open new tab with helper install instructions on initial extension install
browser.runtime.onInstalled.addListener(function(details) {
    if (details.reason == 'install'){
        url = browser.extension.getURL('nativeinstall.html');
        browser.tabs.create({'url': url});
    }
});

// Open new tab with helper uninstall instructions on extension uninstall
browser.runtime.setUninstallURL("http://breezie.be/dev/clickonce/uninstall.html");

//Logging to console
function onResponse(response) {
  console.log(`Received ${response}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}