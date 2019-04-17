const util = (()=>({
    // routine that checks and identifies if a datatype has a value
    hasValue : function ( v ){
        switch( Object.prototype.toString.call( v )){
            case '[object Array]':
            case '[object String]':
                return v.length > 0 ? true : false
            case '[object Number]':
                return Number( v ).toString().length > 0 ? true : false
            case '[object Object]':
                return Object.values( v ).length > 0 ? true : false
            case '[object Undefined]':
            case '[object Null]':
                return false
            default:
                return null
        }
    }
}))()

export default util