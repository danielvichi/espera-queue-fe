import Select, { type SelectProps } from '~/app/_components/select';

interface QueueTypeSelectProps extends SelectProps {
  options: string[];
}

export function QueueTypeSelect(props: QueueTypeSelectProps) {
  const { options, className, ...rest } = props;

  const renderOptionsList = options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <Select className={`py-1.5 ${className}`} {...rest}>
      {renderOptionsList}
    </Select>
  );
}
