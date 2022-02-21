module.exports = (request, response, next) => {
  response.setHeader('Acces-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader('Acces-Control-Allow-Methods', '*');
  response.setHeader('Acces-Control-Allow-Headers', '*');
  response.setHeader('Acces-Control-Max-Age', '10');
  next();
};
