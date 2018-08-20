'use strict';

var product1, product2, product3;
var clicks = 0;
var priorImgsShown = [];
// constructor for Product
function Product(name, filename, votes = 0, shown = 0) {
  this.name = name;
  this.filename = filename;
  this.votes = votes;
  this.shown = shown;
  Product.allProduct.push(this);
}
Product.allProduct = [];
Product.totalVotes = 0;
var chartColor = [];

var storedProducts = JSON.parse(localStorage.getItem('products'));
if (storedProducts) {
  for (var i = 0; i < storedProducts.length; i++) {
    new Product(storedProducts[i].name, storedProducts[i].filename, storedProducts[i].votes, storedProducts[i].shown);
  }
  } else {
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
  }

function random() {
  return Math.floor(Math.random() * 255);}

function randomColorGenerator() {
  for (var i = 0; i < Product.allProduct.length; i++) {
    chartColor.push(`rgba(${random()}, ${random()}, ${random()}, 0.4)`);
  }
  return chartColor;
}

//display three random images
function displayNewProducts() {
  if (Product.totalVotes >= 24) {
    displayResults();
  
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
  displayChart();  
  //saving results to local storage
  localStorage.setItem('products', JSON.stringify(Product.allProduct));
}
function displayChart() {
  var namesArray = [];
  var votesArray = [];
  var timesShownArray = [];
  for (var i = 0; i < Product.allProduct.length; i++) {
    // also add numbers to the new array
    namesArray.push(Product.allProduct[i].name);
    votesArray.push(Product.allProduct[i].votes);
    timesShownArray.push(Product.allProduct[i].shown);
    randomColorGenerator();
 }
 //votes chart
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
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
  //times shown chart
  var ctx2 = document.getElementById('myChart2').getContext('2d');
  var myChart2 = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Times Shown',
        data: timesShownArray, // these numbers seem important
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
