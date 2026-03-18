import { mangoose }from 'mangoose';

const userSchema = new mangoose.Schema({
    name:{
        type: String,
        required : [true,"Username is required"],
        trim : true,
        minLength : 2,
        maxLenght : 50
    },
        email:{
        type: String,
        required : [true,"User email is required"],
        trim : true,
        unique:true,
        minLength : 5,
        llowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'], // contact@domain.com
        maxLenght : 255,
    },    
    pasword:{
        type: String,
        required : [true,"User password is required"],
        trim : true,
        minLength : 6,
        maxLenght : 50
    },options : { timestamps : true}
});


const User = mongoose.model('User',useSchema);


export default User;


