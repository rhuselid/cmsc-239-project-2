// you can put util functions here if you want

// NOTE: this violate lint we used to
// random shuffle code copied from https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
export function shuffle(arra1) {
  var ctr = arra1.length, temp, index;
  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

// a approximated random normal function with mean 0, copied from
// https://riptutorial.com/javascript/example/8330/random--with-gaussian-distribution
// not actually normal because it's bounded with in (-0.5, 0.5), which is good because we use it to display jittered integers
export function randomG(v){ 
    var r = 0;
    for(var i = v; i > 0; i --){
        r += Math.random();
    }
    return (r / v - 0.5);
}