// // Logging.js
// const Logging = (req, res, next) => {
//     // Log the request method, URL, and timestamp
//     console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
    
//     // Log request headers
//     console.log('Request Headers:');
//     console.log(req.headers);
    
//     // Log request parameters (if any)
//       console.log('Request Params:');
//       console.log(Object.keys(req.params));

    
//     // Log query parameters (if any)
//     if (Object.keys(req.query).length > 0) {
//       console.log('Query Parameters:');
//       console.log(req.query);
//     }
    
//     // Log request body (if present)
//     if (req.body) {
//       console.log('Request Body:');
//       console.log(req.body);
//     }
    
//     // Capture the response status and data
//     const originalSend = res.send;
//     res.send = function (data) {
//       console.log(`Response Status: ${res.statusCode}`);
//       console.log('Response Body:');
//       console.log(data);
//       originalSend.apply(res, arguments);
//     };
    
//     next();
//   };
  
//   module.exports = Logging; // Export the middleware function
  




  const Logging = ( req , res , next ) => {
    console.log(`Date : ${ new Date().toUTCString() }`);
    console.log('request header  :')
    console.log(req.headers);
    console.log('request body :')
    console.log(req.body);
    console.log('request params :')
    console.log(req.params );

    // Capture the response status and data
    const originalSend = res.send;
    res.send = function (data) {
      console.log(`Response Status: ${res.statusCode}`);
      console.log('Response Body:');
      console.log(data);
      originalSend.apply(res, arguments);
    };

    next()
  }

  module.exports = Logging ;

