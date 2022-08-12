 // pages/_document.tsx
 import Document, { Html, Head, Main, NextScript } from "next/document";
 export default class CustomDocument extends Document {
   render() {
       return (
           //모든페이지에 아래 메타테크가 head에 들어감 
         // 루트파일이기에 가능한 적은 코드만 넣어야 함! 
         //전역 파일을 엉망으로 만들면 안된다 
         // 웹 타이틀 같은 것 넣음
        <Html>
         <Head>
           <meta property="custom" content="123123" />
           <title> reacT TT</title>
         </Head>
         <body>
           <Main />
         </body>
         <NextScript />
       </Html>
     );
   }
 }