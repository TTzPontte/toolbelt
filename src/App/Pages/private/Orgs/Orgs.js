import React from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Organization } from '../../../../models';
const Orgs = (props) => {
    const models = DataStore.query(Organization).then(response =>response.json())
    console.log(models);
    return(
    <>
        <h1>Ok</h1>
    </>

)};

export default Orgs;