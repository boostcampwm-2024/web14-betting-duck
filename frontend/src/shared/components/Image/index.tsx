import React from "react";

const Image = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>((props, ref) => {
  return <img {...props} loading="lazy" decoding="async" ref={ref} />;
});

export { Image };
