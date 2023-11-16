    const router = require('express').Router();
    const tareaControlador = require( '../controllers/tareasController' );

    router.get( '/tareas', tareaControlador.getTareas );
    router.get( '/tareas/:id', tareaControlador.getTarea );
    router.post( '/tareas', tareaControlador.createTarea );
    router.put( '/tareas/:id', tareaControlador.updateTarea );
    router.delete( '/tareas/:id', tareaControlador.deleteTarea );

    module.exports = router
