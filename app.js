'use strict';

var product1, product2, product3;
var clicks = 0;
var priorImgsShown = [];

// constructor for Product
function Product(name, filename) {
  this.name = name;
  this.filename = filename;
  this.votes = 0;
  this.shown = 0;
  Product.allProduct.push(this);
}
Product.allProduct = [];
Product.totalVotes = 0;
var chartColor = [];

new Product('meatball bubblegum','img/bubblegum.jpg');
new Product('not rain boots','img/boots.jpg');
new Product('bathroom stand','img/bathroom.jpg');
new Product('super cool suitcase','img/bag.jpg');
new Product('banana slicer','img/banana.jpg');
new Product('all in one breakfast','img/breakfast.jpg');
new Product('chair','img/chair.jpg');
new Product('cthulhu','img/cthulhu.jpg');
new Product('duck muzzle','img/dog-duck.jpg');
new Product('canned dragon meat','img/dragon.jpg');
new Product('pen silverware','img/pen.jpg');
new Product('pet-sweep','img/pet-sweep.jpg');
new Product('pizza scissors','img/scissors.jpg');
new Product('human shark bag','img/shark.jpg');
new Product('child labor','img/sweep.png');
new Product('sleeping bag','img/tauntaun.jpg');
new Product('meat?','img/unicorn.jpg');
new Product('tentacle usb','img/usb.gif');
new Product('regenerating watering can','img/water-can.jpg');
new Product('undrinkable wine glass','img/wine-glass.jpg');

function random() {
  return Math.floor(Math.random() * 255)}

function randomColorGenerator() {
  for (var i = 0; i < Product.allProduct.length; i++) {
    chartColor.push(`rgba(${random()}, ${random()}, ${random()}, 0.4)`);
  }
  return chartColor;
}

//display three random images
function displayNewProducts() {
  console.log('votes',Product.totalVotes);
  if (Product.totalVotes === 25) {
    displayResults();
    displayChart();
  } else {
  var randIndex = Math.floor(Math.random() * Product.allProduct.length);
  var secondProductIndex = Math.floor(Math.random() * Product.allProduct.length);
  var thirdProductIndex = Math.floor(Math.random() * Product.allProduct.length);
  //choose three random images and display
  //if image previously shown, choose new image
  while (priorImgsShown.includes(randIndex) ||
    priorImgsShown.includes(secondProductIndex) ||
    priorImgsShown.includes(thirdProductIndex) ||
    randIndex === secondProductIndex ||
    randIndex === thirdProductIndex || 
    secondProductIndex === thirdProductIndex
    ) {
    randIndex = Math.floor(Math.random() * Product.allProduct.length);
    secondProductIndex = Math.floor(Math.random() * Product.allProduct.length);
    thirdProductIndex = Math.floor(Math.random() * Product.allProduct.length);
  }
    priorImgsShown[0] = randIndex;
    priorImgsShown[1] = secondProductIndex;
    priorImgsShown[2] = thirdProductIndex;
    product1 = Product.allProduct[randIndex];
    product2 = Product.allProduct[secondProductIndex];
    product3 = Product.allProduct[thirdProductIndex];
    img1.src = product1.filename;
    img2.src = product2.filename;
    img3.src = product3.filename;
    product1.shown++;
    product2.shown++;
    product3.shown++;
  }
}
function displayResults() {
  img1.remove();
  img2.remove();
  img3.remove();
  
  for (var i = 0; i < Product.allProduct.length; i++) {
    var singleProd = Product.allProduct[i];
    //add to the arrays
    var productLi = document.createElement('li');
    var productH3 = document.createElement('h3');
    var productP1 = document.createElement('p');
    var productP2 = document.createElement('p');
    var productP3 = document.createElement('p');
    productH3.textContent = singleProd.name;
    productP1.textContent = `Votes: ${singleProd.votes}`;
    productP2.textContent = `Times Shown: ${singleProd.shown}`;
    productP3.textContent = `Percentage of votes to times shown ${((singleProd.votes / singleProd.shown) * 100).toFixed(2)}%`;
    var ulEl = document.getElementById('results');
    productLi.appendChild(productH3);
    productLi.appendChild(productP1);
    productLi.appendChild(productP2);
    productLi.appendChild(productP3);
    ulEl.appendChild(productLi);
  }
}
function displayChart() {
  var namesArray = [];
  var votesArray = [];
  for (var i = 0; i < Product.allProduct.length; i++) {
    // also add numbers to the new array
    namesArray.push(Product.allProduct[i].name);
    votesArray.push(Product.allProduct[i].votes);
    randomColorGenerator();
 }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: votesArray, // these numbers seem important
        backgroundColor: chartColor,
        borderColor: 'rgb(0,0,0)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero:true,
            suggestedMax: 10,
            autoSkip: false
          }
        }]
      }
    }
  });
}
 
// event listeners
// where are we listening? the images
var img1 = document.getElementsByTagName('img')[0];
var img2 = document.getElementsByTagName('img')[1];
var img3 = document.getElementsByTagName('img')[2];
// what are we listening for? click
img1.addEventListener('click', function(e) {
  product1.votes++;
  Product.totalVotes++;
  displayNewProducts();
});

img2.addEventListener('click', function() {
  product2.votes++;
  Product.totalVotes++;
  displayNewProducts();
});

img3.addEventListener('click', function() {
  product3.votes++;
  Product.totalVotes++;
  displayNewProducts();
});

displayNewProducts();
console.log(Product.allProduct);
