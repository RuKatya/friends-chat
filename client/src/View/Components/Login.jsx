import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ setUserName }) => {
  const userName = useRef();

  function handleLoginUser(e) {
    e.preventDefault();

    setUserName(userName.current.value);

    e.target.reset();
  }

  return (
    <Container>
      <Form onSubmit={handleLoginUser}>
        <Form.Group>
          <Form.Label>Enter Your Name</Form.Label>
          <Form.Control type="text" ref={userName} required />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
