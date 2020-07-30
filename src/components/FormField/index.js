import React from 'react';
import { Input, TextArea, Label, Span, CorSelection } from './styles';

function FormField({ label, type, name, value, onChange }) {
    if(type === 'textarea') {
      return (
        <>
          <Label>
              <TextArea
                placeholder = " "
                type={type} 
                value={value}
                name={name}
                onChange={onChange}
              />
              <Span>{label}</Span>
            </Label>
        </>
      )
    } 
    else if(type == 'color') {
      return (
        <>
          <Label>
              <Span>{label}</Span>
              <CorSelection
                placeholder = " "
                type={type} 
                value={value}
                name={name}
                onChange={onChange}
              />
            </Label>
        </>
      )
    }
    else {
      return (
        <>
          <Label>
              <Input
                placeholder = " "
                type={type} 
                value={value}
                name={name}
                onChange={onChange}
              />
              <Span>{label}</Span>
            </Label>
        </>
      )
    }
}

export default FormField;