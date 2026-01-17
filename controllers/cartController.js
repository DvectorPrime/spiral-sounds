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

export async function getCartCount(req, res) {
    const db = await getDBConnection()

    const userId = req.session.userId

     if (!userId) return res.status(400).json({error : "User is not logged"})

    const {username} = await db.get('SELECT username FROM users WHERE id = ?', [userId])
    
    if (!username) return res.status(500).json({ error : "User is not logged in. User is not in the database"})

    const {itemCount} = await db.get('SELECT SUM(quantity) AS itemCount FROM cart_items WHERE user_id = ?', [userId])

    const totalItems = itemCount || 0

    return res.json({totalItems : totalItems})
}   

export async function getAll(req, res) {

    const db = await getDBConnection()

    const items = await db.all("SELECT cart_items.id AS cartItemId, cart_items.quantity, products.title, products.artist, products.price FROM cart_items JOIN products ON cart_items.product_id = products.id WHERE cart_items.user_id = ?", [req.session.userId])

    res.json({items : items})
}

export async function deleteItem(req, res) {
    const db = await getDBConnection()

    const userId = req.session.userId

     if (!userId) return res.status(400).json({error : "User is not logged"})

    const {username} = await db.get('SELECT username FROM users WHERE id = ?', [userId])
    
    if (!username) return res.status(500).json({ error : "User is not logged in. User is not in the database"})

    const {itemId} = req.params

    if (!itemId){
        return res.status(400).json({err : "Item Id not sent"})
    }

    const id = await db.get('SELECT id FROM cart_items WHERE id = ? AND user_id = ?', [itemId, userId])

    if(!id){
        return res.status(400).json({err : "Item not found"})
    }

    await db.run('DELETE FROM cart_items WHERE id = ? AND user_id=?', [itemId, userId])

    res.status(204).send()
}

export async function deleteAll(req, res) {
    const db = await getDBConnection()

    const userId = req.session.userId

     if (!userId) return res.status(400).json({error : "User is not logged"})

    const {username} = await db.get('SELECT username FROM users WHERE id = ?', [userId])
    
    if (!username) return res.status(500).json({ error : "User is not logged in. User is not in the database"})

    await db.run('DELETE FROM cart_items WHERE user_id = ?', [userId])

    return res.status(204).send()
}