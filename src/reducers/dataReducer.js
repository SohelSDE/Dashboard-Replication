import { DATA_FETCHED_FAILED, DATA_FETCHED_SUCESS } from "../actions/data";
const initialState = {
  available: false,
  data: null,
};
export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_FETCHED_SUCESS: {
      return {
        available: true,
        data: action.payload,
        status: 200,
        message: "Ok",
      };
    }

    case DATA_FETCHED_FAILED: {
      return {
        data: {
          available: false,
          data: action.payload
        },
      };
    }
    default: {
      return state;
    }
  }
}
