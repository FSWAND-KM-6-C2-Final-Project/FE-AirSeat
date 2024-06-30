import { Helmet, HelmetProvider } from "react-helmet-async";

const Title = ({ text }) => {
  return (
    text && (
      <HelmetProvider>
        <Helmet>
          <title>{text} - Airseat</title>
        </Helmet>
      </HelmetProvider>
    )
  );
};

export default Title;
