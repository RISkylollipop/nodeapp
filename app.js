const express = require(`express`);
const db = require(`./database`)
const cookieParser = require(`cookie-parser`);
const { isAuthenticated } = require(`./middlewares/auth`);
const { isAuthenticateddoctororadmin } = require(`./middlewares/authdoctor`)
const router = require(`./routes/pages`)
const path = require(`path`)

const app = express();
const port = process.env.PORT || 3500

app.get(``, (req, res)=>{
    res.render(`index`)
})

app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(`/`, require(`./routes/pages`))
app.use(`/auth`, require(`./routes/auth`))


app.use(express.static(`./public`))
app.use(express.static(`./public/images`))

app.set(`view engine`, `hbs`)



router.get(`/bookappointment`, isAuthenticated, (req, res)=>{
    db.query(`select * from doctors`, (err, rows)=>{
        if(err){
            
            
            console.log(err);
            
        }else{
        // console.log(rows);
        
            res.render(`bookappointment`,{ rows})
        }
    })
})


router.get(`/dashboard`, isAuthenticated, (req, res)=>{
    // console.log(req.patients);
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('expires', '0')
    res.render(`dashboard`,{ patient: req.patients })
})


router.get(`/dashboard/edit-profile`, (req, res)=>{
    console.log(req.url);
    
    res.render(`viewprofile`)
})
app.listen(port,()=>{
    console.log(`listening on ${port}`);
    
})