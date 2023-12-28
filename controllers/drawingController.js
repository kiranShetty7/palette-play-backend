const asyncHandler = require("express-async-handler");
const { Types: { ObjectId } } = require('mongoose');
const Drawing = require('../models/drawingModel')

const createDrawing = asyncHandler(async (req, res) => {
    const { name, userId } = req.body
    try {
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
            res.status(200).json({
                success: false,
                message: "Drawing could not be created",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
})

const getIndividualDrawing = asyncHandler(async (req, res) => {
    const drawingId = req.params.id
    const userId = req.headers?.userid

    try {
        if (!userId) {
            res.status(400)
            throw new Error("Please send userId")
        }
        else if (!drawingId) {
            res.status(400)
            throw new Error("Please send drawingId")
        }
        else {

            const drawingRetrieved = await Drawing.findOne({ user: userId, _id: drawingId })
                .sort({ timeStamp: 1 });

            if (drawingRetrieved) {
                res.status(200).json({
                    success: true,
                    message: "Drawing retrieved succesfully",
                    data: drawingRetrieved
                })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "Drawing not found",
                    data: drawingRetrieved
                })
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }

})

const saveDrawing = asyncHandler(async (req, res) => {

    const { url, userId, name } = req.body

    try {


        if (!userId) {
            res.status(400);
            throw new Error("userId is required")
        }
        if (!url) {
            res.status(400);
            throw new Error("url is required")
        }
        if (!name) {
            res.status(400);
            throw new Error("name is required")
        }

        let newDrawing = new Drawing()
        newDrawing = {
            name,
            user: userId,
            url
        }
        const drawingCreated = await Drawing.create(newDrawing)
        if (drawingCreated)
            res.status(201).json({
                success: true,
                message: "success",
                drawingId: drawingCreated._id
            })
        else {
            res.status(200).json({
                success: false,
                message: "Drawing could not be created",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }

    // try {
    //     if (!drawingId) {
    //         res.status(400)
    //         throw new Error("Invalid Drawing ID")
    //     }
    //     else if (!url) {
    //         res.status(400)
    //         throw new Error("Url required")
    //     }
    //     else {
    //         const update = {
    //             $set: {
    //                 url: url
    //             }
    //         };
    //         const condition = { _id: drawingId };
    //         const saveDrawing = await Drawing.updateOne(condition, update)
    //             .sort({ timeStamp: 1 })
    //             .select('-drawingId')


    //         if (saveDrawing) {
    //             res.status(200).json({
    //                 success: true,
    //                 message: "Drawing saved succesfully",
    //                 data: saveDrawing
    //             })
    //         }
    //         else {
    //             res.status(200).json({
    //                 success: false,
    //                 message: "Drawing could not besaved ",

    //             })
    //         }
    //     }
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal server error",
    //         error: error.message
    //     });
    // }
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
                res.status(200).json({
                    success: false,
                    message: 'Drawing list could not be retrieved',

                });
            }
        } catch (error) {
            res.status(500);
            throw new Error("Internal server error");
        }
    }
});

const editName = asyncHandler(async (req, res) => {
    const { name, drawingId } = req.body

    try {
        if (!drawingId) {
            res.status(400)
            throw new Error("Invalid Drawing ID")
        }
        else if (!name) {
            res.status(400)
            throw new Error("Draiwng name is required")
        }
        else {
            const update = {
                $set: {
                    name: name
                }
            };
            const condition = { _id: drawingId };
            const saveDrawing = await Drawing.updateOne(condition, update)
                .sort({ timeStamp: 1 })
                .select('-drawingId')


            if (saveDrawing) {
                res.status(200).json({
                    success: true,
                    message: "Drawing renamed succesfully",
                    data: saveDrawing
                })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "Drawing could not be renamed",
                    data: saveDrawing
                })
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
})

const deleteDrawing = asyncHandler(async (req, res) => {
    const drawingId = req.params.id;

    try {
        if (!drawingId) {
            res.status(400);
            throw new Error("Please send drawingId");
        } else {
            const deletedDrawing = await Drawing.findByIdAndDelete(drawingId);

            if (deletedDrawing) {
                res.status(200).json({
                    success: true,
                    message: "Drawing deleted successfully",
                    data: deletedDrawing
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: "Drawing could not be deleted",
                    data: deletedDrawing
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

module.exports = { createDrawing, getDrawings, getIndividualDrawing, editName, saveDrawing, deleteDrawing }