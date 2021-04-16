var prediction_1=""
var prediction_2=""
Webcam.set({
    Width:350,
    height:300,
    image_format:'png',
    png_quality:90,
});
camera-document.getElementById("camera");

Webcam.attach('#camera')

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5version',ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FT7W0NzZ0/model.json',modelLoaded);

function modelLoaded(){
console.log('modelLoaded!');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is"+prediction_1;
    speak_data_2="The second prediction is"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}
function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results);
        document.getElementById("result_hand_name").innerHTML = results[0].label;
        document.getElementById("result_hand_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "up") {
            document.getElementById("update_hand").innerHTML = "&#128070;";
        }

        if (results[0].label == "left") {
            document.getElementById("update_hand").innerHTML = "&#128072;";
        }

        if (results[0].label == "thumbs up") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }


        if (results[1].label == "up") {
            document.getElementById("update_hand2").innerHTML = "&#128070;";
        }

        if (results[1].label == "left") {
            document.getElementById("update_hand2").innerHTML = "&#128072;";
        }

        if (results[1].label == "thumbs up") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }


       

    }

}