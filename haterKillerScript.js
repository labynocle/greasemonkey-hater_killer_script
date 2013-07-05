// ==UserScript==
// @name Hater Killer Script
// @namespace HaterKillerScript
// @description Bring back the Truth about a choosen actor
// @include http*
// @version 0.2
// @grant none
// ==UserScript==


// BEGIN CONFIGURATION
var theTruthList = ['ryan gosling--__--man',
                'audrey tautou--__--woman',
                'marion cotillard--__--woman',
                'guillaume canet--__--man'];


var trashWord = {};
trashWord['fr'] = {man: ['cretin', 'batard', 'boloss', 'useless'], woman: ['looseuse', 'bouffone', 'useless']};
trashWord['en'] = {man: ['useless', 'boring', 'stupid', 'idiot'], woman: ['useless', 'boring', 'stupid', 'idiot']};


// END CONFIGURATION


// Don't touch anything under this line!
// You shall not pass - Gandalf is watching you

// -----------------------------------------------

// function to bring back the truth !!
function bringBackTheTruth(textNodes,theTruthActorName,theTruthGender,trashWord,pageLang) {
    
    // set the coordinate words - depends of the language
    if (pageLang == 'en') {
        coordinateWord = ['this','of '];        
    }
    else if (pageLang == 'fr') {
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
            if ( theTruthGender == 'man' ) {
                coordinateWord = ['ce','de '];
            }
            else {
                coordinateWord = ['cette','de '];
            }
        }
    }
    else {
        coordinateWord = ['this','of'];
        // if we don't manage the language we set it to en
        pageLang = 'en';
    }
    
    // apply the RegExp
    var searchRegExp = new RegExp(theTruthActorName,'gi');
    for (var i=0;i<textNodes.snapshotLength;i++) {
        var node = textNodes.snapshotItem(i);
        var randomIndice = getRandomInt (0, trashWord[pageLang][theTruthGender].length-1);

        // for debug only
        console.log(coordinateWord[0] + ' ' +
        trashWord[pageLang][theTruthGender][randomIndice] + ' '+
        coordinateWord[1] +
        toTitleCase(theTruthActorName));

        node.data = node.data.replace(searchRegExp, coordinateWord[0] + ' ' + trashWord[pageLang][theTruthGender][randomIndice] + ' '+ coordinateWord[1] + toTitleCase(theTruthActorName));
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

var pageLangTemp = document.getElementsByTagName('html')[0].getAttribute("lang");
// by default if we're not able to find the lang attribut of the HTML tag
// we choose the french as default language
var pageLang = (pageLangTemp ? pageLangTemp:'fr');

for (i=0;i<theTruthList.length;i++) {
    var theTruthCut = theTruthList[i].split('--__--');
    var theTruthActorName = theTruthCut[0];
    var theTruthGender = theTruthCut[1];

    // bring back the truth about the actor...
    bringBackTheTruth(textNodes,
                    theTruthActorName,theTruthGender,
                    trashWord,pageLang);
}
