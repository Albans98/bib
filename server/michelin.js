const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 * https://www.npmjs.com/package/cheerio
 */
const parse = data => {
  const $ = cheerio.load(data);
  const address = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text();
  const phone = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a').attr('href');
  const name = $('.section-main h2.restaurant-details__heading--title').text();

  return {address, phone, name};
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

const parse_data = (number, data) => {
  const $ = cheerio.load(data);
  restaurant_url_list = [41];
  restaurant_number = 1;
  for(let i = 0; i <= number; i++)
  {
    const url = $(`body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child(${restaurant_number}) > div > a`).attr('href');
    restaurant_number++;
    restaurant_url_list[i] = 'https://guide.michelin.com/' + url;
  }
  return restaurant_url_list;
};

module.exports.url_list = async (number, url) => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse_data(number, data);
  }

  console.error(status);

  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};