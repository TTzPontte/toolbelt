import React, { useEffect, useState } from "react";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { SerasaReport } from "../../../../models";
import { useNavigate } from "react-router-dom";
import { Collection } from "@aws-amplify/ui-react";
import { FaEye } from "react-icons/fa"; // Importing icons

const Header = () => {
  return (
    <header className="py-4">
      <Container>
        <Row>
          <Card>
            <h2 className="">Relatórios SERASA</h2>
          </Card>
        </Row>
      </Container>
    </header>
  );
};

const ListHeader = () => {
  return (
    <Row className="border-top border-bottom py-3 bg-light text-uppercase font-weight-bold">
      <Col>#</Col>
      <Col>Data de criação</Col>
      <Col>Document Number</Col>
      <Col>Type</Col>
      <Col>Status</Col>
      <Col>Actions</Col>
    </Row>
  );
};

const ListItem = ({ model, index, handleDelete, navigate }) => {
  return (
    <Row className="border-bottom py-2">
      <Col>{index + 1}</Col>
      <Col>{new Date(model.createdAt).toJSON().slice(0, 10)}</Col>
      <Col>{model.documentNumber}</Col>
      <Col>{model.type}</Col>
      <Col>
        <Badge
          variant={model.status === "Active" ? "success" : "danger"}
          className="py-2"
        >
          {model.status}
        </Badge>
      </Col>
      <Col>
        <Button
          variant="info"
          className={"btn btn-sm btn-outline-light"}
          onClick={() => navigate(`${model.id}`)}
        >
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
      const fetchedModels = await DataStore.query(SerasaReport, Predicates.ALL,  {
        sort: (s) => s.createdAt(SortDirection.DESCENDING)
      });

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
    <div>
      <Header />

      <main>
        <Container>
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
        </Container>
      </main>
    </div>
  );
};

export default List;
