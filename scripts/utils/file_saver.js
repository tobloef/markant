;(function() {
	function saveFile(data, filename, type) {
	    const file = new Blob([data]);
	    if (window.navigator.msSaveOrOpenBlob) {
	        window.navigator.msSaveOrOpenBlob(file, filename + type);
	    } else {
	    	const url = URL.createObjectURL(file);
	    	const a = document.createElement("a");
	        a.href = url;
	        a.download = filename + type;
	        document.body.appendChild(a);
	        a.click();
	        setTimeout(function() {
	            document.body.removeChild(a);
	            window.URL.revokeObjectURL(url);
	        }, 0);
	    }
	}

	module.exports = {
		saveFile
	};
}());
