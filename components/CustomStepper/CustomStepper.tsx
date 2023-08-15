import css from './CustomStepper.module.css';

interface ActiveStep {
  userTheme: string;
  activeStep: number;
}

export const CustomStepper = ({
  userTheme,
  activeStep
}: ActiveStep): JSX.Element => {
  const steps = [1, 2, 3, 4, 5, 6];

  function generateRandomKey(): number {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber;
  }

  return (
    <div className={css.stepsWrapper}>
      {
        steps.map((step) => {
          let key = generateRandomKey();
          return (
            <div
              key={step}
              className={step === 1 || step === 6 ? css.stepContainer : css.longstepContainer}
            >
              {step === 1 ?
                <></> : (
                  <div
                    key={++key}
                    className={
                      step <= activeStep ? css.activeConnector : (
                        userTheme === 'dark' ? css.darkConnector : css.connector
                      )
                    } />
                )}
              <div
                key={step}
                className={
                  step <= activeStep ? css.activeStep : (
                    userTheme === 'dark' ? css.darkStep : css.step
                  )
                }
              >
                {step}
              </div>
              {step === 6 ? <></> : (
                <div
                  key={++key}
                  className={
                    step <= activeStep ? css.activeConnector : (
                      userTheme === 'dark' ? css.darkConnector : css.connector
                    )
                  }
                />
              )
              }
            </div>
          )
        })
      }
    </div>
  );
};