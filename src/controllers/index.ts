import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import question from '../models/question';

/**
* @desc Get all question data from database
* @route GET /api/data
* @access PUBLIC
*/
export const getSheetData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const data = await question.find();

    console.log(data.length);

    res.status(200).json({
        success: true,
        data: data,
        message: 'Data fetched successfully'
    })
})

/**
* @desc Get data that is relevent to filter query
* @route POST /api/revise
* @access PUBLIC
*/
export const getFilteredData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { topics, levels } = req.body;
    const allTopics = topics.includes('all');
    const alllLevels = levels.includes('all');

    let query: any = {};
    let levelOrder = ['easy', 'med', 'hard'];

    if (!allTopics) {
        query.topic = { $in: topics };
    }
    if (!alllLevels) {
        query.level = { $in: levels };
    }

    const filteredData = await question.aggregate([
        { $match: query },
        { $addFields: { levelOrder: { $indexOfArray: [levelOrder, "$level"] } } },
        { $sort: { topics: 1, levelOrder: 1 } }
    ]);

    console.log(filteredData.length);

    if (filteredData.length === 0) {
        res.status(404);
        throw new Error('No data found');
    } else {
        res.status(200).json({
            success: true,
            data: filteredData,
            message: 'Data fetched successfully'
        })
    }
});



