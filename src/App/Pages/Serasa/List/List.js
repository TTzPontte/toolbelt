import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { SerasaReport } from "../../../../models";
import { useNavigate } from "react-router-dom";
import { Collection } from "@aws-amplify/ui-react";
import { FaEye, FaTrash } from "react-icons/fa"; // Importing icons
import "./styles.scss";

const ListHeader = () => (
  <Row className="border-top border-bottom py-3 bg-light text-uppercase font-weight-bold">
    <Col xs={1}>#</Col>
    <Col xs={4}>Document Number</Col>
    <Col xs={2}>Type</Col>
    <Col xs={2}>Status</Col>
    <Col xs={3}>Actions</Col>
  </Row>
);

const ListItem = ({ model, index, handleDelete, navigate }) => (
  <Row className="border-bottom py-2 hover:bg-light">
    <Col xs={1}>{index + 1}</Col>
    <Col xs={4}>{model.documentNumber}</Col>
    <Col xs={2}>{model.type}</Col>
    <Col xs={2}>
      <Badge variant={model.status === "Active" ? "success" : "danger"}>
        {model.status}
      </Badge>
    </Col>
    <Col xs={3}>
      <div className={" d-flex "} style={{display: 'flex', flexFlow: "row", flexWrap: 'nowrap'}}>
        <Col className={"flex-fill"}>
          <Button
            variant="outline-danger"
            onClick={() => handleDelete(model.id)}
            className="btn btn-sm  mr-2"
          >
            <FaTrash /> Delete
          </Button>
        </Col>
        <Col >
            <Button
              variant="outline-primary"
              onClick={() => navigate(`${model.id}`)}
            >
              <FaEye /> View
            </Button>
        </Col>
      </div>
    </Col>
  </Row>
);

const List = () => {
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
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1>Relatórios Serasa</h1>
          <hr />
        </Col>
      </Row>
      <Row>
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
                  {index === 0 && <ListHeader />}
                  <ListItem {...{ model, index, handleDelete, navigate }} />
                </>
              )}
            </Collection>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default List;
