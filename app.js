'use strict';

// constructor for Product
function Product(name, filename) {
  this.name = name;
  this.filename = filename;
  this.votes = 0;
  this.viewed = 0;
  Product.allProduct.push(this);
}
Product.allProduct = [];

var product1, product2, product3;


//not sure what this code does
//product[numProductDisplayed-numProductDisplayed] = new Product('img/bathroom.jpg');
//product[numProductDisplayed-2] = new Product('img/boots.jpg');
//product[numProductDisplayed-1] = new Product('img/bubblegum.jpg');
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



//display three random images
function displayThreeNewProduct() {
    var randIndex = Math.floor(Math.random() * Product.allProduct.length);
    var secondProductIndex = Math.floor(Math.random() * Product.allProduct.length);
    var thirdProductIndex = Math.floor(Math.random() * Product.allProduct.length);
//if images are the same, generate different image
  while (randIndex === secondProductIndex || randIndex === thirdProductIndex || secondProductIndex === thirdProductIndex) {
    randIndex = Math.floor(Math.random() * Product.allProduct.length);
    secondProductIndex = Math.floor(Math.random() * Product.allProduct.length);
    thirdProductIndex = Math.floor(Math.random() * Product.allProduct.length);
  }
    product1 = Product.allProduct[randIndex];
    product2 = Product.allProduct[secondProductIndex];
    product3 = Product.allProduct[thirdProductIndex];
    img1.src = product1.filename;
    img2.src = product2.filename;
    img3.src = product3.filename;
}
 
// event listeners
// where are we listening? the images
var img1 = document.getElementsByTagName('img')[0];
var img2 = document.getElementsByTagName('img')[1];
var img3 = document.getElementsByTagName('img')[2];
// what are we listening for? click
img1.addEventListener('click', function(e) {
  product1.votes++;
  displayThreeNewProduct();

});

img2.addEventListener('click', function() {
  product2.votes++;
  displayThreeNewProduct();
});

img3.addEventListener('click', function() {
  product3.votes++;
  displayThreeNewProduct();
});

displayThreeNewProduct();
console.log(Product.allProduct);
