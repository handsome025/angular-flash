angular.module('ued').factory('uWebApi', function (uRequest) {
	var uWebApi = {}

	uWebApi.getUserInfo = function(data){
		return uRequest.post('/campaign/htamhb/get-campaign-user-info',data);
	}

	uWebApi.doPersonalLottery = function(data){
		return uRequest.post('/campaign/htamhb/lottery1',data);
	}

	uWebApi.doExclusiveLottery = function(data){
		return uRequest.post('/campaign/htamhb/lottery2',data);
	}

	return uWebApi
})
