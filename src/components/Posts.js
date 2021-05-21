import { Card, CardBody, CardText} from "reactstrap"
import DeletePost from "./DeletePost"
import EditPosts from "./EditPosts"
const Posts = ({posts,id}) => {
    return (
      <>
        {posts.map((posts) => (
          <Card key={posts.id} style={{ width: "60rem", margin: "20px 30px" }}>
            <CardBody>
              <CardText> Id: {posts.id} </CardText>
              <CardText> UserId: {posts.userId} </CardText>
              <CardText> Title: {posts.title} </CardText>
              <CardText style={{marginBottom:"30px"}}> Body: {posts.body} </CardText>
              {posts.userId === Number(id) && (
                <>
                  <EditPosts /> 
                  <DeletePost />
                </>
              )}
            </CardBody>
          </Card>
        ))}
      </>
    );
}

export default Posts
