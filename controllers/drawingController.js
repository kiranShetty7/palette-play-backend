const asyncHandler = require("express-async-handler");
const { Types: { ObjectId } } = require('mongoose');
const Drawing = require('../models/drawingModel')

const createDrawing = asyncHandler(async (req, res) => {
    const { name, userId } = req.body
    if (!name) {
        res.status(400);
        throw new Error("Drawing name is required")
    }
    let newDrawing = new Drawing()
    newDrawing = {
        name,
        user: userId
    }
    const drawingCreated = await Drawing.create(newDrawing)
    if (drawingCreated)
        res.status(201).json({
            success: true,
            message: "success",
            drawingId: drawingCreated._id
        })
    else {
        res.status(500)
        throw new Error('Internal Server Error')
    }

})

const getIndividualDrawing = asyncHandler(async (req, res) => {
    const userId = req.params.id
    if (!userId) {
        res.status(400)
        throw new Error("Invalid userId")
    }
    else {
        const drawingRetrieved = await Drawing.find({ user: userId })
            .sort({ timeStamp: 1 })



        if (drawingRetrieved) {
            res.status(200).json({
                success: true,
                message: "Drawings retrieved succesfully",
                data: drawingRetrieved
            })
        }
    }

})

const saveDrawing = asyncHandler(async (req, res) => {

    const { url, drawingId } = req.body

    if (!drawingId) {
        res.status(400)
        throw new Error("Invalid Drawing ID")
    }
    else if (!url) {
        res.status(400)
        throw new Error("Url required")
    }
    else {
        const update = {
            $set: {
                url: url
            }
        };
        const condition = { _id: drawingId };
        const saveDrawing = await Drawing.updateOne(condition, update)
            .sort({ timeStamp: 1 })
            .select('-drawingId')


        if (saveDrawing) {
            res.status(200).json({
                success: true,
                message: "Drawings saved succesfully",
                data: saveDrawing
            })
        }
    }

})

const getDrawings = asyncHandler(async (req, res) => {
    const { userid } = req.headers;
    if (!userid) {
        res.status(400);
        throw new Error("Please send userId");
    } else {
        try {
            const allDrawingsRetrieved = await Drawing.find({ user: new ObjectId(userid) })
                .populate("user", "-password -createdAt -updatedAt -__v")
                .sort({ createdAt: -1 });

            if (allDrawingsRetrieved) {
                res.status(200).json({
                    success: true,
                    message: 'Drawing list retrieved',
                    data: allDrawingsRetrieved
                });
            } else {
                res.status(500);
                throw new Error("Internal server error");
            }
        } catch (error) {
            res.status(500);
            throw new Error("Internal server error");
        }
    }
});

module.exports = { createDrawing, getDrawings, getIndividualDrawing, saveDrawing }