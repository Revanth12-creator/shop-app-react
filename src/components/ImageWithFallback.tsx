import classes from "*.module.css";
import React, { useState } from "react";

type Props = { source: string, classList: string };

const ImageWithFallback: React.FC<Props> = ({ source, classList }) => {
  let [imgSrc, setDefault] = useState(source);
  return (
    <img
      src={imgSrc}
      onError={() =>
        setDefault(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
        )
      }

      className="{classList} img-thumbnail"
    />
  );
};
export default ImageWithFallback;

