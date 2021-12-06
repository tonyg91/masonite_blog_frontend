import {Link, useParams} from "react-router-dom"

const SingleBlog = ({blogs, edit, deleteBlog}) => {
    const params = useParams()
    const id = parseInt(params.id); 
    const blog = blogs.find((blog) => blog.id === id);

    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto",
      };
     return <div style={div}>
      <h1>{blog?.title}</h1>
      <h2>{blog?.body}</h2>
      <button onClick={() =>  edit(blog)}>Edit</button>
      <button onClick={(event) => deleteBlog(blog)}>Delete</button>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>

  };
  
  export default SingleBlog;