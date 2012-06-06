describe( 'With jsLINQ', function() {
    var empty = [],
        nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        numsNotSequential = [1, 7, 3, 10, 5, 6, 2, 8, 9, 4],
        strsNotSequential = ['a', 'c', 'd', 'b', 'f', 'e'],
        datesNotSequential = [new Date('01/02/2012'), new Date('01/04/2012'), new Date('01/05/2012'), new Date('01/01/2012'), new Date('01/03/2012')],
        people = [
            new helpers.Person( 'Jon', 'Doe', 27, '05/12/1984' ),
            new helpers.Person( 'Ryan', 'Smith', 29, '08/05/1982' ),
            new helpers.Person( 'Adam', 'Bo', 34, '07/24/1977' ),
            new helpers.Person( 'Jon', 'Doe', 30, '01/14/1981' ),
            new helpers.Person( 'Aurora', 'Assar', 31, '10/18/1980' ),
            new helpers.Person( 'Chris', 'Barton', 20, '03/11/1991' ),
            new helpers.Person( 'Ray', 'Weeks', 22, '08/16/1989' ),
            new helpers.Person( 'Jesus', 'Sims', 18, '02/03/1993' ),
            new helpers.Person( 'Sandy', 'Serrano', 27, '12/06/1984' )
        ];

    describe( 'When using any()', function() {
        describe( 'without a predicate', function() {
            it( 'should return false with empty array', function() {
                expect( empty.any() ).toBe( false );
            });

            it( 'should return true with nums array', function() {
                expect( nums.any() ).toBe( true );
            });
        });
        describe( 'with a predicate', function() { 
           it( 'should return false when asked for nums greater then 50', function() {
                expect( empty.any(function(x) {return x > 50} ) ).toBe( false );
            });

            it( 'should return true when asked for nums greater then 5', function() {
                expect( nums.any(function(x) {return x > 5}) ).toBe( true );
            }); 

            it( 'should be able to filter on people by objects property values', function() {
                expect( people.any(function(x) {return x.age > 25}) ).toBe( true );
                expect( people.any(function(x) {return x.first === 'Jesus'}) ).toBe( true );
                expect( people.any(function(x) {return x.last === 'foobar'}) ).toBe( false );
            });
        });
    });
    
    describe( 'When using count()', function() {
        describe( 'without a predicate', function() {
            it( 'should return 0 with empty array', function() {
                expect( empty.count() ).toBe( 0 );
            });

            it( 'should return 10 with nums array', function() {
                expect( nums.count() ).toBe( 10 );
            });
        });
        describe( 'with a predicate', function() { 
            it( 'should return 0 when asked for nums greater then 50', function() {
                expect( empty.count(function(x) {return x > 50}) ).toBe( 0 );
            });

            it( 'should return 5 when asked for nums greater then 5', function() {
                expect( nums.count(function(x) {return x > 5}) ).toBe( 5 );
            }); 

            it( 'should be able to get count on people by objects property values', function() {
                expect( people.count(function(x) {return x.age > 25}) ).toBe( 6 );
                expect( people.count(function(x) {return x.first === 'Jesus'}) ).toBe( 1 );
                expect( people.count(function(x) {return x.last === 'foobar'}) ).toBe( 0 );
            });
        });
    });

    describe( 'When using single() - first()', function() {
        describe( 'without a predicate', function() {
            it( 'should return undefined for empty array', function() {
                expect( empty.first() ).toBeUndefined();
            });

            it( 'should return 1 with nums array', function() {
                expect( nums.first() ).toBe( 1 );
            });

            it( 'should return person with age 27 from people array', function() {
                expect( people.first().age ).toBe( 27 );
            });
        });
        describe( 'with a predicate', function() { 
            it( 'should return 5 when asked for nums greater then 4', function() {
                expect( nums.single(function(x) {return x > 4}) ).toBe( 5 );
            });

            it( 'should return person with frist of "Adam" when asked for people with age greater then 30', function() {
                expect( people.single(function(x) {return x.age > 30}).first ).toBe( 'Adam' );
            }); 

        });
    });

    describe( 'When using where()', function() {
        it( 'should return all if no predicate is passed', function() {
            expect( nums.where().count() ).toBe( 10 );
            expect( people.where().count() ).toBe( 9 );
        });

        it( 'should return the second 5 items of nums when asked for items greater then 5', function() {
            var tmpArr = nums.where(function(x) {return x > 5});
            expect( tmpArr[0] ).toBe( 6 );
            expect( tmpArr[4] ).toBe( 10 );
        });

        it( 'should return all people over 20 years old', function() {
            var tmpArr = people.where(function(x) {return x.age > 20});
            expect(tmpArr.count()).toBe(7);
        });
    });
    
    describe( 'When using select()', function() {
        it( 'should return all if no predicate is passed', function() {
            expect( nums.select().count() ).toBe( 10 );
            expect( people.select().count() ).toBe( 9 );
        });

        it( 'should return an array of full names from people when passed a transform calling full()', function() {
            var tmpArr = people.select( function(x) {return x.full()} );
            expect(tmpArr.count()).toBe( 9 );
            expect(tmpArr[0]).toBe( 'Jon Doe' );
            expect(tmpArr[8]).toBe( 'Sandy Serrano' );
        });

        it( 'should return an array of numbers ++ from nums when passed a transform calling x + 1', function() {
            var tmpArr = nums.select( function(x) {return x + 1} );
            expect(tmpArr.count()).toBe( 10 );
            expect(tmpArr[0]).toBe( 2 );
            expect(tmpArr[9]).toBe( 11 );
        });
    });

    describe( 'When using skip()', function() {
        it( 'should return all if no count is passed', function() {
            expect( nums.skip().count() ).toBe( 10 );
            expect( people.skip().count() ).toBe( 9 );
        });

        it( 'should throw if (not a number) is passed as count argument', function() {
            expect(function() { nums.skip('10') }).toThrow();
            expect(function() { nums.skip([]) }).toThrow();
            expect(function() { nums.skip({}) }).toThrow();
        });

        it( 'should skip the first 5 items in nums and return the second 5 when passed 5', function() {
            var tmpArr = nums.skip(5);
            expect(tmpArr.count()).toBe(5);
            expect(tmpArr.first()).toBe(6);
        });

        it( 'should return an empty array if skip is greater then nums length', function() {
            var tmpArr = nums.skip(50);
            expect(tmpArr.count()).toBe(0);
        });

    });

    describe( 'When using take()', function() {
        it( 'should return all if no count is passed', function() {
            expect( nums.take().count() ).toBe( 10 );
            expect( people.take().count() ).toBe( 9 );
        });

        it( 'should throw if (not a number) is passed as count argument', function() {
            expect(function() { nums.take('10') }).toThrow();
            expect(function() { nums.take([]) }).toThrow();
            expect(function() { nums.take({}) }).toThrow();
        });

        it( 'should take the first 2 people when passed 2', function() {
            var tmpArr = people.take(2);
            expect(tmpArr.count()).toBe(2);
            expect(tmpArr.first().full()).toBe('Jon Doe');
        });

        it( 'should return all items if count is greater then nums length', function() {
            var tmpArr = nums.take(50);
            expect(tmpArr.count()).toBe(10);
        });
    });

    describe( 'When using orderBy() or order()', function() {
        describe( 'with arrays made up of primitive types (Date, String, Number)', function() {
            
            it( 'should thorw if prop is passed with array of Date, String or Number', function() {
                expect(function() {numsNotSequential.orderBy('foo')}).toThrow();
                expect(function() {strsNotSequential.orderBy('foo')}).toThrow();
                expect(function() {datesNotSequential.orderBy('foo')}).toThrow();
            });

            it( 'should sort numsNotSequential', function() {
                var tmpArr = numsNotSequential.order();
                expect(tmpArr[0]).toBe(1);
                expect(tmpArr[1]).toBe(2);
                expect(tmpArr[2]).toBe(3);
                expect(tmpArr[3]).toBe(4);
                expect(tmpArr[4]).toBe(5);
                expect(tmpArr[5]).toBe(6);
                expect(tmpArr[6]).toBe(7);
                expect(tmpArr[7]).toBe(8);
                expect(tmpArr[8]).toBe(9);
                expect(tmpArr[9]).toBe(10);
            });

            it( 'should sort strsNotSequential', function() {
                var tmpArr = strsNotSequential.order();
                expect(tmpArr[0]).toBe('a');
                expect(tmpArr[1]).toBe('b');
                expect(tmpArr[2]).toBe('c');
                expect(tmpArr[3]).toBe('d');
                expect(tmpArr[4]).toBe('e');
                expect(tmpArr[5]).toBe('f');
            });

            it( 'should sort datesNotSequential', function() {
                var tmpArr = datesNotSequential.order();
                expect(tmpArr[0].getDay()).toBe(0); //Monday
                expect(tmpArr[1].getDay()).toBe(1); //Tuesday
                expect(tmpArr[2].getDay()).toBe(2); //Wednesday
                expect(tmpArr[3].getDay()).toBe(3); //Thursday
                expect(tmpArr[4].getDay()).toBe(4); //Friday
            });
        })
        describe( 'with arrays made up of objects', function() {
            it( 'should default compare (a - b) when no prop is passed', function() {
                var tmpArr = people.order();
                expect(tmpArr[0]).toBe(people[0]);
                expect(tmpArr[1]).toBe(people[1]);
                expect(tmpArr[2]).toBe(people[2]);
                expect(tmpArr[3]).toBe(people[3]);
                expect(tmpArr[4]).toBe(people[4]);
                expect(tmpArr[5]).toBe(people[5]);
                expect(tmpArr[6]).toBe(people[6]);
                expect(tmpArr[7]).toBe(people[7]);
                expect(tmpArr[8]).toBe(people[8]);
            });

            it( 'should sort on "dob" of people', function() {
                var tmpArr = people.orderBy('dob');
                expect(tmpArr.first().full()).toBe('Adam Bo');
                expect(tmpArr[8].full()).toBe('Jesus Sims');
            });

            it( 'should sort on "last" of people', function() {
                var tmpArr = people.orderBy('last');
                expect(tmpArr[0].last).toBe('Assar');
                expect(tmpArr[8].last).toBe('Weeks');
            });

            it( 'should sort on "age" of people', function() {
                var tmpArr = people.orderBy('age');
                expect(tmpArr[0].full()).toBe('Jesus Sims');
                expect(tmpArr[8].full()).toBe('Adam Bo');
            });
        });
    });

    describe( 'when using toDictionary() - toHash()', function() {
        it( 'should use the index of the array when no argument key is provided', function() {
            var hash = nums.toHash();
            expect(hash[0]).toBe(1);
            expect(hash[9]).toBe(10);
        });

        it( 'should throw if key argument is supplied on arrays of primimitive types (String, Number, Date)', function() {
            expect(function() {numsNotSequential.toHash('foo')}).toThrow();
            expect(function() {strsNotSequential.toHash('foo')}).toThrow();
            expect(function() {datesNotSequential.toHash('foo')}).toThrow();
        });

        it( 'should use the value of each object in people by argument key as hash key', function(){
            var obj = people.toHash('last');
            expect(obj['Bo'].full()).toBe('Adam Bo');
        });

    });
});

