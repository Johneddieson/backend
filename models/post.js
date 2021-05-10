const db = require('../util/database')



module.exports = class Post {
    constructor(title, body, user, id) {
        
    this.title = title
    this.body = body
    this.user = user   
    this.id = id
    }

    static get(id) {
        return db.execute('SELECT * FROM posts where id = ?', [id])
    }

    static fetchAll() {
        return db.execute('SELECT * FROM posts ORDER BY CREATED DESC');
    }


    static save(post) { 
        return db.execute(
              'INSERT INTO posts (title, body, user) VALUES (?, ?, ?)', 
              [post.title, post.body, post.user]  
        )
    }

    static delete(id) {
        
        return db.execute('DELETE FROM posts WHERE id = ?', [id])
    }

 
     
};

