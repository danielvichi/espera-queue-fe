import Card from '~/app/_components/card';
import type { UnityDto } from '~/app/api/generated/model';

export function AddUnityCard() {
  return <Card>Add Unity Card Component</Card>;
}

interface UnityCardProps {
  unityData: UnityDto;
}

export function UnityCard(props: UnityCardProps) {
  const { unityData } = props;

  return (
    <Card>
      <h3>{unityData.name}</h3>
    </Card>
  );
}
