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
            it( 'should return false with an empty array', function() {
                expect( empty.any() ).toBe(false);
            });

            it( 'should return true with an empty array', function() {
                expect( nums.any() ).toBe(true);
            });
        });
        describe( 'with a predicate', function() { 
           it( 'should return false when asked for nums greater then 50', function() {
                expect( empty.any(function(x) {return x > 50}) ).toBe(false);
            });

            it( 'should return true when asked for nums greater then 5', function() {
                expect( nums.any(function(x) {return x > 5}) ).toBe(true);
            }); 

            it( 'should be able to filter on arrays of objects by property values', function() {
                expect( people.any(function(x) {return x.age > 25}) ).toBe(true);
                expect( people.any(function(x) {return x.first === 'Jesus'}) ).toBe(true);
                expect( people.any(function(x) {return x.last === 'foobar'}) ).toBe(false);
            });
        });
    });

    
});

