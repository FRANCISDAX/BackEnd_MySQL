const { runQuery } = require( '../database/conexiondb' );

module.exports = {

    getTareas: async ( req, res ) => {
        try {
            const seleccionarQuery = 'SELECT * FROM tareas';
            const filas = await runQuery( seleccionarQuery );
            return res.status( 200 ).json( filas );                
        } catch ( error ) {
            return res.status( 500 ).json( { error: 'Error al obtener todas las tareas ...' } );            
        }
    },

    getTarea: async ( req, res ) => {
        try {
            const tareaId = req.params.id;
            const seleccionarQuery = `SELECT * FROM tareas WHERE id = ${ tareaId }`;
            const filas = await runQuery( seleccionarQuery );
            if( filas.length === 0 ){
                return res.status( 404 ).json( { message: 'Tarea no encontrada ...'} );
            }
            res.status( 200 ).json( filas );                
        } catch ( error ) {
            res.status( 500 ).json( { error: 'Error al obtener la tarea ...' } );
        }
    },

    createTarea: async ( req, res ) => {
        try {
            const { titulo, descripcion, realizado } = req.body;
            const insertarQuery = 'INSERT INTO tareas (titulo, descripcion, realizado) VALUES (?, ?, ?)';
            const insertarValues = [ titulo, descripcion, realizado ];
            const insertarResultado = await runQuery( insertarQuery, insertarValues );
            res.status( 200 ).json( insertarResultado );
        } catch ( error ) {
            res.status( 500 ).json( { error: 'Error al crear una tarea ...' } );
        }    
    },

    updateTarea: async ( req, res ) => {
        try {
            const { titulo, descripcion, realizado } = req.body;
            const modificaQuery = 'UPDATE tareas SET titulo=?, descripcion=?, realizado=? WHERE id=?';
            const modificaValues = [ titulo, descripcion, realizado, req.params.id ];
            const modificaResultado = await runQuery( modificaQuery, modificaValues );
            if(modificaResultado.affectedRows === 0){
                return res.status( 404 ).json( { message: 'Tarea no encontrada ...'} );
            }
            res.status( 200 ).json( modificaResultado );
        } catch (error) {
            res.status( 500 ).json( { error: 'Error al modificar una tarea ...' } );
        }
    },

    deleteTarea: async ( req, res ) => {
        try {
            const tareaId = req.params.id;
            const borrarQuery = 'DELETE FROM tareas WHERE id = ?';
            const borrarValues = [ tareaId ];
            const borrarResultado = await runQuery( borrarQuery, borrarValues );
            if( borrarResultado.affectedRows === 0){
                return res.status( 404 ).json( { message: 'Tarea no encontrada ...'} );
            }
            res.status( 200 ).json( borrarResultado );
        } catch ( error ) {
            res.status( 500 ).json( { error: 'Error al borrar una tarea ...' } );            
        }
    },
}