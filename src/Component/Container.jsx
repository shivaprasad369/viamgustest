import { lazy } from "react";

export const Heros=lazy(()=>import('./Hero'))
export const Logos=lazy(()=>import('./Login'))
export const Posts=lazy(()=>import('./Post'))
export const PostDetails =lazy(()=>import('./PostDetal'))
 export const Add=lazy(()=>import('./AddPost'))
