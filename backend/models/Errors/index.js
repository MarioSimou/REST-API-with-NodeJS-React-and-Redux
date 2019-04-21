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
        render(){
            return { content : this.content , state : this.state }
        }
    }    
}))()