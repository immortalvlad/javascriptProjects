var animals = [
    {species: 'Лев', name: 'Король'},
    {species: 'Кит', name: 'Фэйл'}
];

for (var i = 0; i < animals.length; i++) {
    (function (i) {
        this.print = function () {
            console.log('#' + i + ' ' + this.species
                    + ': ' + this.name);
        };
        this.print();
    }).call(animals[i], i);
}