// bcrypt => generate salt => ramdom hash
const bcrypt = require('bcrypt');

bcrypt.genSalt(10,(err,salt)=>{
	/*console.log(salt)*/
    if(err) return false;
    bcrypt.hash('password123',salt,(err,hash)=>{
        if(err) return false;
        console.log(hash)
    })
})





