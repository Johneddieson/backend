const db = require('../util/database')
exports.getGames = async (req, res , next) => {
   const games = await db.query('SELECT * FROM games ORDER BY  CREATED_AT DESC')
    
    await res.json(games[0])
    

}

exports.getOne = async (req, res, next) => {
    const {id} = req.params

  const games =  await db.query('SELECT * FROM games WHERE id = ?', [id]);

  if (games.length > 0) {
      return res.json(games[0])
  }

  res.status(404).json({text: 'Game Not found'})

}


exports.createGames = async (req, res, next) => {
        await db.query('INSERT INTO games set ?', [req.body])
    

     await res.json({message: 'Game Saved'})


}


exports.updateGames = async (req, res, next) => {
            const {id} = req.params

            await db.query('UPDATE games set ? WHERE id = ?', [req.body, id])

            
    
    
    await res.json({message: `The game was updated`})
}



exports.deleteGames = async (req, res, next) => {
    const {id} = req.params


    await db.query('DELETE FROM games WHERE id = ?', [id])

            await res.json({message: `The game was deleted`})
}


