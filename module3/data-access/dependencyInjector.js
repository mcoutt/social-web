import { Container } from 'typedi';

export default ({ models }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });
  } catch (e) {
    console.log(e)
    throw e;
  }
};
