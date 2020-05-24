import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string(),
      description: Yup.string(),
      tags: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err.inner });
  }
};
