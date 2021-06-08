const router=require("express").Router({
    caseSensitive:true
})

router.get('/',(req,res)=>{
    res.send("Hello world 2"+req.app.locals.title)
})
router.get('/:id',(req,res)=>{
    
    res.send("Hello world 2"+req.app.locals.title)
})

router.get('/login',(req,res)=>{
    res.send('Login Routes')

})
router.post('/',(req,res)=>{
    res.send('Post Routes')
})

module.exports=router;
