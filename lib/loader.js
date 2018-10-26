/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author 
*/
var loaderUtils = require("loader-utils");

module.exports = function(content) {
	var from = loaderUtils.getRemainingRequest(this).split("!").pop();
	var relativeRootPath = process.cwd() + "\\";
	relativeRootPath = relativeRootPath.replace(/\/+/g, "\\");
	relativeRootPath = relativeRootPath.replace(/^\\+|^\.\\/g, "");

	if(from.indexOf(relativeRootPath) < 0){
		relativeRootPath = "src";
		if(from.indexOf(relativeRootPath) < 0){
			return content;
		}
	}
	
	var idx = from.indexOf(relativeRootPath) + relativeRootPath.length;
	var preStr = "";
	if(idx >= 0){
		var strSub = from.substr(idx);
		var count = (strSub.match(/[\/\\]/g) || []).length;
		for(var i = 0; i < count; ++i){
			preStr += (i == 0 ? ".." : "/..");
		}
	}

	var regAll = /url\([\s"']+.*?[\s"']+\)/g;
	var regUrl = /url\(([\s"']+)(.*?)([\s"']+)\)/;
	var arr = content.match(regAll) || [];
	for (var i = 0; i < arr.length; ++i) {
		var arrMatch = arr[i].match(regUrl);
		if(arrMatch.length < 4){
			continue;
		}

		var url = arrMatch[2];
		if(url.indexOf("://")>=0){
			continue;
		}

		url = "url(" + arrMatch[1] + preStr + arrMatch[2] + arrMatch[3] + ")";
		// console.info(url);
		content = content.replace(arr[i], url);
	}

	return content;
};