import EventEmitter from 'events';

export default () => {
    let events = new EventEmitter();
    let state = {}

    events.on('action', action => {
        if(!action) {
            return;
        }
        let {type, server, props} = action;


    });

    return {events, state};
}