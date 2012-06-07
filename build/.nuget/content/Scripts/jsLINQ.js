(function( a, o ) {
    var getType, 
        sortNumber, 
        sortString, 
        sortProxy, 
        _undefined;
    a.fn = a.prototype;

    if( a.each === _undefined ) {
        a.fn.each = function( func ) {
            var items = this, l = items.length, i = 0;
            for( i; i < l; i++ ) {
                func(items[i], i);
            }
        };
    }

    if( a.where === _undefined ) {
        a.fn.where = a.fn.all = function( predicate ) {
            var items = this, arr = [];
            if( predicate === _undefined ) return items;
            items.each(function(item) {
                if(predicate(item) === true) arr.push( item );
            });
            return arr;
        };
    }
    if( a.select === _undefined ) {
        a.fn.select = function( func ) {
            var items = this, arr = [];
            if( func === _undefined ) return items;
            items.each(function(item) {
                arr.push( func( item ) );
            });
            return arr;
        };
    }
    
    if( a.take === _undefined ) {
        a.fn.take = function( count ) {
            var items = this, l = items.length;
            if( count === _undefined ) return items;
            if( getType(count) !== '[Number]' ) throw 'count must be a number';
            return ( count > l ) ? items : items.slice( 0, count );
        };
    }
    
    if( a.skip === _undefined ) {
        a.fn.skip = function( count ) {
            var items = this, l = items.length;
            if( count === _undefined ) return items;
            if( getType(count) !== '[Number]' ) throw 'count must be a number';
            return ( count > l ) ? items.slice( count - l ) : items.slice( count );
        };
    }
    
    if( a.first === _undefined || a.single === _undefined ) {
        a.fn.first = a.fn.single = function( predicate ) {
            var items = this;
            if( !predicate ) {
                return items[0];
            }
            return items.where(predicate)[0];
        };
    }

    if( a.count === _undefined ) {
        a.fn.count = function( predicate ) {
            var items = this;
            if( predicate  === _undefined ) { 
                return this.length;
            }
            return items.where(predicate).length;
        };
    }

    if( a.any === _undefined ) {
        a.fn.any = function( predicate ) {
            var items = this;
            if( predicate === _undefined ) {
                return this.length > 0;
            }
            return ( items.length <= 0 ) ? false : items.where(predicate).length > 0;
        };
    }

    if( a.toHash === _undefined || a.toDictionary === _undefined ) {
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
    }

    if( a.orderBy === _undefined || a.order === _undefined ) {
        a.fn.orderBy = a.fn.order = function( prop ) {
            var items = this, type, action;
            type = ( prop === _undefined ) ? getType( items[0] ) : getType( items[0][prop] );
            if( prop !== _undefined && type !== '[Object]' && items[0][prop] === _undefined ) throw 'cannot use prop with an Array of primitive types (String, Date, Number, Bool)';
            if( prop === _undefined ) {
                return ( type === '[String]' ) ? items.sort( sortString ) : items.sort( sortNumber );
            }
            return ( type === '[String]' ) ? items.sort(sortProxy(sortString, prop)) : items.sort(sortProxy(sortNumber, prop));
        };
    }

    if( a.sum === _undefined ) {
        a.fn.sum = function( prop ) {
            var items = this, type, sum = 0;
            type = ( prop === _undefined ) ? getType( items[0] ) : getType( items[0][prop] );
            if( type !== '[Number]' ) throw 'array values must be a Number';
            items.each(function(item, i) {
                var val = ( prop === _undefined ) ? items[i] : items[i][prop];
                sum += val;
            });
            return sum;
        };
    }

    if( a.average === _undefined || a.mean === _undefined ) {
        a.fn.average = a.fn.mean = function( prop ) {
            var items = this, l = items.length, type;
            type = ( prop === _undefined ) ? getType( items[0] ) : getType( items[0][prop] );
            if( type !== '[Number]' ) throw 'array values must be a Number';
            return items.sum(prop) / l;
        };
    }

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