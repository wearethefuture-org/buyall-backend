const CommentService = require('../../../services/comment')

const getComments = async ctx =>{
    const commentService = new CommentService();

    ctx.response.body = await commentService.getComments();
}

const createComment = async ctx => {
    const commentService = new CommentService();
    const newComment = ctx.request.body;
    ctx.response.body = await commentService.createComment(newComment);
  };
  
const updateComment = async ctx => {
    const commentService = new CommentService();
    const { id } = ctx.params;
    const comment = ctx.request.body;
    ctx.response.body = await commentService.updateComment(id, comment);
  };
  
const deleteComment = async ctx => {
    const commentService = new CommentService();
    const { id } = ctx.params;
    ctx.response.body = await commentService.deleteComment(id);
  };
  
const getComment = async ctx => {
    const commentService = new CommentService();
    const { id } = ctx.params;
    ctx.response.body = await commentService.getComment(id);
  };

module.exports={
    getComments,
    createComment,
    deleteComment,
    getComment,
    updateComment
}