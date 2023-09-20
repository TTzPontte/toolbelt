import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import {Table, Button, Container, Row} from "react-bootstrap";
import { SerasaReport } from "../../../../models";
import { useNavigate } from "react-router-dom";

const List = (props) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const fetchData = async () => {
    const fetchedModels = await DataStore.query(SerasaReport);
    console.log(fetchedModels);
    setModels(fetchedModels);
  };

  const handleDelete = async (id) => {
    const modelToDelete = await DataStore.query(SerasaReport, id);
    await DataStore.delete(modelToDelete);
    fetchData(); // Refresh the list
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <h1>Fetched Serasa Reports</h1>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Document Number</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{model.documentNumber}</td>
                <td>{model.type}</td>
                <td>{model.status}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(model.id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => navigate(`${model.id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default List;
