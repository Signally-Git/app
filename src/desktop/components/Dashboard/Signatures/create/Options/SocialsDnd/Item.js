import React, { forwardRef } from "react";
import DetectSocialNetwork from "Utils/DetectSocialNetwork/DetectSocialNetwork";

export const Item = forwardRef(({ content, id, ...props }, ref) => {
  return <div {...props} ref={ref}>
    <DetectSocialNetwork social={content} />
    </div>;
});
