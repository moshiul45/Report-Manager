const Joi = require("joi");

exports.schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  phone: Joi.number(),
  salary: Joi.number().min(4).max(6),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "tech", "edu.bd"] },
  }),
});

// schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }
