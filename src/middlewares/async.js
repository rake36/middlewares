// middleware always has this function signature

export default function ({ dispatch }) {
    return next => action => {
        // console.log(action);
        if (!action.payload || !action.payload.then) {
            // not a promise... so send it on
            return next(action);
        }

        // console.log('We have a promise', action);

        // make sure promise resolves
        action.payload
            .then(function (response) {
                const newAction = { ...action, payload: response }
                dispatch(newAction); // start over as if this is a brand new action and send through all the middleware components
            });
    }
}