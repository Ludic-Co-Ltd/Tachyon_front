import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function EditButton(props) {
  return (
    <Stack direction="row" spacing={2} className="m-0">
      <Button color="primary" size="small" variant="outlined" href={`./edit/${props.id}`}>
        編集
      </Button>
    </Stack>
  );
}