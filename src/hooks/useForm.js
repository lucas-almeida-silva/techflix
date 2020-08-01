import { useState } from 'react';

export default function useForm(valoresIniciais) {
    const [values, setValues] = useState(valoresIniciais);
  
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
  
    function clearForm() {
      setValues(valoresIniciais);
    }
  
    return {
      values,
      handleChange,
      clearForm
    }
}
  