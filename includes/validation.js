const {Joi, celebrate, Segments, } = require('celebrate')

module.exports = {
  validator(){
    celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required('Nome obrigatorio'),
      email: Joi.string().email().required('E-mail obrigatorio'),
      people: Joi.string().required('campo pessoa e obrigatorio'),
      date: Joi.string().required('Data obrigatoria'),
      time: Joi.string().required('Horario obrigatorio'),
    }),
  }, {
   abortEarly: true,
   
  })
  return celebrate;
  }
}