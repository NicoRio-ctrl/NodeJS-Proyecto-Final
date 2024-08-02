import { mongoose } from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, 
                required: true, 
                trim: true, 
                validate: {
                    validator: function(v) {
                      return /^[a-zA-Z\s]+$/.test(v);
                    },
                    message: props => `${props.value} no es un nombre válido. Solo se permiten letras y espacios.`
                  }
    },
    email: { type: String, 
             required: true, 
             unique: true, 
             trim: true, 
             unique: true,
             /*validate: {
                validator: function(v) {
                    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} no es un correo electrónico válido.`*/
    },
    password: { type: String, 
                required: true, 
                trim: true, 
                /*validate:{
                    validator: function(v) {
                        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/.test(v);
                      },
                      message: props => `${props.value} no es una contraseña válida. Debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.`
                }*/},
    admin: {type: Boolean, required: true}
  },
  
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
  },
});

export const User = mongoose.model("User", userSchema);