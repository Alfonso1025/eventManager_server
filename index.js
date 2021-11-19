const express=require('express')
const app= express()
const pool= require('./db')
const cors= require('cors')

//middleware
app.use(express.json())
app.use(cors())
app.listen(5000, ()=>{
    console.log('server running on port 5000')
});

//routes
app.post('/createguest',async(req, res)=>{
    try{
    const {guestName, guestLastname, guestEmail, code, isAttending}=req.body
       
    
    const newGuesst= await pool.query("INSERT INTO guest(guestname, guestlastname, guestemail,code, isAttending) VALUES($1,$2,$3,$4,$5) RETURNING *"
        ,[guestName, guestLastname, guestEmail, code, isAttending])
        res.json(newGuesst.rows)
    }catch(e){
        console.log(e)
    }
})
//get all guests
app.get('/guests',async(req, res)=>{
    try{
        
        const guesList= await pool.query("SELECT * FROM guest")
        res.json(guesList.rows)

    }catch(e){
        console.log(e)
    }
})

//get specific guest
app.get('/guests/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const guest= await pool.query('SELECT * FROM guest WHERE todo_id=$1',[id])
        res.json(guest.rows)
    }catch(e){
        console.log(e)
    }
})

//delete guest
app.get('/delete/:id', async(req, res)=>{
    const {id}=req.params
    const {isAttending}=req.body
   
    try{
        const guestDeleted= await pool.query('DELETE FROM guest WHERE todo_id =$1',[id])
        res.json('guest was deleted succesfully')
        console.log(id);
    }
    catch(err){
        console.log(err)
    }
})

//update isAttending
app.put('/update/:id', async(req, res)=>{
    const {id}=req.params
    const {isAttending}=req.body
   try {
       const updateIsAttending= pool.query('UPDATE guest SET isAttending= $1 WHERE todo_id=$2', [isAttending, id])
       res.json("isattending updated succesfuly")
   } catch (error) {
       console.log(error)
   }
})
