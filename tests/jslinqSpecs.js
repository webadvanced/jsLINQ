describe( 'With jsLINQ', function() {
    var empty = [],
        nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        people = [
            new helpers.Person( 'Jon', 'Doe', 27, '05/12/84' ),
            new helpers.Person( 'Ryan', 'Smith', 29, '08/05/82' ),
            new helpers.Person( 'Adam', 'Bo', 34, '07/24/77' ),
            new helpers.Person( 'Jon', 'Doe', 30, '01/14/81' ),
            new helpers.Person( 'Aurora', 'Assar', 31, '10/18/80' ),
            new helpers.Person( 'Chris', 'Barton', 20, '03/11/91' ),
            new helpers.Person( 'Ray', 'Weeks', 22, '08/16/89' ),
            new helpers.Person( 'Jesus', 'Sims', 18, '02/03/93' ),
            new helpers.Person( 'Sandy', 'Serrano', 27, '12/06/84' )
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
});

