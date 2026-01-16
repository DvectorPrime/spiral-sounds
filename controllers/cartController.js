import { getDBConnection } from "../db/db.js";

export async function addToCart(req, res){
    const db = await getDBConnection()

    const {productId} = req.body

    const userId = req.session.userId

    
    if (!userId) return res.status(400).json({error : "User is not logged"})

    const {username} = await db.get('SELECT username FROM users WHERE id = ?', [userId])
    
    if (!username) return res.status(500).json({ error : "User is not logged in. User is not in the database"})

    const productName = await db.get('SELECT title from products WHERE id = ?', [productId])
    

    if (!productName) return res.status(500).json({error : "Product is not found in our database"})

    const db_cart_item = await db.get('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?', [userId, productId])

    
    if (db_cart_item){
        await db.run('UPDATE cart_items SET quantity = ? WHERE id = ?', [db_cart_item.quantity + 1, db_cart_item.id])
        return res.json({message : `${productName} successfully updated in to your cart`})
    }
    
    await db.run('INSERT INTO cart_items (user_id, product_id) VALUES (?, ?)', [userId, productId])
    return res.json({message : `${productName} successfully added to your cart`})
}