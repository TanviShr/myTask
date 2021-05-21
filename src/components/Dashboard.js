import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination"
import {useHistory} from "react-router-dom"
import Posts from "./Posts"
// eslint-disable-next-line
import { formData, UserId } from "./Signup";
import {
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
  const history = useHistory();
  const path = window.location.pathname;
  const query = new URLSearchParams(props.location.search);
  const id = query.get("UserId");
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const toggle = () => setModal(!modal);
  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
      history.push(`${path}?UserId=1&page=${currentPage}`);
      window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage, history, path]);

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
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (number) =>setCurrentPage(number); 
  
  const logout = () => {
    localStorage.removeItem("formData");
  };
  
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
      <Posts posts = {currentPosts} id={id} currentPage={currentPage}/>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Dashboard;
