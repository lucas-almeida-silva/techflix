import { useState, useEffect } from 'react';

export default function useForm({valoresIniciais, validate}) {
    const [values, setValues] = useState(valoresIniciais);
    const [errors, setErrors] = useState({});
    const [touched, setTouchedFields] = useState({});

    useEffect(() => {
      validateValues(values);
    }, [values]);

    function setValue(chave, valor) {
      setValues({
        ...values,
        [chave]: valor,
      });
    }
  
    function handleChange(event) {
      setValue(
        event.target.getAttribute('name'),
        event.target.value,
      );
    }

    function handleBlur(event) {
      setTouchedFields({
        ...touched,
        [event.target.getAttribute('name')]: true
      });
    }

    function validateValues(values) {
      setErrors(validate(values));
    }

    function markAllAsTouched() {
      Object.keys(values).forEach((key)=>{
        setTouchedFields({
          ...touched,
          [key]: true,
        });
      });     
    }

    function clearForm() {
      setValues(valoresIniciais);
    }
  
    return {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      markAllAsTouched,
      clearForm,     
    }
}
  