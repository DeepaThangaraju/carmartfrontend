export const vechicalReducers=(state={vechicals:[]},action)=>{
   switch(action.type)
   {
       case 'VECHICAL_LIST_REQUEST':
           return{
               loading:true,
               vechicals:[]
           }
        case 'VECHICAL_LIST_SUCCESS':
            return{
                loading:false,
                vechicals:action.payload.vechicals,
                pages:action.payload.pages,
                page:action.payload.page
            }
        case 'VECHICAL_LIST_FAIL':
            return{
               loading:false,
               error:action.payload
            }
            default: return state
   }
}

export const vechicalDetailsReducers=(state={vechical:{review:[]}},action)=>{
    switch(action.type)
    {
        case 'VECHICAL_DETAIL_REQUEST':
            return{
                loading:true,
               ...state
            }
         case 'VECHICAL_DETAIL_SUCCESS':
             return{
                 loading:false,
                 vechical:action.payload
             }
         case 'VECHICAL_DETAIL_FAIL':
             return{
                loading:false,
                error:action.payload
             }
             default: return state
    }
 }

 export const vechicalDeleteReducer=(state={},action)=>{
    switch(action.type)
    {
        case 'VECHICAL_DELETE_REQUEST':
            return{
                loading:true,
            }
         case 'VECHICAL_DELETE_SUCCESS':
             return{
                 loading:false,
                 success:true
             }
         case 'VECHICAL_DELETE_FAIL':
             return{
                loading:false,
                error:action.payload
             }
             default: return state
    }
 }

 export const vechicalCreateReducer=(state={},action)=>{
    switch(action.type)
    {
        case 'VECHICAL_CREATE_REQUEST':
            return{
                loading:true,
            }
         case 'VECHICAL_CREATE_SUCCESS':
             return{
                 loading:false,
                 success:true,
                 vechical:action.payload
             }
         case 'VECHICAL_CREATE_FAIL':
             return{
                loading:false,
                error:action.payload
             }
        case 'VECHICAL_CREATE_RESET':
            return {}
             default: return state
    }
 }


 export const vechicalUpdateReducer=(state={vechical:{}},action)=>{
    switch(action.type)
    {
        case 'VECHICAL_UPDATE_REQUEST':
            return{
                loading:true,
            }
         case 'VECHICAL_UPDATE_SUCCESS':
             return{
                 loading:false,
                 success:true,
                 vechical:action.payload
             }
         case 'VECHICAL_UPDATE_FAIL':
             return{
                loading:false,
                error:action.payload
             }
        case 'VECHICAL_UPDATE_RESET':
            return {
                vechical:{}
            }
             default: return state
    }
 }

 export const vechicalCreateReviewReducer=(state={},action)=>{
    switch(action.type)
    {
        case 'VECHICAL_CREATE_REVIEW_REQUEST':
            return{
                loading:true,
            }
         case 'VECHICAL_CREATE_REVIEW_SUCCESS':
             return{
                 loading:false,
                 success:true,
             }
         case 'VECHICAL_CREATE_REVIEW_FAIL':
             return{
                loading:false,
                error:action.payload
             }
        case 'VECHICAL_CREATE_REVIEW_RESET':
            return {
               
            }
             default: return state
    }
 }

 export const topVechicalReducer=(state={vechicals:[]},action)=>{
    switch(action.type)
    {
        case 'VECHICAL_TOP_REQUEST':
            return{
                loading:true,
                vechicals:[]
            }
         case 'VECHICAL_TOP_SUCCESS':
             return{
                 loading:false,
                 vechicals:action.payload
             }
         case 'VECHICAL_TOP_FAIL':
             return{
                loading:false,
                error:action.payload
             }
             default: return state
    }
 }