
import  {serial,uuid , boolean , timestamp , integer , pgTable} from "drizzle-orm/pg-core"




export const processReviews = pgTable("process_reviews",{
    id : uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id"),
    isProcessFromFile: boolean("is_process_from_file"),
    isBulkProcess: boolean("is_bulk_process"),
    totalProcessCount: integer("total_process_count"),
    totalInputLength: integer("total_input_length"),
    
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

})

