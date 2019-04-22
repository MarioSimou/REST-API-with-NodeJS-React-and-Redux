module.exports = (()=>({
    DatabaseError : class DatabaseError extends Error {
        constructor( message){
            super( message )
            this._state = 'negative'
            this._content = message
            this._statusCode = 400 
            this._name = this.constructor.name
        }
        get state(){
            return this._state
        }
        get content(){
            return this._content
        }
        get statusCode(){
            return this._statusCode
        }
        get name(){
            return this._name
        }
        // static method that validates a database error
        static genDatabaseError( e ){
            // analyse errors
            switch( +e.code ){
                case 23505:
                    const relation = e.table
                    const regex = new RegExp(`(?<=unique_${ relation }_)(.*)` , 'g')
                    return new DatabaseError( `Duplicate field ${ e.constraint.match( regex )[0] } on table ${ relation } ` )               
                default:
                    return new DatabaseError( e.detail )
            }
        }
        // renders the error's content
        render(){
            return { content : this.content , state : this.state }
        }
    },
    ValidationError : class ValidationError extends Error {
        constructor( message ){
            super( message )
            this._content = message
            this._statusCode = 400
            this._name = this.constructor.name
            this._state = 'negative'
        }

        get content(){
            return this._content
        }
        get statusCode(){
            return this._statusCode
        }
        get name(){
            return this._name
        }
        get state(){
            return this._state
        }
        render(){
            return { content : this._content , state : this._state }
        }
    }
}))()