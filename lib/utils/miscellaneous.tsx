import DOMPurify from "dompurify";

declare namespace NodeJS {
    export interface Process {
        browser: boolean
    }
  }

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
 export const handleSanitize = ( content: string ) => {
	return process.browser ? DOMPurify.sanitize( content ) : content;
};

export function stripHTML(myString: string) {
    return myString.replace( /(<([^>]+)>)/ig, '').replace('&nbsp;', '');
 }

 export const limit = (string = '', limit = 0) => {

    if(string.length > limit){

      return string.substring(0, limit) + ".."
    }else {
      return string
    }
  }
