import { toast } from "react-toastify";
import { USER_UPDATED, USER_UPDATE_FAILED, USER_UPDATE_SUCCESS } from "../actions/userManagement";

let initialState={
    data:null,
    error:null,


}
export default function userModification(
    state=initialState,
    action
){
    console.log('userModification',action);

switch(action.type){
 case USER_UPDATED:
    toast.dark("USER RETRIVED");
        return{
            data:action.payload
        }
case USER_UPDATE_SUCCESS:

    return{
        ...state,
        data:action.payload,
    }
    case USER_UPDATE_FAILED:
        toast.error("USER UPDATION FAILED");

    return{
        ...state,
        data:{
            error:"404",
            message:"data not found"
        },
    }
default:
    return state;

}
}