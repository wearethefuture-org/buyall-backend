const CategoryService = new (require('../../../services/category'))();

// get all categories with sub categories
const getCategories = async ctx => {
    ctx.response.body = await CategoryService.getCategories();
};

// delete category by id
const deleteCategory = async ctx => {
    // category id
    const {id} = ctx.params;

    await CategoryService.deleteCategory(id)
    .then(data => {
        if (!data) {
            ctx.status = 409;
            // error info
            ctx.response.body = {'Error': 'There are no categories with such id'};
        } else {
            ctx.status = 200;
            // success info
            ctx.response.body = {'Success': true};
        } 
    })
    .catch(err => {
        // status code 409
        ctx.status = 409;
        // error info 
        ctx.response.body = {'Error': 'Before deleting a category, delete all subcategories.'};
    })
};

module.exports = {
    getCategories,
    deleteCategory 
}