import { GenerateButton } from "../components/styled/styledButtons";
import { Wrapper } from "../components/styled/Wrappers";

export const GenerateWorkout = () => {
  return (
    <>
      <Wrapper direction="row" margintop={13} marginleft={0}>
        <GenerateButton>
          Generate<i className="fa-solid fa-wand-magic-sparkles"></i>
        </GenerateButton>
      </Wrapper>
      <Wrapper direction="row" margintop={5}></Wrapper>
    </>
  );
};
