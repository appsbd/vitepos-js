import * as shvl from "shvl";

const plugin = store => {

    store.state.str_test="This is test only";
    store.subscribe( ( mutation, state ) => {


    });
}

//export default plugin;
export default function(options, storage, key) {
    return plugin;
}