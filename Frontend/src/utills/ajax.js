

export const fetchData =(url,successCallback,errorCallback)=>{
    var xhr  = new XMLHttpRequest();

    xhr.open("GET",url,true);
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <300){
            var response  = JSON.parse(xhr.responseText);
            successCallback(response)
        }else{
            errorCallback("Error in fetching data")
        }
    }

    xhr.onerror = function(){
        errorCallback("Error in fetching data")
    }
    xhr.send();
}
