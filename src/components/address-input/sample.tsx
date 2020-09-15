import React from "react";
import { __ } from "@wordpress/i18n";
import "./sample.scss";

type Props = {};
function AddressInputSample(props: Props) {
  const container = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = container.current;
    if (element instanceof HTMLDivElement) {
      // @ts-ignore
      const { geolonia } = window;
      geolonia.address(element);
    }
  }, []);

  return (
    <form>
      <div ref={container} id="address-input-container"></div>
      <button type="submit">{__("submit")}</button>
    </form>
  );
}

export default AddressInputSample;
