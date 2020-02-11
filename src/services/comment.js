const baseModel=require('./baseModel')

class CommentService extends baseModel {
    async getComments(){
        return this.model.comments.findAll({
            include: [
                {
                    model: this.model.users,
                    as: this.aliases.comments.user
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
                }
            ]
        });
      }
    
      async createComment(comment) {
        const createComment = await this.model.comments.create(comment);
        return this.getComment(createComment.id);
      }
    
      async updateComment(id, comment) {
        return await this.model.comments.update(comment, {
            where: {
              id
            }
        });
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