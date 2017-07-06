angular.module('ued').factory('uQuery', function (){
    /*获取url参数*/
    var uQuery = {};

    uQuery.query = function(str) {
    	var para = window.location.href.split("?")[1];
		if(para && para.indexOf(str)!=-1){
    		var r = para.match(new RegExp('(^|&)' + str + '=([^&]*)(&|$)', 'i'));
            return unescape(r[2]);
		}
	    return "";
	}

    return uQuery;
});
