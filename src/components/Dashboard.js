import React  from 'react'
import axios from 'axios'
import EditPosts from './EditPosts'
// eslint-disable-next-line
import {formData,UserId} from './Signup'
import { Card,CardBody, CardText , Button,Modal, ModalBody, ModalFooter, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
class Dashboard extends React.Component{
    state = {
        posts:[],
        modal: false,
        collapsed:true,  
    };
    
    constructor(props){
        super(props);
        this.toggleNavbar =this.toggleNavbar.bind(this);
        this.toggle = this.toggle.bind(this);

    }
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      toggleNavbar(){
          this.setState({
              collapsed:!this.state.collapsed
          });
      }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {console.log(res.data)
        this.setState({posts:res.data})})
        .catch(err=>console.error(err));
    }
    Createpost = () => {
        const postval = {
          title: "this is the title",
          body: "This is the body",
          userId: "11",
        };
        axios.post("https://jsonplaceholder.typicode.com/posts", postval)
          .then((response) => {
            if(response.status===201){
            console.log(response);
            document.getElementById("modal-body").innerHTML = "Post has been created."
            }
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("modal-body").innerHTML = "Post creation failed."
          });
          this.toggle();
      };

    
     logout(){
         localStorage.removeItem("formData")
     }
     

    render(res){
        const query = new URLSearchParams(this.props.location.search)
        const id = query.get('UserId') 
    
        return(
            
            <div id ="cards">
            <Navbar color="faded" light>
            <NavbarBrand href="/" style={{margin:"10px 0px 10px 13px"}}className="mr-auto">Dashboard</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
            <NavItem style={{margin:"0px 0px 0px 17px"}}>
                <NavLink href="/" onClick={this.logout}>Log Out</NavLink>
            </NavItem>
            </Nav>
           </Collapse>
           </Navbar>
            <Button color ="danger" onClick = {this.Createpost} style={{margin:" 30px 30px"}}>Create Post</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody id="modal-body"></ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.toggle}>OK</Button>{" "}
            <Button color="secondary" onClick={this.toggle}> Cancel</Button>
            </ModalFooter>
           </Modal>
            {this.state.posts.map(posts=>
            <Card key = {posts.id} style={{ width: '60rem',margin:'20px 30px'}}>
            <CardBody>
            <CardText > Id: {posts.id} </CardText>
            <CardText > UserId: {posts.userId} </CardText>
            <CardText > Title: {posts.title} </CardText>
            <CardText > Body: {posts.body} </CardText>
            {posts.userId === Number(id) && <EditPosts posts={this.state.posts}/>}
            </CardBody>
            </Card>
            )}
            
       </div>
        )
        
        
  }

}
export default Dashboard
