import React from 'react';
import { Alert } from 'react-bootstrap';

export function Error({variant,error}) {
  return (
      <Alert variant={variant}>
          {error}
      </Alert>
  )
}
Error.defaultProps={
    variant:'info'
}
