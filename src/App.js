import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

const url = `https://api.nasa.gov/planetary/apod?api_key=br58R72ftvvMJ5bgXKkWeXbKpEVqK2bU3trFMnTE&count=5`;

function App() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((promise) => {
      setPost(promise.data);
      setLoading(false);
    });
  }, []);
  console.log(post);

  if (loading) {
    return (
      <Container>
        <h1>Loading...</h1>;
      </Container>
    );
  }
  if (!post) {
    return (
      <Container>
        <h1>Something went wrong</h1>;
      </Container>
    );
  }

  return (
    <Container className="container">
      <h1>Astronomy Picture of the Day (APOD)</h1>
      <Button
        className="btn"
        variant="primary"
        type="submit"
        onClick={() => window.location.reload(false)}
      >
        Press for new images
      </Button>
      {post.map((item) => {
        return (
          <Card className="card" bg="dark" text="white">
            <Card.Img src={item.url} variant="top" className="img" />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.explanation}</Card.Text>
              <Card.Text>{item.date}</Card.Text>
              <Card.Text>{item.copyright}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
}

export default App;
