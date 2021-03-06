import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchBox({history}) {
  const [keyword, setKeyword] = useState("");

  const searchHandler=(e)=>{
   e.preventDefault()
   if(keyword.trim()){
       history.push(`/search/${keyword}`)
   }else{
       history.push('/')
   }
  }
  return (
   
      <Form onSubmit={searchHandler} inline>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
          className="mr-sm-2 ml-sm-5"
          
        ></Form.Control>
        <Button type="submit" variant="outline-success" className="p-2">
            Search
        </Button>
      </Form>
   
  );
}
