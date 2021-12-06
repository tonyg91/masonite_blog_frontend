// Import All Our Components
import AllBlogs from "./pages/AllBlogs";
import SingleBlog from "./pages/SingleBlog";
import Form from "./pages/BlogForm";

// Import React and hooks
import { useState, useEffect } from "react";

// Import components from React Router
import { Route, Routes, Link, useNavigate} from "react-router-dom";

 ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "green",
    display: "block",
    margin: "auto",
  };

function App(props) {
 
  ///////////////
  // State & Other Variables
  ///////////////
  const navigate = useNavigate()
  // Our Api Url
  const url = "https://ag-masonite-blog-backend.herokuapp.com/blogs/";

  // State to Hold The List of Blogs
  const [blogs, setBlogs] = useState([]);
  // an object that represents a null todo
  const nullBlog = {
   title: "",
   body: "",
  };

  //Edit State
  const [targetBlog, setTargetBlog] = useState(nullBlog)
  //////////////
  // Functions
  //////////////
  const getBlog = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setBlogs(data);
  };


  // Function to add todo from form data
  const addBlog = async (newBlog) => {
  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlog),
  });

  // get updated list of todos
  getBlog();
  };
  
  const getTargetBlog = (blog) => {
    setTargetBlog(blog)
    navigate("/edit")
  }
  // update todo for handle submit prop 
  const updateBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blog)
    })
    //update todos
    getBlog()
  }

  // Function to edit todo on form submission
  const deleteBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "delete",
    });

   // get updated list of todos
   getBlog();
   navigate("/");
  };
  //////////////
  // useEffects
  //////////////
  useEffect(() => {
    getBlog()
  },[])

  return (
    <div className="App">
      <h1 style={h1}>My Blog</h1>
      <Link to="/new"><button style={button}>Create New Blog</button></Link>
      <Routes>
        <Route path="/" element={<AllBlogs blogs={blogs}/>}/>
        <Route path="/blog/:id" element={<SingleBlog blogs={blogs} edit={getTargetBlog} deleteBlog={deleteBlog}/>}/>
        <Route path="/new" element={<Form initialBlog={nullBlog}
      handleSubmit={addBlog}
      buttonLabel="Create Blog"/>}/>
        <Route path="/edit" element={<Form initialBlog={targetBlog} handleSubmit={updateBlog} buttonLabel="Update Blog"/>}/>
      </Routes>
    </div>
  );
}

export default App;
