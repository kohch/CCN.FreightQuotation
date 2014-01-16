var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var Method;

ContentType = "application/json";
DataType = "json";

//Generic function to call WCF  Service
function callService() {
    $.ajax({
        cache: false,
        async: false,
        contentType : ContentType,
        dataType:DataType,
        type: Type,
        url: Url,
        data: Data,      
        processdata: ProcessData,
        success: function(msg) {        
            serviceSucceeded(msg);
        },
        error: serviceFailed
    });
}
 
function serviceFailed(result) {
    alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; 
    Url = null; 
    Data = null; 
    ContentType = null; 
    DataType = null; 
    ProcessData = null;
}