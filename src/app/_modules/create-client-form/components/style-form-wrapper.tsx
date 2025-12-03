import * as Form from '@radix-ui/react-form';

interface StyledFormLabelProps {
  children: React.ReactElement;
}

export default function StyledFormWrapper(props: StyledFormLabelProps) {
  return <div className="flex flex-row gap-4">{props.children}</div>;
}
