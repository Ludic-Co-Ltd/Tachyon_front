import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

export default function IconLabelButtons(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Button startIcon={<AddIcon />} href={props.href}>
        新規追加
      </Button>
    </Stack>
  );
}