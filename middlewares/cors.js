//history:
//Aug 13.2022 - create file

const corsSet = (req, res, next) => {

    // Allow any website  to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Allow Request methods 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Allow Request headers 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
}

module.exports = corsSet
