interface StepsBreadCrumbsProps {
  activeStepIndex: number;
  steps: string[];
  stepsOk?: string[];
  setActiveStepIndex?: (index: number) => void;
}

export default function StepsBreadCrumbs(props: StepsBreadCrumbsProps) {
  const { activeStepIndex, steps, stepsOk, setActiveStepIndex } = props;

  const handleStepClick = (index: number) => {
    if (setActiveStepIndex) {
      setActiveStepIndex(index);
    }
  };

  const previousOkSteps = stepsOk ? stepsOk.slice(0, activeStepIndex) : [];

  function renderStep(step: string, i: number) {
    const isActive = i === activeStepIndex;
    const isCompleted = i < activeStepIndex;
    const hasNoRequiredPendency = !!previousOkSteps.find(
      (step) => step === steps[i],
    );
    const showPendencyAlert =
      !hasNoRequiredPendency && !isActive && i < activeStepIndex;

    return (
      <div
        className="flex flex-row w-full max-w-[300px] items-center"
        key={step}
      >
        <div
          className={`flex items-center cursor-pointer`}
          onClick={() => handleStepClick(i)}
        >
          <div
            className={`
            relative w-8 h-8 rounded-full flex items-center justify-center
            ${isCompleted ? 'bg-blue-600 text-white' : isActive ? 'bg-blue-300 text-white' : 'bg-gray-300 text-gray-600'}
            `}
          >
            {showPendencyAlert && (
              <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-700" />
            )}
            {i + 1}
          </div>
          <div
            className={`ml-2 mr-4 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
          >
            {step}
          </div>
        </div>
        {i < steps.length - 1 && (
          <div
            className={`w-full max-w-[200px] flex-1 h-0.5 ${isCompleted ? 'bg-blue-600' : 'bg-gray-300'}`}
          ></div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full gap-4 mb-6">
      {steps.map((step, i) => renderStep(step, i))}
    </div>
  );
}
