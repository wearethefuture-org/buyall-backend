const Pug = require('koa-pug')
const path = require('path')
const BaseModel = require('./baseModel');

class RenderHTMLService extends BaseModel {
    constructor() {
        super();

        this.pug = new Pug({
            viewPath: path.resolve(__dirname, '../views')
        })
    }

    async render(name, params) {
        return this.pug.render(name, params)
    }
}

module.exports = RenderHTMLService;