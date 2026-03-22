const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const trainerSchema = new mongoose.Schema({
  firstName:  { type: String, required: true, trim: true },
  lastName:   { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  country:    { type: String, required: true },
  whatsapp:   { type: String, required: true },
  courseType: { type: String, required: true, enum: ['Abacus_Trainer', 'Vedic_Maths_Trainer'] },
  password:   { type: String, required: true },
  isActive:   { type: Boolean, default: true },
}, { timestamps: true })

trainerSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

trainerSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password)
}

module.exports = mongoose.model('Trainer', trainerSchema)