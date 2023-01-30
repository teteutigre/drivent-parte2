import joi from "joi";

const paymentSchema = joi.object({
  ticketId: joi.number().integer().required(),
  cardData: {
    issuer: joi.string().required(),
    number: joi
      .string()
      .pattern(/[0-9]{13,16}/)
      .required(),
    name: joi.string().required(),
    expirationDate: joi.string().required(),
    cvv: joi
      .string()
      .pattern(/[0-9]{3}/)
      .required(),
  },
});

export default paymentSchema;
