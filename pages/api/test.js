import dbConnect from "../../config/dbConnect";

dbConnect();

export default function handler(req, res) {
    console.log('hello');
    res.status(200).json({ name: 'John Doe' })
}