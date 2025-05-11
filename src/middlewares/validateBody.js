import createHttpError from "http-errors";

export const validateBody = (schema) => {
  return async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });

      next();
    } catch (error) {
      const errors = error.details.map((detail) => detail.message);

      next(new createHttpError.BadRequest(errors));
    }
  };
};
// import createHttpError from "http-errors";

// export const validateBody = (schema) => {
//   return async (req, _res, next) => {
//     try {
//       await schema.validateAsync(req.body, { abortEarly: false });
//       next();
//     } catch (error) {
//       const errors = error?.details?.map((detail) => detail.message) || [
//         error.message,
//       ];
//       next(new createHttpError.BadRequest(errors.join(", ")));
//     }
//   };
// };
