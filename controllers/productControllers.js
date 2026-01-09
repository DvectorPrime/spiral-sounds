import { getDBConnection } from "../db/db.js"

export async function getGenres(req, res){

  try{
      const db = await getDBConnection()
      const genreObject = await db.all(`SELECT DISTINCT genre from products`)
      const genreArray = genreObject.map(({genre}) => genre)
    
      res.json(genreArray)
    
  } catch (e){
    res.status(500).json({message: "Cannot Get Genres", details : e.message })
  }

}

export async function getProducts(req, res){

  try{
      const db = await getDBConnection()

      let products

      if (Object.keys(req.query).includes("genre")) {
        const query = 'SELECT * from products WHERE genre = ?'
        const params = [req.query.genre]
        products = await db.all(query, params)
      } else if (Object.keys(req.query).includes("search")){
        const query = 'SELECT * FROM products WHERE title LIKE ? OR genre LIKE ? OR artist LIKE ?'
        const params = [`%${req.query.search}%`, `%${req.query.search}%`, `%${req.query.search}%`]
        products = await db.all(query, params)
      } else{
        const query = 'SELECT * from products'
        products = await db.all(query)
      }
      
      res.json(products)
  } catch (e){
    res.status(500).json({message: "Cannot Get Genres", details : e.message })
  }
}