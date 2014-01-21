
// Wait for Apache Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
}

var quotationApp = function() {
}

quotationApp.prototype = function() {
    var _flightForCheckin = null,
    _flightForDetails = null,
    _ffNum = null, 
    _customerData = null,
    _login = false,
    
    run = function() {
        var that = this;
        //$seatPicker = $('#seatPicker');
        //$('#tripDetail').on('pagebeforeshow', $.proxy(_initTripDetail, that));
        //$('#boardingPass').on('pageshow', $.proxy(_initBoardingPass, that));
        $('#home').on('pagebeforecreate', $.proxy(_initHome, that));
        $('#logon').on('pagebeforecreate', $.proxy(_initLogon, that));
        //$('#checkIn').on('pageshow', $.proxy(_initCheckIn, that));
        //$('#myTripsListView').on('click', 'li', function () {
        //    var item = $(this);
        //    _flightForCheckin = item.data('flight');
        //    _flightForDetails = item.data('flight');
        //});
        //$seatPicker.on('pageshow', function (event) {
        //    var el = $('#seatMapPickerContainer', this),
        //    seat = _flightForCheckin.segments[_flightForCheckin.currentSegment].seat;
        //    seatMapDrawing.drawSeatMap(el, seat);
        //});
        //$seatPicker.on('pagebeforehide', function (event) {
        //    _flightForCheckin.segments[_flightForCheckin.currentSegment].seat = seatMapDrawing.getselectedSeat();
        //});
    },
    
    //_initTripDetail = function() {
    //    var seg = _flightForDetails.segments[0];
    //    $('#tripDetail-title').text(seg.from + ' to ' + seg.to);
    //    $('#tripDetail-flightNum').text(seg.flightNum);
    //    $('#tripDetail-depart').text(seg.departDate + ' at ' + seg.time);
    //    $('#tripDetail-seat').text(seg.seat);
    //    seg = _flightForDetails.segments[1];
    //    $('#tripDetail-return-title').text(seg.from + ' to ' + seg.to);
    //    $('#tripDetail-return-flightNum').text(seg.flightNum);
    //    $('#tripDetail-return-depart').text(seg.departDate + ' at ' + seg.time);
    //    $('#tripDetail-return-seat').text(seg.seat);
    //},
    
    //_initBoardingPass = function() {
    //    currentseg = _flightForCheckin.segments[_flightForCheckin.currentSegment];
    //    $('#boardingpass-cnum').text(_flightForCheckin.cNum);
    //    $('#boardingpass-passenger').text(_customerData.firstName + ' ' + _customerData.lastName);
    //    $('#boardingpass-seat').text(currentseg.seat);
    //    $('#boardingpass-gate').text(currentseg.gate);
    //    $('#boardingpass-depart').text(currentseg.time);
    //    var flight = currentseg.flightNum + ':' + currentseg.from + ' to ' + currentseg.to;
    //    $('#boardingpass-flight').text(flight);
    //},
    
    _initLogon = function() {
        //alert("init login");
        if (!_login) {
            //$.mobile.changePage("#logon", { transition: "flip" });
            $('#login').submit(function () {
                $(this).hide();
                _login = true;
                rfqData.logOn($('#userEmail').val(), $('#pwd').val(), _handleLogOn);
                return false;
            });
        }
    },
    
    _initHome = function() {
        _ffNum = sessionStorage.email;
        rfqData.getDataforRFQSummary(_ffNum, _handleDataForRFQSummary);
    },
    
    //_initCheckIn = function() {
    //    var currentseg = _flightForCheckin.segments[_flightForCheckin.currentSegment],
    //    seat = currentseg.seat,
    //    flight = currentseg.from + ' to ' + currentseg.to;
    //    $('#checkIn-flight-number').text(currentseg.flightNum);
    //    $('#checkIn-flight-destination').text(flight);
    //    $('#checkIn-seat').text(seat);
    //},
    
    _handleLogOn = function (ff, success) {
        if (success) {
            _ffNum = ff.substring(0, ff.indexOf("@"));
            if (typeof(Storage)!=="undefined") {
                sessionStorage.email = ff;
                sessionStorage.userID = _ffNum;
            }
            else {
                alert("Sorry, your browser does not support web storage...");
            }
            window.location.href = "main.html#home";
        }
    },
    
    //_handleDataForFF = function (data) {
    //    $flightList = $('#myTripsListView');
    //    _customerData = data;
    //    $('#ffname').text(data.firstName);
    //$('#ffnum').text(data.ffNum);
    //$('#currentStatus').text(data.status);
    //$('#miles').text(data.miles);
    //$('#numberOfFlights').text(data.flights.length);
    //    for (var i in data.flights) {
    //        var flight = data.flights[i],
    //        currentSegment = flight.segments[flight.currentSegment];
    //        $flightList.append('<li id="' + flight.id + '"><a href="#tripDetail" data-transition="slide">' + currentSegment.from + ' to ' + currentSegment.to + '</a></li>');
    //        var item = $('#' + flight.id, $flightList);
    //        item.data('flight', flight);
    //        if (flight.timeToCheckIn) {
    //            item.addClass('checkIn');
    //            $('a', item).attr('href', '#checkIn');
    //        }
    //        else {
    //            item.addClass('tripDetail');
    //        }
    //    }
    //    $.mobile.changePage('#home', { transition: 'flip' });
    //};
    
    _handleDataForRFQSummary = function (data) {
        $myRFQSummary = $('#myRFQSummaryListView');
        _rfqSummaryData = data;
        var idx = 0;
        var headerstyleclass = "ui-bar ui-bar-e";
        var refURL = "viewRFQDetail.html?id=";
        for (var i in data.requestQuotation) {
            var rfq = data.requestQuotation[i];
            idx ++;
            if (rfq.status == "Saved") {
                headerstyleclass = 'ui-bar ui-bar-c';
                refURL = "createRFQ.html?id=" + idx;
            }
            else if (rfq.status == "Pending") {
                headerstyleclass = 'ui-bar ui-bar-e';
                refURL = "viewRFQDetail.html?rfq=" + rfq.requestID;
            }
            else if (rfq.status == "Quoted") {
                headerstyleclass = 'ui-bar ui-bar-b';
                refURL = "viewRFQDetail.html?rfq=" + rfq.requestID;
            }
            else if (rfq.status == "Accepted") {
                headerstyleclass = 'ui-bar ui-bar-d';
                refURL = "viewRFQDetail.html?rfq=" + rfq.requestID;
            }
            else if (rfq.status == "Rejected") {
                headerstyleclass = 'ui-bar ui-bar-a';
                refURL = "viewRFQDetail.html?rfq=" + rfq.requestID;
            }
            else if (rfq.status == "No Flight") {
                headerstyleclass = 'ui-bar ui-bar-f';
                refURL = "viewRFQDetail.html?rfq=" + rfq.requestID;
            }
            $myRFQSummary.append('<div class="ui-corner-all custom-corners"><div><a href="' + refURL + '" rel="external"><div class="' + headerstyleclass + '"><h3>Request For Quotation ' + idx + '</h3">&nbsp;&nbsp;&nbsp;&nbsp;<span text-align="right"><h6>' + rfq.createDT + '</h6></span></div></a></div><div class="ui-body ui-body-c"><table><tr><th>'
                                 + rfq.origin + ' - ' + rfq.destination + '</th><th>&nbsp;<th>&nbsp;</th><th>' + rfq.status + '</th></tr><tr><td colspan="4">&nbsp;' + rfq.goodsDescription 
                                 + '</td></tr><tr><td>&nbsp;' + rfq.commodity + '</td><td>' + rfq.pieces + ' <b>pcs</b></td><td>&nbsp;' + rfq.weight + ' <b>kg</b></td><td>&nbsp;' + rfq.volume + ' <b>m³</b></td></tr><tr><td>' 
                                 + 'Valid Date<br />' + rfq.validFrom + '</td><td>LogeIn Date<br />' + rfq.LogeInDT + '<br /></td><td>Collection Date<br />' + rfq.collectionDT + '<br /></td><td>Expiry Date<br />' 
                                 + rfq.expireOn + '</td></tr></table></div><br />');
        }
    };
    
    return {
        run:run,
    };
}();

var quotationSummary = {
    firstName: 'kohch', lastName: 'Daniels', requesterID: '12345678',newRFQ: 2,
    Quotation: [
        { QuotationID: '8F7DC3B9-12C9-4306-AC24-1B46BE322518', origin: 'SIN', destination: 'DEL', remarks: 'more discount if > 5000kg', status: 'New', createDT: '2014-01-01 11:00', expireOn: '2014-01-22', validFrom: '2014-01-20', arrivalDT: '2014-01-21 13:00', departureDT: '2014-01-21 11:00', ratePerKg: '100', totalRate: '300', recipient: 'kohch@ccn.com.sg' },
        { QuotationID: 'CBD414EB-9EF5-4644-AA77-A32E51009242', origin: 'SIN', destination: 'DEL', remarks: '10% discount given', status: 'New', createDT: '2014-01-01 11:00', expireOn: '2014-01-22', validFrom: '2014-01-20', arrivalDT: '2014-01-21 13:00', departureDT: '2014-01-21 11:00', ratePerKg: '90', totalRate: '270', recipient: 'khaing@ccn.com.sg' },
        { QuotationID: 'CBD121EB-9EF5-1234-AA11-5322110056AD', origin: 'SIN', destination: 'DEL', remarks: '', status: 'Pending', createDT: '', expireOn: '', validFrom: '', arrivalDT: '', departureDT: '', ratePerKg: '', totalRate: '', recipient: 'jenny@ccn.com.sg' }
    ]
};

function getQuotationSummary() {
    $myQuotationSummary = $('#myQuotationSummaryListView');
    var idx = 0;    
    var headerstyleclass = "ui-bar ui-bar-e";
    var refURL = "viewQuotationDetail.html?id=";
    for (var i in quotationSummary.Quotation) {
        var rfq = quotationSummary.Quotation[i];
        idx ++;
        if (rfq.status == "Saved") {
            headerstyleclass = 'ui-bar ui-bar-c';
            refURL = "#";
        }
        else if (rfq.status == "Pending") {
            headerstyleclass = 'ui-bar ui-bar-e';
            refURL = "#";
        }
        else if (rfq.status == "New") {
            headerstyleclass = 'ui-bar ui-bar-b';
            refURL = "viewQuotationDetail.html?id=" + idx;
        }
        else if (rfq.status == "Won") {
            headerstyleclass = 'ui-bar ui-bar-d';
            refURL = "viewQuotationDetail.html?id=" + idx;
        }
        else if (rfq.status == "Lost") {
            headerstyleclass = 'ui-bar ui-bar-a';
            refURL = "viewQuotationDetail.html?id=" + idx;
        }
        else if (rfq.status == "No Flight") {
            headerstyleclass = 'ui-bar ui-bar-f';
            refURL = "#";
        }
        $myQuotationSummary.append('<div class="ui-corner-all custom-corners"><a href="' + refURL + '" rel="external"><div class="' + headerstyleclass + '"><h3>Quotation ' + idx + '</h3></div></a><div class="ui-body ui-body-e"><table><tr><th>'
                                   + rfq.origin + ' - ' + rfq.destination + '</th><th>&nbsp;<th>&nbsp;</th><th>' + rfq.status + '</th></tr><tr><td colspan="4">&nbsp;' + rfq.remarks 
                                   + '</td></tr><tr><td><b>Rate/Kg</b></td><td>' + rfq.ratePerKg + '</td><td><b>Total Rate</b></td><td>' + rfq.totalRate + '</td></tr><tr><td>' 
                                   + 'Valid Date<br />' + rfq.validFrom + '</td><td>Depart Date<br />' + rfq.departureDT + '<br /></td><td>Arrival Date<br />' + rfq.arrivalDT + '<br /></td><td>Expiry Date<br />' 
                                   + rfq.expireOn + '</td></tr></table></div></div><br />');
    }
}

$.extend({
    getUrlVars: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name) {
        return $.getUrlVars()[name];
    }
});
function getObjWhenPropertyEquals(obj, prop, val)
{
    for (var i = 0, l = obj.length; i < l; i++) {
        // check the obj has the property before comparing it
        if (typeof obj[i][prop] === 'undefined') continue;

        // if the obj property equals our test value, return the obj
        if (obj[i][prop] === val) return obj[i];
    }

    // didn't find an object with the property
    return false;
}