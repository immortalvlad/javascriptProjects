function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Нельзя создать продукт ' +
                      this.name + ' с отрицательной ценой');
  }

  return this;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'еда';
}

Food.prototype = Object.create(Product.prototype);

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'игрушка';
}

Toy.prototype = Object.create(Product.prototype);

var cheese = new Food('фета', 5);
var fun = new Toy('робот', 40);
