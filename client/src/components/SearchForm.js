import React, { useContext, useState} from 'react';
import { Form } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const SearchForm = observer(() => {
  const [value, setValue] = useState('');
  const { device } = useContext(Context)

  const handleChange = (event) =>{
    setValue(event.target.value);
    device.setSearchFilter(event.target.value);
  }

  return (
    <Form>
      <Form.Control value={value} type="text" placeholder="Поиск" onChange={handleChange}/>
    </Form>
  )
});


export default SearchForm;
