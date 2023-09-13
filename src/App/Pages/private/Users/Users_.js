import React, { useMemo, useState } from "react";
// import { DataStore } from '@aws-amplify/datastore';
// import { API } from 'aws-amplify'
// import {listOrganizations} from '../../../graphql/queries'
// import { Member, Organization } from '../../../models';
// import { graphQLFetcher, _get } from "../../../helpers/graphQLFetcher";
import {handler} from "../../../helpers/test";
// const models = (callback) => graphQLFetcher(query).then((value) => {
//     callback(value);
//     return value;
//   });

const Users = (props) => {
  const [state, setState] = useState( )
  // const models = DataStore.query( Organization).finally((r)=>console.log({r}))

  // console.log({ state });
  // const result = API.graphql(listOrganizations).then(r=>console.log({r}))
  // models.then((value) => {
    const x = handler()
    console.log({x})
    if (!state){

    }

      // const x = graphQLFetcher(query)
    // console.log({x})
    // console.log("valueOf()", x.valueOf())
    // x.finally()
  //         .then((value) => {
  //     console.log({value})
  //     return value
  // }).then(data => {
  //         console.log({data})
  //         return data
  //     })
  //     console.log({ });

  // const {
  //   data: { listOrganization }
  // } = value;
  //   console.log({ listOrganization });
  //
  //   const { items } = listOrganization;
  // if (!!listOrganization || !!items) {
  //   setState(items);
  // }
  //
  // return listOrganization;
  // });
  return (
    <>
      oK <br />
      <Page />
    </>
  );
};
const Page = (state) => {
  // const m = useMemo(() => models((value) => setState(value)));

  return <></>;
};
export default Users;
