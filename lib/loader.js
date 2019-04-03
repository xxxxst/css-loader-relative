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
	
	// ignore if is lib
	if(from.indexOf("node_modules") >= 0){
		return content;
	}

	// set default root path
	if(from.indexOf(relativeRootPath) < 0){
		relativeRootPath = "src";
		if(from.indexOf(relativeRootPath) < 0){
			return content;
		}
	}
	
	// find path hierarchy, replace as "../../"
	var idx = from.indexOf(relativeRootPath) + relativeRootPath.length;
	var preStr = "";
	if(idx >= 0){
		var strSub = from.substr(idx);
		var count = (strSub.match(/[\/\\]/g) || []).length;
		for(var i = 0; i < count; ++i){
			preStr += (i == 0 ? ".." : "/..");
		}
	}

	// regex:
	// url("/static/image/image.png")
	// @import "/src/assets/css/style.css"
	var arrRegAll = [
		/url\([\s]*["'][\s]*\/.*?["'][\s]*\)/g,
		/@import[\s]+["']\/.*?["']/g
	];
	var arrRegReplace = [
		/(url\([\s]*["'][\s]*)(\/.*?)(["'][\s]*\))/,
		/(@import[\s]+["'])(\/.*?)(["'])/
	]
	for(var i = 0; i < arrRegAll.length; ++i){
		var arr = content.match(arrRegAll[i]) || [];
		for (var j = 0; j < arr.length; ++j) {
			var arrMatch = arr[j].match(arrRegReplace[i]);
			if(arrMatch.length < 4){
				continue;
			}

			var url = arrMatch[1] + preStr + arrMatch[2] + arrMatch[3];
			content = content.replace(arr[j], url);
		}
	}

	return content;
};