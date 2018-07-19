var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var savedText = "";
var recognizing = false;

$(document).ready(function () {
    $("button").click(function () {
        //var ID = $(this).attr("id");
        //var textArea = $(this).parent().find("textarea").val();
        var textAreaID = $(this).parent().find("textarea").attr("id");
        ToggleDictation(textAreaID)
    });
});

$(document).ready(function () {
    $("textarea").change(function () {
        var textAreaID = $(this).parent().find("textarea").attr("id");
        userInput(textAreaID);
    });
});

recognition.onerror = function (event) {
    console.log(event.error);
};

//speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function ToggleDictation(ID) {
    if (recognizing) {
        recognition.stop();
        recognizing = false;
        savedText += " ";
        return;
    }
    recognizing = true;
    recognition.start();
    recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; i++) {
            savedText += event.results[i][0].transcript;
            //console.log(event.results[i][0].transcript);
            console.log(savedText);
            setSavedText(savedText, ID);
        }
    }
}

function ClickInTextBox(event) {
    recognizing = false;
    //console.log(recognizing);
    recognition.stop();
    savedText += " ";
}

function userInput(textAreaID) {
    savedText = document.getElementById(textAreaID).value;
    textAreaID.innerHTML = savedText;
    console.log(savedText);
}

//function getSavedText() {
//    console.log(savedText);
//}

function setSavedText(savedText, ID) {
    $("#"+ID).val(savedText);
}
