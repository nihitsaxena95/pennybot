import express from 'express';
import unans from './unanswerques';
import adminques from './adminques'
let router = express.Router();

router.get('/',unans)
router.post('/',adminques)
export default router;