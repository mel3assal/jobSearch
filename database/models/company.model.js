import { model, Schema, Types } from "mongoose";

const schema = new Schema({
    companyName: { type: String, unique: true },
    description: String,
    industry: String,
    address: String,
    numberOfEmployees: {
        type: String, validate: {
            validator: (value) => {
                const range = value.split('-');
                return range.length === 2 && // Check for valid range format
                    !isNaN(range[0]) && !isNaN(range[1]) && // Check for valid numbers
                    parseInt(range[0]) < parseInt(range[1]); // Ensure lower bound is less than upper bound
            },
            message: (props) => `${props.value} is not a valid employee range (e.g., 11-20).`,
        }
    },
    companyEmail: { type: String, unique: true },
    companyHR: {unique:true, type: Types.ObjectId, ref: 'User'},
}, { timestamps: true })
export const Company=model('Company',schema)