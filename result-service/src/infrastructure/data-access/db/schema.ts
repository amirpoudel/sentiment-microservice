import { relations } from "drizzle-orm";
import { real } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { decimal } from "drizzle-orm/pg-core";

import { uuid } from "drizzle-orm/pg-core";
import  {serial , text , timestamp , integer , pgTable} from "drizzle-orm/pg-core"




export const analysisReviews = pgTable("analysis_reviews",{
    id : serial("id").primaryKey(),
    userId: varchar("user_id"),
    processId : uuid("process_id"),
    reviewId: text("review_id"), // User who submitted the review
    review: text("review"),
    sentiment: text("sentiment"),
    score: real("score"),
    remarks: text("remarks"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

})

