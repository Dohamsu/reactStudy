 // pages/_document.tsx
 //_document는 서버사이드에 관여하는 로직 또는 static한 로직을 추가하는데 사용
 import React from "react";
 import Document, { Html, Head, Main, NextScript } from "next/document";
 import { ServerStyleSheets } from "@mui/styles";



 export default class MyDocument extends Document {
   render() {
       return (
           //모든페이지에 아래 메타테크가 head에 들어감 
         // 루트파일이기에 가능한 적은 코드만 넣어야 함! 
         //전역 파일을 엉망으로 만들면 안된다 
         // 웹 타이틀 같은 것 넣음
        <Html lang="kr">
           <title> reacT Practice</title>
         <Head>
           <meta property="custom" content="123123" charSet="UTF-8"/>
         </Head>
         <body>
           <Main />
         </body>
         <NextScript />
       </Html>
     );
   }
 }


MyDocument.getInitialProps = async ctx => {
  const materialSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => materialSheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: <>{initialProps.styles}</>
  };
};
 