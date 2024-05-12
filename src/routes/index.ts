import express from 'express';
import { getFilteredData, getSheetData } from '../controllers';
const router = express.Router();

router.get('/data', getSheetData);
router.post('/revise', getFilteredData);

export default router;