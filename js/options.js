function restoreOptions() {
	var sending = browser.runtime.sendNativeMessage('breez.clickonce.clickoncehelper', {message: "CheckStatus"});
	sending.then(onResponse, onError);

	function onResponse(response) {
		document.getElementById("installed").style.display = "block";
		document.getElementById("not-installed").style.display = "none";
	}

	function onError(error) {
		document.getElementById("installed").style.display = "none";
		document.getElementById("not-installed").style.display = "block";
	}
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("checkAgainUrl").addEventListener("click", restoreOptions);