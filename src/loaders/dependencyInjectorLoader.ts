import {Container} from "typedi";
import {modelType} from "index";

export default ({ models }: any) => {
  try {
    models.forEach((m: modelType): void => {
      Container.set(m.name, m.model);
    });
  } catch (e) {
    console.log(e)
    throw e;
  }
};
