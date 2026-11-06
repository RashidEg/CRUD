const db = require('../db');
let orderSchema = new db.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

orderSchema.set('toJSON', {
  transform: (doc, ret) => ({
    id: ret._id.toString(),
    name: ret.name,
    date: ret.date instanceof Date ? ret.date.toISOString() : ret.date
  })
});

exports.Order = db.model('Order', orderSchema);