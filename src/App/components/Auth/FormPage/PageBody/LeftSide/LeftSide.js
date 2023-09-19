import { Container } from "react-bootstrap";
import RegisterForm from "../../RegisterForm";
import ConsentBox from "../ConsentBox";

const LeftSide = ({ title = "", ...rest }) => (
  <Container className="container-left-side">
    <div style={{ marginBottom: "48px", textAlign: "inherit" }}>
      <h2>{title}</h2>
    </div>
    <RegisterForm {...rest} />
    <ConsentBox />
  </Container>
);

export default LeftSide;
