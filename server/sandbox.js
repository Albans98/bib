const michelin = require('./michelin');



// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*        MICHELIN        -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

async function sandbox (searchLink, number) {
  try {
    const restaurant = await michelin.url_list(number, searchLink);
    infos_rest = [];
    for(let i = 0; i <= number; i++)
    {
      const info = await michelin.scrapeRestaurant(restaurant[i]);
      infos_rest.push(info);
      console.log(infos_rest);
    }

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


const restaurants = 563;
const restaurants_per_page = 40;
let page_number = restaurants / restaurants_per_page;

//data_restaurant = [];

for(let i = 1; i < page_number; i++)
{
  let searchLink = `https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/${i}`;
  sandbox(searchLink, restaurants_per_page);

}

let restaurants_last_page = (restaurants % restaurants_per_page);

if(restaurants_last_page != 0) {
  const last = 15;
  let searchLink = `https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/${last}`;
  sandbox(searchLink, restaurants_last_page - 1);
}




// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*        MAÎTRES RESTAURATEURS        *-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

/*
https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult

axios biblio request POST
 Il faut lui donner un header avec des infos
*/