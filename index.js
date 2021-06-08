const express=require('express')
const path=require('path')
const multer=require('multer')
const app=express();

const UPLOADS_FOLDER="./uploads/"

//define the storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,UPLOADS_FOLDER)
    },
    filename:(req,file,cb)=>{
        //
        const fileExt=path.extname(file.originalname)
        const fileName=file.originalname
                                .replace(fileExt,"")
                                .toLocaleLowerCase()
                                .split(" ")
                                .join("_")+"_"+Date.now();
        cb(null,fileName+fileExt)
                               
    }
})


const upload=multer({
    storage:storage,
    limits:{
        fileSize:1000000
    },
    fileFilter:(req,file,cb)=>{
        if(file.fieldname=="avatar"){
            if(
                file.mimetype==='image/jpeg' ||
                file.mimetype==='image/png' ||
                file.mimetype==='image/jpg' 
            ){
                cb(null,true)
            }else{

                //silently stop file uploading
                //cb(null,false)
                cb(new Error("Only .jpg .jpeg .png are allow"))
            }
        }
        else if(file.fieldname=="doc"){
            if(
                file.mimetype==='application/pdf'
            ){
                cb(null,true)
            }else{

                //silently stop file uploading
                //cb(null,false)
                cb(new Error("Only .pdf are allow"))
            }
        }
    }
});



/*
//for single field single file upload
upload.single("avatar")

//for single field multiple file upload
upload.array('avatar',3)


//for multiple fields and multiple file upload
upload.fields([
    {name:"avatar",maxCount:10},
    {name:"gallery",maxCount:5}
])



*/

app.post('/',upload.fields([
    {name:"avatar",maxCount:1},
    {name:"doc",maxCount:1}
]),(req,res)=>{
    console.log(req.files)
    res.send("<h1>Hello</h1>")
})
app.use((err,req,res,next)=>{
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send("There was an upload error"+err)
        }else{
            res.status(500).send(err.message) 
        }

    }else{
        res.send('success')
    }
})

    app.listen(4001,()=>{
        console.log('listening on port 4001')
    })
