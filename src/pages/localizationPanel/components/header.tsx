import React, { useState, useEffect } from "react";
import { Fields } from "components";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import { useHooks, useDebounce } from "hooks";

const Header = () => {
  const navigate = useNavigate();
  const { qs } = useHooks();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 600);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    navigate({
      search: debouncedValue
        ? qs.stringify({
            search: debouncedValue,
          })
        : "",
    });
  }, [debouncedValue, navigate]);

  return (
    <div>
      <h1>Header</h1>
      <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <FastField
                component={Fields.Input}
                placeholder='Search'
                name='search'
                onChange={handleInputChange}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Header;