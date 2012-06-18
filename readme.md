#Coming Soon, but here are some examples#


**API**

- any (arg: func predicate or string lambda or none)
- count (arg: func predicate or string lambda or none)
- first or single (arg: func predicate or string lambda or none)
- where or all (arg: func predicate or string lambda)
- select (arg: func transform)
- skip (arg: int count)
- take (arg: int count)
- orderBy (arg: string prop or none)
- toHash or toDictionary (arg: string key or none)
- sum (arg: string prop or none)
- average or mean (arg: string prop or none)
- each (arg: func(item, index) transform)
- min (arg: string prop or none)
- max (arg: string prop or none)
- distinct or unique (arg: none)
- union (arg: [n])
- intersect (arg: [n])
- shuffle (arg: none)

**Simple examples**

```javascript
var nums = [1,9,19,4,5,15,7,8,2,10,11,12,13,14,6,16,17,18,3,20,21,22];    
var people = [
    {name: 'Paul', age: 31},
    {name: 'Reza', age: 26},
    {name: 'Adam', age: 34},
    {name: 'Jim', age: 20},
    {name: 'Sarah', age: 22}
];

var numsOverFiveOrdered = nums.where(function(n) {return n > 5}).order(); 
//numsOverFiveOrdered: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

numsOverFiveOrdered = nums.where('(n) => n > 5').order(); 
//numsOverFiveOrdered: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]


var numsSkipTenTakeTenOrder = nums.skip(10).take(10).order();
//numsSkipTenTakeTenOrder: [3,6,11,12,13,14,16,17,18,20]

var peopleOver21OrderedByName = people.where(function(x) {return x.age > 21}).orderBy('name');
//peopleOver21OrderedByName: [{name: 'Adam', age: 34},{name: 'Paul', age: 31},{name: 'Reza', age: 26},{name: 'Sarah', age: 22}];

peopleOver21OrderedByName = people.where('x => x.age > 21').orderBy('name');
//peopleOver21OrderedByName: [{name: 'Adam', age: 34},{name: 'Paul', age: 31},{name: 'Reza', age: 26},{name: 'Sarah', age: 22}];

var namesOver21OrderedByAge = people.where(function(x) {return x.age > 21})
                                    .orderBy('age')
                                    .select(function(x) {return x.name});
//namesOver21OrderedByAge: ['Sarah', 'Reza', 'Paul', 'Adam']
<<<<<<< HEAD
=======
```