// import { Prisma } from "@prisma/client";

// // Query options interface to be used across multiple repositories
// export interface GeneralGetQueryOptions {
//   limit?: number;
//   offset?: number;
//   search?: string;
//   sort?: {
//     field?: string;
//     order?: "asc" | "desc";
//   };
//   filter?: { [key: string]: any }; // Generalized filter for any entity
// }

// // Class to encapsulate the query builder logic
// export class PrismaQueryBuilder {

//   getsQuery(query: GeneralGetQueryOptions) {
//     const where: any= {};
    
//     // Handle dynamic filters
//     if (query?.filter) {
//       Object.entries(query.filter).forEach(([key, value]) => {
//         if (value !== undefined) {
//           where[key] = { equals: value , mode: "insensitive" };
//         }
//       });
//     }

//     // Handle search (Optional)
//     if (query.search) {
//       where.OR = [
//         { name: { contains: query.search, mode: "insensitive" } },
//         { phoneNumber: { contains: query.search, mode: "insensitive" } },
//         { documentNumber: { contains: query.search, mode: "insensitive" } }
//       ];
//     }

//     // Sorting and Pagination
//     const orderBy = query.sort?.field
//       ? { [query.sort.field]: query.sort.order || "asc" }
//       : undefined;

//     const skip = query.offset;
//     const take = query.limit;

//     return { where, orderBy, skip, take };
//   }


// }
