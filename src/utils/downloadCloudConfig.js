const request = require('request');
const fs = require('fs');

const download = (url) => {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = async (url, path) => {
    const res = await download(url);
    fs.writeFileSync(path, res);
}