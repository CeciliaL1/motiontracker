import { RotatingLines } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.50"
        width="96"
        visible={true}
      />
    </>
  );
};
