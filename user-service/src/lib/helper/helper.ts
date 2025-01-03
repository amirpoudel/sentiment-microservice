
export function getRandomOtp():number{
    return Math.floor(100000 + Math.random() * 900000);
}

// Limit and Offset
export function getLimitAndOffset(query: any): { limit: number, offset: number } {
    const limit = query.limit ? parseInt(query.limit) : 20;
    let page = query.page ? parseInt(query.page) : 1;
    if(page < 1){
        page = 1;
    }
    const offset = (page-1) * limit;
    delete query.limit;
    delete query.page;
   
    return { limit, offset };
}

// Sort Key and Order
export function getSortKeyWithOrder(query: any): { field: string, order: 'asc' | 'desc' } {
    const sort = query.sort ? query.sort : "createdAt";
    const order: 'asc' | 'desc' = query.order === 'asc' ? 'asc' : 'desc';
    delete query.sort;
    delete query.order;
    return {
        field: sort,
        order: order
    };
}
// Function to construct the request query
export  function getRequestQuery(query:any) {
    const { limit, offset } = getLimitAndOffset(query)
    const sort = getSortKeyWithOrder(query);
    let search = query.search;
    delete query.search;

    return {
        limit,
        offset,
        search: search, // Capture search if provided
        sort: {
            field: sort.field, // Sort field
            order: sort.order, // Sort order
        },
        filter: {
            ...query, // Capture other filters
        },
        }
    };




export function getDateRangeFromTimePeriod(timePeriod: string): { startDate: Date, endDate: Date } | undefined {
    let date = new Date();
    let startDate;
    let endDate;
    
    if (timePeriod === "today") {
        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    }
    
    if (timePeriod === "week") {
        const weekStart = date.getDate() - date.getDay();
        startDate = new Date(date.getFullYear(), date.getMonth(), weekStart);
        endDate = new Date(date.getFullYear(), date.getMonth(), weekStart + 6, 23, 59, 59, 999);
    }
    
    if (timePeriod === "month") {
        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        endDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
    
    if (timePeriod === "year") {
        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        endDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
    }
    
    if (startDate && endDate) {
        return { startDate, endDate };
    }
    
    return undefined;
}


export function stringToBoolean(value:string|boolean):boolean {
    if (value === 'true' || value === true) {
        return true;
    } else if (value === 'false' || value === false) {
        return false;
    } else {
        // Optionally handle other cases or return a default value
        return Boolean(value);
    }
}
