import { ErrorCodes, errorCodes } from "./types";
import { __ } from "@wordpress/i18n";

export const avatarLimitSize = 10; // Unit: MB
export const messageDisplayDuration = 3000; // Unit: milli sec.
export const pageTransitionInterval = 500;

export const getErrorMessage = (code: ErrorCodes) => {
  switch (code) {
    case errorCodes.UnAuthorized:
      return __("You are not authorized to do this operation.");
    case errorCodes.Network:
      return __("Network error.");
    case errorCodes.Unknown:
      return __("Unknown error.");
    default:
      return __("Unknown error.");
  }
};
