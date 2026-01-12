import * as Form from '@radix-ui/react-form';

interface StyledFormLabelProps {
  children: string;
}

export default function StyledFormLabel(props: StyledFormLabelProps) {
  return (
    <Form.Label className="flex items-center md:justify-end w-full leading-3.5 md:w-[200px] text-[10pt] font-medium text-gray-600 text-left md:text-right">
      {props.children}
    </Form.Label>
  );
}
