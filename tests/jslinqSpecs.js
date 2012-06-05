describe( 'formatWith', function() {

    describe( 'When using sequential indexes', function() {
        var mockSequentialString = '{0} {1} {2}';
        it( 'should replace {0} with first supplied argument of "foo"', function() {
            expect( mockSequentialString.formatWith( 'foo' )).toBe( 'foo {1} {2}' );
        });

        it( 'should replace {1} with second supplied argument of "bar"', function() {
            expect( mockSequentialString.formatWith( 'foo', 'bar' ) ).toBe( 'foo bar {2}' );
        });

        it( 'should replace {2} with second supplied argument of "baz"', function() {
            expect( mockSequentialString.formatWith( 'foo', 'bar', 'baz' ) ).toBe( 'foo bar baz' );
        });
    });

    describe("When using object properties", function() {
        var mockObjectStringSingle = '{firstName} - {lastName}',
            mockObjectStringMultiple = '{firstName} {lastName} - {firstName} {firstName}',
            mockObjectStringCase = '{FirstName} - {LastName}',
            person = {
                firstName: 'Mock',
                lastName: 'Smith'
            };

        it( 'should replace {firstName} and {lastName} with values from corresponding prop names of supplied person object', function() {
            expect( mockObjectStringSingle.formatWith( person )).toBe( 'Mock - Smith' );
        });

        it( 'should replace all instances of {firstName} with value from corresponding prop name of supplied person object', function() {
            expect( mockObjectStringMultiple.formatWith( person )).toBe( 'Mock Smith - Mock Mock' );
        });

        it( 'should be case sensitive and not replace {FirstName} and {LastName} with values from supplied person object', function() {
            expect( mockObjectStringCase.formatWith( person )).toBe( '{FirstName} - {LastName}' );
        });
    });
});

