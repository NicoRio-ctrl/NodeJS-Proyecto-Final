import { mongoose } from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, 
                required: true, 
                trim: true, 
              
    },
    email: { type: String, 
             required: true, 
             unique: true, 
             trim: true, 
             unique: true,
    },
    password: { type: String, 
                required: true, 
                trim: true, 
    },
    admin: {type: Boolean, default: false}
  },
  
  { timestamps: true } 
);

userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
  },
});

export const User = mongoose.model("User", userSchema);