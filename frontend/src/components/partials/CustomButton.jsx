import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CustomButton(props) {

  const {handleClick, title} = props;

  return (
    <Stack direction="row" spacing={2} className="m-0">
      <Button
        color={!props.is_undisclosed?'primary':'error'}
        size="small"
        variant="contained"
        // href={`./edit/${props.id}`}
        onClick={handleClick}
      >
        {title}
      </Button>
    </Stack>
  );
}