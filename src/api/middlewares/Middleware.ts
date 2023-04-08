import autoBind from 'auto-bind';

export default class Middleware {
    constructor() {
        autoBind(this);
    }
}
