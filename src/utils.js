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