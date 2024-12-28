import { relations } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import  {serial , text , timestamp , integer , pgTable} from "drizzle-orm/pg-core"




export const reviews = pgTable("reviews",{
    id : serial("id").primaryKey(),
    bulkProcessId : uuid("bulk_process_id").notNull(),
    userId: uuid("user_id"), // User who submitted the review
    title: text("title").notNull(),
    sentiment: text("sentiment").notNull(),
    score: integer("score"),
    remarks: text("remarks"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

})

