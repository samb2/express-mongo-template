import autoBind from 'auto-bind';

export default class Service {
    constructor() {
        autoBind(this);
    }
}
