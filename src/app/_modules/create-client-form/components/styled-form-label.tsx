import * as Form from '@radix-ui/react-form';

interface StyledFormLabelProps {
  children: string;
}

export default function StyledFormLabel(props: StyledFormLabelProps) {
  return (
    <Form.Label className="flex items-center justify-end w-[200px] text-[10pt] font-medium text-gray-600">
      {props.children}
    </Form.Label>
  );
}
