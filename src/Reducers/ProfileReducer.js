import { actions } from "../actions/actions"

const initialState={
    user:{},
    posts:[],
    isLoading:false,
    error:"",
}

const profileReducer=(state, action)=>{
    switch (action.type) {
        case actions.profile.DATA_FETCHING:
            return {
                ...state,
                isLoading:true,
            }

        case actions.profile.DATA_FETCHED:
                return {
                    ...state,
                    isLoading:false,
                    user:action.data.user,
                    posts:action.data.posts
                }
        case actions.profile.DATA_FETCH_ERROR:
                    return {
                        ...state,
                        error:action.error,
                    }
    
        default:
            return state;
    }
}

export  {initialState, profileReducer}