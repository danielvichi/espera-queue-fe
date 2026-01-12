import type { UnityDto } from '~/app/api/generated/model';
import { AddUnityCard, UnityCard } from './unity-card';

interface UnityListProps {
  unityList: UnityDto[] | null | undefined;
}

export default function UnityList(props: UnityListProps) {
  const { unityList } = props;

  if (unityList === null || unityList === undefined) {
    return <div>Loading unities...</div>;
  }

  if (unityList.length === 0) {
    return <AddUnityCard />;
  }

  const cardList = unityList.map((unity) => (
    <UnityCard key={unity.id} unityData={unity} />
  ));

  return (
    <div>
      <h2> Unities</h2>
      {cardList}
      <AddUnityCard />
    </div>
  );
}
