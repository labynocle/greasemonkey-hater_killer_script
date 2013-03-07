// ==UserScript==
// @name        Hater Killer Script
// @namespace   HaterKillerScript
// @description Bring back the Truth about a choosen actor
// @include     http*
// @version     0.1
// @grant       none
// ==UserScript==


// BEGIN CONFIGURATION
var theTruthList = ['ryan gosling--__--man'
                ,'audrey tautou--__--woman',
                'guillaume canet--__--man'];

var manTrashWord = [ 'batard',
                    'cretin',
                    'useless',
                    'bouffon'];
                    
var womanTrashWord = [ 'looseuse',
                    'bouffone',
                    'useless'];
// END CONFIGURATION


// Don't touch anything under this line!
// You shall not pass - Gandalf is watching you

// -----------------------------------------------

// function to bring back the truth !!
function bringBackTheTruth(textNodes,theTruthActorName,theTruthGender,trashWord) {

    var randomIndice = getRandomInt (0, trashWord.length-1);
    //console.log('trashword choose: ' + trashWord[randomIndice]);
    
    // define the coordinate words according to
    // the gender and the first letter of the name
    var vowelRegExp = /^[aeiouy]$/i
    if ( vowelRegExp.test(theTruthActorName.charAt(0)) & theTruthGender == 'man') {
        coordinateWord = ['ce','d\''];
    }
    else if (vowelRegExp.test(theTruthActorName.charAt(0)) & theTruthGender == 'woman') {
        coordinateWord = ['cette','d\''];    
    }
    else {
        var coordinateWord = ['ce','de '];
    }
    
    // for debug only
    /*
    console.log(coordinateWord[0] + ' ' + 
                trashWord[randomIndice]+ ' '+ 
                coordinateWord[1] +
                toTitleCase(theTruthActorName));
    
    */
    
    // apply the RegExp
    var searchRegExp = new RegExp(theTruthActorName,'gi');    
    for (var i=0;i<textNodes.snapshotLength;i++) { 
        var node = textNodes.snapshotItem(i);
        var randomIndice = getRandomInt (0, trashWord.length-1);
        node.data = node.data.replace(searchRegExp, coordinateWord[0] + ' ' + trashWord[randomIndice]+ ' '+ coordinateWord[1] + toTitleCase(theTruthActorName));
    }
}


// function to retrieve a random interger between a specified range
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to upper case only the first letter of each words
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}



// Main
textNodes = document.evaluate(
"//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (i=0;i<theTruthList.length;i++) {
    var theTruthCut = theTruthList[i].split('--__--');
    var theTruthActorName = theTruthCut[0];
    var theTruthGender = theTruthCut[1];

    // by default we trash a man - courtesy!
    wordTrash = manTrashWord;    
    if (theTruthGender == 'woman') {
        wordTrash = womanTrashWord;
    }

    // bring back the truth about the actor...
    bringBackTheTruth(textNodes,
                    theTruthActorName,theTruthGender,
                    wordTrash);
}
