var topics = [
	'Honda',
	'BMW',
	'Hyundai',
	'Subaru',
	'Volkswagen',
	'Toyota',
	'Mercedes',
	'Porsche',
	'Ford',
	'Kia',
	];

function renderButtons(){ 

		$('#carButtons').empty();

		// Loops through the array to generate the buttons
		for (var i = 0; i < topics.length; i++){
		    var carButton = $('<button>') 
		    carButton.addClass('car btn-primary btn-sm'); // Added a class 
		    carButton.attr('data-name', topics[i]); // Added a data-attribute
		    carButton.text(topics[i]); // Provided the initial button text
		    $('#carButtons').append(carButton); // Added the button to the HTML
		}
	}


function getCarInfo () {
        var car = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(car);
        $('#carGifs').empty();

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
             
                console.log(queryURL);

                console.log(response);

                var results = response.data;
              
                for (var i = 0; i < results.length; i++) {

                    var carDiv = $('<div>');
                    carDiv.addClass('carDiv')
                    var rating = results[i].rating
                    if (rating == "") {
                    	rating = "No Rating Provided"
                    } else {
                    	rating = results[i].rating;
                    }
                    var p = $('<p>').text("Rating: " + rating);

                    var carImage = $('<img>');
                    carImage.attr('src', results[i].images.fixed_height_still.url);
                    carImage.attr('data-state', 'still');
                    carImage.attr('data-still', results[i].images.fixed_height_still.url);
                    carImage.attr('data-animate', results[i].images.fixed_height.url);
                    carImage.addClass('carImg');

                    carDiv.append(p);
                    carDiv.append(carImage);

                    $('#carGifs').prepend(carDiv);
                    //--------------------------------
                }

            });
};
// to animate and pause gifs
function animateImg () {
    var state = $(this).attr('data-state'); 

    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
};
// to record value input in text box after submit button has been clicked
$('#addCar').on('click', function(){

	// grab value of user input
	var inputCar = $('#car-input').val().trim();

	//add value to array
	topics.push(inputCar);
	
	// to redisplay the buttons
	renderButtons();
	$("#car-form")[0].reset()
	return false;
	});


$(document).on('click', '.carImg', animateImg);
$(document).on('click', '.car', getCarInfo);
renderButtons();
