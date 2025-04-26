import { Gender, UserStatus } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
  password: z.string({
    required_error: "password is required",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    contactNumber: z.string({
      required_error: "contactNumber is required",
    }),
  }),
});

const createDoctor = z.object({
  password: z.string({
    required_error: "password is required",
  }),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  profilePhoto: z.string().url("Invalid URL").optional().nullable(),
  contactNumber: z.string().min(10, "Contact number is required"),
  address: z.string().min(1, "Address is required").optional(),
  registrationNumber: z.string().min(1, "Registration number is required"),
  experience: z.number().optional(),
  gender: z.enum([Gender.MALE, Gender.FEMALE]),
  appointmentFee: z.number({
    required_error: "appointmentFee",
  }),
  qualification: z.string().min(1, "Qualification is required"),
  currentWorkingPlace: z.string().min(1, "Working place is required"),
  designation: z.string().min(1, "Designation is required"),
});

export const userValidation = {
  createAdmin,
  createDoctor,
};
