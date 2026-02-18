let values = [
    {val: null , hold: false},
    {val: null , hold: false},
    {val: null , hold: false},
    {val: null , hold: false},
    {val: null , hold: false}

]

let throwCount = 1;


function roll(){

    for(terning of values){

        if (terning.hold === false) {

            terning.val = Math.floor(Math.random() * 6) + 1

        }

    }

    updateDice()
}


function frequency(){

    let frequency = new Array(7).fill(0)

    let number = 0;

    for(let i = 0; i < values.length; i++){

        number = values[i].val;
        frequency[number] += 1;

    }

    return frequency;
}

function sameValuePoints(val){
    
    return frequency()[val] * val;
}


function onePairPoints(){

    let freq = frequency();

    let sum = 0

    for( let i = 0; i < freq.length; i++){

        if(freq[i] >= 2){

            sum = i + i

        }

    }

    return sum
}


function twoPairPoints(){

    let freq = frequency();

    let highPair = onePairPoints();
    let secondHighestPair = 0;


    for (let i = 0; i < highPair / 2; i++) {
       if (freq[i] > 1 ){

           secondHighestPair = i+i;
        }
    }

    if (secondHighestPair > 0){
        return highPair + secondHighestPair;
    } else {
        return 0;
    }

}


function  threeSamePoints() {
        let freq = frequency();

        let sum = 0;

        for (let i = 0; i < freq.length; i++) {
            if (freq[i] >= 3){

                sum = i*3;
            
            }

        }

        return sum;
    }

    function fourSamePoints() {
        let freq = frequency();

        let sum = 0;

        for (let i = 0; i < freq.length; i++) {
            if (freq[i] > 3){
                sum = i*4;
            }

        }

        return sum;
    }

function fullHousePoints() {
        let freq = frequency();

        let onePair = false;
        let threePair = false;
        let sum = 0;

        for (let i = 0; i < freq.length; i++) {
            if (freq[i] == 2){
                onePair = true;
                sum += freq[i] * i;
            }

            if (freq[i] == 3) {
                threePair = true;
                sum += freq[i] * i;
            }

        }

        if (onePair && threePair){
            return sum;
        } else {
            return 0;
        }

    }


function smallStraightPoints() {
        let freq = frequency();

        let num = 0;

        for (let i = 1; i < freq.length - 1; i++) {

            if (freq[i] == 1){
                num++;
            }

        }

        if (num == 5){
            return 15;
        } else {
            return 0;
        }
    }

function largeStraightPoints() {
        let freq = frequency();

        let num = 0;

        for (let i = 2; i < freq.length; i++) {

            if (freq[i] == 1){
                num++;
            }

        }

        if (num == 5){
            return 20;
        } else {
            return 0;
        }
    }


     function chancePoints() {
        let sum = 0;

        for (let i = 0; i < values.length; i++) {
            sum += values[i].val;
        }

        return sum;
    }

   

    function yatzyPoints() {
        let freq = frequency();
        let sum = 0;

        for (let j of freq) {
            if (j > 4) {
                sum = 50;
                break;
            }
        }
        return sum;
    }



    function getResults() {

        let results = new Array(15).fill(0);

        for (let i = 0; i <= 5; i++) {
            results[i] = sameValuePoints(i+1);
        }
        
        results[6] = onePairPoints();
        results[7] = twoPairPoints();
        results[8] = threeSamePoints();
        results[9] = fourSamePoints();
        results[10] = fullHousePoints();
        results[11] = smallStraightPoints();
        results[12] = largeStraightPoints();
        results[13] = chancePoints();
        results[14] = yatzyPoints();

        return results;
    }


    let rollBtn = document.querySelector("#rollBtn")

    rollBtn.addEventListener('click', roll)
    

    
    function updateDice(){

        if (throwCount <= 3){
            
            for(let i = 0; i < values.length; i++){
        
                const terningDiv = document.getElementById('terning'+ (i+1))
                terningDiv.innerHTML = ''
        
                const diceImage = document.getElementById('dice' + values[i].val)
        
                terningDiv.appendChild(diceImage.cloneNode())
               
    
            }
    
        }
        
    }
    
