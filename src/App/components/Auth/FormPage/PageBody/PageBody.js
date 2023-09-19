import { Col, Row } from "react-bootstrap";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide";

const PageBody = ({ left, right }) => {
  return (
    <>
      <Row>
        <Col lg={5}>
          <LeftSide {...left} />
        </Col>
        <Col sm={1}>
          <hr className="line" />
        </Col>
        <Col lg={5} justify="center">
          <RightSide {...right} />
        </Col>
      </Row>
    </>
  );
};

export default PageBody;
