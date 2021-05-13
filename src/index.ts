// index.ts

import axios from 'axios';

const url = 'https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance
const cheerio = require('cheerio');
// Send an async HTTP Get request to the url
AxiosInstance.get(url)
    .then( // Once we have data returned ...
        response => {
            const html = response.data; // Get the HTML from the HTTP request
            const $ = cheerio.load(html); // Load the HTML string into cheerio
            // publication date
            const pubDate = $('.lbl-licitacao:nth-of-type(1)').text();

            // bidding date
            const bidDate = $('.lbl-licitacao:nth-of-type(6)').text();

            // object
            const object = $('.lbl-licitacao:nth-of-type(2) ~ p').text();

            console.log(pubDate);
            console.log(bidDate);
            console.log(object);
            // all links
            const links = $('table tr td:nth-child(2) > div > div div a').each((index, element)=>{
                console.log($(element).attr('href'));
            });
        }
    )
    .catch(console.error); // Error handling