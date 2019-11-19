const Pug = require('koa-pug')
const path = require('path')
const BaseModel = require('./baseModel');

class RenderHTMLService {
    constructor() {
        this.pug = new Pug({
            viewPath: path.resolve(__dirname, '../views')
        })
    }

    async render(name, params) {
        return this.pug.render(name, params)
    }
}

module.exports = RenderHTMLService;