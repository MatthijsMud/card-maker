import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

declare namespace CustomDocument {
  export type Props = {
    readonly emotionStyleTags: any;
  }
}

export default class  CustomDocument extends Document<CustomDocument.Props> {
  render() {
    return <Html lang="en">
      <Head>
        {this.props.emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  }

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & CustomDocument.Props> {
    
    const cache = createCache({ key: "css", prepend: true });
    const { extractCriticalToChunks } = createEmotionServer(cache);
    
    const renderPage = ctx.renderPage;
    ctx.renderPage = () => {
      return renderPage({
        enhanceApp: App => function EnhanceApp(props) {
          const extraProps = { cache };
          return <App {...props} {...extraProps} />
        }
      });
    };
    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(style => {
      return <style 
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    })
    return {
      ...initialProps,
      emotionStyleTags,
    };
  }
}