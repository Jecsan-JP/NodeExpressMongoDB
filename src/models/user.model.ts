import { Schema } from "mongoose";

// Interface para el tipo de documento
interface IUser {
  name: string;
  email: string;
  age?: number;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingresa un email válido",
      ],
    },
    age: {
      type: Number,
      min: [0, "La edad no puede ser negativa"],
      max: [120, "La edad no puede ser mayor a 120"],
      validate: {
        validator: Number.isInteger,
        message: "La edad debe ser un número entero",
      },
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "pending"],
        message: "{VALUE} no es un estado válido",
      },
      default: "active",
    },
  },
  {
    timestamps: true, //Mongose automaticamente agrega los campos createdAt:fecha de creación del documento y updatedAt: fecha de última actualización
  }
);
