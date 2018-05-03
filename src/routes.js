//alla components måste importeras för att kunna använda dem
import start from './components/start.vue'
import searchByIngredients from './components/searchByIngredients.vue'
import searchByName from './components/searchByName.vue'
import favorites from './components/favorites.vue'
import randomDrink from './components/randomDrink.vue'
import drink from './components/drink.vue'

export default [ //i denna array finns alla routes
  { path: '/', component: start },
  { path: '/ingredients', component: searchByIngredients },
  { path: '/drinkname', component: searchByName },
  { path: '/favorites', component: favorites },
  { path: '/randomdrink', component: randomDrink },
  { path: '/drink/:id', component: drink }
]
