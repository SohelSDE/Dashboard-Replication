import {data as mocData} from '../pages/dashboard/components/mocdata/mocData';
export const DATA_FETCHED = "DATA_FETCHED";
export const DATA_FETCHED_SUCESS = "DATA_FETCHED_SUCESS";
export const DATA_FETCHED_FAILED = "DATA_FETCHED_DATA_FETCHED_FAILED";
export function datafetchsucess(payload) {
  return {
    type: DATA_FETCHED_SUCESS,
    payload,
  };
}
function datafetchfail(payload) {
  return {
    type: DATA_FETCHED_FAILED,
    payload,
  };
}
export const DataFetch = () => {
  let data = mocData;
  if (data) {
    return (dispatch) => {
      dispatch(datafetchsucess(data));
    };
  } else {
    return (dispatch) => {
      dispatch(datafetchfail({ Status: 404, Message: "No Data Found" }));
    };
  }
};