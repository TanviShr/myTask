import {Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import {useState} from 'react'
const EditPosts = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
 
    return (
      <div>
        <Button onClick={toggle}>Edit Posts</Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Post</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text"/>
              </FormGroup>
              <FormGroup>
                <Label for="Body">Body</Label>
                <Input type="text" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="grey" onClick={toggle}>
              Cancel
            </Button>
            <Button color="grey" onClick={toggle}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default EditPosts
