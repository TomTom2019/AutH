/*MD5 => encriptions  => secretHashed
const {MD5} = require("crypto-js");
const secret = 'superSecretPassword'
const secretHashed ='jdjdjdjdjdjdjhsh'


const user = {
	id:1,
	token:MD5('pass123').toString() + secretHashed

}

console.log(user)*/
const jwt = require("jsonwebtoken");

let id = '100'
const secret = 'supersecret'

// user login =>register 
const token = jwt.sign(id,secret)

// store token => cookie,


// USER => NEEDS VALIDATION
const decodeToken = jwt.verify('eyJhbGciOiJIUzI1NiJ9.MTAw._p4CTP9MejT8kntvqaJI0HR_jo2DLfuLaRqCIahBf50',secret)

console.log(decodeToken)