const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	ingredients: {
		type: Array,
		required: [true, 'Ingredient field is required.']
    },
    steps: {
        type: Array,
        required: [true, 'Steps field is required.']
    }
})

// Creating a table within database with the defined schema
const RecipeDB = mongoose.model('recipe', RecipeSchema)

// Exporting table for querying and mutating
module.exports = RecipeDB