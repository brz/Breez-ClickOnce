const showDialog = (showHelperWarning, showConsentWarning) => {
	const modal = document.createElement('div');
	modal.setAttribute("id", "breezClickOnceModal");
	modal.style.cssText = "position: fixed; z-index:2147483647; left:0; top:0; width:100%; height:100%; overflow:auto; background-color:rgb(0,0,0); background-color:rgba(0,0,0,0.4); user-select:none; color:#303030; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'; font-size: 16px;";

	const modalContent = document.createElement('div');
	modalContent.style.cssText = "background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%;";
	modal.appendChild(modalContent);

	const closeBtn = document.createElement('span');
	closeBtn.style.cssText = "color: #aaaaaa; float: right; font-size: 28px; font-weight: bold; cursor:pointer;";
	closeBtn.innerHTML = "&times;";
	closeBtn.setAttribute("id", "breezClickOnceModalCloseBtn");
	modalContent.appendChild(closeBtn);

	const header = document.createElement('div');
	header.style.cssText = "display:flex; flex-direction:row; align-items: center; gap: 10px;";
	
	const headerImage = document.createElement("img");
	headerImage.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTJDBGvsAAADbElEQVRoQ+2Z604TQRiGvTARMYDIbreXIgajIEjiAaJIFNMgh5aD0GgqiLGIBExM/GEgcA3eBppw8jWbDJu33TntdDYmTZ4/3c583/tsp7vT7ZX+uYP/mrZA3rQF8qYtkDdtgbxxLxAsfgtri4VaRYCXOEjDXOFGIFjaRdDoy1hx77YEDMAwDKbpWcgqEK5tRJ/HKagSTMFEKmWHvUDwth5tPaZkRmA6ilBZUywFCpsvKY01KEXFjTAWCCrfo/pTCpERFERZaqSJmUCwUi/uDlJ7N+wOoji108FAIFj+Wtwb4MYuGUALaqpEX2A/2h5paOkYtECjhtYydAWiuvG10g40otZytATCd1Vq01LQjgJI0BCY/0kNPICmHCMFtUBh/Q1V90BYK1GMNNQCVNob3VNaWyaFQFirUF1v9JQndRwUAsWd+1TXG4Xtu1dHq0oHqUD5BxX1TMejFaWDTAB7d6romd7yJATkDlKBDwtUkXj/a+fi4mLkqETHlWAKJmI6HSd6K89iAYmDTEC5dxg+fH12fmbqEKfHREynt4iwfk8IpDnIBKhcU4YOp09NHOL0mDKkSh+TFGjqkFUADB/pfg6X5/5IKz0gAUAODgSAzlq6TK937mMofUzSwY0AwFqSOIj0GEZvyaHoAuHgTACkfQ525z6GcieJHWQCFr9gsLhPz0+TDnF6fGv1172ArkKNwEEmoLwPNAWXF/E5iHOvec0hkveBNKQCtndisZbi9BYrJ0bciSXIBLLshRD6+OT38ckf6/Qg3gvJkQrge5z3blSJQiDf3wOUtSkKAUB1vUFB01ALFNZnqLQHbi5PUNA01AK5PJXoGFuloGloCHh/LtQ984pSStASAN6ezPWvj1JEOboC/XP7hXrLL6n/9g4P1yiiHH2Bg775TernnOvP5ymfEgMBcKu8Ee3coa5OQNmuF7MUTgczAdBb2sIypfYZQcFrT5YomSbGAgCb2L5qpr/3kqAUZTLCRgDAoWtqNvj4gNIYgekoQoFMsRQAcMD8G9MlixWFKZiYzGGNvQCIHUDnRBl79/DTEAUlMADDMFi0z04mASAcBJ3jlZ6FSQQV4CUO0jBXZBUAjQ4+cSAAcnRwIwDycnAmAHJxcCkA/Ds4FgCeHdwLAJ8OLREA3hxaJQD8OLRQALTcYbT6F6ZT2Dp1N9l8AAAAAElFTkSuQmCC")
	header.appendChild(headerImage);

	const headerText = document.createElement("span");
	headerText.innerHTML = "Breez ClickOnce";
	header.appendChild(headerText);

	modalContent.appendChild(header);
	
	modalContent.appendChild(document.createElement("br"));

	if(showHelperWarning){
		const p = document.createElement('p');
		p.innerHTML = "To launch the ClickOnce application, <b>Breez ClickOnce Helper</b> needs to be installed on your computer.<br />Click <a href=\"https://breezie.be/dev/clickonce/breezclickoncehelper.exe\" target=\"_blank\">here</a> to download Breez ClickOnce Helper and <a href=\"\" id=\"reloadBtn\">reload</a> the page after installing.";
		modalContent.appendChild(p);
	}

	if(showConsentWarning){
		const p2 = document.createElement('p');
		p2.innerHTML = "Breez ClickOnce requires your consent for launching ClickOnce applications. Please read the privacy policy and give your consent <a href=\"\" id=\"consentLink\">here</a>.";;
		modalContent.appendChild(p2);
	}

	document.body.appendChild(modal);

	document.getElementById("breezClickOnceModalCloseBtn").addEventListener("click", () => { document.getElementById("breezClickOnceModal").remove(); });
	if(showHelperWarning){
		document.getElementById("reloadBtn").addEventListener("click", () => { location.reload(); });
	}
	if(showConsentWarning){
		document.getElementById("consentLink").addEventListener("click", () => { browser.runtime.sendMessage({ openConsentPage : true }); document.getElementById("breezClickOnceModal").remove(); });
	}
}