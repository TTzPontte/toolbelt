import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Container, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { SerasaReport } from "../../../../models";
import { useNavigate } from "react-router-dom";
import { Collection } from "@aws-amplify/ui-react";
import { FaTrash, FaEye } from "react-icons/fa"; // Importing icons

const ListHeader = () => {
  return (
      <Row className="border-top border-bottom py-3 bg-light text-uppercase font-weight-bold">
        <Col>#</Col>
        <Col>Document Number</Col>
        <Col>Type</Col>
        <Col>Status</Col>
        <Col>Actions</Col>
      </Row>
  );
};

const ListItem = ({ model, index, handleDelete, navigate }) => {
  return (
      <Row className="border-bottom py-2 hover:bg-light">
        <Col>{index + 1}</Col>
        <Col>{model.documentNumber}</Col>
        <Col>{model.type}</Col>
        <Col><Badge variant={model.status === 'Active' ? 'success' : 'danger'}>{model.status}</Badge></Col>
        <Col>
          <Button variant="danger" onClick={() => handleDelete(model.id)} className="mr-2">
            <FaTrash /> Delete
          </Button>
          <Button variant="info" onClick={() => navigate(`${model.id}`)}>
            <FaEye /> View
          </Button>
        </Col>
      </Row>
  );
};

const List = (props) => {
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedModels = await DataStore.query(SerasaReport);
      setModels(fetchedModels);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const modelToDelete = await DataStore.query(SerasaReport, id);
      await DataStore.delete(modelToDelete);
      fetchData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
      <Container>
        <Row className="mb-4">
          <Col>
            <h1>Fetched Serasa Reports</h1>
          </Col>
        </Row>
        <Card>
          <Card.Body>
            <Collection
                isPaginated
                isSearchable
                items={models}
                type="list"
                direction="column"
                gap="20px"
                wrap="nowrap"
            >
              {(model, index) => (
                  <>
                    {index === 0 && (<ListHeader />)}
                    <ListItem {...{ model, index, handleDelete, navigate }} />
                  </>
              )}
            </Collection>
          </Card.Body>
        </Card>
      </Container>
  );
};

export default List;
