import React, { useEffect, useMemo, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Organization } from "../../../../models";
// const models = (callback) => graphQLFetcher(query).then((value) => {
//     callback(value);
//     return value;
//   });



const Users = (props) => {
  const [state, setState] = useState();
  useEffect(() => {
    modelsFn()
    // console.log({ models });
  }, [state]);
  const modelsFn = async () => {
    const orgs = await DataStore.query(Organization)
    return orgs
    // orgs.data.list
  };
  console.log({state})

  // const models = DataStore.query( Organization).finally((r)=>console.log({r}))
  return (
    <>
      <h1>Ok</h1>
      <br/>
      <ul>
      {state.map(i=> <li>{i.name}</li>)}
      </ul>
    </>
  );
};
export default Users;
