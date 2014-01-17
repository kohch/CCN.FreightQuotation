var quotationData = function(timeToLoad) {
	this.busyTime = timeToLoad || 1000;
};

quotationData.prototype = function() {
	var ffInfo = {
		firstName: 'Jaxon', lastName: 'Daniels', ffNum: '12345678', status: 'Diamond', miles: 55555,
    
		flights: [
			{
				id: 1111, cNum: 'ABCDED',timeToCheckIn:true,currentSegment:0,
				segments: [
					{ from: 'SEA', to: 'BOS', departDate: '6/1/2012', time: '5:00PM', flightNum: '111', seat: '5A', gate: 'C10' },
					{ from: 'BOS', to: 'SEA', departDate: '6/11/2012', time: '4:00PM', flightNum: '122', seat: '5D', gate: 'A1' }
				]
			},{
				id: 1112, cNum: 'DSLEMS', timeToCheckIn: false,currentSegment:0,
				segments: [
					{ from: 'SEA', to: 'SAN', departDate: '6/13/2012', time: '5:00PM', flightNum: '113', seat: '5A', gate: 'D10' },
					{ from: 'SAN', to: 'SEA', departDate: '6/17/2012', time: '4:00PM', flightNum: '124', seat: '5D', gate: 'B1' }
				]
			}
		]
	},

	getDataforFF = function(id, callback) {
		fauxAjax(function () {
			callback(ffInfo);
		}, 'getting your data ...', this);
	},
    
	logOn = function (uid, pwd, callback) {
		fauxAjax(function () {
			callback('12345678', true);
		}, 'logging you in ...', this);
	},
    
	fauxAjax = function fauxAjax(func, text, thisObj) {
		$.mobile.loading('show', { theme: 'a', textVisible: true, text:text });
		window.setTimeout(function () {
			$.mobile.loading('hide');
			func();
           
		}, thisObj.busyTime);
	};
    
	return{
		logOn:logOn,
		getDataforFF:getDataforFF
	}
}();


var rfqSummaryData = function(timeToLoad) {
	this.busyTime = timeToLoad || 1000;
};

rfqSummaryData.prototype = function() {
  
    var requestSummary = {
        firstName: 'Steve', lastName: 'Daniels', requesterID: '12345678',newRFQ: 2,
        requestQuotation: [
			{ requestID: 'F56F1962-3C60-47D6-BE22-74BC4D3B8952', origin: 'SIN', destination: 'KUL',pieces: '140', weight: '1100', volume: '2110', status: 'Saved', createDT: '2014-01-01 11:00', expireOn: '2014-01-22 11:00', LogeInDT: '2014-01-20 11:00', collectionDT: '2014-01-21 11:00', commodity: '', goodsDescription: 'My Book1' },
			{ requestID: 'BA720F62-4F43-4BA3-B5FE-AD25EDC1BAC1', origin: 'KUL', destination: 'HKG',pieces: '240', weight: '2100', volume: '3120', status: 'Pending', createDT: '2014-01-01 12:00', expireOn: '2014-01-23 11:00', LogeInDT: '2014-01-21 12:00', collectionDT: '2014-01-21 11:00', commodity: '', goodsDescription: 'My Text2' },
            { requestID: '78A40C39-1E6D-4F54-ACCE-A7FD489C111F', origin: 'SYN', destination: 'DEL',pieces: '340', weight: '3500', volume: '3020', status: 'Quoted', createDT: '2014-01-02 13:00', expireOn: '2014-01-21 11:00', LogeInDT: '2014-01-20 13:00', collectionDT: '2014-01-21 11:00', commodity: '', goodsDescription: 'My Home3' },
            { requestID: '8563527F-453A-4C9B-9FE7-F12BF1A12F94', origin: 'HKG', destination: 'SIN',pieces: '440', weight: '4200', volume: '21300', status: 'Saved', createDT: '2014-01-02 15:00', expireOn: '2014-01-23 11:00', LogeInDT: '2014-01-21 14:00', collectionDT: '2014-01-21 11:00', commodity: '', goodsDescription: 'Book2' },
            { requestID: 'B7567C91-F982-4576-A270-B2C2ECCEEAB0', origin: 'SIN', destination: 'HKG',pieces: '540', weight: '200', volume: '7300', status: 'Pending', createDT: '2014-01-03 10:00', expireOn: '2014-01-22 11:00', LogeInDT: '2014-01-20 15:00', collectionDT: '2014-01-21 11:00', commodity: '', goodsDescription: 'Home2' },
		]
	},
    
	getDataforRFQSummary = function(id, callback) {        
		//fauxAjax(function () {
			callback(requestSummary);
		//}, 'loading data ...', this);
	},
    
	logOn = function (uid, pwd, callback) {
		fauxAjax(function () {
			callback('12345678', true);
		}, 'logging in ...', this);
	},
    
	fauxAjax = function fauxAjax(func, text, thisObj) {       
		$.mobile.loading('show', { theme: 'a', textVisible: true, text:text });
		window.setTimeout(function () {
			$.mobile.loading('hide');
			func();
           
		}, thisObj.busyTime);
	};
    
	return{
		logOn:logOn,
		getDataforRFQSummary:getDataforRFQSummary
	}
}();
