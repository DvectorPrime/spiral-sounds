import { getDBConnection } from "../db/db.js";

export async function getCurrentUser(req, res){
    const db = await getDBConnection()

    if (!req.session.userId) {
        return res.json({ isLoggedIn: false })
    }

    const userId = req.session.userId
    const user = await db.get('SELECT name FROM users WHERE id = ?', [userId])

    return res.json({ isLoggedIn: true, name: user.name })
}