var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var Method;

ContentType = "application/json; charset=utf-8";
DataType = "json";

//Generic function to call WCF  Service
function CallService() {
   $.ajax({
      type: Type, //GET or POST or PUT or DELETE verb
      url: Url, // Location of the service
      data: Data, //Data sent to server      
      processdata: ProcessData, //True or False
      success: function(msg) {//On Successfull service call        
       ServiceSucceeded(msg);
      },
   error: ServiceFailed// When Service call fails
  });
 }
 
function ServiceFailed(result) {
   alert('Service call failed: ' + result.status + '' + result.statusText);
   Type = null; 
   Url = null; 
   Data = null; 
   ContentType = null; 
   DataType = null; 
   ProcessData = null;
}