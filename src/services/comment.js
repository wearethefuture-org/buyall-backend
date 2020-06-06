const baseModel=require('./baseModel')

class CommentService extends baseModel {
    async getComments(){
        return this.model.comments.findAll({
            include: [
                {
                    model: this.model.users,
                    as: this.aliases.comments.user
                },
                {
                    model: this.model.products,
                    as: this.aliases.comments.product
                }
            ]
        })
    }
    async getComment(id) {
        return this.model.comments.findOne({
          where: {
            id
          },
          include: [
                {
                    model: this.model.users,
                    as: this.aliases.comments.user
                },
                {
                    model: this.model.products,
                    as: this.aliases.comments.product
                }
            ]
        });
      }
    
      async createComment(comment) {
        const createComment = await this.model.comments.create(comment);
        return createComment;
      }
    
      async updateComment(id, comment) {
        await this.model.comments.update(comment, {
            where: {
              id
            }
        });
        
        return this.getComment(id);
      }
    
      async deleteComment(id) {
          return this.model.comments.destroy({
              where: {
                  id
              }
          });
      }
}

module.exports = CommentService