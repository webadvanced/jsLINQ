#Coming Soon, but here are some examples#

```javascript
var nArr = [1,9,19,4,5,15,7,8,2,10,11,12,13,14,6,16,17,18,3,20,21,22];    
var arr = [
    {name: 'Paul', age: 31},
    {name: 'Reza', age: 26},
    {name: 'Adam', age: 34},
    {name: 'Jim', age: 20},
    {name: 'Sarah', age: 22}
];

var people = arr.find(function(x) {
    return x.age > 21;
});

var paul = arr.first();

var reza = arr.first(function(x) {
    return x.name == 'Reza';
});

//first person over 21
var person = arr.find(function(x) {
    return x.age > 21;
}).first();


var firstTen = nArr.take(10);
var skitpTenTakeFive = nArr.skip(10).take(5);
console.log(people);
console.log(paul);
console.log(reza);
console.log(person);
console.log(firstTen);
console.log(skitpTenTakeFive);
console.log(nArr.orderBy());
console.log(arr.orderBy('age'));
console.log(arr.orderBy('name'));
​```