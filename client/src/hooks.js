import { useState } from 'react'

export function useForm(initialValues = {}) {
  const [formValues, setFormValues] = useState(initialValues)

  function handleChange(event) {
    let value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    setFormValues({
      ...formValues,
      [event.target.name]: value,
    })
  }

  function getInputProps(fieldName) {
    return {
      name: fieldName,
      value: formValues[fieldName] || '',
      checked: formValues[fieldName] || false,
      onChange: handleChange,
    }
  }

  return {
    formValues,
    getInputProps,
    handleChange,
  }
}
