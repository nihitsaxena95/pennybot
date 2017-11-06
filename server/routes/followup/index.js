import express from 'express';
const router = express.Router();
import followup from './followup';
import nextfollowup from './nextfollowup';


router.post('/',followup);
router.put('/',nextfollowup);
export default router;
