const { Pool } = require('pg'),
       fs = require('fs'),
       URI_POSTGRES = 'postgresql://admin:admin@localhost:5432/ecommerce',
       pool = new Pool({ connectionString : URI_POSTGRES })

const populateData = async ( pool ) => {
    const products = await new Promise( ( resolve, reject ) => {
        fs.readFile('./electronic-products.csv', 'utf8' , ( e , d ) => {
            if( e ) reject( e ) 
            else resolve( d.split('\n').slice( 0 , 10 ) )
        })
    })

    let s = {}
    for( let product of products ){
        [ id , prices_amountamax, prices_amountmin , prices_availability, prices_condition, prices_currency,  prices_issale, prices_merchant , prices_shipping, brand, categories, date_added, date_updated, imageurls, keys , manufacturer, manufacturer_number, name , primary_categories, source_urls , weight ] = product.split(',')
        
        s = { ...s  , [id]:{ prices_amountamax, prices_amountmin , prices_availability, prices_condition, prices_currency,  prices_issale, prices_merchant , prices_shipping, brand,  date_added, date_updated, imageurls, keys , manufacturer, manufacturer_number, name , primary_categories, source_urls , weight } }
    }
    
    console.log(s )
}

populateData( pool )