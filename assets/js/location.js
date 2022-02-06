var error = document.querySelector('.modal-error')

var displayMarket = function (data, location) {

    if (data.resourceSets.length > 0) {
        $('#container-market').append('<div class = "message" id="msg-market' + location + '">');
        $('#msg-market' + location).append('<div class = "message-header" id="msg-header' +location + '">');
        if (data) {
            switch (location) {
                case "Kroger": $('#msg-header' +location).append('<p>' + location + ' near to your location');
                    break;
                case "Publix": $('#msg-header' +location).append('<p>' + location + ' near to your location');
                    break;
                case "Walmart": $('#msg-header' +location).append('<p>' + location + ' near to your location');
                    break;
            }
            $('#msg-market' + location).append('<div class = "message-body" id="body' +location + '"style="background-color: #ffffee">');
            for (var i = 0; i < data.resourceSets.length; i++) {
                for (var j = 0; j < data.resourceSets[i].resources.length; j++) {
                    $('#body' +location).append('<li style="color: #fa9500">' + data.resourceSets[i].resources[j].Address.formattedAddress + '</li>');
                }
            }
        }
    }
}

//Call API BING to get Kroger near by IP 
var getKroger = function () {
    ;
    var apiUrl = "https://dev.virtualearth.net/REST/v1/LocalSearch/?query=kroger&key=ArrXVS9tBqxMsaC7kak_u6KXH9cBWlwJX7TwwSmscPhqu49ammtN20q2Vh45JkVQ"
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayMarket(data, "Kroger");


                });
            } else {
                showError(error);
            }
        })
        .catch(function (error) {
            showError(error);
        });

}

//Call API BING to get Publix near by IP 
var getPublix = function () {
    ;
    var apiUrl = "https://dev.virtualearth.net/REST/v1/LocalSearch/?query=publix&key=ArrXVS9tBqxMsaC7kak_u6KXH9cBWlwJX7TwwSmscPhqu49ammtN20q2Vh45JkVQ"
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayMarket(data, "Publix");


                });
            } else {
                showError(error);
            }
        })
        .catch(function (error) {
            showError(error);
        });

}

var showError = function (error) {
    $("#error-msg").append('<p>' + error)
    $("#error-message").addClass("is-active");
}

//Call API BING to get Walmart near by IP 
var getWalmart = function () {
    ;
    var apiUrl = "https://dev.virtualearth.net/REST/v1/LocalSearch/?query=walmart&key=ArrXVS9tBqxMsaC7kak_u6KXH9cBWlwJX7TwwSmscPhqu49ammtN20q2Vh45JkVQ"
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayMarket(data, "Walmart");


                });
            } else {
                showError(error);
            }
        })
        .catch(function (error) {
            showError(error);
        });

}

var closeError = function (event) {

    $("#error-message").removeClass("is-active");
}

error.addEventListener("click", closeError);

$('#list-market').empty();
getKroger();
getPublix();
getWalmart();