import { Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import {useState} from 'react'
const DeletePost = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
      <>
        <Button
          style={{ float: "right", marginRight: "700px" }}
          onClick={toggle}
        >
          Delete Post
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Delete Post</ModalHeader>
          <ModalBody>Are you sure you want to delete this post?</ModalBody>
          <ModalFooter>
            <Button color="grey" onClick={toggle}>
              Cancel
            </Button>
            <Button color="grey" onClick={toggle}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
}

export default DeletePost
