import { useState, useEffect } from "react";
import axios from "axios";
import EditPosts from "./EditPosts";
// eslint-disable-next-line
import { formData, UserId } from "./Signup";
import {
  Card,
  CardBody,
  CardText,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
const Dashboard = (props) => {
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [posts, setPosts] = useState([]);

  const toggle = () => setModal(!modal);
  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

 
  const createPost = () => {
    const postval = {
      title: "this is the title",
      body: "This is the body",
      userId: "11",
    };
    axios.post("https://jsonplaceholder.typicode.com/posts", postval)
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
          document.getElementById("modal-body").innerHTML =
            "Post has been created.";
        }
      })
      .catch((error) => {
        console.log(error);
        document.getElementById("modal-body").innerHTML =
          "Post creation failed.";
      });
    toggle();
  };

  const logout = () => {
    localStorage.removeItem("formData");
  };

  const query = new URLSearchParams(props.location.search);
  const id = query.get("UserId");
  

  return (
    <div id="cards">
      <Navbar color="faded" light>
        <NavbarBrand
          href="/"
          style={{ margin: "10px 0px 10px 13px" }}
          className="mr-auto"
        >
          Dashboard
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem style={{ margin: "0px 0px 0px 17px" }}>
              <NavLink href="/" onClick={logout}>
                Log Out
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Button
        color="danger"
        onClick={createPost}
        style={{ margin: " 30px 30px" }}
      >
        Create Post
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody id="modal-body"></ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            OK
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            {" "}
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {posts.map((posts) => (
        <Card key={posts.id} style={{ width: "60rem", margin: "20px 30px" }}>
          <CardBody>
            <CardText> Id: {posts.id} </CardText>
            <CardText> UserId: {posts.userId} </CardText>
            <CardText> Title: {posts.title} </CardText>
            <CardText> Body: {posts.body} </CardText>
            {posts.userId === Number(id) && <EditPosts />}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
