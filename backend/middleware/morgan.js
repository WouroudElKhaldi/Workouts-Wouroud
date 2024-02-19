// morganFormat.js
const customMorgan = function(req, res) {
    return [
      `[${new Date().toUTCString()}]`,

      req.method,

      req.url,

      'Request Headers:',

      JSON.stringify(req.headers),

      req.params && Object.keys(req.params).length > 0 ? 'Request Params:' : '',

      req.params ? JSON.stringify(req.params) : '',

      'Query Parameters:',

      JSON.stringify(req.query),

      req.body ? 'Request Body:' : '',

      req.body ? JSON.stringify(req.body) : '',

      `Response Status: ${res.statusCode}`,
      
    ].join(' \n ');
  };
  
  module.exports = customMorgan;