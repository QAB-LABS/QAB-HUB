const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere',
        default: [25.766111, -80.196183],
        required: true
    }
});

module.exports = pointSchema