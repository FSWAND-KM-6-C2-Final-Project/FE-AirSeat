import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";

const Title = ({ text }) => {
  const [title, setTitle] = useState(text);

  useEffect(() => {
    setTitle(text);
  }, [text]);

  return (
    title && (
      <HelmetProvider>
        <Helmet>
          <title>{title} - Airseat</title>
        </Helmet>
      </HelmetProvider>
    )
  );
};

export default Title;
