function validate(schema, target = 'body') {
    return (req, res, next) => {
        const data = req[target];

        //paso 1: verificar que haya datos
        if (!data ||  Object.keys(data).length === 0) {
            return res.status(400).json ({ messsage: 'No data found'});
        }

        //pas2: validar contra el schema con opciones
        const { error, value } = schema.validate(data, {
            abortEarly: false, // no dtenerme en el primer error
            stripUnknow: true, // eliminar campos no definidos(username, password)
        });

        //pas3: hay error en la validacion devolver 400 con mensaje de rror
        if(error) {
            return res.status(400).json({
                message: 'Error en la validacion en ' + target,
                errores: error.details.map((err) => err.message)
            });
        }

        //paso4 remplzar el objeto original con datos limpios
        req[target] = value

        // continuamos
        next();

    }
}

export default validate;