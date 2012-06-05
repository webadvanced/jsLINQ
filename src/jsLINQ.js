(function( a, o ) {
    a.prototype.find = a.prototype.where = function( predicate ) {
        var items = this, i = 0, l = items.length, arr = [];
        for(i; i < l; i++) {
            var item = items[i];
            if(predicate(item) === true) arr.push(item);
        }
        return arr;
    };
    
    a.prototype.take = function( count ) {
        var items = this, l = items.length;
        return ( count > l ) ? items : items.slice( 0, count );
    };
    
    a.prototype.skip = function( count ) {
        var items = this, l = items.length;
        return ( count > l ) ? items.slice( count - l ) : items.slice( count );
    };
    
    a.prototype.first = a.prototype.single = function( predicate ) {
        var items = this;
        if( !predicate ) {
            return items[0];
        }
        return items.find(predicate)[0];
    };
    
    a.prototype.count = function( predicate ) {
        var items = this;
        if( !predicate ) { 
            return this.length;
        }
        return items.find(predicate).length;
    };

    a.prototype.any = function( predicate ) {
        var items = this;
        if( !predicate ) {
            return this.length > 0;
        }
        return ( items.length <= 0 ) ? false : items.find(predicate).length > 0;
    };

    a.prototype.toHash = a.prototype.toDictionary = function( key ) {
        var items = this, l = items.length, i = 0, obj = {};
        for( i; i < l; i++ ) {
            if(!obj) {
                obj[i] = items[i];
            } else {
                obj[items[i][key]] = items[i];
            }
        }

        return obj;
    };

    a.prototype.orderBy = function( prop ) {
        var items = this, l = items.length, type, action;
        type = ( !prop ) ? getType( items[0] ) : getType( items[0][prop] );
        if( !prop ){
            return ( type === '[String]' ) ? items.sort( sortString ) : items.sort( sortNumber );
        }
        return ( type === '[String]' ) ? items.sort(sortProxy(sortString, prop)) : items.sort(sortProxy(sortNumber, prop));
    };
    
    var getType, sortNumber, sortString, sortProxy;
    
    sortProxy = function(func, prop) {
        return (function(a, b) {
                    return func(a, b, prop);
                });
    };

    getType = function( obj ) {
        return o.prototype.toString.call( obj ).replace( 'object ', '' );
    };

    sortNumber = function( a, b, prop ) {
        return ( !prop ) ? a - b : a[prop] - b[prop];
    };
    sortString = function( a, b, prop ) {
        var _a, _b;
        _a = ( !prop ? a : a[prop] ).toLowerCase();
        _b = ( !prop ? b : b[prop] ).toLowerCase();
        if( _a < b ) return -1;
        if( _a > b ) return 1;
        return 0;
    };
})(Array, Object);