import { AddUserSchema } from "@/validations/add-user";
import { z } from "zod";

export type AddUserType = z.infer<typeof AddUserSchema>