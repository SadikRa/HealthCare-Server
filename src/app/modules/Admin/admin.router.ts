import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";

const router = express.Router();

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    profilePhoto: z.string().optional(),
  }),
});

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body });
      return next();
    } catch (err) {
      next(err);
    }
  };

router.get("/", adminController.getAllFromDB);

router.get("/:id", adminController.getByIdFromDB);

router.patch("/:id", validateRequest(update), adminController.updateIntoDB);

router.delete("/:id", adminController.deleteFromDB);

router.delete("/soft/:id", adminController.softDeleteFromDB);

export const adminRoutes = router;
