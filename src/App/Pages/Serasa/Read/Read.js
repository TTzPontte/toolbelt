import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { ListGroup } from 'react-bootstrap';
import {SerasaReport} from "../../../../models";

const Read = (props) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedModels = await DataStore.query(SerasaReport);
      console.log(fetchedModels);
      setModels(fetchedModels);
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  return (
      <div>
        <h1>Fetched Serasa Reports</h1>
        <ListGroup>
          {models.map((model, index) => (
              <ListGroup.Item key={index}>
                Document Number: {model.documentNumber}, Type: {model.type}, Status: {model.status}
              </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
  );
};

export default Read;
