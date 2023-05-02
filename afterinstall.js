const uninstallExtension = (e) => {
    e.preventDefault();
    browser.management.uninstallSelf();
    closeWindow();
};
document.getElementById("uninstallExtensionButton").addEventListener("click", uninstallExtension);

const giveConsent = (e) => { 
    e.preventDefault();
    browser.storage.local.set({ consent: true });
    
    checkAllWebsitesPermission();
};
document.getElementById("giveConsentButton").addEventListener("click", giveConsent);

const closeWindow = () => {
    window.close();
};
document.getElementById("closeBtn").addEventListener("click", closeWindow);

const askPermissions = (e) => {
    e.preventDefault();
    browser.permissions.request({ origins: ["*://*/*"] });
};
document.getElementById("askPermissions").addEventListener("click", askPermissions);

const checkAllWebsitesPermission = () => {
    browser.permissions.contains({origins: ["*://*/*"]}).then(hasAllWebsitesPermissions => {
        if(hasAllWebsitesPermissions){
            closeWindow();
        }
        else{
            document.getElementById("consentMessage").style.display = "none";
            document.getElementById("permissionMessage").style.display = "block";
        }
    })
}

const permissionsAddedHandler = (permissions) => {
    if(permissions.origins.indexOf("*://*/*") !== -1){
        closeWindow();
    }
  }
browser.permissions.onAdded.addListener(permissionsAddedHandler);  