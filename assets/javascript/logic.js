//initialize firebase

  var config = {
    apiKey: "AIzaSyCIgKetJg0qfIk-yYrroK3y9ms3ULKPqqs",
    authDomain: "trains-699d6.firebaseapp.com",
    databaseURL: "https://trains-699d6.firebaseio.com",
    projectId: "trains-699d6",
    storageBucket: "",
    messagingSenderId: "422988806529"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var name ="";

  var destination = "";

  var firstTrain = 0;

  var frequency = 0;


$("#addTrain").on("click", function(event) {
	event.preventDefault();

	name = $("#trainName").val().trim();

	destination = $("#trainDestination").val().trim();

	firstTrain = $("#trainTime").val().trim();

	frequency = $("#trainFrequency").val().trim();

	database.ref().push({
		name: name,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

	database.ref().on("child_added", function(childSnapshot){

		$("table").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().firstTrain + "</td><td>" +childSnapshot.val().frequency + "</td></tr>");

	var tFrequency = 3;

    var firstTime = "03:30";

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	}, function(errorObjects) {

		console.log("Errors handled: " + errorObjects.code);

	});




