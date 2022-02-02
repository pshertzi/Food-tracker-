var displayMarket = function (data, location) {

    //data.resourceSets[0].resources.length
    if (data) {
        switch (location) {
            case "Kroger": $('#list-market').append('<li>' + location + ' near to your location</li>');
                break;
            case "Publix": $('#list-market').append('<li>' + location + ' near to your location</li>');
                break;
            case "Walmart": $('#list-market').append('<li>' + location + ' near to your location</li>');
                break;
        }

        for (var i = 0; i < data.resourceSets.length; i++) {
            for (var j = 0; j < data.resourceSets[i].resources.length; j++) {
                $('#list-market').append('<li>' + data.resourceSets[i].resources[j].Address.formattedAddress + '</li>');
            }
        }
    }
}

//Call API BING to get Kroger near by IP 
var getKroger = function () {
    ;
    var apiUrl = "https://dev.virtualearth.net/REST/v1/LocalSearch/?query=kroger&key=ArrXVS9tBqxMsaC7kak_u6KXH9cBWlwJX7TwwSmscPhqu49ammtN20q2Vh45JkVQ"
    fetch(apiUrl)
        .then(response => {
            response.json().then(function (data) {
                displayMarket(data, "Kroger");

            });
        })
        .catch(err => {
            console.error(err);
        });
}

//Call API BING to get Publix near by IP 
var getPublix = function () {
    ;
    var apiUrl = "https://dev.virtualearth.net/REST/v1/LocalSearch/?query=publix&key=ArrXVS9tBqxMsaC7kak_u6KXH9cBWlwJX7TwwSmscPhqu49ammtN20q2Vh45JkVQ"
    fetch(apiUrl)
        .then(response => {
            response.json().then(function (data) {
                displayMarket(data, "Publix");

            });
        })
        .catch(err => {
            console.error(err);
        });
}


//Call API BING to get Walmart near by IP 
var getWalmart = function () {
    ;
    var apiUrl = "https://dev.virtualearth.net/REST/v1/LocalSearch/?query=walmart&key=ArrXVS9tBqxMsaC7kak_u6KXH9cBWlwJX7TwwSmscPhqu49ammtN20q2Vh45JkVQ"
    fetch(apiUrl)
        .then(response => {
            response.json().then(function (data) {
                displayMarket(data, "Walmart");

            });
        })
        .catch(err => {
            console.error(err);
        });
}

$('#list-market').empty();
getKroger();
getPublix();
getWalmart();