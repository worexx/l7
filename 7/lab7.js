require('dotenv').config()

const weather = require('openweather-apis');
const http = require('http');
const fs = require('fs');
const url = require('url');

const { PORT, WEATHER_API_KEY, LANGUAGE, ENDPOINT } = process.env
const server = http.createServer();

weather.setLang(LANGUAGE);
weather.setAPPID(WEATHER_API_KEY);

server.on('request', (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  weather.getAllWeather(function (err, JSONObj) {
    res.end(JSON.stringify(JSONObj));
  })

  if (parsedUrl.pathname == '/weather') {
    const city = parsedUrl.query.city
    weather.setCity(city);
    weather.getAllWeather(function (err, JSONObj) {
      res.end(JSON.stringify(JSONObj));
    })
  }
  else {
    const filePath = req.url == '/' || req.url == '/favicon.ico' ? '/index.html' : req.url;
    const fileStream = fs.createReadStream('.' + filePath, 'utf8');
    fileStream.pipe(res);
  }
});

server.listen(PORT);