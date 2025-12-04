import * as Form from '@radix-ui/react-form';

interface StyledFormLabelProps {
  children: React.ReactElement;
}

export default function StyledFormWrapper(props: StyledFormLabelProps) {
  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-4">
      {props.children}
    </div>
  );
}
