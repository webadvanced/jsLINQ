(function( a, o ) {
    var getType, 
        sortNumber, 
        sortString, 
        sortProxy, 
        _undefined, 
        a.fn = a.prototype;
    
    if(a.where === _undefined) {
        a.fn.where = a.fn.all = function( predicate ) {
            var items = this, i = 0, l = items.length, arr = [];
            if( predicate === _undefined ) return items;
            for(i; i < l; i++) {
                var item = items[i];
                if(predicate(item) === true) arr.push( item );
            }
            return arr;
        };
    }
    if(a.select === _undefined) {
        a.fn.select = function( func ) {
            var items = this, i = 0, l = items.length, arr = [];
            if( func === _undefined ) return items;
            for(i; i < l; i++) {
                var item = items[i];
                arr.push( func( item ) );
            }
            return arr;
        };
    }
    
    if(a.take === _undefined) {
        a.fn.take = function( count ) {
            var items = this, l = items.length;
            if( count === _undefined ) return items;
            if( getType(count) !== '[Number]' ) throw 'count must be a number';
            return ( count > l ) ? items : items.slice( 0, count );
        };
    }
    
    if(a.skip === _undefined) {
        a.fn.skip = function( count ) {
            var items = this, l = items.length;
            if( count === _undefined ) return items;
            if( getType(count) !== '[Number]' ) throw 'count must be a number';
            return ( count > l ) ? items.slice( count - l ) : items.slice( count );
        };
    }
    
    a.fn.first = a.fn.single = function( predicate ) {
        var items = this;
        if( !predicate ) {
            return items[0];
        }
        return items.where(predicate)[0];
    };
    
    a.fn.count = function( predicate ) {
        var items = this;
        if( predicate  === _undefined ) { 
            return this.length;
        }
        return items.where(predicate).length;
    };

    a.fn.any = function( predicate ) {
        var items = this;
        if( predicate === _undefined ) {
            return this.length > 0;
        }
        return ( items.length <= 0 ) ? false : items.where(predicate).length > 0;
    };

    a.fn.toHash = a.fn.toDictionary = function( key ) {
        var items = this, l = items.length, i = 0, obj = {};
        if(key && items[0][key] === _undefined) throw 'key is only valid for arrays of Object';
        for( i; i < l; i++ ) {
            if(!key) {
                obj[i] = items[i];
            } else {
                obj[items[i][key]] = items[i];
            }
        }

        return obj;
    };

    a.fn.orderBy = a.fn.order = function( prop ) {
        var items = this, l = items.length, type, action;
        type = ( prop === _undefined ) ? getType( items[0] ) : getType( items[0][prop] );
        if( prop !== _undefined && type !== '[Object]' && items[0][prop] === _undefined ) throw 'cannot use prop with an Array of primitive types (String, Date, Number, Bool)';
        if( prop === _undefined ) {
            return ( type === '[String]' ) ? items.sort( sortString ) : items.sort( sortNumber );
        }

        return ( type === '[String]' ) ? items.sort(sortProxy(sortString, prop)) : items.sort(sortProxy(sortNumber, prop));
    };
    
    sortProxy = function(func, prop) {
        return (function(a, b) {
                    return func(a, b, prop);
                });
    };

    getType = function( obj ) {
        return o.prototype.toString.call( obj ).replace( 'object ', '' );
    };

    sortNumber = function( a, b, prop ) {
        return ( prop === _undefined ) ? a - b : a[prop] - b[prop];
    };

    sortString = function( a, b, prop ) {
        var _a, _b;
        _a = ( prop === _undefined ? a : a[prop] );
        _b = ( prop === _undefined ? b : b[prop] );
        return _a.localeCompare(_b);
    };
})(Array, Object);