import React from 'react';
import PropTypes from 'prop-types';
import { FormFieldWrapper, Label, Input, ErrorMessage } from './styles';

function FormField({
  label, type, name, onBlur, onChange, value, error, children
}) {
  const fieldId = `id_${name}`;
  const isTextArea = type === 'textarea';
  const isSelectList = type === 'select';
  const tag = isTextArea ? 'textarea' : isSelectList ? 'select' : 'input';
  const hasValue = Boolean(value.length);

  return (
    <FormFieldWrapper>
      <Label htmlFor={fieldId}>
        <Input
          as={tag}
          id={fieldId}
          type={type}
          value={value}
          name={name}
          hasValue={hasValue}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete='off'
        >
          {children}
        </Input>
 
        <Label.Text>
          {label}
        </Label.Text>

        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        
      </Label>
    </FormFieldWrapper>
  );
}

FormField.defaultProps = {
  type: 'text',
  value: '',
  error: '',
  onChange: () => {},
  onBlur: () => {},
  list: []
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
};

export default FormField;
