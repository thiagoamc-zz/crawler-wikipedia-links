/**
 * Wikipedia PT-BR Crawling/Scraping
 * @description Crawling links for the specific page
 * @author Thiago Coelho - thiagoamc@gmail.com
 * @version 1.0.0
 */
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

// Wikipedia page and output file
const urlWikipedia = 'https://pt.wikipedia.org';
const url = 'https://pt.wikipedia.org/wiki/B3_(bolsa_de_valores)';
const outputFile = 'database.csv';

request(url, function (error, response, body) {
  let links = [];
  let $ = cheerio.load(body);
  let databaseFile = fs.createWriteStream(outputFile);
  
  console.log('---- Crawling Initied ----');
  databaseFile.write('NOME;LINK\r\n');
  let csvLineData = '';
  $('div#bodyContent a').each(function (index, elem) {
    console.log('LINK -> ' + $(elem).text() + ' --- ' + elem.attribs.href);
    let tmpHref = elem.attribs.href;
    let regex = /wiki/;
    let regexTwo = /\/w\/index.php/;
     
    if(regex.test(tmpHref) || regexTwo.test(tmpHref)) {
      tmpHref = urlWikipedia + tmpHref;
    }
    csvLineData = csvLineData + $(elem).text() + ';' + tmpHref + '\r\n';
  });

  databaseFile.write(csvLineData);
  databaseFile.end();
  console.log('---- Crawling Finished ----');
});