const Router=require('@koa/router')
const commentHandlers=require('./handlers/commentsHandlers')

const router=new Router()
router.prefix('/comments')
router.get('/', commentHandlers.getComments)

router.get('/:id', commentHandlers.getComment);

router.post('/', commentHandlers.createComment);

router.put('/:id', commentHandlers.updateComment);

router.delete('/:id', commentHandlers.deleteComment);

module.exports=router