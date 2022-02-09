var express = require('express');
var router = express.Router();
const fetch = (...args) => import('node-fetch')
.then(({default: fetch}) => fetch(...args));


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/todos', async(req,res)=>{
  const url = `https://jsonplaceholder.typicode.com/todos`
  const options ={
    'method':'GET', 
  }

  const response = await fetch(url,options)
  .then(res => res.json())
  .catch(e=>{ console.error(e);})
   const arr = response.map(({userId,...rest}) =>{
    return rest
  })
  res.send(arr)
})


router.get('/users/:id',async(req,res)=>{
 const response = await fetch(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
  .then(response => response.json())
  .catch(e=>{ console.error(e);}) 


 const url = await fetch('https://jsonplaceholder.typicode.com/todos')
 .then(res => res.json())
 .catch(e=>{ console.error(e);}) 

 const newarray = url.filter(e=>{
   return e.userId === Number(req.params.id)
 })

 response["todos"] = newarray
 res.send(response)
 
})

module.exports = router;
