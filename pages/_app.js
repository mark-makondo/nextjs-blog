/**
 * @description
 ** TOP LEVEL COMPONENT COMMON ACROSS ALL PAGES. 
 */

import '../stylesheets/global.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
