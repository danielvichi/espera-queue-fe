import * as Form from '@radix-ui/react-form';
import { useState, type ChangeEvent } from 'react';
import {
  CardCarrouselContainer,
  CardContainer,
} from '~/app/_components/carrousel';
import StepsBreadCrumbs from '~/app/_components/steps-bread-crumb';
import { useCreateUnity } from '~/app/_hooks/use-create-unity';
import { UnityFormField } from './unity-form-field';
import Button from '~/app/_components/button';
import { QueueFormField } from './queue-form-field';
import { useCreateQueue } from '~/app/_hooks/use-create-queue';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import { useUnitiesDataContext } from '~/app/_contexts/unity-data-provider';
import { useRouter } from 'next/navigation';

export interface HandleInputChangeArgs<T> {
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement>;
  field: keyof T;
}

export function CreateUnityForm() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isUnityFormIsOk, setIsUnityFormOk] = useState<boolean>(false);
  const [isQueueFormIsOk, setIsQueueFormOk] = useState<boolean>(false);

  const { user } = useAdminAuthenticationContext();
  const { refreshUnityData, isLoading: isUnityDataContextLoading } =
    useUnitiesDataContext();

  const router = useRouter();

  const {
    inputData: unityInputData,
    setInputData: setUnityInputData,
    createUnity,
    deleteUnity,
    isLoading: isCreatingUnityLoading,
    errorCode: unityErrorCode,
  } = useCreateUnity();

  const {
    inputData: queueInputData,
    setInputData: setQueueInputData,
    createQueue,
    isLoading: isCreatingQueueLoading,
    errorCode: queueErrorCode,
  } = useCreateQueue();

  function setStep(index: number) {
    setActiveStepIndex(index);
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!unityInputData || !queueInputData || !user?.clientId) {
      return;
    }

    await createUnity({
      clientId: user.clientId,
      ...unityInputData,
    }).then(async (response) => {
      if (!response) {
        return;
      }

      const queueResponse = await createQueue({
        ...queueInputData,
        adminId: user.id,
        unityId: response.data.id,
      });

      if (queueResponse && queueResponse.data) {
        await refreshUnityData();

        router.push('/admin/');
      } else {
        // If queue creation failed, delete the previously created unity to maintain data consistency
        await deleteUnity(response.data.id);
      }
    });
  }

  return (
    <>
      Create Unity
      <StepsBreadCrumbs
        activeStepIndex={activeStepIndex}
        steps={['Unity', 'Queue']}
        stepsOk={[
          isUnityFormIsOk ? 'Unity' : '',
          isQueueFormIsOk ? 'Queue' : '',
        ]}
        setActiveStepIndex={setStep}
      />
      <Form.Root className="pb-8">
        <CardCarrouselContainer activeIndex={activeStepIndex}>
          <CardContainer>
            <UnityFormField
              inputData={unityInputData}
              updateInputData={setUnityInputData}
              onIsRequiredFieldsOk={() => setIsUnityFormOk(true)}
              onIsRequiredFieldsFailed={() => setIsUnityFormOk(false)}
            />
          </CardContainer>
          <CardContainer>
            <QueueFormField
              inputData={queueInputData}
              updateInputData={setQueueInputData}
              onIsRequiredFieldsOk={() => setIsQueueFormOk(true)}
              onIsRequiredFieldsFailed={() => setIsQueueFormOk(false)}
            />
          </CardContainer>
        </CardCarrouselContainer>
      </Form.Root>
      <div className="flex w-full justify-center gap-4">
        <Button
          className="w-full max-w-80"
          disabled={!isUnityFormIsOk || isQueueFormIsOk || activeStepIndex >= 1}
          onClick={setStep.bind(null, activeStepIndex + 1)}
          style={{
            display: activeStepIndex >= 1 ? 'none' : 'block',
          }}
        >
          Next
        </Button>

        <Button
          className="w-full max-w-80"
          disabled={
            isCreatingUnityLoading ||
            activeStepIndex > 1 ||
            activeStepIndex <= 0
          }
          onClick={setStep.bind(null, activeStepIndex - 1)}
          style={{
            display: activeStepIndex < 1 ? 'none' : 'block',
          }}
        >
          Previous
        </Button>

        <Button
          className="w-full max-w-80"
          disabled={
            !isUnityFormIsOk ||
            !isQueueFormIsOk ||
            !!unityErrorCode ||
            !!queueErrorCode
          }
          isLoading={
            isCreatingUnityLoading ||
            isCreatingQueueLoading ||
            isUnityDataContextLoading
          }
          onClick={(e) => handleSubmit(e)}
          style={{
            display: activeStepIndex >= 1 ? 'block' : 'none',
          }}
        >
          Create Unity
        </Button>
      </div>
    </>
  );
}
