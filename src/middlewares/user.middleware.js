const validateId = (req, res, next) => {
  const id = req.params.id;
  if (id <= 0) {
    return res
      .status(400)
      .json({ message: "Bad Request: El id no puede ser negativo" });
  }
  next();
};

const existsModelById = (modelo) => {
  return async (req, res, next) => {
    const id = req.params.id;
    const data = await modelo.findByPk(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: `El id ${id} no se encuentra registrado` });
    }
    next();
  };
};

const schemaValidator = (schema) => {
  return (req, res, next) => {
    const { error, _ } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errores = error.details.map((e) => {
        return { atribulo: e.path[0], mensaje: e.message, tipoError: e.type };
      });
      return res.status(400).json({ errores });
    }
    next();
  };
};

module.exports = { existsModelById, validateId, schemaValidator };
