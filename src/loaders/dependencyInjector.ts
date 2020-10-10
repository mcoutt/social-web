import {Container} from "typedi";
// import {modelType} from "index";


export default ({ models }: { models: {name: string, model: any}[] }) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
    } catch (e) {
        console.log(e)
        throw e;
    }

    console.log('Dependency Injector loaded');
};
