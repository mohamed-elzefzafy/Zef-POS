import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified : {type:Boolean , require:true , default: false},
  profilePhoto: {type : Object,
    default : {
    url : "https://res.cloudinary.com/dw1bs1boz/image/upload/v1702487318/Zef-Blog/Default%20images/download_w26sr9.jpg",
    public_id : null}},
  role : {type: String, enum :["admin", "superAdmin"], default : "admin"},
}  ,{timestamps : true});


UserSchema.methods.matchPassword = async function(enterdPassword) {
  return await bcrypt.compare(enterdPassword , this.password);
};

UserSchema.pre("save" ,async function(next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password , salt);
})

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;