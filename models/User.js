const mongoose = require('mongoose');
 const Schema   = mongoose.Schema;
 var passportLocalMongoose = require('passport-local-mongoose')

 const UserSchema = Schema(
  {
    username: String,
    email: String,
    password: String,
    photoURL: String,
    phone: String,
    formacion: String,
    sobremi: String,
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: [Number]
    },
    direccion: String,
    citas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cita"
      }
    ],
    role: {
      type: String,
      enum: ["Paciente", "Profesional"],
      default: "Paciente"
    },
    cedula: String,
    especialidad: {
      type: String,
      enum: ["Acupuntura", "Alergología", "Anestesiología", "Cardiología", "CirugíaEstéticayCosmética", "Cirugía General", "Dermatología", "Endocrinología", "Fisioterapia"]
    },
    titulo: {
      type: String,
      enum: ["Doctor", "Enfermera"]
    },
    comentarios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comentario"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

UserSchema.plugin(passportLocalMongoose)

 module.exports = mongoose.model('User', UserSchema);