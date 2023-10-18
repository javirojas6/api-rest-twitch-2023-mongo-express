import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requiretoken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
// const router = Router();
const router = Router()


// GET      /api/v1/links       all links
// GET      /api/v1/links/:id   single link
// POST     /api/v1/links       create Link
//PATH/PUT  /api/v1/Links/:id   update Link
//DELETE    /api/v1/Links/:id   remove link

// router.get('/',getLinks);
router.get('/',requiretoken,getLinks);
router.get("/:nanoLink", getLink);
// router.get("/:id",requiretoken,getLink);
router.post('/',requiretoken,bodyLinkValidator,createLink);
router.patch("/:id", requiretoken, paramLinkValidator,bodyLinkValidator, updateLink)
router.delete("/:id",requiretoken, paramLinkValidator,removeLink);
export default router;