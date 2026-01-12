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

export interface HandleInputChangeArgs<T> {
  event: ChangeEvent<HTMLInputElement>;
  field: keyof T;
}

export function CreateUnityForm() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isUnityFormIsOk, setIsUnityFormOk] = useState<boolean>(false);
  const [isQueueFormIsOk, setIsQueueFormOk] = useState<boolean>(false);

  const {
    inputData: unityInputData,
    setInputData: setUnityInputData,
    createUnity,
    isLoading: isCreatingUnityLoading,
    errorCode: unityErrorCode,
  } = useCreateUnity();

  function setStep(index: number) {
    setActiveStepIndex(index);
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
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
          <CardContainer>b</CardContainer>
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
            isCreatingUnityLoading ||
            !!unityErrorCode
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
