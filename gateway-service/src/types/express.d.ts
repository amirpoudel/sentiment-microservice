// src/types/express.d.ts

import express,{ Request } from "express";

interface UserPayload {
    id: string;
    name:string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}



declare module 'express-serve-static-core' {
    export interface Request {
      user: any
    }
  }

