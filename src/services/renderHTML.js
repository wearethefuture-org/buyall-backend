const BaseModel = require('./baseModel');
const Pug = require('koa-pug')
const path = require('path')

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